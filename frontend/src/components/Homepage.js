import React from "react";
import Footer from "./Footer";
import HomepageHero from "./HomepageHero";
import HomepagePools from "./HomepagePools";
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
      <HomepagePools />
      {/* Include Service Cards section here */}
      <ServiceCards />
      {/* Include new sections below */}
      <PopularPools />
      <HowItWorks />
      <SafetyAndTrust />
      <JoinUs />
      <Footer />
    </>
  );
}

export default Homepage;
