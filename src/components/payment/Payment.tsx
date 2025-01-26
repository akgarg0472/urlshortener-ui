import React from "react";
import { PaymentStatus } from "../../api/payment/payment.api.response";
import { formatToBrowserTimeZoneIfValid } from "../../utils/datetimeutils";

import "./Payment.css";

type PaymentProps = {
  id: string;
  pack_id: string;
  amount: number;
  payment_status: PaymentStatus;
  currency: string;
  payment_method: string;
  created_at: number;
  updated_at: number;
};

const PaymentKV = (props: { itemKey: string; value: any }) => {
  return (
    <React.Fragment>
      <div className="payment__kv">
        <span className="key">{props.itemKey}:&nbsp;</span>
        <span className="value">{props.value}</span>
      </div>
    </React.Fragment>
  );
};

export const Payment = (payment: PaymentProps) => {
  return (
    <React.Fragment>
      <div className="payment__container">
        {Object.entries(payment).map(
          (entry: [string, string | number], index: number) => {
            const key = entry[0]
              .split("_")
              .map((word) => {
                return word.charAt(0).toUpperCase() + word.substring(1);
              })
              .join(" ");

            const value = formatToBrowserTimeZoneIfValid(entry[1]);

            return <PaymentKV key={index} itemKey={key} value={value} />;
          }
        )}
      </div>
    </React.Fragment>
  );
};
