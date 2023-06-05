//import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/type";
import { status } from "../../redux/MusicVideo/selector";
import Button from "../UI/Button";
import { UploadMusic } from "../../redux/MusicVideo/api";
export type playerData = {
  playerData: [];
}
export default function MusicPage() {
  const [file, setFile] = useState<File>();
  const [btnActive, setBtnActive] = useState(false);
  const [fileName, setfileName] = useState("Upload Video");
  const { loading, success, error } = useSelector<RootState, RootState["musicUploadStatus"]>(status);
  const [isdevOrProd, isDevOrProd] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      setBtnActive(true);
      setfileName(file.name)
    }
  }, [file]);

  function onSubmitHandler(e: any) {
    e.preventDefault();

    if (file) {
      console.log("file ->> ", file)
      dispatch(UploadMusic(file, isdevOrProd))
    }

  }
  return (
    <main>
      <div className="container-fluid px-4">
        <div className="innerPageContent">
          <div className="row justify-content-between align-items-center pageHeader">
            <div className="col-auto">
              <h1 className="pageTitle">
                Music Video
              </h1>
              <div className="form-row" style={{display:"flex"}}>
                  <div className="form-check" style={{paddingRight: "10px"}}>
                    <input className="form-check-input" onClick={(e) => isDevOrProd(1)} type="radio" checked={isdevOrProd === 1}/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Production</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" onClick={(e) => isDevOrProd(0)} type="radio" checked={isdevOrProd === 0}/>
                    <label className="form-check-label" htmlFor="inlineRadio2">Testing</label>
                  </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <form className="mb-5" onSubmit={onSubmitHandler}>
                {/* <div className="form-row">
                  <label htmlFor="" className="required">Required Field *</label>
                  <input type="text" className="form-control" id="" placeholder="Title"/>
                </div> */}
                <div className="form-row">
                  <div className="video-upload">
                    {/* <input type="text" id="" placeholder="Upload File" /> */}
                    <p className="form-control">{fileName}</p>
                    <input type="file" name="video" id="video" accept="video/*" onChange={(e) => { if (e.target.files) setFile(e.target.files[0]) }} />
                    <label htmlFor="video"  ><img src={"/assets/img/video-upload.png"} alt="" /></label>
                  </div>
                </div>
                {success && <p style={{color: "green"}}>Music Video Updated.</p>}
                {error && <p style={{color: "red"}}>{error}</p>}
                <Button text={loading ? "Loading..." : "Publish"} className="btn btn-grey" disabled={loading || !btnActive} />
              </form>
            </div>
          </div>

          {/* <div className="custList">
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="custListBlock">
                <strong>Code: </strong>
                <span>surfshark_code1</span>
              </div>
              <div className="custListBlock">
                <strong>Available: </strong>
                <span>True</span>
              </div>
              <div className="custListBlock">
                <strong>Public: </strong>
                <span>True</span>
              </div>
              <div className="custListBlock">
                <strong>Reward Coins: </strong>
                <span>100</span>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="custListBlock">
                <strong>Code: </strong>
                <span>surfshark_code1</span>
              </div>
              <div className="custListBlock">
                <strong>Available: </strong>
                <span>True</span>
              </div>
              <div className="custListBlock">
                <strong>Public: </strong>
                <span>True</span>
              </div>
              <div className="custListBlock">
                <strong>Reward Coins: </strong>
                <span>100</span>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="custListBlock">
                <strong>Code: </strong>
                <span>surfshark_code1</span>
              </div>
              <div className="custListBlock">
                <strong>Available: </strong>
                <span>True</span>
              </div>
              <div className="custListBlock">
                <strong>Public: </strong>
                <span>True</span>
              </div>
              <div className="custListBlock">
                <strong>Reward Coins: </strong>
                <span>100</span>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="custListBlock">
                <strong>Code: </strong>
                <span>surfshark_code1</span>
              </div>
              <div className="custListBlock">
                <strong>Available: </strong>
                <span>True</span>
              </div>
              <div className="custListBlock">
                <strong>Public: </strong>
                <span>True</span>
              </div>
              <div className="custListBlock">
                <strong>Reward Coins: </strong>
                <span>100</span>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="custListBlock">
                <strong>Code: </strong>
                <span>surfshark_code1</span>
              </div>
              <div className="custListBlock">
                <strong>Available: </strong>
                <span>True</span>
              </div>
              <div className="custListBlock">
                <strong>Public: </strong>
                <span>True</span>
              </div>
              <div className="custListBlock">
                <strong>Reward Coins: </strong>
                <span>100</span>
              </div>
            </div>
            
            
          </div>
          </div> */}
        </div>

      </div>
    </main>

  );
}