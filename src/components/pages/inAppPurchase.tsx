//import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/type";
import Button from "../UI/Button";
import { appPurchase } from "../../redux/appPurchase/selectors";
import { getAllPurchases, getChangeQuantity, setChangeQuantity } from "../../redux/appPurchase/api";
import { setAppPurchase, setAppPurchaseStatus } from "../../redux/appPurchase/slice";
export type playerData = {
  playerData: [];
}
export default function AppPurchase() {

  const { appPurchaseDetails , appStatus } = useSelector<RootState, RootState["inAppPurchase"]>(appPurchase);
  const [isdevOrProd, isDevOrProd] = useState(0);
  const [changeStatusBool, changeStatusBoolean] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    changeStatusBoolean(true)
  }, [appStatus.success]);

  function onChangeQuan(e: any, val: string){
    e.preventDefault();   
    console.log("here quan", e.target.value);
    dispatch(getChangeQuantity(appPurchaseDetails, Number(e.target.value), val));
    changeStatusBoolean(false);
    dispatch(setAppPurchaseStatus({
      loading: false,
      success:false,
      error: null
    }));  
  }

  function onSubmitHandler(e: any) {
    e.preventDefault();  
    dispatch(setChangeQuantity(appPurchaseDetails, isdevOrProd)); 
  }
  function onChaneEnv(bool: number){
    dispatch(getAllPurchases(bool));
    isDevOrProd(bool);
  }
  
  return (
    <main>
      <div className="container-fluid px-4">
        <div className="innerPageContent">
          <div className="row justify-content-between align-items-center pageHeader">
            <div className="col-auto">
              <h1 className="pageTitle">
                In App Purchase
              </h1>
            </div>
          </div>
        
          {/* <div className="row justify-content-between align-items-center pageHeader">
            <div className="col-auto">
              <h1 className="pageTitle">
                Existing Promo Codes
              </h1>
            </div>
          </div> */}

          {/* {PromoStatus.success && */}
            <div className="custList">
          <div className="row">
          <form className="mb-5" onSubmit={onSubmitHandler}>
          <div style={{display: "flex"}}>
            {appPurchaseDetails.map((data, index)=>(
              <div className="col-md-3 mb-4" id={index.toString()}>
              <div className="custListBlock">
                <strong>Quantity: </strong>
                <input onChange={(e) => onChangeQuan(e, data.Item_StoreKey)} className="form-control" type="number" value={data.Item_CoinsQuantity}  style={{width: "50%"}}/>
                {/* <span>{data.Item_CoinsQuantity}</span> */}
              </div>
              <div className="custListBlock">
                <strong>Price: </strong>
                <span>{data.Item_DefaultPrice}</span>
              </div>
              <div className="custListBlock">
                <strong>Store Key: </strong>
                <span>{data.Item_StoreKey}</span>
              </div>
              <div className="custListBlock">
              </div>
            </div>
            ))}
          </div>
          <div className="form-row" style={{display:"flex"}}>
                  <div className="form-check" style={{paddingRight: "10px"}}>
                    <input className="form-check-input" onClick={(e) => onChaneEnv(1)} type="radio" checked={isdevOrProd === 1} value="True" name="inlineRadioOptions" id="inlineRadio1"/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Production</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" onClick={(e) => onChaneEnv(0)} type="radio" checked={isdevOrProd === 0} value="True" name="inlineRadioOptions" id="inlineRadio2"/>
                    <label className="form-check-label" htmlFor="inlineRadio2">Testing</label>
                  </div>
          </div>
          {appStatus.success && <p style={{color: "green"}}>Details Updated</p>}
            <Button text={appStatus.loading ? "Loading..." : "Update"} className="btn btn-grey" disabled={appStatus.loading || changeStatusBool}/>
            </form>
          </div>
          </div>
          {/* } */}
          {/* {PromoStatus.loading && <p>Loading</p>}
          {PromoStatus.error && <p>{PromoStatus.error}</p>} */}
        </div>

      </div>
    </main>

  );
}
