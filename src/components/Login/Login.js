import { message } from "antd";
import axios from "axios";
// import cors from "cors";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HiddenSpinner, ShowSpinner } from "../Redux/spinnerSlice";
import './Login.css'
import SignUp from '../SignUp/SignUp'

const Login = () => {

    const dispatch = useDispatch();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);




    const eventHandler = async (e) => {
        e.preventDefault();

        if (email.trim() === "") {
            setEmailValid(false);
            return;
        }
        setEmailValid(true);

        if (password.trim() === "") {
            setPasswordValid(false);
            return;
        }
        setPasswordValid(true);
        console.log(email + password);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
                // headers: {
                //     "Content-type": "application/json",
                // },
            };
            dispatch(ShowSpinner());
            const { data } = await axios.post(
                "http://localhost:4000/api/user/login",
                {
                    email,
                    password,
                },
                config
            )
            if (data.success) {
                message.success(data.message);
                window.location.href = '/dashboard';

            } else{
                message.error(data.message);
            }
            console.log(data);
            // localStorage.setItem('userInfo', JSON.stringify(data));
            // localStorage.setItem('token', JSON.stringify(data.data))
            localStorage.setItem("token", data.data);
            // window.location.href = '/dashboard';
            dispatch(HiddenSpinner());
        } catch (error) {
            dispatch(HiddenSpinner());
            message.error(error.message);
            // setError(error.response.data.message);
        }
    };

    return (
        <div className="login">
            <div className="login-1">
                <p className="title">WELCOME TO QUIZZ APP</p>
                <form className="login-form" onSubmit={eventHandler}>
                    <p className="form-p">Login Here to Continue</p>
                    <label className="login-label">User Name</label>
                    <input value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        type='email'
                        placeholder="name@example.com" />
                    {!emailValid && <p className="p1">Email must not be empty</p>}
                    <label className="login-label">Password</label>
                    <input value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        type='password'
                        placeholder="**********" />
                    {!passwordValid && <p className="p1">Password must not be empty</p>}
                    <input className="login-button" type='submit' value='Log In' />
                    <p className="bottom-p">Do Not have an account! Please click here to&nbsp; 
                        <Link to='/signup'>Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;