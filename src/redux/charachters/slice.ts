import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  Charachter, RootState, status } from "../type";


const initialState: RootState["charachters"]= {
    charArray: [],
    selectedChar: {
      Char_Cost:"100$",
      Char_IAP_Key_Google: "",
      Char_IAP_Key_Apple:"",
  Char_Description: "string", 
  Char_Name:"string",
  Charachter_Type: "string",
  Launched: false,
  rideImageUrl: "assets/img/Character_wade.png",
  Version: 0.0,
  iconImageUrl: "assets/img/Character_wade.png",
  skinImageUrl: "assets/img/Character_wade.png"
    },
    fetchStatus:{success: false, error: null, loading: false},
    success:false,
    error: false,
    loader: false,
    isdevOrProd: 0
}


const charSlice = createSlice({
    name: "charSlice",
    initialState,
    reducers: {
      setCharArray: (state: any, action: PayloadAction<Charachter[]>) => {
        state.charArray = action.payload;
      },
      setFetchStatus: (state: any, action: PayloadAction<status>)=>{
        state.fetchStatus = action.payload;
      },
      setselectedChar: (state: any, action: PayloadAction<Charachter>) => {
        state.selectedChar = action.payload;
      },
      setSuccessChar: (state: any, action: PayloadAction<boolean>) => {
        state.success = action.payload;
      },
      setErrorChar: (state: any, action: PayloadAction<boolean>) => {
        state.error = action.payload;
      },
      setloading: (state: any, action: PayloadAction<boolean>) => {
        state.loader = action.payload;
      },
      setDevOrProd: (state: any, action: PayloadAction<number>) => {
        state.isdevOrProd = action.payload;
      },
    },
  });
  
  
  export const charSliceReduce = charSlice.reducer;
  
  export const {
    setCharArray,
    setloading,
    setselectedChar,
    setSuccessChar,
    setErrorChar,
    setFetchStatus,
    setDevOrProd
  } = charSlice.actions;
