import { AppThunk } from "../store";
import { Player } from "../type";
import { setFetchingData,  setselectedPlayer, setError, setCurrentPage, setPerPage } from "./stateSlice";





export const setcurrent =
  (num: number): AppThunk =>
  async (dispatch) => {
    try {
      //console.log(players)
      dispatch(setCurrentPage(num))
    } catch (err) {
      console.log(err);
      
    }
  };
  export const setPage =
  (num: number): AppThunk =>
  async (dispatch) => {
    try {
      //console.log(players)
      dispatch(setPerPage(num))
    } catch (err) {
      console.log(err);
      
    }
  };
  export const setFethingData =
  (bool: boolean): AppThunk =>
  async (dispatch) => {
    try {
      //console.log(players)
      dispatch(setFetchingData(bool))
    } catch (err) {
      console.log(err);
    }
  };
  export const setPlayerSelected =
  (num: Player): AppThunk =>
  async (dispatch) => {
    try {
      //console.log(players)
      dispatch(setselectedPlayer(num))
    } catch (err) {
      console.log(err);
    }
  };
  export const setErrorLoadingPlayers = (bool: boolean): AppThunk =>  (dispatch)=> {
    dispatch(setError(bool))
  }