import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, status, AppPurchase } from "../type";

const initialState: RootState["inAppPurchase"] = {
  appPurchaseDetails : [],
  appStatus: {
    loading: false,
  success:false,
  error: null,
  },
};

const promoSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setAppPurchase: (state: any, action: PayloadAction<AppPurchase[]>) => {
      state.appPurchaseDetails = action.payload;
    },
    setAppPurchaseStatus: (state: any, action: PayloadAction<status>) => {
      state.appStatus = action.payload;
    },
    setCoinsQuanty: (state: any, action: PayloadAction<{value: number, index: number}>) => {
      state.appstatus[action.payload.index].Item_CoinsQuantity = action.payload.value;
    },
  },
});


export const purchaseReduce = promoSlice.reducer;

export const {
  setAppPurchase,
  setAppPurchaseStatus,
  setCoinsQuanty
} = promoSlice.actions;
