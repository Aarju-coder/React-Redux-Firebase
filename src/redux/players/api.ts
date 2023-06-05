import { AppThunk } from "../store";
import firebase from "../../firebase/config";
import {
  setPlayer
} from "./slice";
import { Player } from "../type";
import { setFetchingData } from "../PlayerPageState/stateSlice";


const firebaseChar = firebase.firestore().collection("users");


  export const setPlayerBlock = (bool: boolean, selectedPlayer: Player): AppThunk => async(dispatch) =>{
      try{
          
          await firebaseChar.get().then(async (doc) => {
            console.log("set player block unblock ",doc.docs);
            doc.docs.forEach((data)=>{
              if(data.id === selectedPlayer.Id){
                console.log("found player to block");
                let rowReference = firebaseChar.doc(data.id);
                rowReference.get().then(async document=>{
                  if(document.exists){
                    let rowData = document.data();
                    //
                    if(rowData){
                      console.log("rowData 1 ",rowData["IsActive"], bool)
                      rowData["IsActive"] = bool;

                      console.log("rowData 2 ",rowData)
                      await rowReference.set(rowData);
                      dispatch(getAllPlayers())
                    }
                    


                    
                  }
                })
              }
            })
              
          }).catch((error) => {
              console.log("Error getting document:", error);
          });
          
  
      }catch(e){
          console.log("error - ", e);
      }
  }
  export const setUserTester = (bool: boolean, selectedPlayer: Player): AppThunk => async(dispatch) =>{
    try{
        
        await firebaseChar.get().then(async (doc) => {
          console.log("set player block unblock ",doc.docs);
          doc.docs.forEach((data)=>{
            if(data.id === selectedPlayer.Id){
              console.log("found player to block");
              let rowReference = firebaseChar.doc(data.id);
              rowReference.get().then(async document=>{
                if(document.exists){
                  let rowData = document.data();
                  //
                  if(rowData){
                    console.log("rowData 1 ",rowData["IsTester"], bool)
                    rowData["IsTester"] = bool;

                    console.log("rowData 2 ",rowData)
                    await rowReference.set(rowData);
                    dispatch(getAllPlayers())
                  }
                }
              })
            }
          })
            
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        

    }catch(e){
        console.log("error - ", e);
    }
}
  export const getAllPlayers = ():AppThunk=> (dispatch) => {
    try{
      let playerArray: Player[]  = [];
        firebaseChar.get().then(async (doc) => {
        console.log("set player block unblock ",doc.docs);
        if(doc){
           doc.docs.forEach((docData, index)=>{
            console.log("doc ", docData.id);
            let player = firebaseChar.doc(docData.id);

             player.get().then(document=>{
              console.log("documentPlayer ", document)
              if(document.exists){
                let Data = document.data();
                let player: Player = {
                  BonusSpinPoints: "",
                  ExperienceLevel: "",
                  BonusSpins: "",
                  ExperiencePoints: "",
                  Highscore: "",
                  Id: "",
                  Name: "",
                  Purchased_Characters: ["empty", "empty"],
                  Purchased_Sharks: ["empty", "empty"],
                  Sandcoins: "",
                  Selected_Character: "",
                  Selected_Shark: "",
                  IsActive: false,
                  IsTester: false,
                  Promocode_Used: []
                };
                if(Data)
                {
                  player.Id = Data["Id"];
                  player.BonusSpinPoints = Data["BonusSpinPoints"];
                  player.ExperienceLevel = Data["ExperienceLevel"];
                  player.BonusSpins = Data["BonusSpins"];
                  player.ExperiencePoints = Data["ExperiencePoints"];
                  player.Highscore = Data["Highscore"];
                  player.Name = Data["Name"];
                  player.Purchased_Characters = Data["Purchased_Characters"];
                  player.Purchased_Sharks = Data["Purchased_Sharks"];
                  player.Sandcoins = Data["Sandcoins"];
                  player.Selected_Character = Data["Selected_Character"];
                  player.Selected_Shark = Data["Selected_Shark"];
                  player.IsActive = Data["IsActive"];
                  player.IsTester = Data["IsTester"];
                  player.Promocode_Used = Data["Promocode_Used"];
                  console.log("documentPlayer2 ", player)
                  playerArray.push(player);
                }
                if(index+1 === doc.docs.length){
                  console.log("All Player Array", playerArray);
          if(playerArray.length){
            dispatch(setPlayer(playerArray));
            dispatch(setFetchingData(false))
          }
                }
              }
            })
          })
          
          //dispatch(setPlayer(playerArray))
        }
        
          
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
      
      
    }catch(e){
      console.log(e)
    }
  }

  