import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogItem } from "../../types";

type TLoggerState = {
  logArray: ILogItem[]
}

const initialState: TLoggerState = {
  logArray: []
}

const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    addBoardLog: (state, { payload }: PayloadAction<ILogItem>) => {
      state.logArray.push(payload)
    }
  }
})

export const { addBoardLog } = loggerSlice.actions;
export const loggerReducer = loggerSlice.reducer;
