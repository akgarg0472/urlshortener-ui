import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  doGetOAuthProvider,
  doLogin,
  doOAuthCallback,
} from "../../../api/auth/auth";
import {
  LoginApiResponse,
  OAuthCallbackResponse,
  OAuthClient,
  OAuthProviderResponse,
} from "../../../api/auth/auth.api.response";
import LinkButton from "../../../components/button/LinkButton";
import LoginWithGitHubButton from "../../../components/button/oauth/LoginWithGitHubButton";
import LoginWithGoogleButton from "../../../components/button/oauth/LoginWithGoogleButton";
import RegularButton from "../../../components/button/RegularButton";
import InputField from "../../../components/inputfield/InputField";
import { InputFieldType } from "../../../components/inputfield/InputField.enums";
import Loader from "../../../components/loader/Loader";
import { LoaderSpeed } from "../../../components/loader/Loader.enums";
import Modal from "../../../components/modal/Modal";
import { ModalIcon } from "../../../components/modal/Modal.enums";
import SeparatorWithText from "../../../components/separator-with-text/SeparatorWithText";
import { DASHBOARD_URL, OAUTH_SUCCESS_RESPONSE_KEY } from "../../../constants";
import useAuth from "../../../hooks/useAuth";
import { validateLoginPage } from "../../../utils/authutils";

import "../Auth.css";

