import { createBrowserRouter } from "react-router-dom";
import HomeNavbar from "../components/home-navbar/HomeNavbar";
import {
  DASHBOARD_LINKS_URL,
  DASHBOARD_PROFILE_URL,
  DASHBOARD_SUBSCRIPTIONS,
  DASHBOARD_UPDATE_PROFILE_URL,
  DASHBOARD_URL,
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  OAUTH_SUCCESS_GITHUB,
  OAUTH_SUCCESS_GOOGLE,
  RESET_PASSWORD_URL,
  SIGNUP_URL,
  SUBSCRIPTION_PLANS_URL,
} from "../constants";
import ForgotPassword from "../pages/auth/forgot-password/ForgotPassword";
import Login from "../pages/auth/login/Login";
import OAuthSuccess from "../pages/auth/oauth/OAuthSuccess";
import ResetPassword from "../pages/auth/reset-password/ResetPassword";
import Signup from "../pages/auth/signup/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLinks from "../pages/dashboard/DashboardLinks";
import DashboardProfile from "../pages/dashboard/DashboardProfile";
import DashboardSubscription from "../pages/dashboard/DashboardSubscription";
import DashboardUpdateProfile from "../pages/dashboard/DashboardUpdateProfile";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/home/HomePage";
import SubscriptionPage from "../pages/plans/SubscriptionPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: SIGNUP_URL,
      element: [<HomeNavbar key="navbar" />, <Signup key="signup__signup" />],
    },
    {
      path: LOGIN_URL,
      element: [<HomeNavbar key="navbar" />, <Login key="login__login" />],
    },
    {
      path: FORGOT_PASSWORD_URL,
      element: [
        <HomeNavbar key="navbar" />,
        <ForgotPassword key="forgot__password__forgot__password" />,
      ],
    },
    {
      path: RESET_PASSWORD_URL,
      element: [
        <HomeNavbar key="navbar" />,
        <ResetPassword key="reset__password__element" />,
      ],
    },
    {
      path: OAUTH_SUCCESS_GOOGLE,
      element: <OAuthSuccess />,
    },
    {
      path: OAUTH_SUCCESS_GITHUB,
      element: <OAuthSuccess />,
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
      path: DASHBOARD_SUBSCRIPTIONS,
      element: (
        <ProtectedRoute
          element={<DashboardSubscription />}
          redirectTo={DASHBOARD_PROFILE_URL}
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
      path: DASHBOARD_UPDATE_PROFILE_URL,
      element: (
        <ProtectedRoute
          element={<DashboardUpdateProfile />}
          redirectTo={DASHBOARD_UPDATE_PROFILE_URL}
        />
      ),
    },
    {
      path: SUBSCRIPTION_PLANS_URL,
      element: <SubscriptionPage />,
    },
    {
      path: "*",
      element: [<HomeNavbar key="navbar" />, <ErrorPage key="error__page" />],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
