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
        <span className="title">{props.title}</span>
        <span className="value" title={props.value.toString()}>
          {props.value}
        </span>
      </div>
    </React.Fragment>
  );
};

export default URLMetadata;
