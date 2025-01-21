import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDashboard,
  getDashboardStatistics,
} from "../../api/dashboard/dashboard";
import * as apiModal from "../../api/dashboard/dashboard.api.modal";
import {
  DeviceMetricsApiResponse,
  GeographicalApiResponse,
  PopularURLApiResponse,
} from "../../api/dashboard/dashboard.api.response";
import ChartPercentageStatsContainer from "../../components/chart-percentage-stats-container/ChartPercentageStatsContainer";
import DailyHitsLineChart from "../../components/daily-hits-line-chart/DailyHitsLineChart";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardStat from "../../components/dashboard-overview-stat/DashboardStat";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import InvisibleContainer from "../../components/invisible-container/InvisibleContainer";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";
import Modal from "../../components/modal/Modal";
import { ModalIcon } from "../../components/modal/Modal.enums";
import NoDataAvailable from "../../components/no-data-available/NoDataAvailable";
import PieChart from "../../components/pie-chart/PieChart";
import PopularUrl from "../../components/popular-url/PopularUrl";
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
import useAuth from "../../hooks/useAuth";
import { getCurrentDateTime } from "../../utils/datetimeutils";
import { getEnv } from "../../utils/envutils";

import { GetSubscriptionRequest } from "../../api/subscription/subs.api.request";
import { GetSubscriptionResponse } from "../../api/subscription/subs.api.response";
import { getActiveSubscription } from "../../api/subscription/subscription";
import UpgradePlan from "../../components/updrade-plan/UpgradePlan";
import {
  isDeviceMetricsAllowed,
  isGeographicalMetricsAllowed,
} from "../../utils/subscriptonUtils";
import "./Dashboard.css";

