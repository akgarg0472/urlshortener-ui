import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doLogout } from "../../api/auth/auth";
import useAuth from "../../hooks/useAuth";
import { dashboardNavbarLinks } from "../../utils/data";
import LinkButton from "../button/LinkButton";
import RegularButton from "../button/RegularButton";
import CreateUrlModal from "../create-url-modal/CreateUrlModal";
import Modal from "../modal/Modal";
import { ModalIcon } from "../modal/Modal.enums";
import DashboardLink from "./dashboard-link/DashboardLink";

import { LogoutApiResponse } from "../../api/auth/auth.api.response";
import "./DashboardNavbar.css";

const DashboardNavbar = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { getAuth, logout } = useAuth();

  const [showCreateNewLinkModal, setShowCreateNewLinkModal] = useState(false);

  const handleLogout = async () => {
    const logoutApiResponse: LogoutApiResponse = await doLogout({
      authToken: getAuth()!.authToken!,
      userId: getAuth()!.userId!,
    });

    if (logoutApiResponse.success) {
      logout();
      navigation("/", {
        replace: true,
      });
    }
  };

  const handleLogoutIconClick = () => {
    Modal.showModal({
      title: "Logout",
      message: "Are you sure you want to logout?",
      icon: ModalIcon.CONFIRMATION,
      confirmText: "Yes, Logout",
      cancelText: "No",
      onConfirm: handleLogout,
    });
  };

  return (
    <React.Fragment>
      {showCreateNewLinkModal ? (
        <CreateUrlModal onClose={() => setShowCreateNewLinkModal(false)} />
      ) : null}

      <div className="dashboard__navbar">
        <div
          style={{
            width: "100%",
          }}
        >
          <LinkButton
            className="heading__logo"
            text="URLShortener 🔗"
            referrerPolicy="no-referrer"
            onClickLink="/"
          />

          <RegularButton
            className="create__new__link__btn"
            content="Create New Link"
            onClick={() => setShowCreateNewLinkModal(true)}
          />

          <div className="dashboard__navbar__links__container">
            {dashboardNavbarLinks.map((link) => {
              return (
                <DashboardLink
                  className="dashboard__navbar__link"
                  text={link.text}
                  path={link.path}
                  icon={link.icon}
                  active={location.pathname === link.path}
                  key={link.text}
                />
              );
            })}
          </div>
        </div>

        <div className="dashboard__navbar__bottom__btns__container">
          <div className="btn__img__container">
            <img
              src="/assets/icons/settings.png"
              alt="navbar__settings__icon"
            />
          </div>

          <div className="btn__img__container" onClick={handleLogoutIconClick}>
            <img src="/assets/icons/logout.png" alt="navbar__logout__icon" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardNavbar;
