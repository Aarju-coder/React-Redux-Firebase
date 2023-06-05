import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/type";
import { CharSelector } from "../../redux/charachters/selector";
import { useEffect, useState } from "react";
import {changeCharDataAction, setError, setLoader, setSuccess} from "../../redux/charachters/api"
import Button from "../UI/Button";
export default function SkinPupupComponent() {
  const   {selectedChar, success, error, loader, isdevOrProd}   = useSelector<RootState, RootState["charachters"]>(CharSelector);
  const [fieldError, setErrorField] = useState("");
  const [icon, setIcon] = useState<File | undefined>();
  const [ride, setRide] = useState<File | undefined>();
  const [skin, setSkin] = useState<File | undefined>();
  const [description, setdescription] = useState("");
  const [env, setEnv] = useState("Development");

  const [googleKey, setGoogleKey] = useState("123456");
  const [appleKey, setAppleKey] = useState("123456");
  const [costing, setCosting] = useState("100");
  const [headIcon, setHeadIcon] = useState("");
  const [iconImageUrl, setIconImageUrl] = useState("assets/img/upload-icon.svg");
  const [rideImageUrl, setRideImageUrl] = useState("assets/img/upload-icon.svg");
  const [skinImageUrl, setSkinImageUrl] = useState("assets/img/upload-icon.svg");
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (icon) {
      console.log("icon",icon);
      setIconImageUrl(URL.createObjectURL(icon));
    }
  }, [icon]);
  // useEffect(() => {
  //   if (success) {
  //     console.log("icon",success);
  //     // setIconImageUrl(URL.createObjectURL(success));
  //     onClose();
  //   }
  // }, [success]);

  useEffect(() => {
    console.log("HERE USED");
    
    setHeadIcon("")
    setHeadIcon(selectedChar.iconImageUrl)
  }, [selectedChar]);
  useEffect(() => {
    if(ride){
      console.log("ride",ride);
      setRideImageUrl(URL.createObjectURL(ride));
    }
  }, [ride]);
