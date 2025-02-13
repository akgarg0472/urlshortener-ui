import { ExternalLinkIcon, InfoIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { convertUtcTimeStringToLocalTime } from "../../utils/datetimeutils";
import { getEnv } from "../../utils/envutils";
import ShortUrlMetricModal from "../short-url-metric-modal/ShortUrlMetricModal";
import { MyLinkProps } from "./MyLink.types";

import "./MyLink.css";

const MyLink = (props: MyLinkProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [shortUrl, setShortUrl] = useState<string>("");

  useEffect(() => {
    const prefixUrl = getEnv(
      "REACT_APP_PREFIX_URL_FOR_SHORT_URL",
      "http://localhost:3000/"
    );
    const formattedUrl = prefixUrl.endsWith("/") ? prefixUrl : `${prefixUrl}/`;
    setShortUrl(`${formattedUrl}${props.url.short_url}`);
    // eslint-disable-next-line
  }, []);

  const openLink = () => {
    const url =
      shortUrl.startsWith("http://") || shortUrl.startsWith("https://")
        ? shortUrl
        : `http://${shortUrl}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <React.Fragment>
      {showDialog ? (
        <ShortUrlMetricModal
          onClose={() => {
            setShowDialog(false);
          }}
          createdAt={convertUtcTimeStringToLocalTime(props.url.created_at)}
          originalUrl={props.url.original_url}
          shortUrl={shortUrl}
          createdByIp={props.url.ip_address}
        />
      ) : null}

      <div className="my__link__container">
        <div className="serial__number__container">
          <span>{props.serialNumber}</span>
        </div>

        <div className="content">
          <div className="urls__container">
            <div className="short__url__container">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Short URL:&nbsp;
              </span>
              {`${shortUrl}`}
            </div>

            <div className="original__url__container">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Original URL:&nbsp;
              </span>
              {props.url.original_url}
            </div>
          </div>

          <div className="metadata__container">
            <div className="created__at__container">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Created At:&nbsp;
              </span>
              {convertUtcTimeStringToLocalTime(props.url.created_at)}
            </div>

            <div className="ip__address__container">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                IP Address:&nbsp;
              </span>
              {props.url.ip_address}
            </div>
          </div>

          <div className="buttons__container">
            <button
              onClick={() => setShowDialog(true)}
              style={{
                background: "none",
                outline: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
                margin: "0",
              }}
              title="Show Metrics"
            >
              <InfoIcon />
            </button>

            <button
              onClick={() => openLink()}
              style={{
                background: "none",
                outline: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
                margin: "0",
              }}
              title="Open Link"
            >
              <ExternalLinkIcon />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyLink;
