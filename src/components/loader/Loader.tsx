import "./Loader.css";

interface LoaderProps {
  speed?: LoaderSpeed;
}

export enum LoaderSpeed {
  SLOW = "slow",
  MEDIUM = "medium",
  HIGH = "high",
}

const Loader = () => {
  const loader__container__id = "url__shortener__loader__container";
  const loader__id = "url__shortener__loader";

  let loader: HTMLDivElement;

  const getModalSpeedClass = (props?: LoaderProps) => {
    if (props?.speed) {
      switch (props.speed) {
        case LoaderSpeed.SLOW:
          return "loader__slow";
        case LoaderSpeed.MEDIUM:
          return "loader__medium";
        case LoaderSpeed.HIGH:
          return "loader__high";
        default:
          return "loader__medium";
      }
    }

    return "loader__medium";
  };

  const createLoader = (props?: LoaderProps): HTMLDivElement => {
    loader = document.createElement("div");
    loader.classList.add("loader__overlay");
    loader.id = loader__container__id;

    loader.innerHTML = `
     <div class='loader ${getModalSpeedClass(props)}' id=${loader__id}/></div>`;

    return loader;
  };

  const showLoader = (props?: LoaderProps) => {
    const loader: HTMLDivElement = createLoader(props);
    document.body.appendChild(loader);
  };

  const hideLoader = () => {
    if (loader != null) {
      loader.remove();
    }
  };

  return { showLoader, hideLoader };
};

export default Loader();
