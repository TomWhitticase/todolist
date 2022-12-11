import { useEffect, useState } from "react";
import { ITask } from "../@types/Task.d";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import { GrClose } from "react-icons/gr";
import Task from "./Task";
import Modal from "./Modal";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import EmailList from "./EmailList";
import { Box, Button, Card, Fab, TextField, Typography } from "@mui/material";

export default function Container() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showEmailList, setShowEmailList] = useState(false);

  const loadFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  };
  const saveToLocalStorage = (tasks: ITask[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  useEffect(() => loadFromLocalStorage(), []);

  const [name, setName] = useState<string>("");

  const [showInputTask, setShowInputTask] = useState<boolean>(false);

  const addNewTask = () => {
    if (name === "") {
      toast.error("Enter a task name!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const newTasks = [
      ...tasks,
      {
        name: name,
        checked: false,
        id: Math.random(),
      },
    ];

    setTasks(newTasks);
    saveToLocalStorage(newTasks);

    // toast.success("New task added!", {
    //   position: "top-left",
    //   autoClose: 3000,
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
    setShowInputTask(false);
  };

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    saveToLocalStorage(newTasks);
  };

  const toggleCheck = (id: number) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.checked = !task.checked;
      }
      return task;
    });
    setTasks(newTasks);
    saveToLocalStorage(newTasks);
  };

  return (
    <>
      <Box
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ToastContainer />
        <Modal setOpen={setShowInputTask} open={showInputTask}>
          <>
            <Typography sx={{ textAlign: "center" }} variant={"h6"}>
              Create a new Task
            </Typography>
            <TextField
              type="text"
              label="New Task"
              placeholder="Task Name"
              onChange={(input) => {
                setName(input.target.value);
              }}
            />

            <Button
              variant="contained"
              onClick={() => {
                addNewTask();
                setName("");
              }}
            >
              Create
            </Button>
          </>
        </Modal>
        <Box
          sx={{
            width: "100%",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            maxHeight: "20rem",
            overflowX: "auto",
          }}
        >
          {tasks.map((task, i) => {
            return (
              <Task
                key={i}
                task={task}
                deleteTask={deleteTask}
                toggleCheck={toggleCheck}
              />
            );
          })}
          {tasks.length === 0 && (
            <Card sx={{ padding: 2 }}>Add some items to your list!</Card>
          )}
          <div className="w-full flex justify-center items-center">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setShowInputTask(true)}
            >
              <AddIcon />
            </Fab>
          </div>
        </Box>

        <Button
          sx={{ display: "flex", gap: 1 }}
          variant="outlined"
          onClick={() => setShowEmailList(true)}
        >
          <SendIcon /> Email My List
        </Button>
        <Modal setOpen={setShowEmailList} open={showEmailList}>
          <EmailList tasks={tasks} setShowEmailList={setShowEmailList} />
        </Modal>
      </Box>
    </>
  );
}
