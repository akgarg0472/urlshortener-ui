import React, { useEffect } from "react";
import DashboardStatsHeading from "../../components/DashboardStatsHeading/DashboardStatsHeading";
import KVPair from "../../components/KVPair/KVPair";
import PersonalDetailsReadOnlyIF from "../../components/PersonalDetailsReadonlyIF/PersonalDetailsReadOnlyIF";
import RegularButton from "../../components/button/RegularButton";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import HorizontalInputField from "../../components/inputfield/HorizontalInputField";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";
import ProfileCard from "../../components/profile-card/ProfileCard";
import { DASH_PROFILE_HEAD, DASH_PROFILE_SUBHEAD } from "../../api.constants";
import "./Dashboard.css";

const DashboardProfile = () => {
  useEffect(() => {
    document.title = "Profile";

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [firstName, setFirstName] = React.useState<string>("John");
  const [lastName, setLastName] = React.useState<string>("Doe");
  const [gender, setGender] = React.useState<string>("Male");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("+1 1234567890");
  const [city, setCity] = React.useState<string>("New York");
  const [country, setCountry] = React.useState<string>("United States");
  const [loading, setLoading] = React.useState<boolean>(true);

  const [changePasswordFields, setChangePasswordFields] = React.useState<{
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChangePasswordButtonClick = (event: React.MouseEvent) => {
    console.log("changing password", JSON.stringify(changePasswordFields));
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
              <ProfileCard />
            </div>

            <div className="profile__page__right__section">
              <div className="personal__details__section">
                <DashboardStatsHeading heading="Personal Details" />

                {loading ? (
                  <InternalLoader />
                ) : (
                  <div className="personal__details__section__content">
                    <PersonalDetailsReadOnlyIF
                      text={firstName}
                      id="personal__details__section__content__first__name"
                      title="First Name"
                    />
                    <PersonalDetailsReadOnlyIF
                      text={lastName}
                      id="personal__details__section__content__last__name"
                      title="Last Name"
                    />
                    <PersonalDetailsReadOnlyIF
                      text={gender}
                      id="personal__details__section__content__gender"
                      title="Gender"
                    />

                    <PersonalDetailsReadOnlyIF
                      text={phoneNumber}
                      id="personal__details__section__content__phone__number"
                      title="Phone Number"
                    />

                    <PersonalDetailsReadOnlyIF
                      text={city}
                      id="personal__details__section__content__city"
                      title="City"
                    />

                    <PersonalDetailsReadOnlyIF
                      text={country}
                      id="personal__details__section__content__country"
                      title="Country"
                    />
                  </div>
                )}
              </div>

              <div className="account__information__section ">
                <DashboardStatsHeading heading="Account Information" />

                {loading ? (
                  <InternalLoader />
                ) : (
                  <React.Fragment>
                    <KVPair
                      _key="Last Login"
                      value="03-Nov-2023, 11:25 PM"
                      style={{
                        width: "100%",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                      }}
                    />

                    <KVPair
                      _key="Password Changed"
                      value="02-Nov-2023, 10:08 AM"
                      style={{
                        width: "100%",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                      }}
                    />

                    <KVPair
                      _key="Email Verified"
                      value="Verified"
                      style={{
                        width: "100%",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                      }}
                      icon="/assets/icons/verified.png"
                    />

                    <KVPair
                      _key="Premium Account"
                      value="No"
                      style={{
                        width: "100%",
                      }}
                    />
                  </React.Fragment>
                )}
              </div>

              <div className="change__password__section">
                <DashboardStatsHeading heading="Change Password" />

                <div className="change__password__section__content">
                  <HorizontalInputField
                    id="dashboard__profile__change__password__current__password"
                    text={changePasswordFields.currentPassword}
                    type="password"
                    onChange={(e) => {
                      setChangePasswordFields({
                        ...changePasswordFields,
                        currentPassword: e.target.value,
                      });
                    }}
                    title="Current Password"
                    isRequired={true}
                    style={{
                      width: "100%",
                    }}
                  />

                  <HorizontalInputField
                    id="dashboard__profile__change__password__new__password"
                    text={changePasswordFields.newPassword}
                    type="password"
                    onChange={(e) => {
                      setChangePasswordFields({
                        ...changePasswordFields,
                        newPassword: e.target.value,
                      });
                    }}
                    title="New Password"
                    isRequired={true}
                    style={{
                      width: "100%",
                    }}
                  />

                  <HorizontalInputField
                    id="dashboard__profile__change__password__confirm__new__password"
                    text={changePasswordFields.confirmNewPassword}
                    type="password"
                    onChange={(e) => {
                      setChangePasswordFields({
                        ...changePasswordFields,
                        confirmNewPassword: e.target.value,
                      });
                    }}
                    title="Confirm New Password"
                    isRequired={true}
                    style={{
                      width: "100%",
                    }}
                  />

                  <RegularButton
                    className="change__password__btn"
                    content={"Change Password"}
                    onClick={handleChangePasswordButtonClick}
                  />
                </div>
              </div>

              <div className="danger__zone__section">
                <DashboardStatsHeading
                  heading="Danger Zone"
                  className="danger__zone__heading"
                />

                <div className="danger__zone__section__content">
                  <div className="headings__section">
                    <div className="heading">Delete This Account</div>
                    <div className="subheading">
                      Once you delete your account, there is no going back.
                      Please be certain about you know what you are doing.
                    </div>
                  </div>

                  <RegularButton
                    className="delete__account__btn"
                    content="Delete Account"
                    onClick={() => {
                      alert("Account deleted");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardProfile;
