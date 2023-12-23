import React from "react";
import "./Shimmer.css";

interface ShimmerProps {
  style?: React.CSSProperties;
  classname?: string;
}

const Shimmer = (props: ShimmerProps) => (
  <div
    className={`shimmer ${props.classname} ? ${props.classname}:''`}
    style={props.style}
  ></div>
);

export default Shimmer;
