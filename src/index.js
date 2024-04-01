import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FirebaseContext} from "./store/Context"
import {app} from "./firebase/config," 
import Context from "./store/Context"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <FirebaseContext.Provider value={{app}}>
  <Context>
  <App/>
  </Context>
  </FirebaseContext.Provider>
  
);

