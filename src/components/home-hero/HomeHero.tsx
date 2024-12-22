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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>

            <span>Free Plan Available</span>
          </div>

          <div className="hero__option">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>

            <span>Secure & Reliable</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeHero;
