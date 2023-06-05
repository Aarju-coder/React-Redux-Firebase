import { AppThunk } from "../store";
import firebase from "../../firebase/config";
import { setDeleteCode, setDeleteStatus, setPromoDetils, setPromoStatus , setPromoCodeStatus, setCodeStatus } from "./slice";
import { PromoCode } from "../type";

const firebaseChar = firebase.firestore().collection("promocodes");
export const getAllPromoCodes = (): AppThunk => (dispatch) => {
  try {
    let promoArray: PromoCode[] = [];
    dispatch(setPromoStatus({
      loading: true,
    success:false,
    error: null
    }));

    // firebaseChar
    //   .get()
    //   .then(async (doc) => {
    //     console.log("set player block unblock ", doc.data());
    //     if (doc.exists) {
    //       let temp = doc.data();
    //       if(temp){
    //         for(let i = 0; i< temp["AllPromoCodeArray"].length; i++){
    //           promoArray.push(temp["AllPromoCodeArray"][i]);
    //       }
    //       console.log("All Player Array", promoArray);
    //                 dispatch(setPromoDetils(promoArray));
    //                 dispatch(setPromoStatus({
    //                   loading: false,
    //                 success:true,
    //                 error: null
    //                 }));
    //       }

    //       //dispatch(setPlayer(playerArray))
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Error getting document:", error);
    //     dispatch(setPromoStatus({
    //       loading: false,
    //     success:false,
    //     error: error.message
    //     }));
    //   });
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
              let player: PromoCode = {
                code: "",
                isAvailable :true,
                isPublic:true,
                rewardCoins: 0
              };
              if(Data)
              {
                player.code = Data.code
                player.isAvailable = Data.isAvailable
                player.isPublic = Data.isPublic
                player.rewardCoins = Data.rewardCoins

                promoArray.push(player);

              }
              if(index+1 === doc.docs.length){
                console.log("All Player Array", promoArray);
              if(promoArray.length){
                          dispatch(setPromoDetils(promoArray));
                          dispatch(setPromoStatus({
                            loading: false,
                          success:true,
                          error: null
                          }));
              }
              }
            }
          })
        })
        
        //dispatch(setPlayer(playerArray))
      }
      
        
    }).catch((error) => {
          console.log("Error getting document:", error);
          dispatch(setPromoStatus({
            loading: false,
          success:false,
          error: error.message
          }));
        });
  } catch (e: any) {
    console.log(e);
    dispatch(setPromoStatus({
      loading: false,
    success:false,
    error: e.message
    }));
  }
};
// export const deletePromoCode = (code: number): AppThunk => (dispatch) => {
//   try {
//     dispatch(setDeleteCode(code))
//     // let promoArray: PromoCode[] = [];
//     dispatch(setDeleteStatus({
//       loading: true,
//     success:false,
//     error: null
//     }));
//     let promoArray: PromoCode[] = [];
//     firebaseChar
//       .get()
//       .then(async (doc) => {
//         console.log("set player block unblock PROMO", doc.data());
//         if (doc.exists) {
//           let temp = doc.data();
//           if(temp){
//             for(let i = 0; i< temp["AllPromoCodeArray"].length; i++){
//               if(temp["AllPromoCodeArray"][i].code != code){
//                 promoArray.push(temp["AllPromoCodeArray"][i])
//               } 
//           }
//           await firebaseChar.update({
//             AllPromoCodeArray : promoArray
//           });
//           dispatch(setDeleteStatus({
//             loading: false,
//           success:true,
//           error: null
//           }));
//           dispatch(getAllPromoCodes());
//           console.log("All Player Array", temp);
//           }

