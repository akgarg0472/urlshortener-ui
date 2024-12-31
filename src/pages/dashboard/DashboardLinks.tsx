import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyLinks } from "../../api/dashboard/dashboard";
import { USURL } from "../../api/dashboard/dashboard.api.modal";
import { MyLinksApiResponse } from "../../api/dashboard/dashboard.api.response";
import RegularButton from "../../components/button/RegularButton";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";
import Modal from "../../components/modal/Modal";
import { ModalIcon } from "../../components/modal/Modal.enums";
import MyLink from "../../components/mylink/MyLink";
import {
  DASH_MY_LINKS_HEAD,
  DASH_MY_LINKS_SUBHEAD,
  LOGIN_URL,
} from "../../constants";
import useAuth from "../../hooks/useAuth";

import "./Dashboard.css";

const DashboardLinks = () => {
  const { getUserId, getAuthToken, logout } = useAuth();
  const navigate = useNavigate();

  const [urls, setUrls] = useState([] as USURL[]);
  const [nextOffset, setNextOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(false);
  const [limit] = useState<number>(10);

  useEffect(() => {
    document.title = "My Links";
    fetchMyLinks();
    // eslint-disable-next-line
  }, []);

  const fetchMyLinks = async () => {
    const userId = getUserId();
    const authToken = getAuthToken();

    if (!userId || !authToken) {
      logout();
      navigate(LOGIN_URL, { replace: true });
      return;
    }

    setLoading(true);

    const myLinksApiResponse: MyLinksApiResponse = await getMyLinks({
      userId: userId,
      offset: nextOffset,
      limit: limit,
      authToken: authToken,
    });

    setLoading(false);

    if (
      myLinksApiResponse.httpCode === 401 ||
      myLinksApiResponse.httpCode === 403
    ) {
      logout();
      navigate("/login", { replace: true });
      return;
    }

    if (!myLinksApiResponse.success) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message: myLinksApiResponse.message,
      });
      return;
    }

    setUrls((prev) => {
      return [...prev, ...myLinksApiResponse.urls];
    });

    setNextOffset(myLinksApiResponse.next_offset);
    setShowLoadMoreButton(
      limit * myLinksApiResponse.next_offset < myLinksApiResponse.total_records
    );
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
                {urls.length === 0 ? (
                  <span>No URLs to display</span>
                ) : (
                  urls.map((url, index) => (
                    <MyLink
                      url={url}
                      serialNumber={index + 1}
                      key={`${url.short_url}_${index}`} // todo: fix later
                      userId={getUserId()!}
                    />
                  ))
                )}
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
