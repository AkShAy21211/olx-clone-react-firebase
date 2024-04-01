import React, { useState } from 'react';
import {auth} from "../../firebase/config,"
import {signInWithEmailAndPassword} from "firebase/auth"
import Logo from '../../olx-logo.png';
import './Login.css';
import {Link, useNavigate} from "react-router-dom"

function Login() {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    email:'',
    password:''
  });
  const [error,setError] = useState('')


  const handleChnage = (e)=>{
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }


  const handleSubmit = (e)=>{

    e.preventDefault();
    signInWithEmailAndPassword(auth,formData.email,formData.password).then((user)=>{
      const userData = user.user;
      console.log(userData);
      localStorage.setItem('userToken', user.user.accessToken);
      localStorage.setItem('userId', user.user.uid);

      navigate('/')
    })
    .catch((error)=>{
      if(error.message){

        setError("User Not Found Please SignUp")
      }
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {
          error&&<div className='alert alert-danger'>{error}</div>
        }
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={formData.email}
            onChange={handleChnage}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={formData.password}
            onChange={handleChnage}
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to={'/signup'}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;