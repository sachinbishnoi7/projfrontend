import React, {Fragment} from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { signout, isAuthenticated } from "../auth/helper";


const CurrentTab =({...props}, path)=> {
  const location = useLocation();
    if(location.pathname === path){
        return { color: "#2ecc72" };
    }else{
        return { color: "#FFFFFF" };
    }
};

const Menu  = ({...props}) => {
  let navigate = useNavigate();
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
          <li className="nav-item">
                <Link style ={CurrentTab({...props}, "/")}
                    className ="nav-link"
                    to = "/">
                    Home
                </Link>
          </li>
          <li className="nav-item">
                <Link style ={CurrentTab({...props}, "/cart")}
                    className ="nav-link"
                    to = "/cart">
                    Cart
                </Link>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
             <Link style ={CurrentTab({...props}, "/userdashboard")}
                className ="nav-link"
                to = "/userdashboard">
                Dashboard
             </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link style ={CurrentTab({...props}, "/signup")}
                    className ="nav-link"
                    to = "/signup">
                    Sign Up
                </Link>
          </li>
          <li className="nav-item">
                <Link style ={CurrentTab({...props}, "/signin")}
                    className ="nav-link"
                    to = "/signin">
                    Sign In
                </Link>
          </li>
            </Fragment>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
            <a
            onClick={()=>{
              signout(()=> {
                navigate("/");
              });
            }}
            className="nav-link text-warning">
              Sign Out</a>
        </li>
          )}
      </ul>
      
    </div>
  )
};

export default Menu;
