import React from "react";

import "./CustomerTestimonialCard.css";

interface CustomerTestimonialCardProps {
  image: string;
  name: string;
  designation: string;
  review: string;
}

const CustomerTestimonialCard = (props: CustomerTestimonialCardProps) => {
  return (
    <React.Fragment>
      <div className="customer__testimonial__card">
        <img className="image" src={props.image} alt={`${props.name} icon`} />
        <h2 className="name">{props.name}</h2>
        <h2 className="designation">{props.designation}</h2>
        <div className="review">{props.review}</div>
      </div>
    </React.Fragment>
  );
};

export default CustomerTestimonialCard;
