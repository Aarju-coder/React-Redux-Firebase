import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../type";
const initialState: RootState["auth"] = {
  user: null,
  authenticated: false,
  loading: false,
  error: "",
  needVerification: false,
  success: "",
};

const firebaseSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    setLoading: (state: any, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    signOut: (state: any, action: PayloadAction<string>) => {
      state.user = null;
      state.authenticated = false;
      state.loading = false;
    },
    setError: (state: any, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    needVerification: (state: any, action: PayloadAction<string>) => {
      state.needVerification = true;
    },
    setSuccess: (state: any, action: PayloadAction<string>) => {
      console.log("setSuccess")
      state.success = action.payload;
      state.authenticated = true;
    },
    
  },
  // extraReducers: (builder) => {
  //   builder.addCase(endStroke, (state) => {
  //     state.points = []
  //   })
  // }
});

export const firebaseReduce = firebaseSlice.reducer;

export const {
  setSuccess,
  needVerification,
  setError,
  signOut,
  setLoading,
  setUser,
} = firebaseSlice.actions;
