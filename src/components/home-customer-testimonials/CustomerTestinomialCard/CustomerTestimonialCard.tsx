import React from "react";
import StarRating from "./rating-star-container/StarRating";

import "./CustomerTestimonialCard.css";

type CustomerTestimonialCardProps = {
  image: string;
  name: string;
  designation: string;
  review: string;
};

const CustomerTestimonialCard = (props: CustomerTestimonialCardProps) => {
  return (
    <React.Fragment>
      <div className="customer__testimonial__card">
        <div className="image__details__container">
          <img
            className="image"
            src={props.image}
            alt={`${props.name}_customer`}
          />

          <div className="name__designation__container">
            <h2 className="name">{props.name}</h2>
            <h2 className="designation">{props.designation}</h2>
          </div>
        </div>

        <div className="review">{props.review}</div>

        <div className="star__rating__container">
          <StarRating count={5} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomerTestimonialCard;
