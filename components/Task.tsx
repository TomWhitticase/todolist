import { ITask } from "../@types/Task.d";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface IProps {
  task: ITask;
  deleteTask: any;
  toggleCheck: any;
}

export default function Task({ task, deleteTask, toggleCheck }: IProps) {
  return (
    <>
      <Card
        sx={{
          width: "100%",
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <button
          className="text-4xl hover:text-green-500 duration-300 flex items-center justify-center"
          onClick={() => toggleCheck(task.id)}
        >
          {task.checked ? (
            <CheckBoxIcon className="text-green-500" />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </button>

        <Box
          sx={{
            maxWidth: "20rem",
            overflowX: "hidden",
            width: "100%",
            textDecorationLine: task.checked ? "line-through" : "none",
          }}
        >
          {task.name}
        </Box>

        <button
          onClick={() => deleteTask(task.id)}
          className="hover:text-red-500 duration-300 flex justify-center items-center"
        >
          <DeleteIcon />
        </button>
      </Card>
    </>
  );
}
