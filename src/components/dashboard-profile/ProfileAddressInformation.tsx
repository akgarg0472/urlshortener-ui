import React from "react";
import PersonalDetailsReadOnlyIF from "../PersonalDetailsReadonlyIF/PersonalDetailsReadOnlyIF";

const ProfileAddressInformation = (props: PersonalDetailsProps) => {
  return (
    <div className="personal__details__section__content">
      <PersonalDetailsReadOnlyIF
        text={props.city}
        id="personal__details__section__content__city"
        title="City"
      />

      <PersonalDetailsReadOnlyIF
        text={props.state}
        id="personal__details__section__content__city"
        title="State"
      />

      <PersonalDetailsReadOnlyIF
        text={props.zipcode}
        id="personal__details__section__content__city"
        title="Zipcode"
      />

      <PersonalDetailsReadOnlyIF
        text={props.country}
        id="personal__details__section__content__country"
        title="Country"
      />
    </div>
  );
};

export default ProfileAddressInformation;
