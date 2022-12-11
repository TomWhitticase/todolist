import { SetStateAction, useEffect, useState } from "react";
import { ITask } from "../@types/Task.d";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import Task from "./Task";
import Modal from "./Modal";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import EmailList from "./EmailList";

export default function () {
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
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.checked = !task.checked;
        }
        return task;
      })
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <ToastContainer />
        <Modal setOpen={setShowInputTask} open={showInputTask}>
          <>
            <button
              className="absolute top-2 right-2"
              onClick={() => setShowInputTask(false)}
            >
              <GrClose />
            </button>

            <h1 className="font-bold text-center text-3xl">Add new task</h1>
            <input
              type="text"
              placeholder="name"
              className="px-2 py-1 border-2 border-black"
              onChange={(input) => {
                setName(input.target.value);
              }}
            />

            <button
              onClick={() => {
                addNewTask();
                setName("");
              }}
              className="bg-green-500 hover:bg-green-400 active:bg-green-600 hover:scale-[1.05] transition-all duration-300 text-white py-1 px-4 rounded"
            >
              Create
            </button>
          </>
        </Modal>
        <div className="p-2 flex flex-col gap-2 w-full h-[30rem] overflow-y-auto">
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
          <div className="w-full flex justify-center items-center">
            <button
              className="text-5xl hover:text-green-500 duration-300"
              onClick={() => {
                setShowInputTask(true);
              }}
            >
              <AiOutlinePlusCircle />
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowEmailList(true)}
          className="bg-blue-500 p-4 rounded text-white"
        >
          Email me my To-do list!
        </button>
        <Modal setOpen={setShowEmailList} open={showEmailList}>
          <EmailList tasks={tasks} setShowEmailList={setShowEmailList} />
        </Modal>
      </div>
    </>
  );
}
