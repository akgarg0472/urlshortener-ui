import React from "react";
import { HOME_WHY_CHOOSE_US, HOME_WHY_CHOOSE_US_DESC } from "../../constants";
import HomeHeading from "../home-heading/HomeHeading";
import WhyChooseUsCard from "./WhyChooseUsCard/WhyChooseUsCard";
import { homeWhyChooseUs } from "../../utils/data";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <React.Fragment>
      <div className="why__choose__us__container">
        <HomeHeading
          className="wcs__heading"
          title={HOME_WHY_CHOOSE_US}
          subtitle={HOME_WHY_CHOOSE_US_DESC}
          darkMode={true}
        />

        <div className="why__choose__us__cards__container">
          {homeWhyChooseUs.map((item) => (
            <WhyChooseUsCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              iconBgColor={item.iconBgColor}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhyChooseUs;
