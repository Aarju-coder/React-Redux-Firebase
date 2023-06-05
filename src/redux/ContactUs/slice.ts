import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  status, RootState } from "../type";


const initialState: RootState["contactStatus"]= {
    loading: false,
  success:false,
  error:null
}


const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
      setStatusState: (state: any, action: PayloadAction<status>) => {
        return action.payload;
      },
    },
  });
  
  
  export const contactSliceReduce = contactSlice.reducer;
  
  export const {
    setStatusState
  } = contactSlice.actions;
