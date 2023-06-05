import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  status, RootState } from "../type";


const initialState: RootState["tutorialUploadSatatus"]= {
    loading: false,
  success:false,
  error:null
}


const tutorialUploadSlice = createSlice({
    name: "tutorialUpload",
    initialState,
    reducers: {
      setStatusState: (state: any, action: PayloadAction<status>) => {
        return action.payload;
      },
    },
  });
  
  
  export const tutorialUploadSliceReduce = tutorialUploadSlice.reducer;
  
  export const {
    setStatusState
  } = tutorialUploadSlice.actions;