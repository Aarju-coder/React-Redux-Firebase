//import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/type";
import { powerUpSelect } from "../../redux/powerUps/selector";
import { getPowerUps, setDevOrProdApi, setPowerUps } from "../../redux/powerUps/api";
import { useEffect, useState } from "react";
export type playerData = {
    playerData: [];
}
export default function PowerUpPage() {
    const dispatch = useDispatch();
    const { powerUp, status, fetchingData, isdevOrProduc } = useSelector<RootState, RootState["powerUpState"]>(powerUpSelect);
    
      function onChaneEnv(bool: number){
        console.log("HERE", bool, isdevOrProduc);
        
        dispatch(setDevOrProdApi(bool));
      }
    function handelClick(event: any , name: string){
        event.preventDefault();   
        console.log("CLICK", isdevOrProduc);
        if(event.target){
        console.log("event in power up", event.target);

            if(event.target.checked == true){
                console.log("diaptch true");
                dispatch(setPowerUps(true, name, isdevOrProduc));
            }else if(event.target.checked == false){
                console.log("diaptch false");
                dispatch(setPowerUps(false, name, isdevOrProduc));
            }
        }
        
    }

    return (
        <main>
            <div className="container-fluid px-4">

                <div className="innerPageContent">
                    <div className="row justify-content-between align-items-center pageHeader">
                        <div className="col-auto">
                            <h1 className="pageTitle">
                                Power-ups
                            </h1>
                    <div className="form-row" style={{display:"flex"}}>
                        <div className="form-check" style={{paddingRight: "10px"}}>
                            <input className="form-check-input" onClick={(e) => onChaneEnv(1)} type="radio" checked={isdevOrProduc === 1} name="inlineRadioOptions" id="inlineRadio1"/>
                            <label className="form-check-label" htmlFor="inlineRadio1">Production</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" onClick={(e) => onChaneEnv(0)} type="radio" checked={isdevOrProduc === 0} name="inlineRadioOptions" id="inlineRadio2"/>
                            <label className="form-check-label" htmlFor="inlineRadio2">Testing</label>
                        </div>
                    </div>
                        </div>
                    </div>
                    <div className="row">
                        {powerUp.length && powerUp.map((val)=>(
                                <div className="col-md-6" key={val.Name}>
                                <div className="powerups">
                                    <div className="image">
                                        <img className="powerupImage" src= {"/assets/img/Powerups/"+val.Name+".png"} alt="" />
                                    </div>
                                    <div className="desc">
                                        <div className="content">
                                            <h4>{val.Name}</h4>
                                        </div>
                                        <div className="btn">
                                        <div className="toggles">
                                            <input type="checkbox" name={val.Name} id={val.Name}
                                                className="ios-toggle" checked={val.State} onClick={(e)=>{if(e.target)handelClick(e, val.Name)}}/>
                                            <label htmlFor={val.Name} className="checkbox-label"></label>
                                            </div>
                                            {/* {val.State ? <div className="toggles">
                                            <input type="checkbox" name={val.Name} id={val.Name}
                                                className="ios-toggle" checked />
                                            <label htmlFor={val.Name} className="checkbox-label"></label>
                                            </div>:
                                            <div className="toggles">
                                            <input type="checkbox" name={val.Name} id={val.Name}
                                                className="ios-toggle"  />
                                            <label htmlFor={val.Name} className="checkbox-label"></label>
                                            </div>
                                            } */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            {fetchingData && <p>Loading...</p>}
                        {/* <div className="col-md-6">
                            <div className="powerups">
                                <div className="image">
                                    <img src={AppUrl.url + "assets/img/Starfish.png"} alt="" />
                                </div>
                                <div className="desc">
                                    <div className="content">
                                        <h4>Power-Ups</h4>
                                        <p>Description</p>
                                    </div>
                                    <div className="btn">
                                        <div className="toggles">
                                            <input type="checkbox" name="checkbox2" id="checkbox2"
                                                className="ios-toggle" checked />
                                            <label htmlFor="checkbox2" className="checkbox-label"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="powerups disable">
                                <div className="image">
                                    <img src={AppUrl.url + "assets/img/Starfish.png"} alt="" />
                                </div>
                                <div className="desc">
                                    <div className="content">
                                        <h4>Power-Ups</h4>
                                        <p>Description</p>
                                    </div>
                                    <div className="btn">
                                        <div className="toggles">
                                            <input type="checkbox" name="checkbox3" id="checkbox3"
                                                className="ios-toggle" checked />
                                            <label htmlFor="checkbox3" className="checkbox-label"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

            </div>
        </main>

    );
}