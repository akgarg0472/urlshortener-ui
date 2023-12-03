import React from "react";
import {
  HOME_WHY_CHOOSE_US,
  HOME_WHY_CHOOSE_US_DESC,
} from "../../utils/constants";
import HomeHeading from "../home-heading/HomeHeading";

import { homeWhyChooseUs } from "../../utils/data";
import "./WhyChooseUs.css";
import WhyChooseUsCard from "./WhyChooseUsCard/WhyChooseUsCard";

const WhyChooseUs = () => {
  return (
    <React.Fragment>
      <div className="why__choose__us__container">
        <HomeHeading
          title={HOME_WHY_CHOOSE_US}
          subtitle={HOME_WHY_CHOOSE_US_DESC}
        />

        <div className="why__choose__us__cards__container">
          {homeWhyChooseUs.map((item, index) => (
            <WhyChooseUsCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              rightBorder={index != homeWhyChooseUs.length - 1}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhyChooseUs;
