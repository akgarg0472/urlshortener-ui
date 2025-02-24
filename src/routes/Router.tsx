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
  PAYPAL_CALLBACK_URL,
  RESET_PASSWORD_URL,
  SIGNUP_URL,
  SUBSCRIPTION_PLANS_URL,
} from "../constants";

import { createBrowserRouter } from "react-router-dom";
import HomeNavbar from "../components/home-navbar/HomeNavbar";
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
import Paypal from "../pages/payment/Paypal";
import SubscriptionPage from "../pages/plans/SubscriptionPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage key="wait__loader__home" />,
    },
    {
      path: SIGNUP_URL,
      element: (
        <>
          <HomeNavbar />
          <Signup />
        </>
      ),
    },
    {
      path: LOGIN_URL,
      element: (
        <>
          <HomeNavbar />
          <Login key="wait__loader__login" />
        </>
      ),
    },
    {
      path: FORGOT_PASSWORD_URL,
      element: (
        <>
          <HomeNavbar />
          <ForgotPassword key="wait__loader__forgot-password" />
        </>
      ),
    },
    {
      path: RESET_PASSWORD_URL,
      element: (
        <>
          <HomeNavbar />
          <ResetPassword key="wait__loader__reset-password" />
        </>
      ),
    },
    {
      path: OAUTH_SUCCESS_GOOGLE,
      element: (
        <>
          <OAuthSuccess key="wait__loader__oauth-google" />
        </>
      ),
    },
    {
      path: OAUTH_SUCCESS_GITHUB,
      element: (
        <>
          <OAuthSuccess key="wait__loader__oauth-github" />
        </>
      ),
    },
    {
      path: DASHBOARD_URL,
      element: (
        <>
          <ProtectedRoute
            element={<Dashboard />}
            redirectTo={DASHBOARD_URL}
            key="wait__loader__dashboard"
          />
        </>
      ),
    },
    {
      path: DASHBOARD_LINKS_URL,
      element: (
        <ProtectedRoute
          key="wait__loader__dashboard-links"
          element={<DashboardLinks />}
          redirectTo={DASHBOARD_LINKS_URL}
        />
      ),
    },
    {
      path: DASHBOARD_SUBSCRIPTIONS,
      element: (
        <>
          <ProtectedRoute
            key="wait__loader__subscriptions"
            element={<DashboardSubscription />}
            redirectTo={DASHBOARD_PROFILE_URL}
          />
        </>
      ),
    },
    {
      path: DASHBOARD_PROFILE_URL,
      element: (
        <ProtectedRoute
          element={<DashboardProfile key="wait__loader__profile" />}
          redirectTo={DASHBOARD_PROFILE_URL}
        />
      ),
    },
    {
      path: DASHBOARD_UPDATE_PROFILE_URL,
      element: (
        <ProtectedRoute
          key="wait__loader__update-profile"
          element={<DashboardUpdateProfile />}
          redirectTo={DASHBOARD_UPDATE_PROFILE_URL}
        />
      ),
    },
    {
      path: SUBSCRIPTION_PLANS_URL,
      element: (
        <ProtectedRoute
          key="wait__loader__subscription-plans"
          element={<SubscriptionPage />}
          redirectTo={DASHBOARD_SUBSCRIPTIONS}
        />
      ),
    },
    {
      path: PAYPAL_CALLBACK_URL,
      element: (
        <ProtectedRoute
          element={<Paypal />}
          redirectTo={DASHBOARD_URL}
          key="wait__loader__paypal"
        />
      ),
    },
    {
      path: "*",
      element: (
        <>
          <ErrorPage key="wait__loader__error-page" />
        </>
      ),
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
