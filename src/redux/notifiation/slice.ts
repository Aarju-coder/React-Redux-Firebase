import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  status, RootState } from "../type";


const initialState: RootState["notificationStatus"]= {
    loading: false,
  success:false,
  error:null
}


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
      setStatusState: (state: any, action: PayloadAction<status>) => {
        return action.payload;
      },
    },
  });
  
  
  export const notificationSliceReduce = notificationSlice.reducer;
  
  export const {
    setStatusState
  } = notificationSlice.actions;
