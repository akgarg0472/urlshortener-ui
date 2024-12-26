import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDashboard,
  getDashboardStatistics,
} from "../../api/dashboard/dashboard";
import DailyHitsLineChart from "../../components/daily-hits-line-chart/DailyHitsLineChart";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import InvisibleContainer from "../../components/invisible-container/InvisibleContainer";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";
import PieChart from "../../components/pie-chart/PieChart";
import useAuth from "../../hooks/useAuth";
import {
  DASH_BROWSER_HEAD,
  DASH_BROWSER_SUBHEAD,
  DASH_CONTINET_HEAD,
  DASH_CONTINET_SUBHEAD,
  DASH_COUNTRY_HEAD,
  DASH_COUNTRY_SUBHEAD,
  DASH_OS_HEAD,
  DASH_OS_SUBHEAD,
  DASH_PREV_SEVEN_DAYS_HEAD,
  DASH_PREV_SEVEN_DAYS_SUBHEAD,
  LOGIN_URL,
  PREV_SEVEN_DAYS_DATASET_LABEL,
} from "../../constants";
import { getCurrentDateTime } from "../../utils/datetimeutils";
import Modal from "../../components/modal/Modal";
import { ModalIcon } from "../../components/modal/Modal.enums";
import {
  Browser,
  Continent,
  Country,
  DashboardApiStat,
  OS,
  PopularURL,
  PrevSevenDaysHit,
} from "../../api/dashboard/dashboard.api.modal";
import {
  DashboardApiResponse,
  DashboardStatisticsApiResponse,
  DeviceMetricsApiResponse,
  GeographicalApiResponse,
  PopularURLApiResponse,
} from "../../api/dashboard/dashboard.api.response";
import DashboardStat from "../../components/dashboard-overview-stat/DashboardStat";
import ChartPercentageStatsContainer from "../../components/chart-percentage-stats-container/ChartPercentageStatsContainer";
import NoDataAvailable from "../../components/no-data-available/NoDataAvailable";

import "./Dashboard.css";
import PopularUrl from "../../components/popular-url/PopularUrl";

