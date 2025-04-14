import { FC } from "react";
import { ITask } from "../../types"
import { container, description, title } from "./Task.css";

type TTaskProps = {
  taskName: string;
  taskDescription: string;
  boardId: string;
  id: string;
  index: number;
}

const Tasks: FC<TTaskProps> = ({ taskName, taskDescription, boardId, id, index }) => {
  return (
    <div className={container}>
      <div className={title}>{taskName}</div>
      <div className={description}>{taskDescription}</div>
    </div>
  )
}

export default Tasks
