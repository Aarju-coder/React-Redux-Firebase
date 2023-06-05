import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, status, PromoCode } from "../type";

const initialState: RootState["PromoCodeRoot"] = {
  PromoStatus: {
    loading: false,
  success:false,
  error: null,
  },
  CodeStatus: {
    loading: false,
    success:false,
    error: null,
  },

  DeleteStatus: {
    loading: false,
  success:false,
  error: null
  },
  PromoCodeStatus: {
    loading: false,
    success:false,
    error: null
  },
  deleteCode: '',
  setCode: 0,
  PromoDetails: []
};

const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    setPromoDetils: (state: any, action: PayloadAction<PromoCode[]>) => {
      state.PromoDetails = action.payload;
    },
    setPromoStatus: (state: any, action: PayloadAction<status>) => {
      state.PromoStatus = action.payload;
    },
    setDeleteStatus: (state: any, action: PayloadAction<status>) => {
      state.DeleteStatus = action.payload;
    },
    setPromoCodeStatus: (state: any, action: PayloadAction<status>) => {
      state.PromoCodeStatus = action.payload;
    },
    setCodeStatus: (state: any, action: PayloadAction<status>) => {
      state.CodeStatus = action.payload;
    },
    setDeleteCode : (state: any, action: PayloadAction<string>) => {
      state.deleteCode = action.payload;
    },
    setCode : (state: any, action: PayloadAction<number>) => {
      state.setCode = action.payload;
    },
  },
});


export const promoReduce = promoSlice.reducer;

export const {
  setPromoDetils,
  setPromoStatus,
  setCodeStatus,
  setPromoCodeStatus,
  setDeleteStatus,
  setDeleteCode,
  setCode
} = promoSlice.actions;
