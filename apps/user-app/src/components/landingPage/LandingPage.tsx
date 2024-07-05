import React from "react";

import Link from "next/link";
import Nav from "./Nav";
import { Hero } from "./Hero";

const Layout = ({ children }) => (
  <>
    <div className="max-w-screen-xl m-auto"> {children}</div>
  </>
);

export default function LandingPage() {
  return (
    <div className="">
      <Nav />
      <Layout>{/* <Hero /> */}dafd</Layout>
    </div>
  );
}
