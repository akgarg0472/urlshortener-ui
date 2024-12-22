import React from "react";
import { LOGIN_URL } from "../../constants";
import LinkButton from "../button/LinkButton";
import "./HomeHero.css";

const HomeHero = () => {
  return (
    <React.Fragment>
      <div className="home__hero__container">
        <div className="main__heading">Shorten Your Links,</div>
        <div className="main__heading">Expand Your Reach</div>
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

        <div className="hero__options__container">
          <div className="hero__option">
            <img src="/assets/icons/gift.svg" />
            <span>Free Plan Available</span>
          </div>

          <div className="hero__option">
            <img src="/assets/icons/shield.svg" />
            <span>Secure & Reliable</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeHero;
