import React from "react";
import "./KVPair.css";

interface KVPairProps {
  _key: string;
  value: string;
}

const KVPair = (props: KVPairProps) => {
  return (
    <React.Fragment>
      <div className="kv__container">
        <div className="kv__key">{props._key}</div>
        <div className="kv__value">{props.value}</div>
      </div>
    </React.Fragment>
  );
};

export default KVPair;
