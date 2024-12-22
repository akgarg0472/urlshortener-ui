import React from "react";
import "./HomeHeading.css";

const HomeHeading = (props: HomeHeadingProps) => {
  return (
    <React.Fragment>
      <div className={`home__heading__container ${props.className}`}>
        <h1
          className={`${
            props.darkMode
              ? "home__heading__title__dark"
              : "home__heading__title"
          }`}
        >
          {props.title}
        </h1>

        {props.subtitle && (
          <p
            className={`${
              props.darkMode
                ? "home__heading__subtitle__dark"
                : "home__heading__subtitle"
            }`}
          >
            {props.subtitle}
          </p>
        )}
      </div>
    </React.Fragment>
  );
};

export default HomeHeading;
