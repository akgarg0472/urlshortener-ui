import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../pages/auth/forgot-password/ForgotPassword";
import Login from "../pages/auth/login/Login";
import Signup from "../pages/auth/signup/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLinks from "../pages/dashboard/DashboardLinks";
import DashboardProfile from "../pages/dashboard/DashboardProfile";
import DashboardStatistics from "../pages/dashboard/DashboardStatistics";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/home/HomePage";
import {
  DASHBOARD_LINKS_URL,
  DASHBOARD_PROFILE_URL,
  DASHBOARD_STATISTICS_URL,
  DASHBOARD_URL,
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  RESET_PASSWORD_URL,
  SIGNUP_URL,
} from "../constants";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../pages/auth/reset-password/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: SIGNUP_URL,
    element: <Signup />,
  },
  {
    path: LOGIN_URL,
    element: <Login />,
  },
  {
    path: FORGOT_PASSWORD_URL,
    element: <ForgotPassword />,
  },
  {
    path: RESET_PASSWORD_URL,
    element: <ResetPassword />,
  },
  {
    path: DASHBOARD_URL,
    element: (
      <ProtectedRoute element={<Dashboard />} redirectTo={DASHBOARD_URL} />
    ),
  },
  {
    path: DASHBOARD_LINKS_URL,
    element: (
      <ProtectedRoute
        element={<DashboardLinks />}
        redirectTo={DASHBOARD_LINKS_URL}
      />
    ),
  },
  {
    path: DASHBOARD_STATISTICS_URL,
    element: (
      <ProtectedRoute
        element={<DashboardStatistics />}
        redirectTo={DASHBOARD_STATISTICS_URL}
      />
    ),
  },
  {
    path: DASHBOARD_PROFILE_URL,
    element: (
      <ProtectedRoute
        element={<DashboardProfile />}
        redirectTo={DASHBOARD_PROFILE_URL}
      />
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
