import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../api/user/user";
import { LOGIN_URL } from "../../constants";
import useAuth from "../../hooks/useAuth";
import DashboardStatsHeading from "../DashboardStatsHeading/DashboardStatsHeading";
import RegularButton from "../button/RegularButton";
import Modal from "../modal/Modal";
import { ModalIcon } from "../modal/Modal.enums";

const ProfileDeleteAccount = () => {
  const [disableDeleteBtn, setDisableDeleteBtn] =
    React.useState<boolean>(false);

  const { getUserId, getAuthToken, logout } = useAuth();
  const navigate = useNavigate();

  const handleAccountDeleteButton = async () => {
    const userId = getUserId();
    const authToken = getAuthToken();

    if (!userId || !authToken) {
      logout();
      navigate(LOGIN_URL, { replace: true });
      return;
    }

    setDisableDeleteBtn(true);

    const deleteResp = await deleteProfile(userId, authToken);

    setDisableDeleteBtn(false);

    if (!deleteResp.success) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        title: `Error ${deleteResp?.httpCode}`,
        message: deleteResp?.message,
      });
    } else {
      Modal.showModal({
        icon: ModalIcon.SUCCESS,
        message: deleteResp?.message,
        onClose() {
          logout();
          navigate("/", { replace: true });
        },
      });
    }
  };

  return (
    <div className="danger__zone__section">
      <DashboardStatsHeading
        heading="Danger Zone"
        className="danger__zone__heading"
      />

      <div className="danger__zone__section__content">
        <div className="headings__section">
          <div className="heading">Delete This Account</div>
          <div className="subheading">
            Once you delete your account, there is no going back. Please be
            certain about you know what you are doing.
          </div>
        </div>

        <RegularButton
          className="delete__account__btn"
          content="Delete Account"
          onClick={handleAccountDeleteButton}
          isDisabled={disableDeleteBtn}
        />
      </div>
    </div>
  );
};

export default ProfileDeleteAccount;
