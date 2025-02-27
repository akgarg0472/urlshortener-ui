import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doLogout } from "../../api/auth/auth";
import { LogoutApiResponse } from "../../api/auth/auth.api.response";
import useAuth from "../../hooks/useAuth";
import { dashboardNavbarLinks } from "../../utils/data";
import LinkButton from "../button/LinkButton";
import RegularButton from "../button/RegularButton";
import CreateUrlModal from "../create-url-modal/CreateUrlModal";
import Modal from "../modal/Modal";
import { ModalIcon } from "../modal/Modal.enums";
import DashboardLink from "./dashboard-link/DashboardLink";
import { SIDEBAR_NAVBAR_TOGGLE_DISPLAY_CLASS } from "../../constants";

import "./DashboardNavbar.css";

const DashboardNavbar = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { getAuth, logout } = useAuth();
  const [showCreateNewLinkModal, setShowCreateNewLinkModal] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleMouseClickOutsideNavbar = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).classList.contains(
        SIDEBAR_NAVBAR_TOGGLE_DISPLAY_CLASS
      )
    ) {
      sidebarRef.current.classList.remove(SIDEBAR_NAVBAR_TOGGLE_DISPLAY_CLASS);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseClickOutsideNavbar);
    return () => {
      document.removeEventListener("mousedown", handleMouseClickOutsideNavbar);
    };
  }, []);

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

      <div className="dashboard__navbar" ref={sidebarRef}>
        <div
          style={{
            width: "100%",
          }}
        >
          <LinkButton
            className="heading__logo"
            text="Cmpct 🔗"
            referrerPolicy="no-referrer"
            onClickLink="/"
          />

          <RegularButton
            className="create__new__link__btn"
            content="Create New Link"
            onClick={() => {
              sidebarRef?.current?.classList.remove(
                SIDEBAR_NAVBAR_TOGGLE_DISPLAY_CLASS
              );
              setShowCreateNewLinkModal(true);
            }}
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
