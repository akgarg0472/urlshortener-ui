import React, { ReactNode, useEffect, useState } from "react";
import { LatestHit, UrlMetricApiResponse } from "../../api/apiModals";
import { urlMetrics } from "../../api/dashboard";
import useAuth from "../../hooks/useAuth";
import { convertTimestampToDateTime } from "../../utils/datetimeutils";
import InternalLoader, {
  LoaderSize,
  LoaderSpeed,
} from "../loader/internal-loader/InternalLoader";
import "./ShortUrlMetricModal.css";
import URLMetadata from "./URLMetadata/URLMetadata";

interface ShortUrlMetricModalProps {
  onClose: () => void;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  createdByIp: string;
}

const ShortUrlMetricModal = (props: ShortUrlMetricModalProps) => {
  const { getUserId } = useAuth();

  const [loading, setLoading] = useState(true);
  const [totalHits, setTotalHits] = useState(0);
  const [avgRedirectDuration, setAvgRedirectDuration] = useState(0);
  const [latestHits, setLatestHits] = useState([] as LatestHit[]);

  useEffect(() => {
    setTimeout(() => {
      const apiResponse: UrlMetricApiResponse = urlMetrics({
        userId: getUserId()!!,
        shortUrl: props.shortUrl,
        endTime: new Date().getTime(),
        startTime: 0,
        limit: 10,
      });

      if (apiResponse.httpCode !== 200) {
        // do error handling
      }

      setAvgRedirectDuration(apiResponse.avg_redirect_duration);
      setTotalHits(apiResponse.total_hits);
      setLatestHits(apiResponse.latest_hits);
      setLoading(false);
    }, 1000);
  }, []);

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
                <tr>
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
              speed={LoaderSpeed.MEDIUM}
              size={LoaderSize.MEDIUM}
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
