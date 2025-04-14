import { FC } from "react";
import { IList, ITask } from "../../types"
import { GrSubtract } from "react-icons/gr";
import Tasks from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList, modalActive } from "../../store/slices/boardsSlice";
import { addBoardLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, header, listWrapper, name } from "./List.css";


type TListProps = {
  list: IList;
  boardId: string;
}

const List: FC<TListProps> = ({ list, boardId }) => {
  const dispatch = useTypedDispatch();
  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(addBoardLog({
      logId: v4(),
      logMessage: `리스트 삭제하기: ${list.listName}`,
      logAuthor: 'user',
      logTimestamp: String(Date.now())
    }))
  }

  const handleTaskChange = (boardId: string, listId: string, taskId: string, task: ITask) => {
    dispatch(setModalData(({ boardId, listId, task })));
    dispatch(modalActive(true));
  }

  return (
    <div className={listWrapper}>
      <div className={header}>
        <div className={name}>
          {list.listName}
        </div>
        <GrSubtract onClick={() => handleListDelete(list.listId)} className={deleteButton} />
      </div>
      {list.tasks.map((task, index) => (
        <div key={task.taskId} onClick={() => handleTaskChange(boardId, list.listId, task.taskId, task)}>
          <Tasks taskName={task.taskName} taskDescription={task.taskDescription} boardId={boardId} id={task.taskId} index={index} />
        </div>
      ))}
      <ActionButton boardId={boardId} listId={list.listId} />
    </div>
  )
}

export default List
