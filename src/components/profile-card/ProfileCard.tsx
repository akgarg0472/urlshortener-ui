import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {
  DASH_PROFILE_DEFAULT_BIO,
  DASH_PROFILE_DEFAULT_EMAIL,
  DASH_PROFILE_DEFAULT_GITHUB,
  DASH_PROFILE_DEFAULT_INSTAGRAM,
  DASH_PROFILE_DEFAULT_LOCATION,
  DASH_PROFILE_DEFAULT_TWITTER,
  DASH_PROFILE_DEFAULT_USERNAME,
} from "../../api.constants";
import InternalLoader from "../loader/internal-loader/InternalLoader";
import "./ProfileCard.css";
import ProfileCardIconLink from "./ProfileCardIconLink/ProfileCardIconLink";

const ProfileCard = () => {
  const { getUserId } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState(
    "/assets/icons/john-doe.png"
  );
  const [username, setUsername] = useState(DASH_PROFILE_DEFAULT_USERNAME);
  const [bio, setBio] = useState(DASH_PROFILE_DEFAULT_BIO);
  const [email, setEmail] = useState(DASH_PROFILE_DEFAULT_EMAIL);
  const [location, setLocation] = useState(DASH_PROFILE_DEFAULT_LOCATION);
  const [github, setGithub] = useState(DASH_PROFILE_DEFAULT_GITHUB);
  const [instagram, setInstagram] = useState(DASH_PROFILE_DEFAULT_INSTAGRAM);
  const [twitter, setTwitter] = useState(DASH_PROFILE_DEFAULT_TWITTER);

  const updateProfilePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Updating profile picture");
  };

  const updateLocation = async (value: string) => {
    console.log("Updating address to: ", value);

    return new Promise(function (resolve) {
      setTimeout(resolve, 2000);
    });
  };

  const updateGithub = async (value: string) => {
    console.log("Updating github to: ", value);
    return new Promise(function (resolve) {
      setTimeout(resolve, 2000);
    });
  };

  const updateInstagram = async (value: string) => {
    console.log("Updating instagram to: ", value);
    return new Promise(function (resolve) {
      setTimeout(resolve, 2000);
    });
  };

  const updateTwitter = async (value: string) => {
    console.log("Updating twitter to: ", value);
    return new Promise(function (resolve) {
      setTimeout(resolve, 2000);
    });
  };

  return (
    <React.Fragment>
      <div className="profile__card__container">
        {isLoading ? (
          <InternalLoader />
        ) : (
          <React.Fragment>
            <div className="profile__picture__container">
              <img src={profilePicture} alt="profile" />
            </div>

            <div className="user__id__container">@{username}</div>

            <div className="user__bio__container">{bio}</div>

            <ProfileCardIconLink
              icon="/assets/icons/email.png"
              id="email"
              key="email__profile__icon__key"
              text={email}
              link={`mailto:${email}`}
            />

            <ProfileCardIconLink
              icon="/assets/icons/location.png"
              id="location"
              key="location__icon__key"
              text={location}
              onChange={updateLocation}
            />

            <ProfileCardIconLink
              icon="/assets/icons/github.png"
              id="github"
              key="github__profile__icon__key"
              text={github}
              link={`https://www.github.com/${github}`}
              onChange={updateGithub}
            />

            <ProfileCardIconLink
              icon="/assets/icons/instagram.png"
              id="instagram"
              key="instagram__profile__icon__key"
              text={instagram}
              link={`https://www.instagram.com/${instagram}`}
              onChange={updateInstagram}
            />

            <ProfileCardIconLink
              icon="/assets/icons/twitter.png"
              id="twitter"
              key="twitter__profile__icon__key"
              text={twitter}
              link={`https://www.twitter.com/${twitter}`}
              onChange={updateTwitter}
            />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProfileCard;
