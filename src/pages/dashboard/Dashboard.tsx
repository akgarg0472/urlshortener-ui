import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../../api/dashboard/dashboard";
import DailyHitsLineChart from "../../components/daily-hits-line-chart/DailyHitsLineChart";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardOverviewStats from "../../components/dashboard-overview-stats/DashboardOverviewStats";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import InvisibleContainer from "../../components/invisible-container/InvisibleContainer";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";
import PieChart from "../../components/pie-chart/PieChart";
import useAuth from "../../hooks/useAuth";
import {
  DASH_CONTINET_HEAD,
  DASH_CONTINET_SUBHEAD,
  DASH_COUNTRY_HEAD,
  DASH_COUNTRY_SUBHEAD,
  DASH_PREV_SEVEN_DAYS_HEAD,
  DASH_PREV_SEVEN_DAYS_SUBHEAD,
  LOGIN_URL,
  PREV_SEVEN_DAYS_DATASET_LABEL,
} from "../../constants";
import { getCurrentDateTime } from "../../utils/datetimeutils";
import Modal from "../../components/modal/Modal";
import { ModalIcon } from "../../components/modal/Modal.enums";
import {
  Continent,
  Country,
  DashboardApiStat,
  PrevSevenDaysHit,
} from "../../api/dashboard/dashboard.api.modal";
import { DashboardApiResponse } from "../../api/dashboard/dashboard.api.response";

import "./Dashboard.css";

const Dashboard = () => {
  const { getUserId, logout, getName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard";
    fetchDashboard();
  }, []);

  const [todayStats, setTodayStats] = useState([] as DashboardApiStat[]);
  const [lifetimeStats, setLifetimeStats] = useState([] as DashboardApiStat[]);
  const [prevSevenDaysHitsData, setPrevSevenDayHitsData] = useState(
    [] as PrevSevenDaysHit[]
  );
  const [continents, setContinents] = useState([] as Continent[]);
  const [countries, setCountries] = useState([] as Country[]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    const userId = getUserId();

    if (!userId) {
      logout();
      navigate(LOGIN_URL, { replace: true });
      return;
    }

    const dashboardApiResponse: DashboardApiResponse = await getDashboard({
      userId: userId!!,
      startTime: 0,
      endTime: Date.now(),
    });

    setLoading(false);

    if (
      dashboardApiResponse.httpCode === 401 ||
      dashboardApiResponse.httpCode === 403
    ) {
      logout();
      navigate("/login", { replace: true });
      return;
    }

    if (!dashboardApiResponse.success) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message: dashboardApiResponse.message,
      });
    }

    setTodayStats(dashboardApiResponse.current_day_stats);
    setLifetimeStats(dashboardApiResponse.lifetime_stats);
    setPrevSevenDayHitsData(dashboardApiResponse.prev_seven_days_hits);
    setContinents(dashboardApiResponse.continents);
    setCountries(dashboardApiResponse.countries);
  };

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <div className="heading__time__section">
            <div className="heading">Dashboard</div>
            <div className="timestamp">{getCurrentDateTime()}</div>
            <div className="description">
              Track, manage, and analyze your shortened links effortlessly.
              Real-time click insights, customizable short URLs, and
              user-friendly interface make link management a breeze. Elevate
              your link tracking experience with our intuitive dashboard – where
              efficiency meets ease.
            </div>
          </div>

          <div className="stats__overview__container">
            <DashboardOverviewStats
              headingText="Today's Stats"
              data={todayStats.map((stat) => {
                return { label: stat.key, value: stat.value, icon: stat.icon };
              })}
            />

            <DashboardOverviewStats
              headingText="Lifetime Stats"
              data={lifetimeStats.map((stat) => {
                return { label: stat.key, value: stat.value, icon: stat.icon };
              })}
            />
          </div>

          <InvisibleContainer />

          <div className="prev__seven__days__hits__container">
            <DashboardHeadSubHead
              heading={DASH_PREV_SEVEN_DAYS_HEAD}
              subheading={DASH_PREV_SEVEN_DAYS_SUBHEAD}
            />

            {loading ? (
              <InternalLoader />
            ) : (
              <>
                <DailyHitsLineChart
                  data={prevSevenDaysHitsData}
                  datasetLabel={PREV_SEVEN_DAYS_DATASET_LABEL}
                />
              </>
            )}
          </div>

          <div className="continents__countries__container">
            <div className="continents__stats__container">
              <DashboardHeadSubHead
                heading={DASH_CONTINET_HEAD}
                subheading={DASH_CONTINET_SUBHEAD}
              />

              {loading ? (
                <InternalLoader />
              ) : (
                <PieChart
                  datasetLabel="Country"
                  data={continents}
                  legendPosition="top"
                />
              )}
            </div>
            <div className="countries__stats__container">
              <DashboardHeadSubHead
                heading={DASH_COUNTRY_HEAD}
                subheading={DASH_COUNTRY_SUBHEAD}
              />

              {loading ? (
                <InternalLoader />
              ) : (
                <PieChart
                  datasetLabel="Country"
                  data={countries}
                  legendPosition="top"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
