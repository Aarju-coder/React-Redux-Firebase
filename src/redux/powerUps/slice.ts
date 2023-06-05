import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  status, RootState,  powerUpsDetails } from "../type";


const initialState: RootState["powerUpState"]= {
    powerUp: [{
        Name: "",
        State: false
    }],
    status: {
        loading: false,
      success:false,
      error:null
    },
    fetchingData: false,
    isdevOrProduc: 0
}


const powerSlice = createSlice({
    name: "powerUp",
    initialState,
    reducers: {
      setStatusState: (state: any , action: PayloadAction<status>) => {
        state.status = action.payload;
      },
      setPowerUpArray: (state: any , action: PayloadAction<powerUpsDetails[]>) => {
        state.powerUp = action.payload;
      },
      setPowerUpfetchingData: (state: any , action: PayloadAction<boolean>) => {
        state.fetchingData = action.payload;
      },
      setDevOrProd: (state: any , action: PayloadAction<number>) => {
        state.isdevOrProduc = action.payload;
      },
    },
  });
  
  
  export const powerSliceReduce = powerSlice.reducer;
  
  export const {
    setStatusState,
    setPowerUpArray,
    setPowerUpfetchingData,
    setDevOrProd
  } = powerSlice.actions;