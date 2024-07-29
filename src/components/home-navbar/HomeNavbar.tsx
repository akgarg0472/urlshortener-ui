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
            text="Signup"
            className="signup__button"
            onClickLink="/signup"
            referrerPolicy="no-referrer"
          />
          <LinkButton
            text="Login"
            className="login__button"
            onClickLink="/login"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeNavbar;
