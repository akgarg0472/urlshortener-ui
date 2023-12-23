import React from "react";
import LinkButton from "../../button/LinkButton";
import "./DashboardLink.css";

const DashboardLink = (props: DashboardLinkProps) => {
  return (
    <React.Fragment>
      <div
        className={`dashboard__link ${
          props.active ? "dashboard__link__active" : ""
        }`}
      >
        <div className="dashboard__link__img__container">
          <span
            className="dashboard__link__img"
            style={{
              mask: `url(${props.icon}) center center / contain no-repeat`,
              WebkitMask: `url(${props.icon}) center center / contain no-repeat`,
            }}
          />
        </div>

        <LinkButton
          className={`dashboard__link__text ${
            props.active ? "dashboard__link__text__active" : ""
          }`}
          text={props.text}
          onClickLink={props.path}
          referrerPolicy="no-referrer"
        />
      </div>
    </React.Fragment>
  );
};

export default DashboardLink;
