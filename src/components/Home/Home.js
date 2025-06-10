import React from 'react';
import { Link } from "react-router-dom";
import './Home.css'

const Home = () => {
    return (
        <div className='home-div1'>
            <div className='home-div2'>
                <div className='home-div3'>
                    <p className='p'>WELCOME TO QUIZOOOO</p>
                    <p className='p'>A best place to check your knowledge</p>
                </div>
                <div className='home-div4'>
                    <Link to='/login' className='link'>
                        <button className='button'>Login</button>
                    </Link>
                    <Link to='/signup' className='link'>
                        <button className='button'>Sign Up</button>
                    </Link>
                    {/* <button>Sign Up</button> */}
                </div>
            </div>
        </div>
    )

}

export default Home;