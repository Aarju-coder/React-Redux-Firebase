
import firebase from "../../firebase/config";
import { AppThunk } from "../store";
import { powerUpsDetails } from "../type";
import { setDevOrProd, setPowerUpArray, setPowerUpfetchingData, setStatusState } from "./slice";

// const firebaseChar = firebase.firestore().collection("Game_Config_Dev").doc("PowerUps");

export const getPowerUps = (env: number): AppThunk =>async (dispatch)=>{
    const firebaseChar = firebase.firestore().collection(env ? "Game_Config_Prod" : "Game_Config_Dev").doc("PowerUps");
    try {
        dispatch(setStatusState({loading: true, success:false, error:""}));
        const powerUpArray: powerUpsDetails[] = [];
        await firebaseChar.get().then(async (doc) => {
            if (doc.exists) {
                let temp = doc.data()
                console.log("Document data 2:", temp );
                if(temp){
                    for(let i = 0; i< temp["All_PowerUps"].length; i++){
                        powerUpArray.push(temp["All_PowerUps"][i]);
                    }
                    console.log(powerUpArray)
                dispatch(setPowerUpArray(powerUpArray));
                dispatch(setStatusState({loading: false, success:true, error:""}));
                }
            } else {
                dispatch(setStatusState({loading: false, success:false, error:"Error Fetching Document."}));
                console.log("No such document!");
            }
            
        }).catch((error) => {
            dispatch(setStatusState({loading: false, success:false, error:error.messsage}));
            console.log("Error getting document:", error);
        });
      console.log("char data from firestore",firebaseChar);
      //setCharArray(data);
      
    } catch (err:any) {
        dispatch(setStatusState({loading: false, success:false, error:err.messsage}));
      console.log(err);
    }
}
export const setPowerUps = (bool: boolean, name: string, env: number) : AppThunk =>async (dispatch)=>{
    console.log("PORW",env);
    
    const firebaseChar = firebase.firestore().collection(env ? "Game_Config_Prod" : "Game_Config_Dev").doc("PowerUps");
    try {
        console.log("set state power up bool ", bool,name);
        await firebaseChar.get().then(async (doc) => {
            if (doc.exists) {
                let temp = doc.data()
                console.log("Document data 2:", temp );
                if(temp){
                    for(let i = 0; i< temp["All_PowerUps"].length; i++){
                        if(temp["All_PowerUps"][i].Name == name){
                            temp["All_PowerUps"][i].State = bool
                            break;
                        }
                    }
                    console.log("set state power up",temp);
                    await firebaseChar.set(temp);
                   dispatch(getPowerUps(env))
                }
            } else {
                
                console.log("No such document!");
            }
            
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      console.log("char data from firestore",firebaseChar);
      //setCharArray(data);
      
    } catch (err) {
      console.log(err);
    }
}
export const setDevOrProdApi = (bool: number): AppThunk => (dispatch) => {
    dispatch(setDevOrProd(bool));
    dispatch(getPowerUps(bool));
  }