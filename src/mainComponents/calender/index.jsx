import React from "react";
import MainCalender from "../../compnents/Calender/main";

import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../NavWrapper";

const Calender = () => {
  const data = useContext(DataContext);
  const [Data, setData] = useState(data && data.tasks ? data.tasks : []);

  return <MainCalender Data={Data} />;
};

export default Calender;
