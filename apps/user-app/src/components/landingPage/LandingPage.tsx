"use client";

import React from "react";
import Nav from "./Nav";
import { Hero } from "./Hero";

import { HeroImage } from "./HeroImage";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <>
    <div className="max-w-screen-xl m-auto h-full">{children}</div>
  </>
);

export default function LandingPage() {
  return (
    <div className="">
      <Nav />
      <Layout>
        <div className="flex  h-[80vh] items-center justify-center">
          <Hero />
        </div>
        <div className=" mb-28 flex items-center justify-center">
          <HeroImage />
        </div>
      </Layout>
      <div>
        <Footer />
      </div>
    </div>
  );
}
