import React from "react";
import "./KVPair.css";

interface KVPairProps {
  _key: string;
  value: string;
  style?: React.CSSProperties;
  icon?: string;
}

const KVPair = (props: KVPairProps) => {
  return (
    <React.Fragment>
      <div className="kv__container" style={props.style}>
        <div className="kv__key">{props._key}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="kv__value">{props.value ? props.value : "-"}</div>
          {props.icon ? (
            <div className="kv__icon">
              <img src={props.icon} alt={`${props._key}__kv__icon`} />
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default KVPair;
