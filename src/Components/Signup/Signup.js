import React, { useContext, useState } from 'react';
import Logo from "../../olx-logo.png";
import {Link, useNavigate} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';
import {addDoc, collection} from "firebase/firestore"
import {FirebaseContext} from "../../store/Context"
import {auth,db} from "../../firebase/config,"
 import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
export default function Signup() {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    username:"",
    email:"",
    phone:"",
    password:""
  });
  
  const handleChnage = (e)=>{
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })  
  
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((result) => {
        // Set the display name
        const user = result.user;

        updateProfile(user,{displayName:formData.username}).then(()=>{

          addDoc(collection(db,'user'),{
            id: user.uid,
            username: formData.username,
            phone: formData.phone
          }) 
          .then(() => {
            console.log("User information added to Firestore successfully.");
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error adding user information to Firestore:", error);
          });
        }).catch((error)=>{

          console.error('error setting display namme',error);
        })
  

        console.log(result);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };
  
  return (
    <div className="container- ">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="signupParentDiv">
            <img className="mb-4" src={Logo} alt="Logo" width="200" height="200" />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fname">Username</label>
                <input
                  className="form-control"
                  value={formData.username}
                  onChange={handleChnage}
                  type="text"
                  id="fname"
                  name="username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="fname">Email</label>
                <input
                  className="form-control"
                  value={formData.email}
                  onChange={handleChnage}
                  type="email"
                  id="fname"
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lname">Phone</label>
                <input
                  value={formData.phone}
                  onChange={handleChnage}
                  className="form-control"
                  type="number"
                  id="lname"
                  name="phone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lname">Password</label>
                <input
                  value={formData.password}
                  onChange={handleChnage}
                  className="form-control"
                  type="password"
                  id="lname"
                  name="password"
                />
              </div>
              <button className="btn btn-primary btn-block">Signup</button>
            </form>
            <Link to={'/login'} className="mt-3 d-block text-center">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