const Dashboard = () => {
  const { getUserId, getName, logout, getAuthToken } = useAuth();
  const navigate = useNavigate();

  const [todayStats, setTodayStats] = useState<apiModal.DashboardApiStat[]>([]);
  const [prevDayStats, setPrevDayStats] = useState<apiModal.DashboardApiStat[]>(
    []
  );
  const [lifetimeStats, setLifetimeStats] = useState<
    apiModal.DashboardApiStat[]
  >([]);
  const [prevSevenDaysHitsData, setPrevSevenDayHitsData] = useState<
    apiModal.PrevSevenDaysHit[]
  >([]);
  const [continents, setContinents] = useState<apiModal.Continent[]>([]);
  const [countries, setCountries] = useState<apiModal.Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [popularUrls, setPopularUrls] = useState<apiModal.PopularURL[]>([]);
  const [oss, setOss] = useState<apiModal.OS[]>([]);
  const [browsers, setBrowsers] = useState<apiModal.Browser[]>([]);
  const [geographyMetricsAllowed, setGeographyMetricsAllowed] =
    useState<boolean>(true);
  const [deviceMetricsAllowed, setDeviceMetricsAllowed] =
    useState<boolean>(true);

  useEffect(() => {
    document.title = "Dashboard";
    fetchDashboard();
    // eslint-disable-next-line
  }, []);

  const fetchActiveSubscriptionDetails =
    async (): Promise<GetSubscriptionResponse | null> => {
      const userId = getUserId();
      const authToken = getAuthToken();

      if (!userId || !authToken) {
        logout();
        navigate(LOGIN_URL, { replace: true });
        return null;
      }

      const req: GetSubscriptionRequest = {
        userId: userId,
        authToken: authToken,
      };

      const response: GetSubscriptionResponse =
        await getActiveSubscription(req);

      if (!response.success || !response.subscription || !response.pack) {
        return null;
      }

      return response;
    };

  const fetchDashboard = async () => {
    const userId = getUserId();
    const authToken = getAuthToken();

    if (!userId || !authToken) {
      logout();
      navigate(LOGIN_URL, { replace: true });
      return;
    }

    const activeSubscription = await fetchActiveSubscriptionDetails();

    if (!activeSubscription) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message: "Failed to fetch active subscripton details",
      });
      return;
    }

    setLoading(true);
    const endTime = Date.now();

    const geoMetricsAllowed: boolean = isGeographicalMetricsAllowed(
      activeSubscription.pack
    );
    setGeographyMetricsAllowed(geoMetricsAllowed);

    const deviceMetricsAllowed: boolean = isDeviceMetricsAllowed(
      activeSubscription.pack
    );
    setDeviceMetricsAllowed(deviceMetricsAllowed);

    const [dashboardStatisticsApiResponse, dashboardApiResponse] =
      await Promise.all([
        getDashboardStatistics({
          geographicalParams: geoMetricsAllowed
            ? {
                userId: userId,
                startTime: 0,
                endTime: endTime,
                authToken: authToken,
              }
            : null,
          popularUrlParam: {
            userId: userId,
            sortOrder: "desc",
            limit: 10,
            startTime: 0,
            endTime: endTime,
            authToken: authToken,
          },
          deviceMetricsParam: deviceMetricsAllowed
            ? {
                userId: userId,
                startTime: 0,
                endTime: endTime,
                authToken: authToken,
              }
            : null,
        }),
        getDashboard({
          userId: userId!,
          startTime: 0,
          endTime: Date.now(),
          authToken: authToken,
        }),
      ]);

    setLoading(false);

    if (
      dashboardApiResponse.httpCode === 401 ||
      dashboardStatisticsApiResponse.httpCode === 401 ||
      dashboardApiResponse.httpCode === 403 ||
      dashboardStatisticsApiResponse.httpCode === 403
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
    } else {
      setTodayStats(dashboardApiResponse.current_day_stats);
      setLifetimeStats(dashboardApiResponse.lifetime_stats);
      setPrevSevenDayHitsData(dashboardApiResponse.prev_seven_days_hits);
      setPrevDayStats(dashboardApiResponse.prev_day_stats);
    }

    if (!dashboardStatisticsApiResponse.success) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message: dashboardApiResponse.message,
      });
      return;
    } else {
      handlePopularURLs(dashboardStatisticsApiResponse.popularUrls!);
      if (dashboardStatisticsApiResponse.geographicalStats) {
        handleGeographicalData(
          dashboardStatisticsApiResponse.geographicalStats
        );
      }

      if (dashboardStatisticsApiResponse.deviceMetrics) {
        handleOSBrowserData(dashboardStatisticsApiResponse.deviceMetrics);
      }
    }
  };

  const handlePopularURLs = (popularURLResponse: PopularURLApiResponse) => {
    if (popularURLResponse?.success) {
      setPopularUrls(popularURLResponse.popular_urls);
    } else {
      setPopularUrls([]);
    }
  };

  const processCountriesData = (
    countries: apiModal.Country[]
  ): apiModal.Country[] => {
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
    if (osBrowserResponse?.success) {
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
          {popularUrls.map((url: apiModal.PopularURL, index: number) => {
            return (
              <PopularUrl
                key={index}
                shortUrl={`${getEnv("REACT_APP_PREFIX_URL_FOR_SHORT_URL", "localhost:8765").replace(/\/+$/, "")}/${url.short_url.replace(/^\/+/, "")}`}
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
            <div className="heading">Welcome, {getName()}</div>
            <div className="timestamp">{getCurrentDateTime()}</div>
            <div className="description">
              Track and manage your links effortlessly. Get real-time insights,
              customize URLs, and simplify your link management with our
              intuitive dashboard. Elevate your tracking experience today!
            </div>
          </div>

          <div className="stats__overview__container">
            {todayStats.map((stat) => (
              <DashboardStat
                key={stat.id}
                title={stat.key}
                value={stat.value}
                suffix={stat.suffix}
                prevDayValue={prevDayStats.find((s) => s.id === stat.id)?.value}
              />
            ))}

            {lifetimeStats.map((stat) => (
              <DashboardStat
                key={stat.id}
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
              ) : prevDayStats.length > 0 ? (
                <React.Fragment>
                  <DailyHitsLineChart
                    data={prevSevenDaysHitsData}
                    datasetLabel={PREV_SEVEN_DAYS_DATASET_LABEL}
                  />
                </React.Fragment>
              ) : (
                <NoDataAvailable />
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
              ) : geographyMetricsAllowed ? (
                <React.Fragment>
                  {continents.length > 0 ? (
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
                  ) : (
                    <NoDataAvailable />
                  )}
                </React.Fragment>
              ) : (
                <UpgradePlan
                  blurredContent={
                    <ChartPercentageStatsContainer
                      data={continents.map((c) => {
                        return { name: c.name, value: c.hits_count };
                      })}
                    />
                  }
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
              ) : geographyMetricsAllowed ? (
                countries.length > 0 ? (
                  <>
                    <PieChart
                      datasetLabel="Country"
                      data={countries}
                      legendPosition="bottom"
                    />

                    <ChartPercentageStatsContainer
                      data={countries.map((c) => ({
                        name: c.name,
                        value: c.hits_count,
                      }))}
                    />
                  </>
                ) : (
                  <NoDataAvailable />
                )
              ) : (
                <UpgradePlan
                  blurredContent={
                    <ChartPercentageStatsContainer
                      data={countries.map((c) => ({
                        name: c.name,
                        value: c.hits_count,
                      }))}
                    />
                  }
                />
              )}
            </div>

            <div className="os__stats__container">
              <DashboardHeadSubHead
                heading={DASH_OS_HEAD}
                subheading={DASH_OS_SUBHEAD}
              />

              {loading ? (
                <InternalLoader />
              ) : deviceMetricsAllowed ? (
                oss.length > 0 ? (
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
                ) : (
                  <NoDataAvailable />
                )
              ) : (
                <UpgradePlan
                  blurredContent={
                    <ChartPercentageStatsContainer
                      data={oss.map((o) => {
                        return { name: o.name, value: o.hits_count };
                      })}
                    />
                  }
                />
              )}
            </div>
            <div className="browser__stats__container">
              <DashboardHeadSubHead
                heading={DASH_BROWSER_HEAD}
                subheading={DASH_BROWSER_SUBHEAD}
              />

              {loading ? (
                <InternalLoader />
              ) : deviceMetricsAllowed ? (
                browsers.length > 0 ? (
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
                ) : (
                  <NoDataAvailable />
                )
              ) : (
                <UpgradePlan
                  blurredContent={
                    <ChartPercentageStatsContainer
                      data={browsers.map((b) => {
                        return { name: b.name, value: b.hits_count };
                      })}
                    />
                  }
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
