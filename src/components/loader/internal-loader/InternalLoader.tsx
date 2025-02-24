import React from "react";
import { InternalLoaderSize, InternalLoaderSpeed } from "../Loader.enums";
import "./InternalLoader.css";

const getLoaderSize = (size?: InternalLoaderSize): string => {
  switch (size) {
    case InternalLoaderSize.EXTRA_SMALL:
      return "internal__loader__size__extra__small";
    case InternalLoaderSize.SMALL:
      return "internal__loader__size__small";
    case InternalLoaderSize.MEDIUM:
      return "internal__loader__size__medium";
    case InternalLoaderSize.LARGE:
      return "internal__loader__size__large";
  }

  return "internal__loader__size__medium";
};

const getLoaderSpeed = (speed?: InternalLoaderSpeed): string => {
  switch (speed) {
    case InternalLoaderSpeed.FAST:
      return "internal__loader__speed__fast";
    case InternalLoaderSpeed.MEDIUM:
      return "internal__loader__speed__medium";
    case InternalLoaderSpeed.SLOW:
      return "internal__loader__speed__slow";
  }

  return "internal__loader__speed__medium";
};

const InternalLoader = (props: InternalLoaderProps) => {
  return (
    <React.Fragment>
      <div className="internal__loader__container">
        <span
          className={`internal__loader ${getLoaderSize(
            props.size
          )} ${getLoaderSpeed(props.speed)}`}
        ></span>
      </div>
    </React.Fragment>
  );
};

export default InternalLoader;
