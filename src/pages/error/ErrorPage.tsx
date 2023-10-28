import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return <div>error</div>;
};

export default ErrorPage;
