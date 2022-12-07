import { allow } from "joi";
import React from "react";
import { useState, useEffect } from "react";

import ReactDOM from "react-dom";
import { VictoryPie } from "victory";

const Charts = ({ urgent, regular, casual, completed }) => {
  return (
    <VictoryPie
      animate={{
        duration: 2000,
      }}
      colorScale={["#FF452C", "#ff9900", "#00FF47", "#0B63C5"]}
      responsive={true}
      height={400}
      style={{labels:{color:"#ff9900"}}}
      
      width={400}
      innerRadius={100}
      data={[
        { x: "urgent", y: urgent },
        { x: "regular", y: regular },
        { x: "casual", y: casual },
        { x: "completed", y: completed },
      ]}
    />
  );
};

export default Charts;
