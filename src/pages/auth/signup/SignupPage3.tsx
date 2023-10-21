import React from "react";
import KVPair from "../../../components/KVPair/KVPair";

interface SignupPage3Props {
  firstName: string;
  lastName: string;
  email: string;
  businessDetails: string;
  phoneNumber: string;
  address: string;
}

const SignupPage3 = (props: SignupPage3Props) => {
  return (
    <React.Fragment>
      <KVPair _key="First Name" value={props.firstName} />
      <KVPair _key="Last Name" value={props.lastName} />
      <KVPair _key="Email" value={props.email} />
      <KVPair _key="Business Details" value={props.businessDetails} />
      <KVPair _key="Phone Number" value={props.phoneNumber} />
      <KVPair _key="Address" value={props.address} />
    </React.Fragment>
  );
};

export default SignupPage3;
