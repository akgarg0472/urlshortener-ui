import React, { useEffect } from "react";
import HomeHero from "../../components/home-hero/HomeHero";
import HomeNavbar from "../../components/home-navbar/HomeNavbar";

const HomePage = () => {
  useEffect(() => {
    document.title = "URLShortener - Home";
  }, []);

  return (
    <React.Fragment>
      <HomeNavbar />
      <HomeHero />
    </React.Fragment>
  );
};

export default HomePage;
