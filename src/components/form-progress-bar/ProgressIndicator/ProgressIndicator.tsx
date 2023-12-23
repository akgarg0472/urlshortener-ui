import React from "react";
import "./ProgressIndicator.css";

const ProgressIndicator = (props: ProgressIndicatorProps) => {
  return (
    <React.Fragment>
      <div className="progress__indicator">
        <div className="progress__indicator__upper__section">
          <div
            className={`progress__indicator__bar ${
              props.fill ? "progress__indicator__filled__bar" : ""
            }`}
            style={{
              visibility: props.renderLeftLine ? "visible" : "hidden",
            }}
          ></div>

          <div
            className={`progress__number__circle ${
              props.fill ? "progress__filled__number__circle" : ""
            }`}
          >
            {props.number}
          </div>

          <div
            className={`progress__indicator__bar ${
              props.fill && props.fillRightLine
                ? "progress__indicator__filled__bar"
                : ""
            }`}
            style={{
              visibility: props.renderRightLine ? "visible" : "hidden",
            }}
          ></div>
        </div>

        <div
          className={`progress__indicator__title ${
            props.fill ? "progress__indicator__title__filled" : ""
          }  ${
            props.isHighlighed
              ? "progress__indicator__title__filled__highlighed"
              : ""
          }  `}
        >
          {props.title}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProgressIndicator;
