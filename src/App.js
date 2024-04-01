import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Signup from "./Pages/Signup";
import Login from "./Pages/Login"
import Create from "./Pages/Create"
import View from "./Pages/ViewPost"
import Post from './store/PostContext';
import Chat from "./Pages/Chat"

import {onAuthStateChanged} from "firebase/auth";
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';
import { auth } from './firebase/config,';

function App() {
  const {user,setUser} = useContext(AuthContext);
  const {app} = useContext(FirebaseContext);
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{

      setUser(user);
      
    })

  })
  return (
    <div>
    <Post >
     <Router>
     <Routes >
      <Route exact path='/' element={<Home/>}  />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/view' element={<View/>}/>
      <Route path='/chat/:userId/:postId' element={<Chat/>}/>
     </Routes>
     </Router>
    </Post>
    </div>
  );
}

export default App;