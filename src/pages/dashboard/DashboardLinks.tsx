import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyLinksApiResponse, URL } from "../../api/apiModals";
import { myLinks } from "../../api/dashboard";
import RegularButton from "../../components/button/RegularButton";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";
import MyLink from "../../components/mylink/MyLink";
import useAuth from "../../hooks/useAuth";
import { DASH_MY_LINKS_HEAD, DASH_MY_LINKS_SUBHEAD } from "../../constants";
import "./Dashboard.css";

const DashboardLinks = () => {
  const { getUserId, logout } = useAuth();
  const navigate = useNavigate();

  const [urls, setUrls] = useState([] as URL[]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [nextOffset, setNextOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const doLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const hitApi = (): MyLinksApiResponse => {
    const userId = getUserId();

    // if (!userId) {
    //   logout();
    //   navigate("/login", { replace: true });
    //   return;
    // }

    const apiResponse: MyLinksApiResponse = myLinks({
      userId: getUserId()!!,
      offset: nextOffset,
      limit: 5,
    });

    if (apiResponse.httpCode !== 200) {
      doLogout();
    }

    return apiResponse;
  };

  const loadMoreUrls = () => {
    const myLinksApiResponse: MyLinksApiResponse = hitApi();

    setUrls((prev) => {
      return [...prev, ...myLinksApiResponse.urls];
    });

    setTotalRecords(myLinksApiResponse.total_records);
    setNextOffset(myLinksApiResponse.next_offset);
  };

  useEffect(() => {
    document.title = "My Links";

    setTimeout(() => {
      const myLinksApiResponse: MyLinksApiResponse = hitApi();

      setUrls((prev) => {
        return [...prev, ...myLinksApiResponse.urls];
      });

      setTotalRecords(myLinksApiResponse.total_records);
      setNextOffset(myLinksApiResponse.next_offset);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <DashboardHeadSubHead
            heading={DASH_MY_LINKS_HEAD}
            subheading={DASH_MY_LINKS_SUBHEAD}
          />

          <div className="my__links__container">
            {loading ? (
              <InternalLoader />
            ) : (
              <>
                {urls.map((url, index) => (
                  <MyLink
                    url={url}
                    serialNumber={index + 1}
                    key={`${url.short_url}_${index}`} // todo: fix later
                    userId={getUserId()!!}
                  />
                ))}
              </>
            )}
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RegularButton
              content="Load More"
              key="my__links__load__more__btn"
              onClick={() => {
                loadMoreUrls();
              }}
              className="my__links__load__more__btn"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardLinks;
