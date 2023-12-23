import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface ProtectedRouteProps {
  element: JSX.Element;
  redirectTo: string;
}

const ProtectedRoute = ({
  element,
  redirectTo,
}: ProtectedRouteProps): JSX.Element => {
  const { getAuthenticated } = useAuth();

  if (!getAuthenticated()) {
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace={true} />;
  }

  return element;
};

export default ProtectedRoute;
