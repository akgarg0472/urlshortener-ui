import React from "react";
import "./InternalLoader.css";

interface InternalLoaderProps {
  speed?: LoaderSpeed;
  size?: LoaderSize;
}

export enum LoaderSize {
  EXTRA_SMALL = 0,
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
    case LoaderSize.EXTRA_SMALL:
      return "internal__loader__size__extra__small";
    case LoaderSize.SMALL:
      return "internal__loader__size__small";
    case LoaderSize.MEDIUM:
      return "internal__loader__size__medium";
    case LoaderSize.LARGE:
      return "internal__loader__size__large";
  }

  return "internal__loader__size__medium";
};

const getLoaderSpeed = (speed?: LoaderSpeed): string => {
  switch (speed) {
    case LoaderSpeed.FAST:
      return "internal__loader__speed__fast";
    case LoaderSpeed.MEDIUM:
      return "internal__loader__speed__medium";
    case LoaderSpeed.SLOW:
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
