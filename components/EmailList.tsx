import { Button, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { ITask } from "../@types/Task.d";
import ReactDOMServer from "react-dom/server";

interface IProps {
  setShowEmailList: any;
  tasks: ITask[];
}
export default function EmailList({ setShowEmailList, tasks }: IProps) {
  const getTasksAsEmail = () => {
    return ReactDOMServer.renderToStaticMarkup(
      <>
        <h1>My To-do List</h1>
        <ul>
          {tasks.map((task) => {
            return task.checked ? (
              <li style={{ textDecorationLine: "line-through" }}>
                {task.name} ✓
              </li>
            ) : (
              <li>{task.name}</li>
            );
          })}
        </ul>
        <a>Created with https://todolist-seven-neon.vercel.app/</a>
      </>
    );
  };

  const [sendingEmail, setSendingEmail] = useState(false);
  const sendEmail = async (e: any) => {
    e.preventDefault();
    setSendingEmail(true);

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

    if (!emailRegex.test(emailInput)) {
      toast.error("Enter a valid email address!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSendingEmail(false);
      return;
    }
    let data = {
      email: emailInput,
      message: getTasksAsEmail(),
    };

    fetch("/api/email", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Response received");
      if (res.status === 200) {
        setSendingEmail(false);
        toast.success("Message sent!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowEmailList(false);
      } else {
        setSendingEmail(false);
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  const [emailInput, setEmailInput] = useState<string>("");
  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant={"h6"}>
        Email Your To-do List
      </Typography>
      <div className="flex gap-4 flex-wrap justify-center items-center">
        <TextField
          label="Email Address"
          variant="outlined"
          onChange={(input) => {
            setEmailInput(input.target.value);
          }}
          placeholder="Your email address"
        />

        <div className="">
          {sendingEmail ? (
            <Button variant="contained" disabled={true}>
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </Button>
          ) : (
            <Button variant="contained" onClick={sendEmail}>
              Send
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