//           //dispatch(setPlayer(playerArray))
//         }
//       })
//       .catch((error) => {
//         console.log("Error getting document:", error);
//         dispatch(setDeleteStatus({
//           loading: false,
//         success:false,
//         error: error.message
//         }));
//       });
//   } catch (e: any) {
//     console.log(e);
//     dispatch(setDeleteStatus({
//       loading: false,
//     success:false,
//     error: e.message
//     }));
//   }
// };
export const setPromoCode = (data: PromoCode): AppThunk => (dispatch) => {
  console.log("here", data);
  
  if(data.isPublic){
    data.isPublic = true;
  }
  else{
    data.isPublic = false;
  }
  try {
    // dispatch(setPromoDetils(data))
    // let promoArray: PromoCode[] = [];
    dispatch(setPromoCodeStatus({
      loading: true,
    success:false,
    error: null
    }));
    dispatch(setCodeStatus({
      loading: true,
    success:false,
    error: null
    }));
    let promoArray: PromoCode[] = [];
    // firebaseChar.get().then(async (doc) => {
    //   console.log("set player block unblock ",doc.docs);
    //     if (doc) {
    //       let temp = doc.docs;
    //       let promo = {
    //         code : data.code,
    //         isPublic : data.isPublic,
    //         rewardCoins : data.rewardCoins,
    //         isAvailable : true
    //       }
    //       if(temp){
    //         temp["AllPromoCodeArray"].push(promo);
    //         console.log("PROMOSSS",  temp["AllPromoCodeArray"]);
          
    //       await firebaseChar.update({
    //         AllPromoCodeArray :  temp["AllPromoCodeArray"]
    //       });
    //       dispatch(setPromoCodeStatus({
    //         loading: false,
    //       success:true,
    //       error: null
    //       }));
    //       dispatch(getAllPromoCodes());
    //       console.log("All Player Array", temp);
    //       }

    //       //dispatch(setPlayer(playerArray))
    //     }
    //   })
    firebaseChar.doc(data.code).set({
            code : data.code,
            isPublic : data.isPublic,
            rewardCoins : data.rewardCoins,
            isAvailable : true
    }).then(() => {
      console.log("successfully added promo");
                dispatch(setPromoCodeStatus({
            loading: false,
          success:true,
          error: null
          }));
          dispatch(getAllPromoCodes());
      
    })
      .catch((error) => {
        console.log("Error getting document:", error);
        dispatch(setPromoCodeStatus({
          loading: false,
        success:false,
        error: error.message
        }));
        dispatch(setCodeStatus({
          loading: true,
        success:false,
        error: null
        }));
      });
  } catch (e: any) {
    console.log(e);
    dispatch(setPromoCodeStatus({
      loading: false,
    success:false,
    error: e.message
    }));
    dispatch(setCodeStatus({
      loading: true,
    success:false,
    error: null
    }));
  }
};
  export const disablePromoCode = (code: PromoCode): AppThunk => (dispatch) => {
  
    try {
      dispatch(setDeleteCode(code.code))
      // let promoArray: PromoCode[] = [];
      dispatch(setDeleteStatus({
        loading: true,
      success:false,
      error: null
      }));
      let promoArray: PromoCode[] = [];
      // firebaseChar
      //   .get()
      //   .then(async (doc) => {
      //     console.log("set player block unblock PROMO", doc.data());
      //     if (doc.exists) {
      //       let temp = doc.data();
      //       if(temp){
      //         for(let i = 0; i< temp["AllPromoCodeArray"].length; i++){
      //           if(temp["AllPromoCodeArray"][i].code == code){
      //             if(temp["AllPromoCodeArray"][i].isAvailable){
      //               temp["AllPromoCodeArray"][i].isAvailable = false;
      //             }
      //             else{
      //               temp["AllPromoCodeArray"][i].isAvailable = true;
      //             }
      //           } 
      //       }
      //       await firebaseChar.update({
      //         AllPromoCodeArray : temp["AllPromoCodeArray"]
      //       });
      //       dispatch(setDeleteStatus({
      //         loading: false,
      //       success:true,
      //       error: null
      //       }));
      //       dispatch(getAllPromoCodes());
      //       console.log("All Player Array", temp);
      //       }
  
      //       //dispatch(setPlayer(playerArray))
      //     }
      //   })
      firebaseChar.doc(code.code).set({
        code : code.code,
        isPublic : code.isPublic,
        rewardCoins : code.rewardCoins,
        isAvailable : code.isAvailable ? false : true
        }).then(() => {
          console.log("successfully added promo");
                      dispatch(setDeleteStatus({
                      loading: false,
                    success:true,
                    error: null
                    }));
                    dispatch(getAllPromoCodes());
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          dispatch(setDeleteStatus({
            loading: false,
          success:false,
          error: error.message
          }));
        });
    } catch (e: any) {
      console.log(e);
      dispatch(setDeleteStatus({
        loading: false,
      success:false,
      error: e.message
      }));
    }
  };

  function generatePromoCode(data : any): any{
    var code = Math.floor(Math.random() * 900000000);
    for(let i = 0; i< data.AllPromoCodeArray.length; i++){
      if(data.AllPromoCodeArray[i].code == data.code){
        return generatePromoCode(data);
      } 
      else{
        return code;
      }
    }
  };
