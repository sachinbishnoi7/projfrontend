import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper';
import Base from '../core/Base';


const Signin =() =>  {
    const  [values, setValues ] = useState({
        name:"",
        email: "sachin@bishnoi.com",
        password: "12345",
        error:"",
        success:false,
        loading: false,
        didNavigate: false,
    })
    const { name, email, password, error, success, loading, didRedirect } = values;

    const handleChange = (name) => (event) =>{
      setValues({...values, error: false, [name]: event.target.value});
    };

    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error: false, loading: true })
        signin({email, password})
        .then(data => {
            // console.log("DATA", data);
            if(data.token){
                //let sessionToken = data.token;
                authenticate(data, ()=>{
                    console.log("TOKEN ADDED");
                    setValues({
                      ...values,
                      didNavigate: true,
                      
                    });
                });
            }else{
              setValues({
                ...values,
                loading: false,
              });
            }
        })
        .catch((err)=> console.log(err));
    };

    const performNavigate = ()=>{
      //console.log(isAuthenticated());
      if(isAuthenticated()) {
          return <Navigate to ="/" />
      }
    };

    const loadingMessage = ()=>{
      return (
        loading && (
          <div className ="alert alert-info">
            <h2>
              Loading...
            </h2>
          </div>
        )
      )
    };

    const errorMessage =()=>{
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div 
              className= "alert alert-danger"
              style={{display: error ? "" : "none" }}
            >
              User Already active
            </div>
          </div>
        </div>
      );
    };
  
    const signInForm = ()=> {
        return(
            <div className="row">
              <div className="col-md-6 offset-sm-3 text-left">
              <form >
                <div className="form-group">
                  <label className="text-light">Email</label>
                  <input 
                    className = "form-control"
                    value= {email}
                    onChange= {handleChange("email")}
                    type ="text"
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">Password</label>
                  <input 
                    className = "form-control"
                    value= {password}
                    onChange= {handleChange("password")}
                    type ="password"
                  />
                </div>
                <button 
                  onClick={onSubmit}
                  className="btn btn-success btn-block">Submit</button>
              </form>
              </div>
            </div>
        );
    };  


  return (
    <Base title ="Welcome to Sign-in Page" description ="Shopee">
        {/* {errorMessage()} */}
        {loadingMessage()}
        {signInForm()}
        {/* <p className ="text-center">{JSON.stringify(values)}</p> */}
        
        {performNavigate()}
    </Base>
  );
};

export default Signin;