useEffect(() => {
  if(skin){
    console.log("skin",skin);
    setSkinImageUrl(URL.createObjectURL(skin));
  }
}, [skin]);
  function setIconChange(e:any){
    e.preventDefault();
    console.log(e);
   
      if(e.target.files){
    setIcon(e.target.files[0]);
    e.target.value  = "";
    }
    
    console.log("setting icon")
  }
  function setRideChange(e:any){
    e.preventDefault();
    
      if(e.target.files){setRide(
        e.target.files[0]);
        e.target.value  = "";
      }
    console.log("setting icon")
    
  }
  function setSkinChange(e:any){
    e.preventDefault();
    
      if(e.target.files){setSkin(
        e.target.files[0]);
        e.target.value  = "";
      }
    console.log("setting skin")
    
  }
  function onSubmitHandler(e: any){
    e.preventDefault();
    dispatch(setLoader(true));
    setErrorField("")
    console.log("onSubmitHandler", e);
    console.log("popup data ",googleKey, description, costing, appleKey);
    if(selectedChar.Charachter_Type === "Surfer")
    {
      dispatch(changeCharDataAction(selectedChar, {description:description,googleKey:googleKey, costing:costing, appleKey:appleKey, icon: icon, ride: ride, skin:skin}, isdevOrProd));
  }else if( selectedChar.Charachter_Type === "Shark")
  {
    dispatch(changeCharDataAction(selectedChar, {description:description,googleKey:googleKey, costing:costing, appleKey:appleKey, icon: icon, ride: ride, skin:skin}, isdevOrProd));
}
  //   else {
  //     dispatch(setLoader(false));
  //     setErrorField("* Fill All fields.");
  // }
  }
  function resetValues(){
    setSkinImageUrl("assets/img/upload-icon.svg");
    setRideImageUrl("assets/img/upload-icon.svg");
    setIconImageUrl("assets/img/upload-icon.svg");
    setCosting("");
    // setAppleKey("");
    // setGoogleKey(""); 
    setdescription("");
    setIcon(undefined);
    setRide(undefined);
    setSkin(undefined);
    dispatch(setLoader(false));
      dispatch(setSuccess(false));
        dispatch(setError(false));
        setErrorField("")

  }
  // function onClose(){
  //   var close = document.getElementById("editProfile");
  //   const instance = new bootStrap
  // }
  return (
    <div className="modal fade" id="editProfile" aria-labelledby="editProfileLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header border-0 px-4">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetValues}></button>
          </div>
          <div className="modal-body">
            <h3>Edit Surfer Profile</h3>

            <div className="user-image">
              <img className="skinImage" src={headIcon} alt="" />
            </div>
            <div className="user-title">{selectedChar.Char_Name}</div>

            <div className="form" onSubmit={onSubmitHandler}>
              <form>
                <div className="form-row">
                  <label htmlFor="" className="form-label">Surfer Name</label>
                  <input type="text" className="form-control" id="" value={selectedChar.Char_Name} />
                </div>

                
                <div className="form-row row">
                 
                  <div className="col-md-4  mb-3">
                    <div className="imageUpload">
                    <img src={iconImageUrl} alt=""   />
                    </div>
                    <label htmlFor="" className="form-label d-block text-center">Change Icon</label>
                    <label htmlFor="icon" className="uploadFile">
                      
                      UPLOAD
                    </label>
                    <input type="file" className="icon uploadImageButton" name="icon" id="icon" accept="image/*" onInput={setIconChange}/>
                  </div>
                  
                  
                 
                   <div className="col-md-4  mb-3">
                    <div className="imageUpload">
                    <img src={rideImageUrl} alt="" />
                    </div>
                    <label htmlFor="" className="form-label d-block text-center">Change Ride</label>
                    <label htmlFor="ride" className="uploadFile">
                     
                      UPLOAD
                    </label>
                    <input type="file" name="ride" className="ride uploadImageButton" id="ride" accept="image/*" onInput={setRideChange}/>
                  </div>
                  
                  
                 
                  {selectedChar.Charachter_Type === "Surfer" && <div className="col-md-4">
                    <div className="imageUpload">
                    <img src={skinImageUrl} alt="" />
                    </div>
                    <label htmlFor="" className="form-label d-block text-center">Change Skins</label>
                    <label htmlFor="skin" className="uploadFile">
                     
                      UPLOAD
                    </label>
                    <input type="file" name="skin" className="skin uploadImageButton" id="skin" accept="image/*" onInput={setSkinChange}/>
                  </div>}
                 
                 
                </div>


                <div className="form-row">
                  <label htmlFor="" className="form-label">Player Description</label>
                  <textarea id="" className="form-control" value={description} placeholder="Enter Description" onChange={(e)=>{if(e.target.value){setdescription(e.target.value);}else{setdescription("");}}}></textarea>
                </div>

                {/* <div className="user-title mb-4">In App Purchases</div> */}
                {/* <div className="form-row">
                  <label htmlFor="" className="form-label">Apple Key</label>
                  <input type="text" className="form-control" id="" value={appleKey} placeholder="Enter Your Apple Key" onChange={(e)=>{if(e.target.value)setAppleKey(e.target.value);else{setAppleKey("");}}}/>
                </div>
                <div className="form-row">
                  <label htmlFor="" className="form-label">Google Key</label>
                  <input type="text" className="form-control" id="" value={googleKey} placeholder= "Enter Your Google Key" onChange={(e)=>{if(e.target.value)setGoogleKey(e.target.value);else{setGoogleKey("");}}}/>
                </div> */}
                <div className="form-row">
                  <label htmlFor="" className="form-label">Costing</label>
                  <input type="number" className="form-control" id="" value={costing} placeholder="Cositng" onChange={(e)=>{if(e.target.value)setCosting(e.target.value);else {setCosting("");}}} />
                </div>
                {/* <div className="form-row">
                  <div className="form-check">
                    <input className="form-check-input" onClick={(e) => isDevOrProd(1)} type="radio" checked={isdevOrProd === 1} value="True" name="inlineRadioOptions" id="inlineRadio1"/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Production</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" onClick={(e) => isDevOrProd(0)} type="radio" checked={isdevOrProd === 0} value="True" name="inlineRadioOptions" id="inlineRadio2"/>
                    <label className="form-check-label" htmlFor="inlineRadio2">Testing</label>
                  </div>
                </div> */}
                <div className="text-center">
                  {error && <p color="red">There Was issue connecting to server.</p>}
                  {fieldError && <p color="red">{fieldError}</p>}
                  {success && <p style={{color: "green"}}>Data Successfully Saved</p>}
                  <Button text={loader ? "Loading..." : "Done"} className="done-btn" disabled={loader} />
                  {/* <button className="done-btn" >Done</button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}