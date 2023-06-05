import { AppThunk } from "../store";
import firebase from "../../firebase/config";
import { SignInData } from "../type";
import {
  setLoading,
  setError,
  signOut,
  needVerification,
  setSuccess,
} from "./slice";
export const signinAction =
  (data: SignInData, onError: () => void): AppThunk =>
  async (dispatch) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      dispatch(setSuccess("Login Successfull"));
    } catch (err: any) {
      console.log(err);
      onError();
      dispatch(setError(err.message));
    }
  };
export const setErrorAction =
  (msg: any): AppThunk =>
  async (dispatch) => {
    dispatch(setError(msg));
  };
export const setLoadingAction =
  (value: boolean): AppThunk =>
  (dispatch) => {
    try {
      dispatch(setLoading(value));
    } catch (err: any) {
      console.log(err.message);
    }
  };
export const getUserByIdAction =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const user = await firebase
        .firestore()
        .collection("users")
        .orderBy("Name");
      console.log("user", user);
      // if (user.exists) {
      //   const userData = user.data() as User;
      //   dispatch(setUser(userData));
      // }
    } catch (err) {
      console.log(err);
    }
  };
export const signout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await firebase.auth().signOut();
    dispatch(signOut);
  } catch (err) {
    console.log(err);
    dispatch(setLoading(false));
  }
};
export const setNeedVerification = (): AppThunk => async (dispatch) => {
  dispatch(needVerification);
};
