import { AppThunk } from "../store"
import { status } from "../type"
import { setStatusState } from "./slice"
import firebase from "../../firebase/config";

export const setstatus= (stat: status,): AppThunk => (dispatch) => {
    dispatch(setStatusState(stat))
  }

  // const firebaseChar = firebase.firestore().collection("Game_Config_Dev").doc("AppData");


  export const setTerms = (desc: string, env: number): AppThunk => async(dispatch) =>{
    console.log("ENV", env);
    
    const firebaseChar = firebase.firestore().collection(env ? "Game_Config_Prod" : "Game_Config_Dev").doc("AppData");

      try{
          dispatch(setstatus({loading: true, success:false, error:""}));
          await firebaseChar.get().then(async (doc) => {
                let data = doc.data();
                console.log("set player block unblock ",);
                    if(data){
                        data["TermsAndService"] = desc;

                      await firebaseChar.set(data);
                      dispatch(setstatus({loading: false, success:true, error:""}));
                    }
          }).catch((error) => {
              console.log("Error getting document:", error);
              dispatch(setstatus({loading: false, success:false, error:error.message}));
          });
          
  
      }catch(e:any){
        dispatch(setstatus({loading: false, success:false, error:e.message}));
          console.log("error - ", e);
      }
  }
  