const Login = () => {
  const navigation = useNavigate();
  const [googleButtonLoading, setGoogleButtonLoading] =
    useState<boolean>(false);
  const [githubButtonLoading, setGithubButtonLoading] =
    useState<boolean>(false);
  const { setAuth, isUserLoggedIn } = useAuth();
  const [searchParams] = useSearchParams();
  let popupInterval: NodeJS.Timer | null = null;

  const [loginObject, setLoginObject] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Login";

    if (isUserLoggedIn()) {
      const redirecTo = searchParams.get("redirectTo");
      navigation(redirecTo ? redirecTo : DASHBOARD_URL, {
        replace: true,
      });
    }

    return () => {
      if (popupInterval) {
        clearInterval(popupInterval);
      }
    };

    // eslint-disable-next-line
  }, []);

  const handleLoginButtonClick = async () => {
    if (validateLoginPage(loginObject.email, loginObject.password)) {
      Loader.showLoader({
        speed: LoaderSpeed.MEDIUM,
      });

      const loginResponse: LoginApiResponse = await doLogin(loginObject);

      Loader.hideLoader();

      if (!loginResponse.success) {
        Modal.showModal({
          icon: ModalIcon.ERROR,
          title: `Error ${loginResponse.httpCode}`,
          message: loginResponse.message,
        });

        return;
      }

      const isAuthCompleted = setAuth(
        loginResponse.userId!,
        loginObject.email,
        loginResponse.name!,
        loginResponse.login_type ?? null
      );

      if (isAuthCompleted) {
        const redirecTo = searchParams.get("redirectTo");
        navigation(redirecTo ? redirecTo : DASHBOARD_URL, {
          replace: true,
        });
      }
    }
  };

  const googleLoginButtonClickHandler = async () => {
    try {
      setGoogleButtonLoading(true);

      const oAuthProvider: OAuthProviderResponse = await doGetOAuthProvider({
        provider: "google",
      });

      setGoogleButtonLoading(false);

      if (!oAuthProvider.clients || oAuthProvider.clients.length !== 1) {
        Modal.showModal({
          icon: ModalIcon.ERROR,
          message:
            "Failed to fetch Google OAuth details. Please try again later",
        });
        return;
      }

      const oAuthClient: OAuthClient = oAuthProvider.clients[0];

      const googleOAuthUrl = `${oAuthClient.base_url}?client_id=${
        oAuthClient.client_id
      }&redirect_uri=${encodeURIComponent(
        oAuthClient.redirect_uri
      )}&response_type=code&state=${uuidv4()}&scope=${encodeURIComponent(
        oAuthClient.scope
      )}`;

      const width = 700;
      const height = 800;
      const offsetX = 50;
      const offsetY = 50;
      const left = window.innerWidth / 2 - width / 2 + offsetX;
      const top = window.innerHeight / 2 - height / 2 + offsetY;

      const popup = window.open(
        googleOAuthUrl,
        "oAuthPopup",
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );

      if (!popup) {
        alert("Popup blocked. Please allow popups for this site.");
        return;
      }

      const storageMessageListener = async (event: StorageEvent) => {
        window.removeEventListener("storage", storageMessageListener);

        if (event.key !== OAUTH_SUCCESS_RESPONSE_KEY || !event.newValue) {
          return;
        }

        localStorage.removeItem(OAUTH_SUCCESS_RESPONSE_KEY);
        const params = JSON.parse(event.newValue);

        if (params.error) {
          Modal.showModal({
            icon: ModalIcon.ERROR,
            message: "Google Login Failed. Please try again later",
          });
          return;
        }

        const reqBody: OAuthCallbackRequest = {
          state: params.state,
          authCode: params.code,
          scope: params.scope,
          provider: "google",
        };

        setGoogleButtonLoading(true);

        const callbackResponse: OAuthCallbackResponse =
          await doOAuthCallback(reqBody);

        setGoogleButtonLoading(false);

        if (!callbackResponse.success) {
          Modal.showModal({
            icon: ModalIcon.ERROR,
            message: callbackResponse.message,
          });
          return;
        }

        setAuth(
          callbackResponse.user_id!,
          callbackResponse.email!,
          callbackResponse.name!,
          callbackResponse.login_type ?? null
        );

        if (callbackResponse.is_new_user) {
          Modal.showModal({
            icon: ModalIcon.SUCCESS,
            message: `🎉 Welcome to Cmpct: ${callbackResponse.name}`,
            onClose() {
              const redirecTo = searchParams.get("redirectTo");
              navigation(redirecTo ? redirecTo : DASHBOARD_URL, {
                replace: true,
              });
            },
          });
        } else {
          const redirecTo = searchParams.get("redirectTo");
          navigation(redirecTo ? redirecTo : DASHBOARD_URL, {
            replace: true,
          });
        }
      };

      popupInterval = setInterval(() => {
        if (popup && popup.closed === true) {
          if (popupInterval) {
            clearInterval(popupInterval);
          }
          window.removeEventListener("storage", storageMessageListener);
        }
      }, 500);

      window.addEventListener("storage", storageMessageListener);
      // eslint-disable-next-line
    } catch (_: any) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message: "Failed to login using Google. Please try again later",
      });
    } finally {
      setGoogleButtonLoading(false);
    }
  };

  const githubLoginButtonClickHandler = async () => {
    try {
      setGithubButtonLoading(true);

      const oAuthProvider: OAuthProviderResponse = await doGetOAuthProvider({
        provider: "github",
      });

      setGithubButtonLoading(false);

      if (!oAuthProvider.clients || oAuthProvider.clients.length !== 1) {
        Modal.showModal({
          icon: ModalIcon.ERROR,
          message:
            "Failed to fetch GitHub OAuth details. Please try again later",
        });
        return;
      }

      const oAuthClient: OAuthClient = oAuthProvider.clients[0];

      const githubOAuthUrl = `${oAuthClient.base_url}?client_id=${
        oAuthClient.client_id
      }&state=${uuidv4()}&scope=${encodeURIComponent(oAuthClient.scope)}`;

      const width = 700;
      const height = 800;
      const offsetX = 50;
      const offsetY = 50;
      const left = window.innerWidth / 2 - width / 2 + offsetX;
      const top = window.innerHeight / 2 - height / 2 + offsetY;

      const popup = window.open(
        githubOAuthUrl,
        "oAuthPopup",
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );

      if (!popup) {
        alert("Popup blocked. Please allow popups for this site.");
        return;
      }

      const storageMessageListener = async (event: StorageEvent) => {
        window.removeEventListener("storage", storageMessageListener);

        if (event.key !== OAUTH_SUCCESS_RESPONSE_KEY || !event.newValue) {
          return;
        }

        localStorage.removeItem(OAUTH_SUCCESS_RESPONSE_KEY);
        const params = JSON.parse(event.newValue);

        if (params.error) {
          Modal.showModal({
            icon: ModalIcon.ERROR,
            message: "Google Login Failed. Please try again later",
          });
          return;
        }

        const reqBody: OAuthCallbackRequest = {
          state: params.state,
          authCode: params.code,
          scope: params.scope,
          provider: "github",
        };

        setGithubButtonLoading(true);

        const callbackResponse: OAuthCallbackResponse =
          await doOAuthCallback(reqBody);

        setGithubButtonLoading(false);

        if (!callbackResponse.success) {
          Modal.showModal({
            icon: ModalIcon.ERROR,
            message: callbackResponse.message,
          });
          return;
        }

        setAuth(
          callbackResponse.user_id!,
          callbackResponse.email!,
          callbackResponse.name!,
          callbackResponse.login_type ?? null
        );

        if (callbackResponse.is_new_user) {
          Modal.showModal({
            icon: ModalIcon.SUCCESS,
            message: callbackResponse.message,
            onClose() {
              const redirecTo = searchParams.get("redirectTo");
              navigation(redirecTo ? redirecTo : DASHBOARD_URL, {
                replace: true,
              });
            },
          });
        } else {
          const redirecTo = searchParams.get("redirectTo");
          navigation(redirecTo ? redirecTo : DASHBOARD_URL, {
            replace: true,
          });
        }
      };

      popupInterval = setInterval(() => {
        if (popup && popup.closed === true) {
          if (popupInterval) {
            clearInterval(popupInterval);
          }
          window.removeEventListener("storage", storageMessageListener);
        }
      }, 1000);

      window.addEventListener("storage", storageMessageListener);
    } catch {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message: "Failed to login using Google. Please try again later",
      });
    } finally {
      setGithubButtonLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="login__page">
        <div className="login__form__container">
          <div className="login__form__heading">Welcome Back</div>
          <div className="login__heading">Login to continue</div>

          <form className="login__form">
            <InputField
              className="login__input__field__full"
              placeholder="Email"
              title="Email"
              type={InputFieldType.EMAIL}
              id="login__email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginObject((prev) => {
                  return {
                    ...prev,
                    email: e.target.value,
                  };
                });
              }}
              text={loginObject.email}
              key="login__email"
              isRequired={true}
              onKeyDown={() => {
                //
              }}
            />

            <InputField
              className="login__input__field__full"
              placeholder="Password"
              title="Password"
              type={InputFieldType.PASSWORD}
              id="login__password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginObject((prev) => {
                  return {
                    ...prev,
                    password: e.target.value,
                  };
                });
              }}
              text={loginObject.password}
              key="login__password"
              isRequired={true}
              onKeyDown={() => {
                //
              }}
            />

            <div className="login__form__btns__container">
              <RegularButton
                content="Login"
                className="login__login__btn"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  event.preventDefault();
                  handleLoginButtonClick();
                }}
                type="submit"
              />
            </div>
          </form>

          <div className="login__links__container">
            <LinkButton
              text="Forgot Password?"
              onClickLink="/forgot-password"
              className="forgot__password__link"
              referrerPolicy="no-referrer"
            />
            <br />

            <div className="signup__link__container">
              <span className="heading">{`Doesn't have account?`} </span>
              <LinkButton
                text="Signup"
                onClickLink="/signup"
                className="signup__link"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <SeparatorWithText text="or" />

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0",
              padding: "0",
            }}
          >
            <LoginWithGoogleButton
              key="login_with_google_btn"
              onClickHandler={googleLoginButtonClickHandler}
              loading={googleButtonLoading}
            />

            <LoginWithGitHubButton
              key="login_with_github_btn"
              onClickHandler={githubLoginButtonClickHandler}
              loading={githubButtonLoading}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
