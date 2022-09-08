import React, { useState } from "react";
import Nickname from "../components/join/nickname";
import Layout from "../components/common/Layout";
const Join = () => {
  const [mode, setMode] = useState("Access");

  return (
    <Layout>
      <Nickname />
    </Layout>
  );
};

export default Join;
