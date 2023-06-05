//import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Charachter, RootState } from "../../redux/type";
import { CharSelector } from "../../redux/charachters/selector";
import { SetSelectedCharchter, launchCharchter, setDevOrProdApi } from "../../redux/charachters/api";
import { useEffect, useState } from "react";
export type playerData = {
  playerData: [];
}
export default function SharkSkinPage() {
  const { charArray, fetchStatus, isdevOrProd } = useSelector<RootState, RootState["charachters"]>(CharSelector);
  const dispatch = useDispatch();
  const [boolean, isDevOrProduc] = useState(1);
  function onLaunch(char: Charachter) {
    setSelectedChar(char);
    dispatch(launchCharchter(char, isdevOrProd));
  }
  function setSelectedChar(char: Charachter) {
    console.log("setSelectedChar");
    dispatch(SetSelectedCharchter(char));
  }
  function onChaneEnv(bool: number){
    console.log("CHECK", bool, isdevOrProd);
    dispatch(setDevOrProdApi(bool));
  }
  function checkCharType(data: string) {
    if (data === "Shark") return true
    return false;
  }
  //   const [Players, setPlayers] = useState<string[]>([]);
    useEffect(() => {
      console.log("HERE IS", isdevOrProd);
      isDevOrProduc(isdevOrProd)
    },[isdevOrProd]);
  return (
    <main>
      <div className="container-fluid px-4">

        <div className="innerPageContent">
          <div className="row justify-content-between align-items-center pageHeader">
            <div className="col-auto">
              <h1 className="pageTitle">
                Shark Skins
              </h1>
            <div className="form-row" style={{display:"flex"}}>
                  <div className="form-check" style={{paddingRight: "10px"}}>
                    <input className="form-check-input" onClick={(e) => onChaneEnv(1)} type="radio" checked={boolean === 1} value="True" name="inlineRadioOptions" id="inlineRadio1"/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Production</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" onClick={(e) => onChaneEnv(0)} type="radio" checked={boolean === 0} value="True" name="inlineRadioOptions" id="inlineRadio2"/>
                    <label className="form-check-label" htmlFor="inlineRadio2">Testing</label>
                  </div>
            </div>
            </div>
          </div>
          <div className="row">
            {fetchStatus.success &&
              charArray.map((value) => (
                (checkCharType(value.Charachter_Type) && <div className="col-xl-4 col-lg-6">
                  <div className="skinBlock" key={value.Char_Name}>
                    {value.Launched ? <div className="image">
                      <img src={value.rideImageUrl} alt="" />
                    </div>
                      : <div className="image disabled">
                        <img src={value.rideImageUrl} alt="" />
                      </div>}
                    <div className="desc">
                      <h3>{value.Char_Name}</h3>
                      <div className="flexBox">
                        {/* <p>Description</p> */}

                        {value.Launched ? <button className="launch" disabled>Launched</button> :
                          <button onClick={() => onLaunch(value)} className="launch" >Launch</button>
                        }
                         {value.Launched && <a onClick={() => dispatch(SetSelectedCharchter(value))} data-bs-toggle="modal" data-bs-target="#editProfile" className="modalBtn"><img src={"/assets/img/dot.svg"} alt="" /></a>}

                      </div>
                    </div>
                  </div>
                </div>)

              ))
            }
            {fetchStatus.loading && <p>Loading...</p>}
            {fetchStatus.error && <p style={{color: "red"}}>{fetchStatus.error}</p>}
          </div>
        </div>

      </div>
    </main>

  );
}