const Dashboard = () => {
  const { getUserId, logout, getAuthToken } = useAuth();
  const navigate = useNavigate();

  const [todayStats, setTodayStats] = useState([] as DashboardApiStat[]);
  const [lifetimeStats, setLifetimeStats] = useState([] as DashboardApiStat[]);
  const [prevSevenDaysHitsData, setPrevSevenDayHitsData] = useState(
    [] as PrevSevenDaysHit[]
  );
  const [continents, setContinents] = useState([] as Continent[]);
  const [countries, setCountries] = useState([] as Country[]);
  const [loading, setLoading] = useState(true);
  const [popularUrls, setPopularUrls] = useState([] as PopularURL[]);
  const [oss, setOss] = useState([] as OS[]);
  const [browsers, setBrowsers] = useState([] as Browser[]);

  useEffect(() => {
    document.title = "Dashboard";
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const userId = getUserId();
    const authToken = getAuthToken();

    if (!userId || !authToken) {
      logout();
      navigate(LOGIN_URL, { replace: true });
      return;
    }

    const endTime = Date.now();

    const [dashboardStatisticsApiResponse, dashboardApiResponse] =
      await Promise.all([
        getDashboardStatistics({
          geographicalParams: {
            userId: userId,
            startTime: 0,
            endTime: endTime,
            authToken: authToken,
          },
          popularUrlParam: {
            userId: userId,
            sortOrder: "desc",
            limit: 10,
            startTime: 0,
            endTime: endTime,
            authToken: authToken,
          },
          deviceMetricsParam: {
            userId: userId,
            startTime: 0,
            endTime: endTime,
            authToken: authToken,
          },
        }),

        getDashboard({
          userId: userId!!,
          startTime: 0,
          endTime: Date.now(),
          authToken: authToken,
        }),
      ]);

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
    handlePopularURLs(dashboardStatisticsApiResponse.popularUrls!!);
    handleGeographicalData(dashboardStatisticsApiResponse.geographicalStats!!);
    handleOSBrowserData(dashboardStatisticsApiResponse.deviceMetrics!!);
  };

  const handlePopularURLs = (popularURLResponse: PopularURLApiResponse) => {
    if (popularURLResponse.success) {
      setPopularUrls(popularURLResponse.popular_urls);
    } else {
      setPopularUrls([]);
    }
  };

  const processCountriesData = (countries: Country[]): Country[] => {
    if (countries.length <= 10) {
      return countries;
    }

    const sortedCountries = countries.sort(
      (a, b) => b.hits_count - a.hits_count
    );

    const topNineCountries = sortedCountries.slice(0, 9);

    const remainingCountriesHitsCount = sortedCountries
      .slice(9)
      .reduce((sum, pair) => sum + pair.hits_count, 0);

    return [
      ...topNineCountries,
      { name: "Other", hits_count: remainingCountriesHitsCount },
    ];
  };

  const handleGeographicalData = (
    geographicalApiResponse: GeographicalApiResponse
  ) => {
    if (geographicalApiResponse) {
      setContinents(geographicalApiResponse.continents);
      setCountries(processCountriesData(geographicalApiResponse.countries));
    } else {
      setContinents([]);
      setCountries([]);
    }
  };

  const handleOSBrowserData = (osBrowserResponse: DeviceMetricsApiResponse) => {
    if (osBrowserResponse.success) {
      setOss(osBrowserResponse.oss);
      setBrowsers(osBrowserResponse.browsers);
    } else {
      setOss([]);
      setBrowsers([]);
    }
  };

  const renderPopularURLs = () => {
    if (popularUrls.length === 0) {
      return <NoDataAvailable />;
    }

    return (
      <React.Fragment>
        <div className="popular__urls__stats__container">
          {popularUrls.map((url: PopularURL, index: number) => {
            return (
              <PopularUrl
                key={index}
                shortUrl={`${process.env.REACT_APP_PREFIX_URL_FOR_SHORT_URL}/${url.short_url}`}
                hitsCount={url.hits_count}
                originalUrl={url.original_url}
                seqNumber={index + 1}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
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
              Effortlessly track, manage, and analyze your shortened links in
              real-time. Gain instant click insights, customize your URLs, and
              navigate with ease. Our intuitive dashboard combines efficiency
              and simplicity, transforming your link management experience.
              Elevate your tracking game today!
            </div>
          </div>

          <div className="stats__overview__container">
            {todayStats.map((stat, index) => (
              <DashboardStat
                key={index}
                title={stat.key}
                value={stat.value}
                suffix={stat.suffix}
              />
            ))}

            {lifetimeStats.map((stat, index) => (
              <DashboardStat
                key={index}
                title={stat.key}
                value={stat.value}
                suffix={stat.suffix}
              />
            ))}
          </div>

          <InvisibleContainer />

          <div className="prev__seven__and__popular__urls__container">
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

            <div className="popular__urls__container">
              <DashboardHeadSubHead
                heading="Top Performing Links"
                subheading="Explore the highest performing URLs to maximize your impact!"
              />
              {loading ? <InternalLoader /> : renderPopularURLs()}
            </div>
          </div>

          <InvisibleContainer />

          <div className="url__stats__container">
            <div className="continents__stats__container">
              <DashboardHeadSubHead
                heading={DASH_CONTINET_HEAD}
                subheading={DASH_CONTINET_SUBHEAD}
              />

              {loading ? (
                <InternalLoader />
              ) : (
                <React.Fragment>
                  <PieChart
                    datasetLabel="Country"
                    data={continents}
                    legendPosition="bottom"
                  />

                  <ChartPercentageStatsContainer
                    data={continents.map((c) => {
                      return { name: c.name, value: c.hits_count };
                    })}
                  />
                </React.Fragment>
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
                <React.Fragment>
                  <PieChart
                    datasetLabel="Country"
                    data={countries}
                    legendPosition="bottom"
                  />

                  <ChartPercentageStatsContainer
                    data={countries.map((c) => {
                      return { name: c.name, value: c.hits_count };
                    })}
                  />
                </React.Fragment>
              )}
            </div>

            <div className="os__stats__container">
              <DashboardHeadSubHead
                heading={DASH_OS_HEAD}
                subheading={DASH_OS_SUBHEAD}
              />

              {loading ? (
                <InternalLoader />
              ) : (
                <React.Fragment>
                  <PieChart
                    datasetLabel="OS"
                    data={oss}
                    legendPosition="bottom"
                    key="oss__stats"
                  />

                  <ChartPercentageStatsContainer
                    data={oss.map((o) => {
                      return { name: o.name, value: o.hits_count };
                    })}
                  />
                </React.Fragment>
              )}
            </div>

            <div className="browser__stats__container">
              <DashboardHeadSubHead
                heading={DASH_BROWSER_HEAD}
                subheading={DASH_BROWSER_SUBHEAD}
              />

              {loading ? (
                <InternalLoader />
              ) : (
                <React.Fragment>
                  <PieChart
                    datasetLabel="Browsers"
                    data={browsers}
                    legendPosition="bottom"
                    key="browsers__stats"
                  />

                  <ChartPercentageStatsContainer
                    data={browsers.map((b) => {
                      return { name: b.name, value: b.hits_count };
                    })}
                  />
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
