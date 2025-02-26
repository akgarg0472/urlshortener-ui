import { AlignJustify } from "lucide-react";
import { SIDEBAR_NAVBAR_TOGGLE_DISPLAY_CLASS } from "../../../constants";

import "./SidebarToggleButton.css";

export const SidebarToggleButton = () => {
  const toggleSidebar = () => {
    (
      document.querySelector(".dashboard__navbar") as HTMLElement
    )?.classList.toggle(SIDEBAR_NAVBAR_TOGGLE_DISPLAY_CLASS);
  };

  return (
    <div className="navbar__sidebar__toggle">
      <AlignJustify onClick={toggleSidebar} />
    </div>
  );
};
