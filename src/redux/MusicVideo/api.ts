import { AppThunk } from "../store"
import { status } from "../type"
import { setStatusState } from "./slice"
import firebase from "../../firebase/config";
// const firebaseChar = firebase.firestore().collection("Game_Config_Dev").doc("AppData");

export const setstatus= (stat: status): AppThunk => (dispatch) => {
    dispatch(setStatusState(stat))
  }
  export const UploadMusic = (file:any, data: any): AppThunk => async (dispatch) => {
    const firebaseChar = firebase.firestore().collection(data ? "Game_Config_Prod" : "Game_Config_Dev").doc("AppData");
    try{
        console.log(file.name)
        if(file.name.endsWith(".mp4")){
            dispatch(setstatus({loading: true, success:false, error:""}));
        console.log(file);
        const icon= data ? "Productions/Video/Music.mp4" : "Development/Video/Music.mp4"
        await firebase.storage().ref(icon).put(file);
        
        await firebaseChar.get().then(async (doc) => {
            let data = doc.data();
            console.log("set player block unblock ",);

                if(data){
                    let imageUrl = await firebase.storage().ref(icon).getDownloadURL();
                    data["MusicVideoUrl"] = imageUrl;

                  await firebaseChar.set(data);
                 // dispatch(setstatus({loading: false, success:true, error:""}));
                }
      }).catch((error) => {
          console.log("Error getting document:", error);
          //dispatch(setstatus({loading: false, success:false, error:error.message}));
      });
        dispatch(setstatus({loading: false, success:true, error:""}));
        }else{
            dispatch(setstatus({loading: false, success:false, error:"Please provide a mp4 file! "}));
        }
    }catch(e:any){
        dispatch(setstatus({loading: false, success:false, error:e.message}));
        console.log("error - ", e);
    }
  }