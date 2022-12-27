import {
  Checkbox,
  Fab,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ITask } from "../@types/Task.d";

interface IProps {
  tasks: ITask[];
  setTasks: any;
}

export default function TasksContainer({
  tasks: tasks,
  setTasks: setTasks,
}: IProps) {
  const [invalidNewTaskName, setInvalidNewTaskName] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          checked: !task.checked,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const newTask = () => {
    //check if new task name is valid
    if (newTaskName === "") {
      setInvalidNewTaskName(true);
      return;
    }
    setInvalidNewTaskName(false);
    // add new task using the value from the textfield

    setTasks([
      ...tasks,
      {
        id: getNewTaskId(tasks),
        name: newTaskName,
        completed: false,
      },
    ]);
    setNewTaskName("");
  };
  const deleteTask = (id: number) => {
    // delete task with given id
    const updatedTasks = tasks.filter((Task) => Task.id !== id);
    setTasks(updatedTasks);
  };
  const TaskButton = ({ task }: { task: ITask }) => {
    return (
      <>
        <ListItemButton disableGutters onClick={() => toggleComplete(task.id)}>
          <ListItemIcon>
            <Checkbox color={"success"} checked={task.checked} />
          </ListItemIcon>
          <ListItemText primary={task.name} />
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
      </>
    );
  };
  return (
    <>
      <div className="h-96 overflow-auto w-64">
        <div className="flex p-2 gap-2">
          <TextField
            value={newTaskName}
            error={invalidNewTaskName}
            helperText={invalidNewTaskName ? "Enter a new task" : ""}
            size="small"
            variant={"standard"}
            sx={{ flex: 1 }}
            label="New task"
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <Fab size="small" color="primary" onClick={newTask}>
            <AddIcon />
          </Fab>
        </div>
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskButton key={task.id} task={task} />)
        ) : (
          <div className="w-full flex items-center justify-center p-4">
            No tasks
          </div>
        )}
      </div>
    </>
  );
}
function getNewTaskId(Tasks: ITask[]) {
  let newId = 1;
  while (Tasks.some((Task) => Number(Task.id) === newId)) {
    newId++;
  }
  return newId;
}
