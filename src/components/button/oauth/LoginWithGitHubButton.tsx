import React from "react";
import "./LoginWithGitHubButton.css";
import "./BaseOauthButton.css";

const LoginWithGitHubButton = (props: {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      type="button"
      className="github_login_button oauth_button"
      onClick={props.onClickHandler}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="github_logo"
        width="20"
        height="20"
      >
        <path d="M8 0a8 8 0 0 0-2.55 15.6c.4.074.55-.175.55-.39v-1.468c-2.278.496-2.758-1.099-2.758-1.099-.372-.938-.91-1.188-.91-1.188-.743-.507.056-.497.056-.497.824.057 1.255.847 1.255.847.731 1.247 1.918.887 2.39.679.074-.527.287-.887.522-1.091-1.741-.2-3.565-.871-3.565-3.88 0-.858.308-1.56.815-2.113-.082-.2-.353-1.014.077-2.11 0 0 .665-.213 2.19.81A7.56 7.56 0 0 1 8 3.795a7.56 7.56 0 0 1 2.097.287c1.524-1.022 2.189-.81 2.189-.81.43 1.096.16 1.91.078 2.11.507.553.815 1.255.815 2.113 0 3.016-1.826 3.68-3.572 3.88.295.254.56.755.56 1.55v2.312c0 .217.15.468.56.39A8 8 0 0 0 8 0z" />
      </svg>
      Login with GitHub
    </button>
  );
};

export default LoginWithGitHubButton;
