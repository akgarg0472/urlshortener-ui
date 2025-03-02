import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doLogout } from "../../api/auth/auth";
import { LogoutApiResponse } from "../../api/auth/auth.api.response";
import { DASHBOARD_PROFILE_URL, DASHBOARD_URL } from "../../constants";
import useAuth from "../../hooks/useAuth";
import LinkButton from "../button/LinkButton";

import "./HomeNavbar.css";

const HomeNavbar = () => {
  const [showMenuDropdown, setShowMenuDropdown] = useState<boolean>(false);
  const { isUserLoggedIn, getAuth, logout } = useAuth();
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target as Node)
    ) {
      setShowMenuDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuButtonClick = () => {
    setShowMenuDropdown(!showMenuDropdown);
  };

  const handleLogout = async () => {
    const logoutApiResponse: LogoutApiResponse = await doLogout({
      userId: getAuth()!.userId!,
    });

    if (logoutApiResponse.success) {
      logout();
      navigate("/", {
        replace: true,
      });
    }
  };

  return (
    <React.Fragment>
      <div className="home__navbar">
        <div className="logo__container">
          <Link to="/" className="navbar__link">
            🔗 Cmpct
          </Link>
        </div>

        {isUserLoggedIn() ? (
          <div
            className="user__menu__container"
            onClick={handleMenuButtonClick}
            ref={menuButtonRef}
          >
            <div className="text">{getAuth()!.name.substring(0, 1)}</div>

            <ul
              className={`dropdown ${showMenuDropdown ? "dropdown__visible" : ""}`}
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              ref={dropdownRef}
            >
              {getAuth() ? (
                <div className="user__name">
                  {getAuth()!.name.length > 25
                    ? `${getAuth()!.name.slice(0, 25)}...`
                    : getAuth()!.name}
                </div>
              ) : null}
              <Link to={DASHBOARD_URL}>Dashboard</Link>
              <Link to={DASHBOARD_PROFILE_URL}>My Profile</Link>
              <Link to={"/"} onClick={handleLogout}>
                Logout
              </Link>
            </ul>
          </div>
        ) : (
          <div className="auth__buttons__container">
            <LinkButton
              key="login__btn"
              text="Login"
              className="login__button"
              onClickLink="/login"
              referrerPolicy="no-referrer"
            />
            <LinkButton
              key="signup__btn"
              text="Signup"
              className="signup__button"
              onClickLink="/signup"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default HomeNavbar;
