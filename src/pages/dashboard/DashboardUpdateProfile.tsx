import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import {
  DASH_UPDATE_PROFILE_HEAD,
  DASH_UPDATE_PROFILE_SUBHEAD,
} from "../../constants";
import "./Dashboard.css";
import InputField from "../../components/inputfield/InputField";
import HorizontalInputField from "../../components/inputfield/HorizontalInputField";
import RegularButton from "../../components/button/RegularButton";
import { updateProfile } from "../../api/dashboard";

const DashboardUpdateProfile = () => {
  useEffect(() => {
    document.title = "Update Profile";
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const defaultProfileData: ProfileData = {
    profilePicture: "/assets/icons/john-doe.png",
    name: "",
    bio: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    businessDetails: "",
  };

  const [originalData, setOriginalData] =
    React.useState<ProfileData>(defaultProfileData);
  const [updatedData, setUpdatedData] =
    React.useState<ProfileData>(defaultProfileData);
  const [newProfilePicture, setNewProfilePicture] = React.useState<File>();

  const [loading, setLoading] = React.useState<boolean>(true);

  const profilePictureChooserBtnRef: React.RefObject<HTMLInputElement> =
    React.useRef(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.length == 1) {
      const file = files.item(0);

      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please select a valid image file.");
          return;
        }

        if (file.size > 1 * 1024 * 1024) {
          alert("File size should be below 1 MB.");
          return;
        }

        const fileReader = new FileReader();

        fileReader.onloadend = () => {
          const result = fileReader.result;

          if (result) {
            const imageData = result as string;
            updatedData.profilePicture = imageData;
            setNewProfilePicture(file);
          }
        };

        fileReader.readAsDataURL(file);
      }
    }
  };

  const handleProfileSubmitButtonClick = () => {
    const updateProfileRequest: UpdateProfileRequest = {
      profile_picture: newProfilePicture,
      name: updatedData.name,
      bio: updatedData.bio,
      phone: updatedData.phone,
      city: updatedData.city,
      state: updatedData.state,
      country: updatedData.country,
      zipcode: updatedData.zipcode,
      business_details: updatedData.businessDetails,
    };

    updateProfile("1", updateProfileRequest);
  };

  useEffect(() => {
    console.log("update profile re-rendered");

    setOriginalData({
      profilePicture: "/assets/icons/john-doe.png",
      name: "John Doe",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      phone: "+1 1234567890",
      city: "City",
      state: "State",
      country: "Country",
      zipcode: "12345",
      businessDetails: "This is lorem business details",
    });

    setUpdatedData(() => {
      return {
        ...originalData,
      };
    });
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <DashboardHeadSubHead
            heading={DASH_UPDATE_PROFILE_HEAD}
            subheading={DASH_UPDATE_PROFILE_SUBHEAD}
          />

          <div
            className="profile__page__content__container"
            style={{
              paddingBottom: "3.2rem",
              marginTop: "2.4rem",
            }}
          >
            <div className="update__profile__form">
              <div className="image__container">
                <img
                  className="update__profile__img"
                  src={updatedData.profilePicture}
                  alt="Profile Picture"
                />

                <div className="img__choooser">
                  <button
                    onClick={() => {
                      profilePictureChooserBtnRef.current?.click();
                    }}
                  >
                    Select Image
                  </button>
                </div>

                <input
                  className="update__profile__pic__select"
                  type="file"
                  accept="image/*"
                  ref={profilePictureChooserBtnRef}
                  onChange={handleImageFileChange}
                />
              </div>

              <InputField
                id="profile.name"
                text={updatedData.name}
                title="Name"
                type="text"
                className="update__profile__input__field"
                inputFieldStyle={{ height: "4rem" }}
                onChange={(e) => {
                  setUpdatedData((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  });
                }}
              />

              <InputField
                id="profile.bio"
                text={updatedData.bio}
                title="Bio"
                type="text"
                className="update__profile__input__field"
                inputFieldStyle={{ height: "4rem" }}
                onChange={(e) => {
                  setUpdatedData((prev) => {
                    return {
                      ...prev,
                      bio: e.target.value,
                    };
                  });
                }}
              />

              <InputField
                id="profile.phone"
                text={updatedData.phone}
                title="Phone"
                type="text"
                className="update__profile__input__field"
                inputFieldStyle={{ height: "4rem" }}
                onChange={(e) => {
                  setUpdatedData((prev) => {
                    return {
                      ...prev,
                      phone: e.target.value,
                    };
                  });
                }}
              />

              <InputField
                id="profile.city"
                text={updatedData.city}
                title="City"
                type="text"
                className="update__profile__input__field"
                inputFieldStyle={{ height: "4rem" }}
                onChange={(e) => {
                  setUpdatedData((prev) => {
                    return {
                      ...prev,
                      city: e.target.value,
                    };
                  });
                }}
              />

              <InputField
                id="profile.state"
                text={updatedData.state}
                title="State"
                type="text"
                className="update__profile__input__field"
                inputFieldStyle={{ height: "4rem" }}
                onChange={(e) => {
                  setUpdatedData((prev) => {
                    return {
                      ...prev,
                      state: e.target.value,
                    };
                  });
                }}
              />

              <InputField
                id="profile.country"
                text={updatedData.country}
                title="Country"
                type="text"
                className="update__profile__input__field"
                inputFieldStyle={{ height: "4rem" }}
                onChange={(e) => {
                  setUpdatedData((prev) => {
                    return {
                      ...prev,
                      country: e.target.value,
                    };
                  });
                }}
              />

              <InputField
                id="profile.zipcode"
                text={updatedData.zipcode}
                title="Zipcode"
                type="text"
                className="update__profile__input__field"
                inputFieldStyle={{ height: "4rem" }}
                onChange={(e) => {
                  setUpdatedData((prev) => {
                    return {
                      ...prev,
                      zipcode: e.target.value,
                    };
                  });
                }}
              />

              <InputField
                id="profile.business_details"
                text={updatedData.businessDetails}
                title="Business Details"
                type="text"
                className="update__profile__input__field"
                inputFieldStyle={{ height: "4rem" }}
                onChange={(e) => {
                  setUpdatedData((prev) => {
                    return {
                      ...prev,
                      businessDetails: e.target.value,
                    };
                  });
                }}
              />

              <RegularButton
                content="Update"
                className="update__form__btn"
                onClick={handleProfileSubmitButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardUpdateProfile;
