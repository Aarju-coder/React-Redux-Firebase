import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/type";
import { saveNotiffication, setstatus } from "../../redux/notifiation/api";
import { status } from "../../redux/notifiation/selector";
import Button from "../UI/Button";
export type playerData = {
    playerData: [];
}
export default function NotificationPage() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const dispatch = useDispatch();
    const  {loading, success, error}  = useSelector<RootState, RootState["notificationStatus"]>(status);
    function sendNotification(e: any){
        e.preventDefault();
        if(title !== "" && body !== ""){
            dispatch(saveNotiffication(title, body));
        }else dispatch(setstatus({loading: false, success: false, error: "* Please enter both title and body of the notification."}));
    }
    return (
        <main>
            <div className="container-fluid px-4">
                <div className="innerPageContent">
                    <div className="row justify-content-between align-items-center pageHeader">
                        <div className="col-auto">
                            <h1 className="pageTitle">
                                Notification/Updates
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={sendNotification}>
                                <div className="form-row">
                                    <label htmlFor="" className="required">Required Field *</label>
                                    <input onChange={((e)=>setTitle(e.target.value)) } type="text" className="form-control" id="" placeholder="Title" />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="" className="required">Required Field *</label>
                                    <textarea onChange={((e)=>setBody(e.target.value)) } className="form-control" placeholder="Description"></textarea>
                                </div>
                                {/* <div className="form-row">
                                    <label htmlFor="upload" className="file-upload">
                                        Upload A Photo
                                        <span>(Optional)</span>
                                    </label>
                                    <input type="file" id="upload" />
                                </div> */}
                                <div className="form-row">
                                    <div className="customSelect">
                                        <span className="arrow">
                                            <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.08621 12.2251C7.70131 12.8918 6.73906 12.8918 6.35416 12.2251L0.312041 1.75984C-0.0728596 1.09317 0.408266 0.259841 1.17807 0.259841L13.2623 0.259842C14.0321 0.259842 14.5132 1.09317 14.1283 1.75984L8.08621 12.2251Z" fill="#666666" />
                                            </svg>
                                        </span>
                                        {/* <select name="" id="" className="form-control">
                                            <option value="">Select Category</option>
                                            <option value="">Iphone</option>
                                            <option value="">Android</option>
                                        </select> */}
                                    </div>
                                </div>
                                {success && <p style={{color: "green"}}>* Notification Sent!</p>}
                                    {error && <p style={{color: "red"}}>{error}</p>}
                                    <Button text={loading ? "Loading..." : "Send Notification"} className="btn btn-grey" disabled={loading} />
                                {/* <button type="submit" className="btn btn-grey">Send Notification</button> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}