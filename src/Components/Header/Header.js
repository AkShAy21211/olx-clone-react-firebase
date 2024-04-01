import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assests/OlxLogo';
import Search from '../../assests/Seacrh';
import Arrow from '../../assests/Arrow';
import SellButton from '../../assests/SellButton';
import SellButtonPlus from '../../assests/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import {auth} from "../../firebase/config,"
import {signOut} from "firebase/auth"
function Header() {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={()=>navigate('/')} style={{cursor:"pointer"}} className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user?`Welcome ${user.displayName}`:'Login'}</span>
          <hr />
        </div>
        {user?<span
        style={{cursor:"pointer"}}
        onClick={()=>{
          signOut(auth);
          navigate('/login')
        }
        }
        >Logout</span>:null}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>navigate('/create')} style={{cursor:"pointer"}}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;