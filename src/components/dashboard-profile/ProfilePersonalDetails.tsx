import { useState } from "react";
import { convertTimestampToDateTime } from "../../utils/datetimeutils";
import KVPair from "../KVPair/KVPair";
import InternalLoader from "../loader/internal-loader/InternalLoader";

const ProfilePersonalDetails = (props: ProfilePersonalDetailsProps) => {
  const [loadingImage, setLoadingImage] = useState<boolean>(true);

  return (
    <div className="personal__details__section">
      <div className="profile__picture__container">
        <div className="profile__picture">
          {loadingImage ? (
            <div
              style={{
                padding: "2.4rem",
              }}
            >
              <InternalLoader />
            </div>
          ) : null}
          <img
            src={props.profilePicture}
            onLoad={() => setLoadingImage(false)}
            alt={`${props.name} profile`}
            style={{
              display: loadingImage ? "none" : "block",
            }}
          ></img>
        </div>
      </div>

      <div className="bio__container">{props.bio}</div>

      <KVPair
        _key="Name"
        value={props.name}
        style={{
          width: "100%",
          height: "4rem",
        }}
      />

      <KVPair
        _key="Email"
        value={props.email!}
        style={{
          width: "100%",
          height: "4rem",
        }}
      />

      <KVPair
        _key="Phone"
        value={props.phone}
        style={{
          width: "100%",
          height: "4rem",
        }}
      />

      <KVPair
        _key="Joined on"
        value={convertTimestampToDateTime(props.createdAt!)}
        style={{
          width: "100%",
          height: "4rem",
        }}
      />
    </div>
  );
};

export default ProfilePersonalDetails;
