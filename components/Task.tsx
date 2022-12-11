import { ITask } from "../@types/Task.d";
import { BiCheckbox, BiCheckboxChecked, BiTrash } from "react-icons/bi";

interface IProps {
  task: ITask;
  deleteTask: any;
  toggleCheck: any;
}

export default function ({ task, deleteTask, toggleCheck }: IProps) {
  return (
    <>
      <div className="p-2 w-full shadow-sm border-2 border-gray-200 rounded-md flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center justify-center  ">
          <button
            className="text-4xl hover:text-green-500 duration-300"
            onClick={() => toggleCheck(task.id)}
          >
            {task.checked ? (
              <BiCheckboxChecked className="text-green-500" />
            ) : (
              <BiCheckbox />
            )}
          </button>

          <h2
            className={`text-xl transition-all duration-300 ${
              task.checked && `strike`
            }`}
          >
            {task.name}
          </h2>
        </div>
        <div className="flex gap-4 text-3xl ">
          <button
            onClick={() => deleteTask(task.id)}
            className="hover:text-red-500 duration-300"
          >
            <BiTrash />
          </button>
        </div>
      </div>
    </>
  );
}
