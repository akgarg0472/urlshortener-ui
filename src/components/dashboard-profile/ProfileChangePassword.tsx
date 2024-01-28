import React from "react";
import HorizontalInputField from "../inputfield/HorizontalInputField";
import DashboardStatsHeading from "../DashboardStatsHeading/DashboardStatsHeading";
import { validChangePasswordReq } from "../../utils/validationutils";
import { updatePassword } from "../../api/user/user";
import useAuth from "../../hooks/useAuth";
import { ModalIcon } from "../modal/Modal.enums";
import Modal from "../modal/Modal";
import RegularButton from "../button/RegularButton";

const ProfileChangePassword = () => {
  const { getUserId } = useAuth();

  const [changePasswordFields, setChangePasswordFields] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [disableChangePasswordButton, setDisableChangePasswordButton] =
    React.useState<boolean>(false);

  const handleChangePasswordButtonClick = async (event: React.MouseEvent) => {
    if (validChangePasswordReq(changePasswordFields)) {
      setDisableChangePasswordButton(true);

      const changePassReq = {
        currentPassword: changePasswordFields.currentPassword,
        newPassword: changePasswordFields.newPassword,
        confirmPassword: changePasswordFields.confirmNewPassword,
      };

      const updatePassResp = await updatePassword(getUserId()!!, changePassReq);

      setDisableChangePasswordButton(false);

      if (!updatePassResp.success) {
        Modal.showModal({
          icon: ModalIcon.ERROR,
          title: `Error ${updatePassResp?.httpCode}`,
          message: updatePassResp?.message,
        });
        return;
      }

      Modal.showModal({
        icon: ModalIcon.SUCCESS,
        message: updatePassResp?.message,
      });

      setChangePasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  };

  return (
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
          isDisabled={disableChangePasswordButton}
        />
      </div>
    </div>
  );
};

export default ProfileChangePassword;
