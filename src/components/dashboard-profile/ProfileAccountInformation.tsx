import React from "react";
import KVPair from "../KVPair/KVPair";
import { convertTimestampToDateTime } from "../../utils/datetimeutils";

const ProfileAccountInformation = (props: ProfileAccountInformationProps) => {
  return (
    <React.Fragment>
      <KVPair
        _key="Last Login At"
        value={
          props.lastLogin ? convertTimestampToDateTime(props.lastLogin) : ""
        }
        style={{
          width: "100%",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      />

      <KVPair
        _key="Last Password Changed At"
        value={
          props.lastPasswordChangedAt
            ? convertTimestampToDateTime(props.lastPasswordChangedAt)
            : ""
        }
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
        value={props.premiumAccount ? "True" : "No"}
        style={{
          width: "100%",
        }}
      />
    </React.Fragment>
  );
};

export default ProfileAccountInformation;
