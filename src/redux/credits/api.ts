import { AppThunk } from "../store"
import { status } from "../type"
import firebase from "../../firebase/config";
import { setStatusState } from "./slice";

export const setstatus= (stat: status,): AppThunk => (dispatch) => {
    dispatch(setStatusState(stat))
  }

  // const firebaseChar = firebase.firestore().collection("Game_Config_Dev").doc("AppData");


  export const setCredits = (string: any, env: number): AppThunk => async(dispatch) =>{
    console.log("ENV", env);
    
    const firebaseChar = firebase.firestore().collection(env ? "Game_Config_Prod" : "Game_Config_Dev").doc("AppData");
    //  const abc = `<b><size=65>${string.title}></size></b><br>${string.title1}<br>${string.title2}<br><br><b><size=65>${string.title3}</size></b><br>${string.title4}<br><br><b><size=65>${string.title5}</size></b><br>${string.title6}<br>${string.title7}<br><br><b>${string.title8}<br>${string.title9}</b>`;

    // console.log("STRING", abc);
    
      try{
          dispatch(setstatus({loading: true, success:false, error:""}));
          await firebaseChar.get().then(async (doc) => {
                let data = doc.data();
                console.log("set player block unblock ",);
                    if(data){
                        data["Credits"] = `<b><size=65>Game Design and Development </size></b><br>${string.title1}in collaboration with<br>${string.title2}<br><br><b><size=65>Graphics and Audio</size></b><br>${string.title4}<br><br><b><size=65>Music</size></b><br>${string.title6}<br>${string.title7}<br><br><b>Special thanks to all our friends and family,<br>And sharks too!</b>`;
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
  