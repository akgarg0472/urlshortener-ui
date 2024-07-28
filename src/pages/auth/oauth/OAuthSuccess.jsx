import React from "react";
import { useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  if (window.opener) {
    window.opener.postMessage(
      { type: "oauth2_auth_success_response", params: queryParams },
      "*"
    );
  }

  setTimeout(() => {
    window.close();
  }, 10);

  return <React.Fragment></React.Fragment>;
};

export default OAuthSuccess;
