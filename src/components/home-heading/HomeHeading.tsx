import React from "react";
import "./HomeHeading.css";

const HomeHeading = (props: HomeHeadingProps) => {
  return (
    <React.Fragment>
      <div className="home__heading__container">
        <h1 className="home__heading__title">{props.title}</h1>
        {props.subtitle && (
          <p className="home__heading__subtitle">{props.subtitle}</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default HomeHeading;
