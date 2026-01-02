import React, { Suspense, lazy } from "react";
import Slider from "../Components/Slider";

const Insurance = lazy(() => import("./Components/Insurance"));
const MutualFund = lazy(() => import("./MutualFund"));
const Loans = lazy(() => import("./Components/Loans"));
const OtherServices = lazy(() => import("./Components/OtherServices"));
const AboutUs = lazy(() => import("./Components/AboutUs"));
const ContactUs = lazy(() => import("./Components/ContactUs"));

export default function Home() {
  return (
    <>
      <Slider />
      <Suspense fallback={<div>Loading...</div>}>
        <Insurance />
        <MutualFund />
        <Loans />
        <OtherServices />
        <AboutUs />
        <ContactUs />
      </Suspense>
    </>
  );
}
