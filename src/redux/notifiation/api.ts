import { AppThunk } from "../store";
import { status } from "../type";
import { setStatusState } from "./slice";
import {REACT_APP_FIREBASE_API_AUTH_KEY } from '../../components/constant'


export const setstatus= (stat: status): AppThunk => (dispatch) => {
  dispatch(setStatusState(stat))
}

export const saveNotiffication = (title: string, body: string):AppThunk => async(dispatch) => {
  // applyNotification();
  dispatch(setstatus({loading: true, success:false, error:""}));
    const endpoint = "https://fcm.googleapis.com/fcm/send";
    const auth = "key="+REACT_APP_FIREBASE_API_AUTH_KEY;
    let dataObj = {
                "to": "/topics/newTopic",
                "notification": {
                  "title": title,
                  "body": body,
                  "mutable_content": true,
                  "sound": "Tri-tone",
                  },
                  "direct_boot_ok" : true,
    }
    await fetch(endpoint, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify(dataObj) // body data type must match "Content-Type" header
    }).then(resp => {
        return resp.text();
    }).catch((err)=>{
      dispatch(setstatus({loading: false, success:false, error:err.message}));
    })
    .then(res => {
        console.log("the resp is:", res);
        dispatch(setstatus({loading: false, success:true, error:""}));
    }).catch((err) => {
      dispatch(setstatus({loading: false, success:false, error:err.message}));
    });
}


