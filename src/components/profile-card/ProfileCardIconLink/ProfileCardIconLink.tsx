import React from "react";
import LinkButton from "../../button/LinkButton";
import "./ProfileCardIconLink.css";

interface ProfileCardIconLinkProps {
  id: string;
  icon: string;
  link?: string;
  text: string;
  onChange?: (value: string) => Promise<any>;
}

const ProfileCardIconLink = (props: ProfileCardIconLinkProps) => {
  return (
    <React.Fragment>
      <div className="profile__card__icon__link__container">
        <div className="content__container">
          <div className="profile__card__icon__link__icon">
            <img src={props.icon} alt={`${props.id}_icon`} />
          </div>

          <div className="profile__card__icon__link">
            {props.link ? (
              <LinkButton
                onClickLink={props.link}
                key={props.id}
                target="_blank"
                text={props.text}
                referrerPolicy="no-referrer"
              />
            ) : (
              <React.Fragment>{props.text}</React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileCardIconLink;
