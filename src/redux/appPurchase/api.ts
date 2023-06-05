import { AppThunk } from "../store";
import firebase from "../../firebase/config";
import { AppPurchase } from "../type";
import { setAppPurchase, setAppPurchaseStatus } from "./slice";
// import { PromoCode } from "../type";

export const getAllPurchases = (env: number): AppThunk => (dispatch) => {
const firebaseChar = firebase.firestore().collection(env ? "Game_Config_Prod" : "Game_Config_Dev").doc("Sandcoin_StoreData");

  try {
    let purchaseArray: AppPurchase[] = [];
    // dispatch(setPromoStatus({
    //   loading: true,
    // success:false,
    // error: null
    // }));
    firebaseChar
      .get()
      .then(async (doc) => {
        console.log("set player block unblock ", doc.data());
        if (doc.exists) {
          let temp = doc.data();
          if(temp){
            for(let i = 0; i< temp["All_Items"].length; i++){
              purchaseArray.push(temp["All_Items"][i]);
          }
          console.log("All Purchaseeeee", purchaseArray);
          dispatch(setAppPurchase(purchaseArray));

                    // dispatch(setPromoDetils(promoArray));
                    // dispatch(setPromoStatus({
                    //   loading: false,
                    // success:true,
                    // error: null
                    // }));
          }

          //dispatch(setPlayer(playerArray))
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        // dispatch(setPromoStatus({
        //   loading: false,
        // success:false,
        // error: error.message
        // }));
      });
  } catch (e: any) {
    console.log(e);
    // dispatch(setPromoStatus({
    //   loading: false,
    // success:false,
    // error: e.message
    // }));
  }
};

export const setChangeQuantity = (arr: AppPurchase[], isdevOrProd : any): AppThunk => (dispatch) => {
  console.log("THERE", isdevOrProd);
  
  const firebaseChar1 = firebase.firestore().collection(isdevOrProd ? "Game_Config_Prod" : "Game_Config_Dev").doc("Sandcoin_StoreData");
  console.log("VALUES",setAppPurchase );
  try {
    dispatch(setAppPurchaseStatus({
      loading: true,
    success:false,
    error: null
    }));
    firebaseChar1
      .get()
      .then(async (doc) => {
        console.log("set player block unblock ", doc.data());
        if (doc.exists) {
          let temp = doc.data();
          if(temp){
          console.log("All Purchaseeeee", arr);
          await firebaseChar1.update({
            All_Items :  arr
          });
          dispatch(setAppPurchaseStatus({
            loading: false,
          success:true,
          error: null
          }));
          dispatch(getAllPurchases(isdevOrProd));
          }
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        dispatch(setAppPurchaseStatus({
          loading: false,
        success:false,
        error: error.message
        }));
      });
  }catch (e: any) {
    console.log(e);
    dispatch(setAppPurchaseStatus({
      loading: false,
    success:false,
    error: e.message
    }));
  }
};

export const getChangeQuantity = (arr: AppPurchase[], value: number, id: string): AppThunk => (dispatch) => {
  console.log("VALUES", arr, value, id );

  let temp : AppPurchase[] = [];
  arr.forEach((data) => {
    let tempobj : AppPurchase;
    if(data.Item_StoreKey == id){
      tempobj = JSON.parse(JSON.stringify(data));
      tempobj.Item_CoinsQuantity = value ? value : 10;
    }
    else{
      tempobj = JSON.parse(JSON.stringify(data));
    }
    temp.push(tempobj);
  })
  dispatch(setAppPurchase(temp));
}