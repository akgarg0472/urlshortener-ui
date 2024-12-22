import React from "react";
import "./StarRating.css";

const StarRating = (props: { count: number }) => {
  return (
    <React.Fragment>
      <div className="star__ratings">
        {Array.from({ length: props.count }).map((_, idx) => (
          <svg
            key={idx}
            xmlns="http://www.w3.org/2000/svg"
            fill="rgb(234, 179, 8)"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="rgb(234, 179, 8)"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        ))}
        <span>{`(${props.count} star)`}</span>
      </div>
    </React.Fragment>
  );
};

export default StarRating;
