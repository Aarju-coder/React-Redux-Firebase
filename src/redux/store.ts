//store.ts
import { firebaseReduce } from "./firebaseState/slice";
import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { RootState } from "./type";
import { playersReduce } from "./players/slice";
import { pageStateReduce } from "./PlayerPageState/stateSlice";
import { charSliceReduce } from "./charachters/slice";
import { termSliceReduce } from "./terms/slice";
import { contactSliceReduce } from "./ContactUs/slice";
import { tutorialUploadSliceReduce } from "./UploadTutorial/slice";
import { powerSliceReduce } from "./powerUps/slice";
import { notificationSliceReduce } from "./notifiation/slice";
import { promoReduce } from "./promocode/slice";
import { purchaseReduce } from "./appPurchase/slice";
import { musicUploadSliceReduce } from "./MusicVideo/slice";
import { creditSliceReduce } from "./credits/slice";

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
  logger,
];

export const store = configureStore({
  reducer: {
    auth: firebaseReduce,
    players: playersReduce,
    playersArrayMetaData: pageStateReduce,
    charachters: charSliceReduce,
    termsStatus: termSliceReduce,
    creditStatus : creditSliceReduce,
    contactStatus: contactSliceReduce,
    tutorialUploadSatatus: tutorialUploadSliceReduce,
    powerUpState: powerSliceReduce,
    notificationStatus: notificationSliceReduce,
    PromoCodeRoot : promoReduce,
    inAppPurchase : purchaseReduce,
    musicUploadStatus : musicUploadSliceReduce
  },
  middleware,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
