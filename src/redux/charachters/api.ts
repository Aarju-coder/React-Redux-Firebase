import { AppThunk } from "../store";
import firebase from "../../firebase/config";

import {
    setloading, setCharArray, setselectedChar, setSuccessChar, setErrorChar, setFetchStatus, setDevOrProd
} from "./slice";
import { Charachter } from "../type";
// const firebaseChar = firebase.firestore().collection("Game_Config_Dev").doc("Playables");

export const getAllCharachters = (env: number): AppThunk =>
  async (dispatch) => {
    console.log("ENVV", env);
    
    const firebaseChar = firebase.firestore().collection(env ? "Game_Config_Prod" : "Game_Config_Dev").doc("Playables");
    try {
        dispatch(setFetchStatus({loading: true, success:false, error:""}));
        const charArray: Charachter[] = [];
        await firebaseChar.get().then(async (doc) => {
            if (doc.exists) {
                let temp = doc.data()
                console.log("Document data 2:", temp );
                if(temp){
                    for(let i = 0; i< temp["All_Playables"].length; i++){
                        const url= env ? "Productions/Images/"+temp["All_Playables"][i].Char_Name.toUpperCase()+"/Ride.png" : "Development/Images/"+temp["All_Playables"][i].Char_Name.toUpperCase()+"/Ride.png"
                        let imageUrl = await firebase.storage().ref().child(url).getDownloadURL();
                        const iconurl= env ? "Productions/Images/"+temp["All_Playables"][i].Char_Name.toUpperCase()+"/Icon.png" : "Development/Images/"+temp["All_Playables"][i].Char_Name.toUpperCase()+"/Icon.png"
                        let imageIconUrl = await firebase.storage().ref().child(iconurl).getDownloadURL();
                        let skinImageUrl = "";
                        if(temp["All_Playables"][i]["Charachter_Type"] == "Surfer") {
                         const skinurl= env ? "Productions/Images/"+temp["All_Playables"][i].Char_Name.toUpperCase()+"/Skin.png" : "Development/Images/"+temp["All_Playables"][i].Char_Name.toUpperCase()+"/Skin.png"
                         skinImageUrl = await firebase.storage().ref().child(skinurl).getDownloadURL();
                        }

                        //console.log("imageurl1 -> ", imageUrl)
                        charArray.push({...temp["All_Playables"][i], ...{rideImageUrl: imageUrl, iconImageUrl: imageIconUrl, skinImageUrl: skinImageUrl}});
                    }
                }
                dispatch(setCharArray(charArray));
                dispatch(setFetchStatus({loading: false, success:true, error:""}));
                console.log(charArray)
                //dispatch(setCharArray())
            } else {
                // doc.data() will be undefined in this case
                dispatch(setFetchStatus({loading: false, success:false, error:"Error Reaching Server"}));
                console.log("No such document!");
            }
            
        }).catch((error) => {
            dispatch(setFetchStatus({loading: false, success:false, error:error.message}));
            console.log("Error getting document:", error);
        });
      console.log("char data from firestore",firebaseChar);
      //setCharArray(data);
      
    } catch (err: any) {
        dispatch(setFetchStatus({loading: false, success:false, error:err.message}));
      console.log(err);
    }
  };
  export const launchCharchter = (selected: Charachter, env: number): AppThunk => async (dispatch) => {
    const firebaseChar = firebase.firestore().collection(env ? "Game_Config_Prod" : "Game_Config_Dev").doc("Playables");

    try{
        
        await firebaseChar.get().then(async (doc) => {
            if (doc.exists) {
                let temp = doc.data()
                console.log("Document data:", temp );
                if(temp){
                    temp["All_Playables"].forEach((val: any)=>{
                        console.log(val.Char_Name , "  ", selected.Char_Name);
                        if(val.Char_Name === selected.Char_Name){
                            val.Launched = true;
                        }
                    })
                    console.log("temp data for launch ", temp);
                   await firebaseChar.set(temp);
                   dispatch(getAllCharachters(env));
                }
            } else {
                console.log("No such document!");
            }
            
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        

    }catch(e){
        console.log("error - ", e);
    }
  }
  export const SetSelectedCharchter = (char: Charachter): AppThunk => (dispatch) => {
    try{
        dispatch(setselectedChar(char));
    }catch(e){
        console.log("error - ", e);
    }
  }
  export const setLoader = (bool: boolean): AppThunk => (dispatch) => {
    dispatch(setloading(bool))
  }
  export const changeCharDataAction = (selected: Charachter, value: any, env: number): AppThunk => async (dispatch) => {
    const firebaseChar = firebase.firestore().collection(env ? "Game_Config_Prod" : "Game_Config_Dev").doc("Playables");
    
    try{
        console.log(value);
        const firebaseCharUpdate = firebase.firestore().collection(env ? "Game_Config_Prod" : "Game_Config_Dev").doc("Playables");
        dispatch(setLoader(true));
      dispatch(setSuccess(false));
      console.log("Loading..");
      dispatch(setError(false));
      var skinURL : string = '';
       var iconURL : string = '';
        var rideURL : string = '';
        var skin : string = '';
        var icon : string = '';
         var ride : string = '';
         
        await firebaseCharUpdate.get().then( async (doc) => {
            if (doc.exists) {
                let temp = doc.data();
                console.log("Document data 1 :", temp );
                if(temp){
                    temp["All_Playables"].forEach(async (val: Charachter)=>{
                        console.log(val.Char_Name , "  ", selected.Char_Name);
                        if(val.Char_Name === selected.Char_Name){
                            icon= env ? "Productions/Images/"+val.Char_Name.toUpperCase()+"/Icon.png" : "Development/Images/"+val.Char_Name.toUpperCase()+"/Icon.png"
                            ride= env ? "Productions/Images/"+val.Char_Name.toUpperCase()+"/Ride.png" : "Development/Images/"+val.Char_Name.toUpperCase()+"/Ride.png"
                            if(value.icon)
                            firebase.storage().ref(icon).put(value.icon);
                            if(value.ride)
                            firebase.storage().ref(ride).put(value.ride);
                              if(selected.Charachter_Type == "Surfer"){
                                  skin= env ? "Productions/Images/"+val.Char_Name.toUpperCase()+"/Skin.png" : "Development/Images/"+val.Char_Name.toUpperCase()+"/Skin.png"
                                  if(value.skin)
                                  firebase.storage().ref(skin).put(value.skin);
                               console.log("RIDE", ride, icon, skin);
                            }
                            val.Char_Description = value.description ? value.description : val.Char_Description;
                            val.Char_IAP_Key_Apple = value.appleKey;
                            val.Char_IAP_Key_Google = value.googleKey;
                            val.Char_Cost = value.costing ? value.costing : val.Char_Cost;
                            val.Version = parseFloat(Number(val.Version+0.1).toFixed(1));
                            selected = val;
                            console.log(val.Version)
                            return;
                        }
                    })
                    
                    await firebaseChar.set(temp);
                    iconURL = await firebase.storage().ref().child(icon).getDownloadURL();
                    rideURL = await firebase.storage().ref().child(ride).getDownloadURL();
                    if(selected.Charachter_Type == "Surfer")
                    skinURL = await firebase.storage().ref().child(skin).getDownloadURL();
                    var selectedCharacter = {
                        Char_Cost: selected.Char_Cost,
                        Char_Description: selected.Char_Description,
                        Char_IAP_Key_Apple: selected.Char_IAP_Key_Apple,
                        Char_IAP_Key_Google: selected.Char_IAP_Key_Google,
                        Char_Name:selected.Char_Name,
                        Charachter_Type: selected.Charachter_Type,
                        Launched: selected.Launched,
                        Version: selected.Version,
                        rideImageUrl: rideURL,
                        iconImageUrl: iconURL,
                        skinImageUrl: skinURL
                    }
                    dispatch(SetSelectedCharchter(selectedCharacter));
                    // dispatch(SetSelectedCharchter(selected));
                    iconURL = await firebase.storage().ref().child(icon).getDownloadURL();
                    rideURL = await firebase.storage().ref().child(ride).getDownloadURL();
                    if(selected.Charachter_Type == "Surfer")
                    skinURL = await firebase.storage().ref().child(skin).getDownloadURL();
                    var selectedCharacter = {
                        Char_Cost: selected.Char_Cost,
                        Char_Description: selected.Char_Description,
                        Char_IAP_Key_Apple: selected.Char_IAP_Key_Apple,
                        Char_IAP_Key_Google: selected.Char_IAP_Key_Google,
                        Char_Name:selected.Char_Name,
                        Charachter_Type: selected.Charachter_Type,
                        Launched: selected.Launched,
                        Version: selected.Version,
                        rideImageUrl: rideURL,
                        iconImageUrl: iconURL,
                        skinImageUrl: skinURL
                    }
                    dispatch(SetSelectedCharchter(selectedCharacter));
                    dispatch(getAllCharachters(env));
                    console.log("temp data for launch 1 ", temp);
                   dispatch(setError(false))
                   dispatch(setSuccess(true));
                   dispatch(setLoader(false))
                }
            } else {
                console.log("No such document!");
            }
            
        }).catch((error) => {
            dispatch(setError(true))
                   dispatch(setSuccess(false));
                   dispatch(setLoader(false))
            console.log("Error getting document:", error);
        });
        

    }catch(e){
        dispatch(setError(true))
                   dispatch(setSuccess(false));
                   dispatch(setLoader(false))
        console.log("error - ", e);
    }
  }
  export const setSuccess = (bool: boolean): AppThunk => (dispatch) => {
    dispatch(setSuccessChar(bool))
  }
  export const setError = (bool: boolean): AppThunk => (dispatch) => {
    dispatch(setErrorChar(bool))
  }
  export const setDevOrProdApi = (bool: number): AppThunk => (dispatch) => {
    dispatch(setDevOrProd(bool));
    dispatch(getAllCharachters(bool));
  }