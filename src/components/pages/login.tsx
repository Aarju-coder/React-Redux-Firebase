//import { NavLink } from "react-router-dom";
import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinAction, setErrorAction } from '../../redux/firebaseState/api'
import { RootState } from "../../redux/type";
import Message from '../UI/Message';
import Button from "../UI/Button";
import { currentAuth } from '../../redux/firebaseState/selectors'
import { useNavigate } from 'react-router-dom';


export const LoginComponent: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, success, authenticated } = useSelector<RootState, RootState["auth"]>(currentAuth);
    console.log("success", success)
    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setErrorAction(''));
            }
        }
    }, [error, dispatch]);
    useEffect(() => {
        if (authenticated) {
            console.log("authenticated")
            //dispatch(getPlayersAction())
            navigate('AfterLogin/', {})
        }
    }, [authenticated, navigate])
    const submitHandler = (e: any) => {
        e.preventDefault();
        if (error) {
            dispatch(setErrorAction(''));
        }
        
        if(email != "admin@surfsharks.com"){
            dispatch(setErrorAction('You are not an Admin !'));
        }else{
            setLoading(true);
        
        dispatch(signinAction({ email, password }, () => setLoading(false)));
         }
        
    }

    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header">
                                        <h3 className="text-center font-weight-light my-4">Admin Login</h3>
                                        <p className="subtitle">Please fill in your unique admin login details below</p>
                                    </div>

                                    <div className="card-body">
                                        <form onSubmit={submitHandler}>
                                            {error && <Message type="danger" msg={error} />}
                                            <div className="mb-3">
                                                <label htmlFor="inputEmail">Email address</label>
                                                <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="inputPassword">Password</label>
                                                <input className="form-control" id="inputPassword" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                            </div>
                                            {/* <div className="text-end">
                                                <a className="small forgetPass" href="password.html">Forgot Password?</a>
                                            </div> */}
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Button text={loading ? "Loading..." : "Sign In"} className="btn signBtn" disabled={loading} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}