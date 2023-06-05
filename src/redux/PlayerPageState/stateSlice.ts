import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player, RootState } from "../type";

const initialState: RootState["playersArrayMetaData"] = {
  currentPage: 1,
  todosPerPage: 10,
  fetchingData: true,
  selectedPlayer: {
    BonusSpinPoints: "",
    ExperienceLevel: "",
    BonusSpins: "",
    ExperiencePoints: "",
    Highscore: "",
    Id: "",
    Name: "",
    Purchased_Characters: ["empty", "empty"],
    Purchased_Sharks: ["empty", "empty"],
    Sandcoins: "",
    Selected_Character: "",
    Selected_Shark: "",
  },
  error: false,
};

const pageStateSlice = createSlice({
  name: "playersArrayMetaDatav",
  initialState,
  reducers: {
    setFetchingData: (state: any, action: PayloadAction<boolean>) => {
      state.fetchingData = action.payload;
    },
    setselectedPlayer: (state: any, action: PayloadAction<Player>) => {
      state.selectedPlayer = action.payload;
    },
    setError: (state: any, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setCurrentPage: (state: any, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPerPage: (state: any, action: PayloadAction<number>) => {
      state.todosPerPage = action.payload;
    },
  },
});

export const pageStateReduce = pageStateSlice.reducer;

export const {
  setFetchingData,
  setselectedPlayer,
  setError,
  setCurrentPage,
  setPerPage,
} = pageStateSlice.actions;
