import React, { useEffect, useState } from "react";
export type playerData ={
    playerData: [];
}
export default function PrivacyPolicyPage(){
//   const [Players, setPlayers] = useState<string[]>([]);
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
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form>
                                    {/* <div className="form-row">
                                        <input type="text" className="form-control" id="" placeholder="Title" />
                                    </div> */}
                                    <div className="form-row">
                                        <textarea className="form-control" placeholder="Description" defaultValue="<b><size=78>Game Design and Development</size></b><br>Surf Sharks Corporation in collaboration with<br>Logic Simplified, LLC<br><br><b><size=78>Graphics and Audio </size></b><br>Chance Wolf<br><br><b><size=78>Music</size></b><br>Matt and Tracy Mitchell <br>Chance Wolf<br><br><b>Special thanks to all our friends and family,<br>And sharks too! </b>
                                        "></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-grey">Publish</button>
                                    {/* <button type="submit" className="btn btn-grey ms-2">Add Field</button> */}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
    
  );
}