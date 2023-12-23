import React, { useState } from "react";
import ShortUrlMetricModal from "../short-url-metric-modal/ShortUrlMetricModal";
import "./MyLink.css";
import { MyLinkProps } from "./MyLink.types";

const MyLink = (props: MyLinkProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <React.Fragment>
      {showDialog ? (
        <ShortUrlMetricModal
          onClose={() => {
            setShowDialog(false);
          }}
          createdAt={props.url.created_at}
          originalUrl={props.url.original_url}
          shortUrl={props.url.short_url}
          createdByIp={props.url.ip_address}
        />
      ) : null}

      <div
        className="my__link__container"
        onClick={() => {
          setShowDialog(true);
        }}
      >
        <div className="serial__urls__container">
          <div className="serial__number__container">
            <span>{props.serialNumber}</span>
          </div>

          <div className="urls__container">
            <div className="short__url__container">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Short URL:&nbsp;
              </span>
              {props.url.short_url}
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
            {props.url.created_at}
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
      </div>
    </React.Fragment>
  );
};

export default MyLink;
