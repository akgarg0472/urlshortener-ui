import React from "react";
import { HOME_CUSTOMER_TESTIMONIALS } from "../../constants";
import HomeHeading from "../home-heading/HomeHeading";

import { homeCustomerTestimonials } from "../../utils/data";
import CustomerTestimonialCard from "./CustomerTestinomialCard/CustomerTestimonialCard";

import "./CustomerTestimonial.css";

const CustomerTestimonial = () => {
  return (
    <React.Fragment>
      <div className="customer__testimonials__container">
        <HomeHeading title={HOME_CUSTOMER_TESTIMONIALS} />

        <div className="customer__testimonials__cards__container">
          {homeCustomerTestimonials.map((testimonial) => (
            <CustomerTestimonialCard
              key={testimonial.id}
              image={testimonial.image}
              name={testimonial.name}
              designation={testimonial.designation}
              review={testimonial.review}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomerTestimonial;
