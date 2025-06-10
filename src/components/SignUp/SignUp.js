import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HiddenSpinner, ShowSpinner } from "../Redux/spinnerSlice";
import './SignUp.css';

const Login = () => {

    const dispatch = useDispatch();


    const [name, setUserName] = useState("");
    const [email, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const [userNameValid, setUserNameValid] = useState(true);
    const [userEmailValid, setUserEmailValid] = useState(true);
    const [userPasswordValid, setUserPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

    const eventHandler =async (e) => {
        e.preventDefault();

        if (name.trim() === "") {
            setUserNameValid(false);
            return;
        }
        setUserNameValid(true);

        if (email.trim() === "") {
            setUserEmailValid(false);
            return;
        }
        setUserEmailValid(true);

        if (password.trim() === "") {
            setUserPasswordValid(false);
            return;
        }
        setUserPasswordValid(true);

        if (confirmPassword.trim() === "") {
            setConfirmPasswordValid(false);
            return;
        }
        setConfirmPasswordValid(true);
        console.log(name + email + password + confirmPassword);

        if (password !== confirmPassword) {
            setErrorMessage("Password do not match")
        } else {
            setErrorMessage(null);

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
                dispatch(ShowSpinner());
                const {data} = await axios.post(
                    "http://localhost:4000/api/user/signup",
                    {
                       name,
                       email,
                       password
                    },
                    config
                );
                if(data.success){
                    message.success(data.message);
                    window.location.href = '/login';
                }else {
                    message.error(data.message);
                }

                console.log(data);
                localStorage.setItem("userInfo", JSON.stringify());
                dispatch(HiddenSpinner());
            } catch (error) {
                dispatch(HiddenSpinner());
                message.error(error.message);
            }
        }
    }

    return (
        <div className="signup">
            <div className="signup-1">
                <p className="title">WELCOME TO QUIZZOOO APP</p>
                <form className="signup-form" onSubmit={eventHandler}>
                    <p className="form-p">Sign Up Here to Continue</p>
                    <label className="signup-label">User Name</label>
                    <input value={name}
                        onChange={(e) => setUserName(e.target.value)}
                        type='text'
                        placeholder='Enter your name'
                        className="signup-input" />
                    {!userNameValid && <p className="p1">Username must not be empty</p>}
                    <label className="signup-label">Email</label>
                    <input value={email}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="signup-input"
                        type='email'
                        placeholder="name@example.com" />
                    {!userEmailValid && <p className="p1">Email must not be empty</p>}
                    <label className="signup-label">Password</label>
                    <input value={password}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="signup-input"
                        type='password'
                        placeholder="**********" />
                    {!userPasswordValid && <p className="p1">Password must not be empty</p>}
                    <label className="signup-label">Confirm Password</label>
                    <input value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="signup-input"
                        type='password'
                        placeholder="**********" />
                    {!confirmPasswordValid && <p className="p1">not empty</p>}
                    {errorMessage && <p className="p1">{errorMessage}</p>}
                    <input className="signup-button" type='submit' value='Sign Up' />
                    <p className="bottom-p">Already have an account? Click here to&nbsp;
                    <Link to='/login'>LogIn</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;