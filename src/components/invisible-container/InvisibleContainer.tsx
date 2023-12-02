import React from "react";

const InvisibleContainer = () => {
  return (
    <React.Fragment>
      <hr
        style={{
          visibility: "hidden",
        }}
      ></hr>
    </React.Fragment>
  );
};

export default InvisibleContainer;
