import React, { ReactNode, useEffect, useState } from "react";
import { getUrlMetrics } from "../../api/dashboard/dashboard";
import { LatestHit } from "../../api/dashboard/dashboard.api.modal";
import { UrlMetricApiResponse } from "../../api/dashboard/dashboard.api.response";
import useAuth from "../../hooks/useAuth";
import { convertTimestampToDateTime } from "../../utils/datetimeutils";
import InternalLoader from "../loader/internal-loader/InternalLoader";
import {
  InternalLoaderSize,
  InternalLoaderSpeed,
} from "../loader/Loader.enums";
import URLMetadata from "./URLMetadata/URLMetadata";

import "./ShortUrlMetricModal.css";

const ShortUrlMetricModal = (props: ShortUrlMetricModalProps) => {
  const { getUserId, getAuthToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [totalHits, setTotalHits] = useState(0);
  const [avgRedirectDuration, setAvgRedirectDuration] = useState(0);
  const [latestHits, setLatestHits] = useState([] as LatestHit[]);

  useEffect(() => {
    fetchUrlMetrics();
    // eslint-disable-next-line
  }, []);

  const fetchUrlMetrics = async () => {
    const apiResponse: UrlMetricApiResponse = await getUrlMetrics({
      userId: getUserId()!,
      shortUrl: props.shortUrl,
      endTime: new Date().getTime(),
      startTime: 0,
      limit: 10,
      authToken: getAuthToken()!,
    });

    if (apiResponse.httpCode !== 200) {
      closeModal();
      return;
    }

    setAvgRedirectDuration(apiResponse.avg_redirect_duration);
    setTotalHits(apiResponse.total_hits);
    setLatestHits(apiResponse.latest_hits);
    setLoading(false);
  };

  const closeModal = () => {
    setLoading(false);
    props.onClose();
  };

  const renderModalContent = (): ReactNode => {
    return (
      <React.Fragment>
        <div className="url__metadata__modal__content__wrapper">
          <div className="url__metadata__container">
            <URLMetadata title="Original URL" value={props.originalUrl} />
            <URLMetadata title="Short URL" value={props.shortUrl} />
            <URLMetadata title="Created At" value={props.createdAt} />
            <URLMetadata title="Created From IP" value={props.createdByIp} />
            <URLMetadata title="Total Hits" value={totalHits} />
            <URLMetadata
              title="Avg Redirect Duration"
              value={avgRedirectDuration}
            />
          </div>

          <div className="latest__hits">
            <div className="heading">Latest Hits</div>

            <table>
              <tbody>
                <tr>
                  <th>S.No</th>
                  <th>Timestamp</th>
                  <th>IP Address</th>
                  <th>OS</th>
                  <th>Browser</th>
                  <th>Country</th>
                  <th>Redirect Duration</th>
                  <th>Timezone</th>
                </tr>

                {latestHits.map((hit, index) => (
                  <tr key={hit.ip + hit.timestamp}>
                    <td>{index + 1}</td>
                    <td>{convertTimestampToDateTime(hit.timestamp)}</td>
                    <td>{hit.ip}</td>
                    <td>{hit.device_info.os}</td>
                    <td>{hit.device_info.browser}</td>
                    <td>{hit.location.country}</td>
                    <td>{hit.redirect_duration}ms</td>
                    <td>{hit.location.timezone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className="modal__overlay short__url__metric__modal__overlay">
        <dialog
          className="short__url__metric__modal__dialog"
          open
          onKeyDown={(event: React.KeyboardEvent<HTMLDialogElement>) => {
            if (event.key === "Escape") {
              closeModal();
            }
          }}
        >
          <div className="url__metric__dialog__title__container">
            <div className="title">Short URL Metrics</div>
            <div
              className="close__button__container"
              onClick={() => {
                closeModal();
              }}
              title="Close"
            >
              <img
                src="/assets/icons/close.png"
                alt="url__metric__dialog__close__btn"
              />
            </div>
          </div>

          {loading ? (
            <InternalLoader
              speed={InternalLoaderSpeed.MEDIUM}
              size={InternalLoaderSize.MEDIUM}
            />
          ) : (
            renderModalContent()
          )}
        </dialog>
      </div>
    </React.Fragment>
  );
};

export default ShortUrlMetricModal;
