import React from "react";
import HomeHeading from "../home-heading/HomeHeading";
import { HOME_FAQ, HOME_FAQ_DESC } from "../../constants";
import { faqQuestions } from "../../utils/data";
import Accordian from "./accordian/Accordian";

import "./HomeFAQ.css";

const HomeFAQ = () => {
  return (
    <React.Fragment>
      <div className="home__faq__container">
        <HomeHeading
          title={HOME_FAQ}
          subtitle={HOME_FAQ_DESC}
          darkMode={true}
        />

        <div className="faq__accordian__container">
          {faqQuestions.map((faq) => (
            <Accordian key={faq.id} title={faq.title} content={faq.content} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeFAQ;
