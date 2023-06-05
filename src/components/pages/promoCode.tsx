//import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadTutorial } from "../../redux/UploadTutorial/api";
import { PromoCode, RootState } from "../../redux/type";
import { status } from "../../redux/UploadTutorial/selector";
import Button from "../UI/Button";
import { promoArraySelect } from "../../redux/promocode/selectors";
import { disablePromoCode, setPromoCode } from "../../redux/promocode/api";
import { setCodeStatus, setPromoCodeStatus } from "../../redux/promocode/slice";
export type playerData = {
  playerData: [];
}
export default function PromoPage() {
  const [rewardCoins, setRewardCoin] = useState(0);
  const [code, setCodes] = useState('');
  const [isPublic, isPublicOrPrivate] = useState(true);
  const {PromoDetails , PromoStatus, DeleteStatus, deleteCode, PromoCodeStatus , CodeStatus, setCode} = useSelector<RootState, RootState["PromoCodeRoot"]>(promoArraySelect)
  
  const dispatch = useDispatch();
  useEffect(() => {
  }, []);
  
  function onSubmitHandler(e: any) {
    e.preventDefault();   
    let flag = false;
    PromoDetails.map((data) => {
      if(data.code == code){
        flag = true;
      }
    })
    if(!rewardCoins && code == ''){
      dispatch(setPromoCodeStatus({
        loading: false,
      success:false,
      error: "Enter Reward Coins!"
      }));
      dispatch(setCodeStatus({
        loading: false,
      success:false,
      error: "Enter Code!"
      }));
    }
    else if(!rewardCoins){
      dispatch(setPromoCodeStatus({
        loading: false,
      success:false,
      error: "Enter Reward Coins!"
      }));
    }
    else if(code == ''){
      dispatch(setCodeStatus({
        loading: false,
      success:false,
      error: "Enter Code!"
      }));
    }
    else if(flag){
      dispatch(setCodeStatus({
        loading: false,
      success:false,
      error: "Code already exists!"
      }));
    }
    else{
      dispatch(setPromoCode({rewardCoins: rewardCoins, isPublic : isPublic, code : code, isAvailable: true }));
      dispatch(setCodeStatus({
        loading: false,
      success:true,
      error: null
      }));
      setRewardCoin(0);
      setCodes('');
      flag = false;
      isPublicOrPrivate(true);
    }
  }

  function onGenerateCode(){
    setCodes(Math.floor(Math.random() * 900000000).toString());
    dispatch(setCodeStatus({
      loading: false,
    success:false,
    error: null
    }));
    dispatch(setPromoCodeStatus({
      loading: false,
    success:false,
    error: null
    }));

    // for(let i = 0; i< data.AllPromoCodeArray.length; i++){
    //   if(data.AllPromoCodeArray[i].code == data.code){
    //     return onGenerateCode(data);
    //   } 
    //   else{
    //     return code;
    //   }
    // }
  }
  
  function onDisableHandler(code: PromoCode) {
    // e.preventDefault();
    console.log("file delete ->> ", code)
    dispatch(disablePromoCode(code))
  }
  
  return (
    <main>
      <div className="container-fluid px-4">
        <div className="innerPageContent">
          <div className="row justify-content-between align-items-center pageHeader">
            <div className="col-auto">
              <h1 className="pageTitle">
                Promo Code Generator
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <form className="mb-5" onSubmit={onSubmitHandler}>
                <div className="form-row">
                  <label htmlFor="">Enter Reward Coins</label>
                  <input type="number" className="form-control" id="" placeholder="Reward Coins" onChange={(e) => {
                    setRewardCoin(parseInt(e.target.value));
                    dispatch(setPromoCodeStatus({
                      loading: false,
                    success:false,
                    error: null
                    }));
                    }} value={rewardCoins} />
                {PromoCodeStatus.error && <p style={{color: "red"}}>{PromoCodeStatus.error}</p>}
                </div>
                <div>
                  <div className="form-row">
                    <input className="form-check-input" type="radio" checked={isPublic} value="True" onClick={() => isPublicOrPrivate(true)} />
                    <label className="form-check-label">
                      Public
                    </label>
                  </div>
                  <div className="form-row">
                    <input className="form-check-input" type="radio" checked={!isPublic} value="False" onClick={() => isPublicOrPrivate(false)} />
                    <label className="form-check-label">
                      Private
                    </label>
                  </div>
                </div>
                <div className="form-row">
                <label htmlFor="">Enter Code</label>
                  <input onChange={(e) =>  {
                    setCodes(e.target.value);
                    dispatch(setCodeStatus({
                      loading: false,
                    success:false,
                    error: null
                    }));
                    }} type="text" className="form-control" id="" placeholder="Code" value= {code}/>
                {CodeStatus.error && <p style={{color: "red"}}>{CodeStatus.error}</p>}
                  <Button onClick={() => onGenerateCode()} type="button" text={"Generate Code"} className="btn btn-primary" disabled={PromoCodeStatus.loading} />
                </div>
                {/* <div className="form-row">
                  <div className="video-upload"> */}
                    {/* <input type="text" id="" placeholder="Upload File" /> */}
                    {/* <p className="form-control">{fileName}</p>
                    <input type="file" name="video" id="video" accept="video/*" onChange={(e) => { if (e.target.files) setFile(e.target.files[0]) }} />
                    <label htmlFor="video"  ><img src={"/assets/img/video-upload.png"} alt="" /></label>
                  </div>
                </div> */}
                  {PromoCodeStatus.success && <p style={{color: "green"}}>Promo Code Generated.</p>}

                
                <Button type="submit" text={PromoCodeStatus.loading ? "Loading..." : "Publish"} className="btn btn-grey" disabled={PromoCodeStatus.loading} />
                {/* disabled={loading || !btnActive} */}
              </form>
            </div>
          </div>
          <div className="row justify-content-between align-items-center pageHeader">
            <div className="col-auto">
              <h1 className="pageTitle">
                Existing Promo Codes
              </h1>
            </div>
          </div>

          {PromoStatus.success &&
            <div className="custList">
          <div className="row">
            {PromoDetails.map((data , index)=>(
              <div className="col-md-3 mb-4" id={index.toString()}>
              <div className="custListBlock">
                <strong>Code: </strong>
                <span>{data.code}</span>
              </div>
              <div className="custListBlock">
                <strong>Available: </strong>
                <span>{data.isAvailable?"True":"False"}</span>
              </div>
              <div className="custListBlock">
                <strong>Public: </strong>
                <span>{data.isPublic?"True":"False"}</span>
              </div>
              <div className="custListBlock">
                <strong>Reward Coins: </strong>
                <span>{data.rewardCoins}</span>
              </div>
              <div className="custListBlock">
                  <Button text={data.code == deleteCode && DeleteStatus.loading ? "Loading..." : data.isAvailable === true ? "Disable" : "Enable"} onClick={() => onDisableHandler(data)} className={data.isAvailable === true ? "btn btn-danger" : "btn btn-success"}  disabled={DeleteStatus.loading}/>
              </div>
            </div>
            ))}
          </div>
          </div>
          }
          {PromoStatus.loading && <p>Loading</p>}
          {PromoStatus.error && <p style={{color: "red"}}>{PromoStatus.error}</p>}
        </div>

      </div>
    </main>

  );
}

{/* <Button text={loading ? "Loading..." : "Delete"} onClick={() => onDeleteHandler(data.code)} className="btn btn-grey" disabled={loading || !btnActive} /> */}
