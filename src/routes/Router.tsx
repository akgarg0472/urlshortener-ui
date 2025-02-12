import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { WaitLoader } from "../components/wait-loader/WaitLoader";
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

const HomeNavbar = lazy(() => import("../components/home-navbar/HomeNavbar"));
const ForgotPassword = lazy(
  () => import("../pages/auth/forgot-password/ForgotPassword")
);
const Login = lazy(() => import("../pages/auth/login/Login"));
const OAuthSuccess = lazy(() => import("../pages/auth/oauth/OAuthSuccess"));
const ResetPassword = lazy(
  () => import("../pages/auth/reset-password/ResetPassword")
);
const Signup = lazy(() => import("../pages/auth/signup/Signup"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const DashboardLinks = lazy(() => import("../pages/dashboard/DashboardLinks"));
const DashboardProfile = lazy(
  () => import("../pages/dashboard/DashboardProfile")
);
const DashboardSubscription = lazy(
  () => import("../pages/dashboard/DashboardSubscription")
);
const DashboardUpdateProfile = lazy(
  () => import("../pages/dashboard/DashboardUpdateProfile")
);
const ErrorPage = lazy(() => import("../pages/error/ErrorPage"));
const HomePage = lazy(() => import("../pages/home/HomePage"));
const Paypal = lazy(() => import("../pages/payment/Paypal"));
const SubscriptionPage = lazy(() => import("../pages/plans/SubscriptionPage"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__home" />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: SIGNUP_URL,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__signup" />}>
          <HomeNavbar />
          <Signup />
        </Suspense>
      ),
    },
    {
      path: LOGIN_URL,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__login" />}>
          <HomeNavbar />
          <Login />
        </Suspense>
      ),
    },
    {
      path: FORGOT_PASSWORD_URL,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__forgot-password" />}>
          <HomeNavbar />
          <ForgotPassword />
        </Suspense>
      ),
    },
    {
      path: RESET_PASSWORD_URL,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__reset-password" />}>
          <HomeNavbar />
          <ResetPassword />
        </Suspense>
      ),
    },
    {
      path: OAUTH_SUCCESS_GOOGLE,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__oauth-google" />}>
          <OAuthSuccess />
        </Suspense>
      ),
    },
    {
      path: OAUTH_SUCCESS_GITHUB,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__oauth-github" />}>
          <OAuthSuccess />
        </Suspense>
      ),
    },
    {
      path: DASHBOARD_URL,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__dashboard" />}>
          <ProtectedRoute element={<Dashboard />} redirectTo={DASHBOARD_URL} />
        </Suspense>
      ),
    },
    {
      path: DASHBOARD_LINKS_URL,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__dashboard-links" />}>
          <ProtectedRoute
            element={<DashboardLinks />}
            redirectTo={DASHBOARD_LINKS_URL}
          />
        </Suspense>
      ),
    },
    {
      path: DASHBOARD_SUBSCRIPTIONS,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__subscriptions" />}>
          <ProtectedRoute
            element={<DashboardSubscription />}
            redirectTo={DASHBOARD_PROFILE_URL}
          />
        </Suspense>
      ),
    },
    {
      path: DASHBOARD_PROFILE_URL,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__profile" />}>
          <ProtectedRoute
            element={<DashboardProfile />}
            redirectTo={DASHBOARD_PROFILE_URL}
          />
        </Suspense>
      ),
    },
    {
      path: DASHBOARD_UPDATE_PROFILE_URL,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__update-profile" />}>
          <ProtectedRoute
            element={<DashboardUpdateProfile />}
            redirectTo={DASHBOARD_UPDATE_PROFILE_URL}
          />
        </Suspense>
      ),
    },
    {
      path: SUBSCRIPTION_PLANS_URL,
      element: (
        <Suspense
          fallback={<WaitLoader key="wait__loader__subscription-plans" />}
        >
          <SubscriptionPage />
        </Suspense>
      ),
    },
    {
      path: PAYPAL_CALLBACK_URL,
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__paypal" />}>
          <ProtectedRoute element={<Paypal />} redirectTo={DASHBOARD_URL} />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<WaitLoader key="wait__loader__error-page" />}>
          <ErrorPage />
        </Suspense>
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
