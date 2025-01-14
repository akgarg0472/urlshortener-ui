import React from "react";

import "./Subscription.css";

type SubscriptionProps = {
  subscription_id: string;
  activated_at: number;
  expires_at: number;
  status: string;
  pack_id: string;
};

const SubscriptionKV = (props: { itemKey: string; value: any }) => {
  return (
    <React.Fragment>
      <div className="subs__kv">
        <span className="key">{props.itemKey}:&nbsp;</span>
        <span className="value">{props.value}</span>
      </div>
    </React.Fragment>
  );
};

export const Subscription = (subscription: SubscriptionProps) => {
  return (
    <React.Fragment>
      <div className="subscription__container">
        {Object.entries(subscription).map(
          (entry: [string, string | number], index: number) => {
            const key = entry[0]
              .split("_")
              .map((word) => {
                return word.charAt(0).toUpperCase() + word.substring(1);
              })
              .join(" ");

            const value = entry[1];

            return <SubscriptionKV key={index} itemKey={key} value={value} />;
          }
        )}

        <div className={`ribbon ribbon__${subscription.status.toLowerCase()}`}>
          {subscription.status}
        </div>
      </div>
    </React.Fragment>
  );
};
