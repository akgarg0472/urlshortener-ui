import { convertTimestampToDateTime } from "../../utils/datetimeutils";
import KVPair from "../KVPair/KVPair";

const ProfilePersonalDetails = (props: ProfilePersonalDetailsProps) => {
  return (
    <div className="personal__details__section">
      <div className="profile__picture">
        <img src={props.profilePicture} alt={`${props.name} profile`} />
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
