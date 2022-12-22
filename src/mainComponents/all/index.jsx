import Wrapper from "../../NavWrapper";
import { motion } from "framer-motion";
import TaskPill from "../../compnents/Dashboard/TaskPill";
import { useEffect, useState, useContext } from "react";
import AddTask from "../../compnents/addTask";
import DeleteTaskPop from "../../compnents/addTask/deleteTask";
import { toast } from "react-toastify";
import FilterComp from "../../compnents/allTaskComponents/filter";
import Sort from "../../compnents/allTaskComponents/Sort";
import SearchBar from "../../compnents/allTaskComponents/SearchBar";
import dayjs from "dayjs";
import { DataContext, UserContext } from "../../NavWrapper";
import { postTask, putTask, deleteTask } from "../../data-store";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";

const All = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams({ due: "" });
  const due = searchParams.get("due");
  const data = useContext(DataContext);
  const params = useParams();
  const location = useLocation();
  const [Data, setData] = useState(data && data.tasks.length ? data.tasks : []);
  const user = useContext(UserContext);

  const [taskData, setTaskData] = useState(
    data && data.tasks.length ? data.tasks : []
  );
  const [showing, setShowing] = useState(
    params.id || location.pathname == "/dashboard/all/add" ? true : false
  );
  useEffect(() => {
    if (data) {
      setData(data.tasks);
      setTaskData(data.tasks);
    }
  }, [data, showing]);

  const [search, setSearch] = useState("");
  //console.log(match.params);
  const [sort, setSort] = useState("ascending");
  const [filtered, setFiltered] = useState("All");
  const [results, setResults] = useState(true);
  const [action, setAction] = useState(
    location.pathname == "/dashboard/all/add" ? "Add" : "Edit"
  );
  const [taskId, setTaskId] = useState(params.id ? params.id : "");
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    function SortTask() {
      const taskData1 = [...taskData];
      if (sort == "ascending") {
        taskData1.sort((a, b) => b.createdAt - a.createdAt);

        setTaskData(taskData1);
      } else if (sort == "descending") {
        taskData1.sort((a, b) => a.createdAt - b.createdAt);
        setTaskData(taskData1);
      } else {
        setTaskData(Data);
      }
    }

    SortTask();
  }, [sort]);

  useEffect(() => {
    function FilteredTask() {
      if (filtered == "All") {
        setTaskData(Data);
        setResults(true);
      } else {
        if (filtered == "Pending") {
          const taskData1 = [...Data];
          const filteredDataPending = taskData1.filter(
            (task) => !task.completed
          );
          if (filteredDataPending.length > 0) {
            setTaskData(filteredDataPending);
          } else {
            setTaskData(Data);
          }
        } else if (filtered == "Completed") {
          const taskData1 = [...Data];
          const filteredDataCompleted = taskData1.filter(
            (task) => task.completed
          );

          setTaskData(filteredDataCompleted);
        } else {
          const taskData1 = [...Data];
          const filteredData = taskData1.filter(
            (task) =>
              task.status.toLowerCase() == filtered.toLowerCase() &&
              !task.completed
          );

          if (filteredData.length > 0) {
            setTaskData(filteredData);
            setSort("ascending");
          } else {
            setTaskData(Data);
          }
        }
      }
    }

    FilteredTask();
  }, [filtered]);

  useEffect(() => {
    const searchTasks = () => {
      const taskData1 = [...Data];
      const filteredData = taskData1.filter((task) =>
        task.details.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredData.length > 0) {
        setTaskData(filteredData);
        setResults(true);
      } else {
        setTaskData(Data);
        setResults(false);
      }
      if (search.length === 0) {
        setTaskData(Data);
        setResults(true);
      }
    };

    searchTasks();
  }, [search]);

  const createTask = async (InputData) => {
    const TaskObject = {};
    TaskObject.shouldAlert = InputData.shouldAlert;
    TaskObject.details = InputData.details;
    TaskObject.status = InputData.status;
    TaskObject.completed = false;
    TaskObject.due = dayjs(new Date(InputData.due)).format("YYYY-MM-DD");
    TaskObject.email = data.email;
    TaskObject.createdAt = InputData.createdAt;
    TaskObject.tempId = Data.length + 1;
    const originalData = [...Data];

    try {
      const data = await postTask(TaskObject, user);
      if (data) {
        toast.success("task successfuly created", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      taskData.unshift(TaskObject);
    } catch (error) {
      toast.error("error occured while creating task", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setData(originalData);
      setTaskData(originalData);
    }

    setShowing(false);
  };

  const EditTask = async (inputData) => {
    const taskObject = {};
    taskObject.taskId = inputData.id;
    taskObject.due = dayjs(new Date(inputData.due)).format("YYYY-MM-DD");
    taskObject.details = inputData.details;
    taskObject.status = inputData.status;
    try {
      const data = await putTask(taskObject, user);
      if (data) {
        toast.success("task successfuly updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("error occured trying to update the task", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    setShowing(false);
  };

  const DeleteTask = async (id) => {
    const originalTaskData = [...Data];
    const filteredData = originalTaskData.filter((task) => task._id !== id);
    setData(filteredData);
    setTaskData(filteredData);

    try {
      const data = await deleteTask(id, user);
      if (data) {
        toast.success("task successfuly deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(
        ("an error occured when trying to delete the task",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );

      setTaskData(originalTaskData);
      setData(originalTaskData);
    }
  };

  return (
    <div
      className={`flex ${
        popUp && "items-center"
      } bg-white  dark:bg-black h-screen flex-col`}
    >
      {popUp && (
        <DeleteTaskPop
          setPopUp={setPopUp}
          taskId={taskId}
          sendDelete={DeleteTask}
        />
      )}
      {!showing && (
        <div className="flex w-full flex-row items-center justify-between mt-4">
          <SearchBar search={search} setSearch={setSearch} />

          <div className="lg:flex hidden  flex-row gap-x-6 items-center">
            <FilterComp setFiltered={setFiltered} filtered={filtered} />
            <Sort setSort={setSort} sort={sort} />
          </div>
          <button
            disabled={showing}
            className={` ${
              showing ? "bg-[#c5c5c5]" : "bg-timeline"
            }  py-2 px-3 rounded-md lg:mr-0 mr-4  text-white`}
            onClick={() => {
              setShowing(true);
              setAction("Add");
              setTaskId("");
            }}
          >
            New
          </button>
        </div>
      )}
      <div className="w-full">
        {showing ? (
          <div>
            {showing && (
              <AddTask
                dueDate={due.length > 0 ? due : undefined}
                taskId={taskId}
                action={action}
                sendTask={createTask}
                setShowing={setShowing}
                EditTask={EditTask}
                Data={Data}
              />
            )}
          </div>
        ) : (
          <div className="w-full">
            {taskData && taskData.length > 0 && results === true ? (
              <div className="w-full lg:justify-items-center flex items-center  flex-col mx-auto lg:grid lg:grid-cols-3 ">
                {taskData.map((task, index) => (
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index / 8, duration: 0.5 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <TaskPill
                      setPopUp={setPopUp}
                      setTaskId={setTaskId}
                      setAction={setAction}
                      setShowing={setShowing}
                      id={task._id}
                      key={task._id}
                      details={task.details}
                      createdTime={task.createdAt}
                      status={task.status}
                      completed={task.completed}
                      dueTime={task.due}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center mt-[160px] ">
                <h1>No tasks Found</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default All;
