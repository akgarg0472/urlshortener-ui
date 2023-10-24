import React from "react";
import "./URLMetadata.css";

interface URLMetadataProps {
  title: string;
  value: string | number;
}

const URLMetadata = (props: URLMetadataProps) => {
  return (
    <React.Fragment>
      <div className="summ_url__metadata__container">
        <div className="title">{props.title}</div>
        <div className="value" title={props.value.toString()}>
          {props.value}
        </div>
      </div>
    </React.Fragment>
  );
};

export default URLMetadata;
