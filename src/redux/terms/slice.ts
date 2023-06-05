import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  status, RootState } from "../type";


const initialState: RootState["termsStatus"]= {
    loading: false,
  success:false,
  error:null
}


const termSlice = createSlice({
    name: "term",
    initialState,
    reducers: {
      setStatusState: (state: any, action: PayloadAction<status>) => {
        return action.payload;
      },
    },
  });
  
  
  export const termSliceReduce = termSlice.reducer;
  
  export const {
    setStatusState
  } = termSlice.actions;