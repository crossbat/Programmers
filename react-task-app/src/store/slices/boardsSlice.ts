import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";
import { board } from "../../types/App.css";

type TboardState = {
  modalActive: boolean,
  boardArray: IBoard[]
}

type TAddBoardAction = {
  board: IBoard;
}

type TDeleteListAction = {
  boardId: string;
  listId: string;
}

type TAddListAction = {
  boardId: string;
  list: IList;
}

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
}

type TDeleteBoardAction = {
  boardId: string;
}

const initialState: TboardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫번째 게시물',
      lists: [
        {
          listId: 'list-0',
          listName: 'list 1',
          tasks: [
            {
              taskId: 'task-0',
              taskName: 'Task 1',
              taskDescription: 'Description',
              taskOwner: 'John'
            },
            {
              taskId: 'task-1',
              taskName: 'Task 2',
              taskDescription: 'Description',
              taskOwner: 'John'
            }
          ]
        },
        {
          listId: 'list-1',
          listName: 'list 2',
          tasks: [
            {
              taskId: 'task-3',
              taskName: 'Task 3',
              taskDescription: 'Description',
              taskOwner: 'John'
            }
          ]
        }
      ]
    }
  ]
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board)
    },

    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(board =>
        board.boardId !== payload.boardId
      )
    },

    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map(board => board.boardId === payload.boardId ? {
        ...board,
        lists: board.lists.filter(
          list => list.listId !== payload.listId
        )
      } : board)
    },

    modalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },

    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      state.boardArray.map(board =>
        board.boardId === payload.boardId ? { ...board, list: board.lists.push(payload.list) } : board
      )
    },

    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray.map(board =>
        board.boardId === payload.boardId
          ? {
            ...board,
            lists: board.lists.map(list =>
              list.listId === payload.listId
                ? {
                  ...list,
                  tasks: list.tasks.push(payload.task)
                }
                : list
            )
          }
          : board
      )
    },
    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map(board =>
        board.boardId === payload.boardId
          ? {
            ...board,
            lists: board.lists.map(list =>
              list.listId === payload.listId
                ? {
                  ...list,
                  tasks: list.tasks.map(task =>
                    task.taskId === payload.task.taskId
                      ? payload.task
                      : task
                  )
                }
                : list
            )
          }
          : board
      )
    },
    deleteTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map(board =>
        board.boardId === payload.boardId
          ? {
            ...board,
            lists: board.lists.map(list =>
              list.listId === payload.listId
                ? {
                  ...list,
                  tasks: list.tasks.filter(
                    task => task.taskId !== payload.task.taskId
                  )
                }
                : list
            )
          }
          : board
      )
    }
  }
})

export const { addBoard, deleteBoard, deleteList, modalActive, addList, addTask, updateTask, deleteTask } = boardsSlice.actions;
export const BoardsReducer = boardsSlice.reducer;
