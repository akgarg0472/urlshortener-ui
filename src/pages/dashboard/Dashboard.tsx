import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Continent,
  Country,
  DashboardApiResponse,
  DashboardApiStat,
  PrevSevenDaysHit,
} from "../../api/apiModals";
import { dashboard } from "../../api/dashboard";
import DailyHitsLineChart from "../../components/daily-hits-line-chart/DailyHitsLineChart";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardOverviewStats from "../../components/dashboard-overview-stats/DashboardOverviewStats";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
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
  PREV_SEVEN_DAYS_DATASET_LABEL,
} from "../../utils/constants";
import { getCurrentDateTime } from "../../utils/datetimeutils";
import "./Dashboard.css";

const Dashboard = () => {
  const { getUserId, logout } = useAuth();
  const navigate = useNavigate();

  const [todayStats, setTodayStats] = useState([] as DashboardApiStat[]);
  const [lifetimeStats, setLifetimeStats] = useState([] as DashboardApiStat[]);
  const [prevSevenDaysHitsData, setPrevSevenDayHitsData] = useState(
    [] as PrevSevenDaysHit[]
  );
  const [continents, setContinents] = useState([] as Continent[]);
  const [countries, setCountries] = useState([] as Country[]);
  const [loading, setLoading] = useState(true);

  const doLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    document.title = "Dashboard";

    const userId = getUserId();

    // if (!userId) {
    //   logout();
    //   navigate("/login", { replace: true });
    //   return;
    // }

    setTimeout(() => {
      const apiResponse: DashboardApiResponse = dashboard({ userId: userId!! });

      if (apiResponse.httpCode !== 200) {
        doLogout();
        return;
      }

      setTodayStats(apiResponse.current_day_stats);
      setLifetimeStats(apiResponse.lifetime_stats);
      setPrevSevenDayHitsData(apiResponse.prev_seven_days_hits);
      setContinents(apiResponse.continents);
      setCountries(apiResponse.countries);

      setLoading(false);
    }, 1000);
  }, []);

  const { getName } = useAuth();

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <div className="main__dashboard__heading">
            <div className="welcome__text">Welcome,</div>
            <div className="name__heading">{getName()}</div>
          </div>

          <div className="heading__time__section">
            <div className="heading">Dashboard</div>
            <div className="timestamp">{getCurrentDateTime()}</div>
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
