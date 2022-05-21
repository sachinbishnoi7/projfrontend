import React, { useState } from 'react'
import ImageHelper from './helper/ImageHelper';
import { Navigate } from 'react-router-dom';
import { addItemToCart, removeItemFromCart  } from './helper/cartHelper';
import { isAuthenticated } from '../auth/helper';
import "../styles.css";
//todo: do this with later
//isAuthenticated


const Card = ({
    product, 
    addtoCart = true,
    removeFromCart = false,
    reload =undefined,
    setReload = f=>f,
    //functon(f{return f})
}) => {
    const [navigate, setNavigate] = useState(false)

    const cartTitle =  product ? product.name : "A Photo from Pexels"
    const cartDescription =  product ? product.description : "A default desciption"
    const cartPrice =  product ? product.price : "Default Price"

    const addToCart = () => {
        if(isAuthenticated()){
          addItemToCart(product, () => setNavigate(true))
            console.log("Added To Cart");
        }
        else{
            alert("Login Please!");
        }
    };

    const getAnavigate = navigate => {
        if (navigate){
            return <Navigate to = "/cart"/>;
        }
    };

    const showAddToCart = (addToCart)=> {
        return (
          addtoCart && (
                <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2">
                Add to Cart
                </button>
            )
        );
    };

    const showRemoveFromCart = removeFromCart=>{
        return (
            removeFromCart && (
                <button
                onClick={() => {
                    //todo: handle this too
                    removeItemFromCart(product.id);
                    setReload(!reload)
                    alert("Product Removed From Cart");
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2">
                Remove from cart
                </button>
            )
        );
    };

    return (
      
      <div className="card text-white bg-dark border border-warning " style ={{maxHeight:"100%", maxWidth:"85%"}} >
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
          {getAnavigate(navigate)}
          <ImageHelper product = {product}/>
          <p className="lead bg-dark font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">₹ {cartPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };


export default Card;