import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
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
        <Suspense fallback={<div>Loading Home...</div>}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: SIGNUP_URL,
      element: (
        <Suspense fallback={<div>Loading Signup...</div>}>
          <HomeNavbar />
          <Signup />
        </Suspense>
      ),
    },
    {
      path: LOGIN_URL,
      element: (
        <Suspense fallback={<div>Loading Login...</div>}>
          <HomeNavbar />
          <Login />
        </Suspense>
      ),
    },
    {
      path: FORGOT_PASSWORD_URL,
      element: (
        <Suspense fallback={<div>Loading Forgot Password...</div>}>
          <HomeNavbar />
          <ForgotPassword />
        </Suspense>
      ),
    },
    {
      path: RESET_PASSWORD_URL,
      element: (
        <Suspense fallback={<div>Loading Reset Password...</div>}>
          <HomeNavbar />
          <ResetPassword />
        </Suspense>
      ),
    },
    {
      path: OAUTH_SUCCESS_GOOGLE,
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <OAuthSuccess />
        </Suspense>
      ),
    },
    {
      path: OAUTH_SUCCESS_GITHUB,
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <OAuthSuccess />
        </Suspense>
      ),
    },
    {
      path: DASHBOARD_URL,
      element: (
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <ProtectedRoute element={<Dashboard />} redirectTo={DASHBOARD_URL} />
        </Suspense>
      ),
    },
    {
      path: DASHBOARD_LINKS_URL,
      element: (
        <Suspense fallback={<div>Loading Dashboard Links...</div>}>
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
        <Suspense fallback={<div>Loading Subscriptions...</div>}>
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
        <Suspense fallback={<div>Loading Profile...</div>}>
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
        <Suspense fallback={<div>Loading Update Profile...</div>}>
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
        <Suspense fallback={<div>Loading Subscription Plans...</div>}>
          <SubscriptionPage />
        </Suspense>
      ),
    },
    {
      path: PAYPAL_CALLBACK_URL,
      element: (
        <Suspense fallback={<div>Loading PayPal...</div>}>
          <ProtectedRoute element={<Paypal />} redirectTo={DASHBOARD_URL} />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<div>Loading Error Page...</div>}>
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
