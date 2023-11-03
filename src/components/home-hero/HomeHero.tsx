import React from "react";
import { LOGIN_URL } from "../../utils/constants";
import LinkButton from "../button/LinkButton";
import "./HomeHero.css";

const HomeHero = () => {
  return (
    <React.Fragment>
      <div className="home__hero__container">
        <div className="left__heading__section">
          <div className="main__heading">URLShortener • Shorter URLs</div>
          <div className="sub__heading">
            Unlock the Power of Simplified Links with our Fast and Reliable URL
            Shortening Service
          </div>
          <LinkButton
            className="get__started__btn"
            onClickLink={LOGIN_URL}
            text="Get Started"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="right__image__section"></div>
      </div>
    </React.Fragment>
  );
};

export default HomeHero;
