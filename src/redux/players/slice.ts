import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Player } from "../type";
const initialState: RootState["players"] = [];

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayer: (state: any, action: PayloadAction<Player[]>) => {
      return action.payload
    },
  },
});


export const playersReduce = playerSlice.reducer;

export const {
  setPlayer,
} = playerSlice.actions;
