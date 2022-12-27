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
import TasksContainer from "./TasksContainer";

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
        <TasksContainer tasks={tasks} setTasks={setTasks} />

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
