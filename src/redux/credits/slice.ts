import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  status, RootState } from "../type";


const initialState: RootState["creditStatus"]= {
    loading: false,
  success:false,
  error:null
}


const termSlice = createSlice({
    name: "credit",
    initialState,
    reducers: {
      setStatusState: (state: any, action: PayloadAction<status>) => {
        return action.payload;
      },
    },
  });
  
  
  export const creditSliceReduce = termSlice.reducer;
  
  export const {
    setStatusState
  } = termSlice.actions;