import React, { useEffect, useState } from "react";
import {
  Browser,
  Continent,
  Country,
  DeviceMetricsApiResponse,
  GeographicalApiResponse,
  OS,
  PopularURL,
  PopularURLApiResponse,
} from "../../api/apiModals";
import DashboardStatsHeading from "../../components/DashboardStatsHeading/DashboardStatsHeading";
import BarChart from "../../components/bar-chart/BarChart";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import IconStats from "../../components/dashboard-overview-stats/stats-with-icon/IconStats";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import DoughnutChart from "../../components/doughnut-chart/DoughnutChart";
import InvisibleContainer from "../../components/invisible-container/InvisibleContainer";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";
import NoDataAvailable from "../../components/no-data-available/NoDataAvailable";
import PieChart from "../../components/pie-chart/PieChart";
import useAuth from "../../hooks/useAuth";
import {
  DASH_BROWSER_HEAD,
  DASH_CONTINET_HEAD,
  DASH_COUNTRY_HEAD,
  DASH_OS_HEAD,
  DASH_STATISTICS_HEAD,
  DASH_STATISTICS_SUBHEAD,
} from "../../api.constants";
import {
  CHART_TYPE_BAR,
  CHART__TYPE__DOUGHNUT,
  CHART__TYPE__PIE,
  dashboardChartTypeDropdown,
} from "../../utils/dropdownutils";
import DropdownSelector from "../../components/dropdownselector/DropdownSelector";

import "./Dashboard.css";
import { DropdownSelectorHeight } from "../../components/dropdownselector/DropdownSelector.enums";
import {
  getDeviceMetricsStats,
  getGeographicalStats,
  getPopularURLStats,
} from "../../api/dashboard";

const DashboardStatistics = () => {
  const { getUserId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [popularUrls, setPopularUrls] = useState([] as PopularURL[]);
  const [continents, setContinents] = useState([] as Continent[]);
  const [countries, setCountries] = useState([] as Country[]);
  const [oss, setOss] = useState([] as OS[]);
  const [browsers, setBrowsers] = useState([] as Browser[]);
  const [geoChartType, setGeoChartType] = useState(CHART__TYPE__PIE);
  const [deviceChartType, setDeviceChartType] = useState(CHART__TYPE__PIE);

  const getPopularURLs = async () => {
    const popularURLResponse: PopularURLApiResponse = getPopularURLStats({
      userId: getUserId()!!,
    });
    setPopularUrls(popularURLResponse.popular_urls);
  };

  const getGeographicalData = async () => {
    const geographicalApiResponse: GeographicalApiResponse =
      getGeographicalStats({
        userId: getUserId()!!,
      });
    setContinents(geographicalApiResponse.continents);
    setCountries(geographicalApiResponse.countries);
  };

  const getOSBrowserData = async () => {
    const osBrowserResponse: DeviceMetricsApiResponse = getDeviceMetricsStats({
      userId: getUserId()!!,
    });
    setOss(osBrowserResponse.oss);
    setBrowsers(osBrowserResponse.browsers);
  };

  useEffect(() => {
    document.title = "Statistics";

    setTimeout(async () => {
      await getPopularURLs();
      await getGeographicalData();
      await getOSBrowserData();
      setLoading(false);
    }, 1000);
  }, []);

  const renderPopularURLs = () => {
    if (popularUrls.length === 0) {
      return <NoDataAvailable />;
    }

    return (
      <React.Fragment>
        <div className="popular__urls__stats__container">
          {popularUrls.map((url: PopularURL, index: number) => {
            return (
              <IconStats
                icon="/assets/icons/popular_url.png"
                label={`${process.env.REACT_APP_FRONTEND_BASE_URL}/${url.short_url}`}
                value={url.hits_count}
                key={index}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  };

  const renderStatsChart = (
    state: string,
    key: string,
    label: string,
    data: Continent[] | Country[] | OS[] | Browser[]
  ) => {
    switch (state) {
      case CHART__TYPE__DOUGHNUT:
        return (
          <DoughnutChart
            datasetLabel="Continents"
            key="continents__stats"
            data={continents.map((cont) => {
              return { label: cont.name, value: cont.hits_count };
            })}
            legendPosition="top"
            borderWidth={4}
          />
        );

      case CHART_TYPE_BAR:
        return (
          <BarChart
            datasetLabel={label}
            key=""
            data={data.map((item) => {
              return {
                label: item.name,
                value: item.hits_count,
              };
            })}
          />
        );

      default:
        return (
          <PieChart
            datasetLabel="Continents"
            key={key}
            data={continents}
            legendPosition="top"
            borderWidth={4}
          />
        );
    }
  };

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <DashboardHeadSubHead
            heading={DASH_STATISTICS_HEAD}
            subheading={DASH_STATISTICS_SUBHEAD}
          />

          <div className="popular__urls__container">
            <DashboardStatsHeading heading="Popular URLs" />
            {loading ? <InternalLoader /> : renderPopularURLs()}
          </div>

          <InvisibleContainer />

          <div className="geographical__stats__container">
            <DashboardStatsHeading heading="Geographical Stats" />
            <div className="dropdown__selector__container">
              <DropdownSelector
                dropdownValues={dashboardChartTypeDropdown}
                id="dash__geo__stats__dropdown"
                onChange={(value: string) => {
                  setGeoChartType(value);
                }}
                title="Chart Type"
                value={geoChartType}
                isOneLiner={true}
              />
            </div>
            <div className="stats__data__container">
              <div className="continent__container">
                <DashboardHeadSubHead
                  heading={DASH_CONTINET_HEAD}
                  centered={true}
                />

                {loading ? (
                  <InternalLoader />
                ) : (
                  renderStatsChart(
                    geoChartType,
                    "continents__stats",
                    "Continents",
                    continents
                  )
                )}
              </div>

              <div className="country__container">
                <DashboardHeadSubHead
                  heading={DASH_COUNTRY_HEAD}
                  centered={true}
                />

                {loading ? (
                  <InternalLoader />
                ) : (
                  renderStatsChart(
                    geoChartType,
                    "countries__stats",
                    "Countries",
                    countries
                  )
                )}
              </div>
            </div>
          </div>

          <InvisibleContainer />

          <div className="device__metrics__stats__container">
            <DashboardStatsHeading heading="OS & Browser Stats" />

            <div className="dropdown__selector__container">
              <DropdownSelector
                dropdownValues={dashboardChartTypeDropdown}
                id="dash__device__stats__dropdown"
                onChange={(value: string) => {
                  setDeviceChartType(value);
                }}
                title="Chart Type"
                value={deviceChartType}
                height={DropdownSelectorHeight.MEDIUM}
                isOneLiner={true}
              />
            </div>

            <div className="stats__data__container">
              <div className="os__container">
                <DashboardHeadSubHead heading={DASH_OS_HEAD} centered={true} />

                {loading ? (
                  <InternalLoader />
                ) : (
                  renderStatsChart(deviceChartType, "oss__stats", "OS", oss)
                )}
              </div>

              <div className="browser__stats__container">
                <DashboardHeadSubHead
                  heading={DASH_BROWSER_HEAD}
                  centered={true}
                />

                {loading ? (
                  <InternalLoader />
                ) : (
                  renderStatsChart(
                    deviceChartType,
                    "browsers__stats",
                    "Browsers",
                    browsers
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardStatistics;
