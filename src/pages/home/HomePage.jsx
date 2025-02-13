import React, { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import CustomerTestinomial from "../../components/home-customer-testimonials/CustomerTestinomial";
import HomeFAQ from "../../components/home-faq/HomeFAQ";
import HomeHero from "../../components/home-hero/HomeHero";
import HomeNavbar from "../../components/home-navbar/HomeNavbar";
import HomePricing from "../../components/home-pricing/HomePricing";
import HomeStatistics from "../../components/home-statistics/HomeStatistics";
import WhyChooseUs from "../../components/home-why-choose-us/WhyChooseUs";

const HomePage = () => {
  useEffect(() => {
    document.title =
      "Cmpct URL Shortener: Free, Fast & Reliable Link Shortening";
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
