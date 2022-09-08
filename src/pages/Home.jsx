import React from "react";
import Stopwatch from "../components/Stopwatch";
import Layout from "../components/common/Layout";
import Quote from "../components/Quote";
import Studing from "../components/Studing";
import TimeTimer from "../components/TimeTimer";

const Home = () => {
  return (
    <Layout>
      <Stopwatch />
      <TimeTimer />
      <Quote />
      <Studing />
    </Layout>
  );
};

export default Home;
