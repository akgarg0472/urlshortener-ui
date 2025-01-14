import React from "react";

import "./NoDataAvailable.css";

const NoDataAvailable = (props: { text?: string }) => {
  return (
    <React.Fragment>
      <div className="no__data__available">
        {props.text ?? "No Data Available"}
      </div>
    </React.Fragment>
  );
};

export default NoDataAvailable;
