import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/type";
import { status } from "../../redux/credits/selector";
import { setCredits, setstatus } from "../../redux/credits/api";
import Button from "../UI/Button";

//import React, { useEffect, useState } from "react";
export type playerData ={
    playerData: [];
}
const templateData = "<b><size=78>Game Design and Development</size></b><br>Surf Sharks Corporation in collaboration with<br>Logic Simplified, LLC<br><br><b><size=78>Graphics and Audio </size></b><br>Chance Wolf<br><br><b><size=78>Music</size></b><br>Matt and Tracy Mitchell <br>Chance Wolf<br><br><b>Special thanks to all our friends and family,<br>And sharks too! </b>"
export default function Credits(){
    const  {loading, success, error}  = useSelector<RootState, RootState["creditStatus"]>(status);
    const dispatch = useDispatch();

    //   const [Players, setPlayers] = useState<string[]>([]);
    const [isTitle, title] = useState('');
    const [isTitle1, title1] = useState('');
    const [isTitle2, title2] = useState('');
    const [isTitle3, title3] = useState('');
    const [isTitle4, title4] = useState('');
    const [isTitle5, title5] = useState('');
    const [isTitle6, title6] = useState('');
    const [isTitle7, title7] = useState('');
    const [isTitle8, title8] = useState('');
    const [isTitle9, title9] = useState('');
    const [isdevOrProd, isDevOrProd] = useState(0);

    function onSubmitHandler(e: any) {
        e.preventDefault();  
        const string = {
            title1 : isTitle1,
            title2 : isTitle2,
            title4 : isTitle4,
            title6 : isTitle6,
            title7 : isTitle7,
        }
        if(isTitle1 == '' || isTitle2 == '' || isTitle4 == '' || isTitle6 == '' || isTitle7 == '' ){
            dispatch(setstatus({loading: false, success: false, error: "Please enter all fields"}));
        }
        else{
            dispatch(setCredits(string,isdevOrProd))
        }

    }

    function onChaneEnv(bool: number){
        // dispatch(getAllPurchases(bool));
        isDevOrProd(bool);
      }

//   useEffect(() => {
//     setPlayers(["aarju", "neeraj"])
//   });
  return (
    <main>
                <div className="container-fluid px-4">
                    
                    <div className="innerPageContent">
                        <div className="row justify-content-between align-items-center pageHeader">
                            <div className="col-auto">
                              <h1 className="pageTitle">
                                Credits
                              </h1>
                             <div className="form-row" style={{display:"flex"}}>
                                    <div className="form-check" style={{paddingRight: "10px"}}>
                                        <input className="form-check-input" onClick={(e) => onChaneEnv(1)} type="radio" checked={isdevOrProd === 1}/>
                                        <label className="form-check-label" htmlFor="inlineRadio1">Production</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" onClick={(e) => onChaneEnv(0)} type="radio" checked={isdevOrProd === 0}/>
                                        <label className="form-check-label" htmlFor="inlineRadio2">Testing</label>
                                    </div>
                            </div>
                            </div>
                            {/* {`<b><size=65>${}`} */}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={onSubmitHandler}>
                                    <div className="form-row">
                                        Game Design and Development 
                                    </div>
                                    <div className="form-row">
                                        <input onChange={(e) => title1(e.target.value)} type="text" className="form-control" id="" placeholder="Corporation"/>
                                    </div>    
                                    <div className="form-row">
                                        in collaboration with
                                    </div>                                
                                    <div className="form-row">
                                        <input onChange={(e) => title2(e.target.value)} type="text" className="form-control" id="" placeholder="Company"/>
                                    </div>                                    
                                    <div className="form-row">
                                        Graphics and Audio
                                    </div>                                    
                                    <div className="form-row">
                                        <input onChange={(e) => title4(e.target.value)} type="text" className="form-control" id="" placeholder="Name"/>
                                    </div>                                    
                                    <div className="form-row">
                                        Music
                                    </div>                                    
                                    <div className="form-row">
                                        <input onChange={(e) => title6(e.target.value)} type="text" className="form-control" id="" placeholder="Name"/>
                                    </div>                                    
                                    <div className="form-row">
                                        <input onChange={(e) => title7(e.target.value)} type="text" className="form-control" id="" placeholder="Name"/>
                                    </div>                                    
                                    <div className="form-row">
                                        Special thanks to all our friends and family,
                                    </div>                                    
                                    <div className="form-row">
                                        And sharks too!
                                    </div>
                                    {success && <p style={{color: "green"}}>Credits Updated!</p>}
                                    {error && <p style={{color: "red"}}>{error}</p>}
                                    <Button text={loading ? "Loading..." : "Publish"} className="btn btn-grey" disabled={loading} />
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
    
  );
}

