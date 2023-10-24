import React from "react";
import "./InternalLoader.css";

interface InternalLoaderProps {
  speed?: LoaderSpeed;
  size?: LoaderSize;
}

export enum LoaderSize {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
}

export enum LoaderSpeed {
  FAST = 1,
  MEDIUM = 2,
  SLOW = 3,
}

const getLoaderSize = (size?: LoaderSize): string => {
  switch (size) {
    case LoaderSize.SMALL:
      return "internal__loader__small";
    case LoaderSize.MEDIUM:
      return "internal__loader__medium";
    case LoaderSize.LARGE:
      return "internal__loader__large";
  }

  return "internal__loader__medium";
};

const getLoaderSpeed = (speed?: LoaderSpeed): string => {
  switch (speed) {
    case LoaderSpeed.FAST:
      return "internal__loader__fast";
    case LoaderSpeed.MEDIUM:
      return "internal__loader__medium";
    case LoaderSpeed.SLOW:
      return "internal__loader__slow";
  }

  return "internal__loader__medium";
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
