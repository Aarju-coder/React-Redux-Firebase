import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { status } from "../../redux/ContactUs/selector";
import { RootState } from "../../redux/type";
import { setContact, setstatus } from "../../redux/ContactUs/api";
import Button from "../UI/Button";

export default function ContactUs(){
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");
    const dispatch = useDispatch();
    const [isdevOrProd, isDevOrProd] = useState(0);
    const  {loading, success, error}  = useSelector<RootState, RootState["contactStatus"]>(status);
    function saveContact(e: any){
        e.preventDefault();
        if(email !== "" && url !== ""){
            dispatch(setContact(email, url, isdevOrProd));
        }else dispatch(setstatus({loading: false, success: false, error: "Please enter both email and website link."}));
    }
    function onChaneEnv(bool: number){
        // dispatch(getAllPurchases(bool));
        isDevOrProd(bool);
      }
      return (
        <main>
                <div className="container-fluid px-4">
                    <div className="innerPageContent">
                        <div className="row justify-content-between align-items-center pageHeader">
                            <div className="col-auto">
                              <h1 className="pageTitle">
                                Contact Us
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
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={saveContact}>
                                    {/* <div className="form-row">
                                        <input type="text" className="form-control" id="" placeholder="Name" />
                                    </div> */}
                                    {/* <div className="form-row">
                                        <input type="text" className="form-control" id="" placeholder="Phone No." />
                                    </div> */}
                                    <div className="form-row">
                                        <input type="text" className="form-control" id="" placeholder="Email" onChange={((e)=>setEmail(e.target.value)) }/>
                                    </div>
                                    <div className="form-row">
                                        <input type="text" className="form-control" id="" placeholder="Website URL" onChange={((e)=>setUrl(e.target.value))} />
                                    </div>
                                    {success && <p style={{color: "green"}}>Contact Updated!</p>}
                                    {error && <p  style={{color: "red"}}>{error}</p>}
                                    <Button text={loading ? "Loading..." : "Send Request"} className="btn btn-grey" disabled={loading} />

                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
      );
    }