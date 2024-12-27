import React from "react";
import { useSearchParams } from "react-router-dom";
import { OAUTH_SUCCESS_RESPONSE_KEY } from "../../../constants";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  if (queryParams.code) {
    localStorage.setItem(
      OAUTH_SUCCESS_RESPONSE_KEY,
      JSON.stringify(queryParams)
    );
  } else {
    localStorage.setItem(
      OAUTH_SUCCESS_RESPONSE_KEY,
      JSON.stringify({
        error: "No auth code received from Google",
      })
    );
  }

  window.close();

  return <React.Fragment></React.Fragment>;
};

export default OAuthSuccess;
