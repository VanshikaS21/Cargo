import React from "react";
import Footer from "./Footer";
import HomepageHero from "./HomepageHero";
import PopularPools from "./PopularPools";
import HowItWorks from "./HowItWorks";
import SafetyAndTrust from "./SafetyAndTrust";
import JoinUs from "./JoinUs";
import ServiceCards from "./ServiceCards";
import Navbar from "./UI/Navbar";

function Homepage() {
  return (
    <>
      <Navbar />
      <HomepageHero />
      <ServiceCards />
      <PopularPools />
      <HowItWorks />
      <SafetyAndTrust />
      <JoinUs />
      <Footer />
    </>
  );
}

export default Homepage;
