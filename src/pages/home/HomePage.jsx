import React, { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import CustomerTestinomial from "../../components/home-customer-testimonials/CustomerTestinomial";
import HomeHero from "../../components/home-hero/HomeHero";
import HomeNavbar from "../../components/home-navbar/HomeNavbar";
import WhyChooseUs from "../../components/home-why-choose-us/WhyChooseUs";

const HomePage = () => {
  useEffect(() => {
    document.title = "URLShortener - Home";
  }, []);

  return (
    <React.Fragment>
      <HomeNavbar />
      <HomeHero />
      <WhyChooseUs />
      <CustomerTestinomial />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
