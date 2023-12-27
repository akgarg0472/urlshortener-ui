import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyLinksApiResponse, URL } from "../../api/apiModals";
import { getMyLinks } from "../../api/dashboard";
import RegularButton from "../../components/button/RegularButton";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";
import MyLink from "../../components/mylink/MyLink";
import useAuth from "../../hooks/useAuth";
import {
  DASH_MY_LINKS_HEAD,
  DASH_MY_LINKS_SUBHEAD,
  LOGIN_URL,
} from "../../api.constants";
import "./Dashboard.css";

const DashboardLinks = () => {
  const { getUserId, logout } = useAuth();
  const navigate = useNavigate();

  const [urls, setUrls] = useState([] as URL[]);
  const [nextOffset, setNextOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(100);

  useEffect(() => {
    document.title = "My Links";
    fetchMyLinks();
  }, []);

  const doLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const fetchMyLinks = async () => {
    const userId = getUserId();

    if (!userId) {
      doLogout();
      return;
    }

    setLoading(true);

    const myLinksApiResponse: MyLinksApiResponse = await getMyLinks({
      userId: userId,
      offset: nextOffset,
      limit: limit,
    });

    if (
      myLinksApiResponse.httpCode === 401 ||
      myLinksApiResponse.httpCode === 403
    ) {
      doLogout();
      return;
    }

    setUrls((prev) => {
      return [...prev, ...myLinksApiResponse.urls];
    });

    setNextOffset(myLinksApiResponse.next_offset);
    setShowLoadMoreButton(
      limit * myLinksApiResponse.next_offset < myLinksApiResponse.total_records
    );

    setLoading(false);
  };

  const loadMoreUrls = () => {
    fetchMyLinks();
  };

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

          {showLoadMoreButton ? (
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
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardLinks;
