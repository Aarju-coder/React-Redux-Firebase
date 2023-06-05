import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  status, RootState } from "../type";


const initialState: RootState["musicUploadStatus"]= {
    loading: false,
  success:false,
  error:null
}


const musicUploadSlice = createSlice({
    name: "musicUpload",
    initialState,
    reducers: {
      setStatusState: (state: any, action: PayloadAction<status>) => {
        return action.payload;
      },
    },
  });
  
  
  export const musicUploadSliceReduce = musicUploadSlice.reducer;
  
  export const {
    setStatusState
  } = musicUploadSlice.actions;