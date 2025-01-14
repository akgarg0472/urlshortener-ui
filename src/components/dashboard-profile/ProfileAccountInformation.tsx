import React from "react";
import { convertTimestampToDateTime } from "../../utils/datetimeutils";
import KVPair from "../KVPair/KVPair";

const ProfileAccountInformation = (props: ProfileData) => {
  return (
    <React.Fragment>
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
        _key="Account Updated On"
        value={
          props.updatedAt ? convertTimestampToDateTime(props.updatedAt) : "-"
        }
        style={{
          width: "100%",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      />

      <KVPair
        _key="Last Password Update On"
        value={
          props.lastPasswordChangedAt
            ? convertTimestampToDateTime(props.lastPasswordChangedAt)
            : ""
        }
        style={{
          width: "100%",
        }}
      />
    </React.Fragment>
  );
};

export default ProfileAccountInformation;
