import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../button/LinkButton";

import "./HomeNavbar.css";

const HomeNavbar = () => {
  return (
    <React.Fragment>
      <div className="home__navbar">
        <div className="logo__container">
          <Link to="/" className="navbar__link">
            🔗 URLShortener
          </Link>
        </div>

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
      </div>
    </React.Fragment>
  );
};

export default HomeNavbar;
