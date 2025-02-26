import React, { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../api/user/user";
import RegularButton from "../../components/button/RegularButton";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import DropdownSelector from "../../components/dropdownselector/DropdownSelector";
import InputField from "../../components/inputfield/InputField";
import Loader from "../../components/loader/Loader";
import Modal from "../../components/modal/Modal";
import { ModalIcon } from "../../components/modal/Modal.enums";
import {
  DASHBOARD_URL,
  DASH_UPDATE_PROFILE_HEAD,
  DASH_UPDATE_PROFILE_SUBHEAD,
  LOGIN_URL,
} from "../../constants";
import useAuth from "../../hooks/useAuth";
import { signupCountryDropdown } from "../../utils/dropdownutils";
import { getEnv } from "../../utils/envutils";
import { validateUpdateProfileRequest } from "../../utils/validationutils";

import { Pencil } from "lucide-react";
import { SidebarToggleButton } from "../../components/dashboard-navbar/toggle-button/SidebarToggleButton";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";
import { InternalLoaderSize } from "../../components/loader/Loader.enums";
import "./Dashboard.css";

const DashboardUpdateProfile = () => {
  const defaultProfileData: ProfileData = {
    profilePicture: getEnv(
      "REACT_APP_DEFAULT_PROFILE_PICTURE",
      "https://res.cloudinary.com/dmdbqq7fp/profile-pictures/default.png"
    )!,
    name: "",
    bio: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    businessDetails: "",
  };

  const [originalData, setOriginalData] =
    useState<ProfileData>(defaultProfileData);
  const [updatedData, setUpdatedData] =
    useState<ProfileData>(defaultProfileData);
  const [newProfilePicture, setNewProfilePicture] = useState<File>();
  const [loading, setLoading] = useState<boolean>(true);
  const profilePictureChooserBtnRef: RefObject<HTMLInputElement> = useRef(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const { getUserId, getAuthToken, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {
    const userId = getUserId();
    const authToken = getAuthToken();

    if (!userId || !authToken) {
      logout();
      navigate(LOGIN_URL, { replace: true });
      return;
    }

    const profile = await getProfile(userId, authToken);

    if (profile.httpCode === 401 || profile.httpCode === 403) {
      logout();
      navigate("/login", { replace: true });
      return;
    }

    if (!profile.success) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        title: `Error ${profile?.httpCode}`,
        message: profile?.message,
      });
      return;
    }

    const fetchedProfile: ProfileData = {
      profilePicture: profile.profile_picture
        ? profile.profile_picture
        : getEnv(
            "REACT_APP_DEFAULT_PROFILE_PICTURE",
            "https://res.cloudinary.com/dmdbqq7fp/profile-pictures/default.png"
          )!,
      name: profile.name ? profile.name : "",
      bio: profile.bio ? profile.bio : "",
      phone: profile.phone ? profile.phone : "",
      city: profile.city ? profile.city : "",
      state: profile.state ? profile.state : "",
      country: profile.country ? profile.country : "",
      zipcode: profile.zipcode ? profile.zipcode : "",
      businessDetails: profile.business_details ? profile.business_details : "",
    };

    setOriginalData(fetchedProfile);
    setUpdatedData(fetchedProfile);
    setLoading(false);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.length === 1) {
      const file = files.item(0);

      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please select valid image file.");
          return;
        }

        if (file.size > 1 * 1024 * 1024) {
          alert("File size should be below 1 MB.");
          return;
        }

        const fileReader = new FileReader();

        fileReader.onloadend = () => {
          const result = fileReader.result;

          if (result) {
            const imageData = result as string;
            updatedData.profilePicture = imageData;
            setNewProfilePicture(file);
          }
        };

        fileReader.readAsDataURL(file);
      }
    }
  };

  const handleProfileSubmitButtonClick = async () => {
    const updateProfileRequest: UpdateProfileRequest = {
      profile_picture: newProfilePicture,
      name: updatedData.name,
      bio: updatedData.bio,
      phone: updatedData.phone,
      city: updatedData.city,
      state: updatedData.state,
      country: updatedData.country,
      zipcode: updatedData.zipcode,
      business_details: updatedData.businessDetails,
    };

    if (validateUpdateProfileRequest(originalData, updateProfileRequest)) {
      setLoading(true);

      Loader.showLoader();

      const updateResponse = await updateProfile(
        getUserId()!,
        updateProfileRequest,
        getAuthToken()!
      );

      Loader.hideLoader();

      if (updateResponse.httpCode === 401 || updateResponse.httpCode === 403) {
        logout();
        navigate("/login", { replace: true });
        return;
      }

      if (!updateResponse.success) {
        setLoading(false);

        Modal.showModal({
          icon: ModalIcon.ERROR,
          title: `Error ${updateResponse?.httpCode}`,
          message: updateResponse?.message,
        });
        return;
      }

      setLoading(false);

      Modal.showModal({
        icon: ModalIcon.SUCCESS,
        message: updateResponse.message,
        onClose() {
          navigate(DASHBOARD_URL, { replace: true });
        },
      });
    }
  };

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <SidebarToggleButton />

          <DashboardHeadSubHead
            heading={DASH_UPDATE_PROFILE_HEAD}
            subheading={DASH_UPDATE_PROFILE_SUBHEAD}
            removeLeftPadding={true}
          />

          <div
            className="profile__page__content__container"
            style={{
              paddingBottom: "3.2rem",
              marginTop: "2.4rem",
            }}
          >
            <div className="update__profile__form">
              <div className="profile__picture__container">
                <div className="image__container">
                  {loadingImage ? (
                    <div
                      style={{
                        padding: "2.4rem",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <InternalLoader size={InternalLoaderSize.LARGE} />
                    </div>
                  ) : null}

                  <img
                    className="update__profile__img"
                    src={updatedData.profilePicture}
                    onLoad={() => setLoadingImage(false)}
                    style={{
                      display: loadingImage ? "none" : "block",
                    }}
                    alt="Profile Picture"
                  />

                  <div className="img__choooser">
                    <button
                      onClick={() => {
                        profilePictureChooserBtnRef.current?.click();
                      }}
                      style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        padding: "1.6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title="Select Picture"
                    >
                      <Pencil />
                    </button>
                  </div>

                  <input
                    className="update__profile__pic__select"
                    type="file"
                    accept="image/*"
                    ref={profilePictureChooserBtnRef}
                    onChange={handleImageFileChange}
                  />
                </div>
              </div>

              <div className="content">
                <InputField
                  id="profile.name"
                  text={updatedData.name}
                  title="Name"
                  type="text"
                  className="update__profile__input__field"
                  inputFieldStyle={{ height: "4rem" }}
                  onChange={(e) => {
                    setUpdatedData((prev) => {
                      return {
                        ...prev,
                        name: e.target.value,
                      };
                    });
                  }}
                />

                <InputField
                  id="profile.bio"
                  text={updatedData.bio}
                  title="Bio"
                  type="text"
                  className="update__profile__input__field"
                  inputFieldStyle={{ height: "4rem" }}
                  onChange={(e) => {
                    setUpdatedData((prev) => {
                      return {
                        ...prev,
                        bio: e.target.value,
                      };
                    });
                  }}
                />

                <InputField
                  id="profile.phone"
                  text={updatedData.phone}
                  title="Phone"
                  type="text"
                  className="update__profile__input__field"
                  inputFieldStyle={{ height: "4rem" }}
                  onChange={(e) => {
                    setUpdatedData((prev) => {
                      return {
                        ...prev,
                        phone: e.target.value,
                      };
                    });
                  }}
                />

                <InputField
                  id="profile.city"
                  text={updatedData.city}
                  title="City"
                  type="text"
                  className="update__profile__input__field"
                  inputFieldStyle={{ height: "4rem" }}
                  onChange={(e) => {
                    setUpdatedData((prev) => {
                      return {
                        ...prev,
                        city: e.target.value,
                      };
                    });
                  }}
                />

                <InputField
                  id="profile.state"
                  text={updatedData.state}
                  title="State"
                  type="text"
                  className="update__profile__input__field"
                  inputFieldStyle={{ height: "4rem" }}
                  onChange={(e) => {
                    setUpdatedData((prev) => {
                      return {
                        ...prev,
                        state: e.target.value,
                      };
                    });
                  }}
                />

                <DropdownSelector
                  classes="update__profile__input__field"
                  id="profile.country"
                  onChange={(newCountry) => {
                    setUpdatedData((prev) => {
                      return {
                        ...prev,
                        country: newCountry,
                      };
                    });
                  }}
                  key="update__profile__country"
                  title="Country"
                  value={updatedData.country}
                  dropdownValues={signupCountryDropdown}
                  dropdownSelectStyle={{ height: "4rem" }}
                  style={{ margin: "0", marginTop: "1rem" }}
                />

                <InputField
                  id="profile.zipcode"
                  text={updatedData.zipcode}
                  title="Zipcode"
                  type="text"
                  className="update__profile__input__field"
                  inputFieldStyle={{ height: "4rem" }}
                  onChange={(e) => {
                    setUpdatedData((prev) => {
                      return {
                        ...prev,
                        zipcode: e.target.value,
                      };
                    });
                  }}
                />

                <InputField
                  id="profile.business_details"
                  text={updatedData.businessDetails}
                  title="Business Details"
                  type="text"
                  className="update__profile__input__field"
                  inputFieldStyle={{ height: "4rem" }}
                  onChange={(e) => {
                    setUpdatedData((prev) => {
                      return {
                        ...prev,
                        businessDetails: e.target.value,
                      };
                    });
                  }}
                />
              </div>

              <RegularButton
                content="Update"
                className="update__form__btn"
                onClick={handleProfileSubmitButtonClick}
                isDisabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardUpdateProfile;
