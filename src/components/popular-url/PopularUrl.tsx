import React from "react";

import "./PopularUrl.css";

const PopularUrl = (props: {
  shortUrl: string;
  originalUrl: string;
  hitsCount: number;
  seqNumber: number;
}) => {
  return (
    <React.Fragment>
      <div className="popular__url__container">
        <div className="left__section">
          <div className="seq__number">{props.seqNumber}.</div>

          <div className="urls">
            <span>{props.shortUrl}</span>
            <span title={props.originalUrl}>{props.originalUrl}</span>
          </div>
        </div>

        <div className="clicks">
          <span>Clicks</span>
          <span>{props.hitsCount}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PopularUrl;
