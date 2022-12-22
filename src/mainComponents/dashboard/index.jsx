import Card from "../../compnents/Dashboard/Card";
import { DataContext, UserContext } from "../../NavWrapper";

import { useState, useContext, useEffect } from "react";
import TaskCard from "../../compnents/Dashboard/taskCard";

const Dashboard = () => {
  const data = useContext(DataContext);
  const user = useContext(UserContext);
  const [call, setCall] = useState(false);
  const [Data, setData] = useState(data && data.tasks ? data.tasks : []);

  useEffect(() => {
    if (data && data.hasOwnProperty("tasks")) {
      setData(data.tasks);
    }
  }, [data]);

  return (
    <div className="flex flex-col h-screen items-center w-full mt-6">
      <div className="flex flex-row w-full mx-auto items-center justify-around">
        <Card user={user} Data={Data} />
      </div>
      <TaskCard user={user} Data={Data} setCall={setCall} call={call} />
    </div>
  );
};

export default Dashboard;
