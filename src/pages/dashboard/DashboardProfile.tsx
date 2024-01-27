import React, { useEffect, useState } from "react";
import DashboardStatsHeading from "../../components/DashboardStatsHeading/DashboardStatsHeading";
import KVPair from "../../components/KVPair/KVPair";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";
import {
  DASH_PROFILE_HEAD,
  DASH_PROFILE_SUBHEAD,
  LOGIN_URL,
} from "../../constants";
import { getProfile } from "../../api/user";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Modal from "../../components/modal/Modal";
import { ModalIcon } from "../../components/modal/Modal.enums";
import { convertTimestampToDateTime } from "../../utils/datetimeutils";

import ProfileChangePassword from "../../components/dashboard-profile/ProfileChangePassword";
import ProfileDeleteAccount from "../../components/dashboard-profile/ProfileDeleteAccount";
import ProfileAccountInformation from "../../components/dashboard-profile/ProfileAccountInformation";
import ProfileAddressInformation from "../../components/dashboard-profile/ProfileAddressInformation";

import "./Dashboard.css";
import ProfilePersonalDetails from "../../components/dashboard-profile/ProfilePersonalDetails";

const DashboardProfile = () => {
  const { logout, getUserId } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<ProfileData>({
    id: "",
    profilePicture: process.env.REACT_APP_DEFAULT_PROFILE_PICTURE!!,
    name: "",
    bio: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    businessDetails: "",
  });

  useEffect(() => {
    document.title = "Profile";
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const userId = getUserId();

    if (!userId) {
      logout();
      navigate(LOGIN_URL, { replace: true });
      return;
    }

    const profile = await getProfile(userId);

    setLoading(false);

    if (profile.httpCode === 401 || profile.httpCode === 403) {
      logout();
      navigate("/login", { replace: true });
      return;
    }

    if (!profile.success) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        title: `Error ${profile?.httpCode}`,
        message: profile?.message,
      });
      return;
    }

    setProfileData({
      id: profile.id!!,
      email: profile.email,
      profilePicture: profile.profile_picture
        ? profile.profile_picture
        : process.env.REACT_APP_DEFAULT_PROFILE_PICTURE!!,
      name: profile.name ? profile.name : "",
      bio: profile.bio ? profile.bio : "",
      phone: profile.phone ? profile.phone : "",
      city: profile.city ? profile.city : "",
      state: profile.state ? profile.state : "",
      country: profile.country ? profile.country : "",
      zipcode: profile.zipcode ? profile.zipcode : "",
      businessDetails: profile.business_details ? profile.business_details : "",
      lastLogin: profile.last_login,
      createdAt: profile.created_at,
    });
  };

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <DashboardHeadSubHead
            heading={DASH_PROFILE_HEAD}
            subheading={DASH_PROFILE_SUBHEAD}
          />

          <div
            className="profile__page__content__container"
            style={{
              paddingBottom: "3.2rem",
              marginTop: "2.4rem",
            }}
          >
            <div className="profile__page__left__section">
              <ProfilePersonalDetails
                name={profileData.name}
                bio={profileData.bio}
                phone={profileData.phone}
                profilePicture={profileData.profilePicture}
                createdAt={profileData.createdAt}
                email={profileData.email}
              />
            </div>

            <div className="profile__page__right__section">
              <div className="personal__details__section">
                <DashboardStatsHeading heading="Address Details" />

                {loading ? (
                  <InternalLoader />
                ) : (
                  <ProfileAddressInformation
                    city={profileData.city}
                    state={profileData.state}
                    zipcode={profileData.zipcode}
                    country={profileData.country}
                  />
                )}
              </div>

              <div className="account__information__section ">
                <DashboardStatsHeading heading="Account Information" />

                {loading ? (
                  <InternalLoader />
                ) : (
                  <ProfileAccountInformation
                    lastLogin={profileData.lastLogin}
                    lastPasswordChangedAt={profileData.lastPasswordChangedAt}
                    premiumAccount={profileData.premiumAccount}
                  />
                )}
              </div>

              <ProfileChangePassword />

              <ProfileDeleteAccount />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardProfile;
