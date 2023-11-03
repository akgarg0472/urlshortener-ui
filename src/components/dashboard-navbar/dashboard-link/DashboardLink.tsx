import React from "react";
import LinkButton from "../../button/LinkButton";
import "./DashboardLink.css";

interface DashboardLinkProps {
  className?: string;
  text: string;
  path: string;
  icon: string;
  active?: boolean;
}

const DashboardLink = (props: DashboardLinkProps) => {
  return (
    <React.Fragment>
      <div
        className={`dashboard__link ${
          props.active ? "dashboard__link__active" : ""
        }`}
      >
        <div className="dashboard__link__img__container">
          <img
            className="dashboard__link__img"
            src={props.icon}
            alt={`${props.text}__icon`}
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
