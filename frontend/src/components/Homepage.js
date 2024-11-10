import React from "react";
import Footer from "./Footer";
import HomepageHero from "./HomepageHero";
import PopularPools from "./PopularPools";
import HowItWorks from "./HowItWorks";
import SafetyAndTrust from "./SafetyAndTrust";
import JoinUs from "./JoinUs";
import ServiceCards from "./ServiceCards";
import Navbar from "./UI/Navbar";
import Rides from "./Rides";
import {useState} from 'react'

function Homepage() {
  const [rides,setRides] = useState([]);
  return (
    <>
      <Navbar />
      <HomepageHero rides={rides} setRides={setRides}/>
      <Rides rides={rides} setRides={setRides}/>
      <ServiceCards />
      <HowItWorks />
      <SafetyAndTrust />
      <JoinUs />
      <Footer />
    </>
  );
}

export default Homepage;
