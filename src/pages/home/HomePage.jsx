import React, { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import CustomerTestinomial from "../../components/home-customer-testimonials/CustomerTestinomial";
import HomeHero from "../../components/home-hero/HomeHero";
import HomeNavbar from "../../components/home-navbar/HomeNavbar";
import WhyChooseUs from "../../components/home-why-choose-us/WhyChooseUs";
import HomePricing from "../../components/home-pricing/HomePricing";
import HomeStatistics from "../../components/home-statistics/HomeStatistics";
import HomeFAQ from "../../components/home-faq/HomeFAQ";

const HomePage = () => {
  useEffect(() => {
    document.title = "URLShortener - Home";
  }, []);

  return (
    <React.Fragment>
      <HomeNavbar />
      <HomeHero />
      <WhyChooseUs />
      <HomePricing />
      <HomeStatistics />
      <CustomerTestinomial />
      <HomeFAQ />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
