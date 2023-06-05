import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTerms, setstatus } from "../../redux/terms/api";
import Button from "../UI/Button";
import { RootState } from "../../redux/type";
import { status } from "../../redux/terms/selector";

export type playerData ={
    playerData: [];
}
export default function TermPage(){
    const [desc, setDesc] = useState("");
    const [isdevOrProd, isDevOrProd] = useState(1);
    const dispatch = useDispatch();
    const  {loading, success, error}  = useSelector<RootState, RootState["termsStatus"]>(status);
    function saveDescription(e: any){
        e.preventDefault();
        if(desc !== ""){
            if(desc.length>=10)
            dispatch(setTerms(desc, isdevOrProd))
            else dispatch(setstatus({loading: false, success: false, error: "Please enter atleast 10 characters."}));
        }else dispatch(setstatus({loading: false, success: false, error: "Please enter atleast 10 characters."}));
    }
  return (
    <main>
    <div className="container-fluid px-4">
        
        <div className="innerPageContent">
            <div className="row justify-content-between align-items-center pageHeader">
                <div className="col-auto">
                  <h1 className="pageTitle">
                    Terms & Conditions
                  </h1>
                  <div className="form-row" style={{display:"flex"}}>
                  <div className="form-check" style={{paddingRight: "10px"}}>
                        <input className="form-check-input" onClick={(e) => isDevOrProd(1)} type="radio" checked={isdevOrProd === 1} />
                        <label className="form-check-label" htmlFor="inlineRadio1">Production</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" onClick={(e) => isDevOrProd(0)} type="radio" checked={isdevOrProd === 0} />
                        <label className="form-check-label" htmlFor="inlineRadio2">Testing</label>
                    </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={saveDescription}>
                        {/* <div className="form-row">
                            <input type="text" className="form-control" id="" placeholder="Title" />
                        </div> */}
                        <div className="form-row">
                            <textarea className="form-control" placeholder="Description" onChange={((e)=>setDesc(e.target.value))}></textarea>
                        </div>
                        {success && <p style={{color: "green"}}>Terms and Conditions Updated!</p>}
                        {error && <p style={{color: "red"}}>{error}</p>}
                        <Button text={loading ? "Loading..." : "Publish"} className="btn btn-grey" disabled={loading} />
                        
                        {/* <button type="submit" className="btn btn-grey ms-2">Add Field</button> */}
                    </form>
                </div>
            </div>
        </div>

    </div>
</main>
    
  );
}