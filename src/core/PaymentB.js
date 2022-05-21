import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';
import { cartEmpty } from "./helper/cartHelper";
import { createOrder } from './helper/orderHelper';
import { getmeToken, processPayment } from './helper/paymentHelper';
import DropIn from 'braintree-web-drop-in-react';

const PaymentB =({
    products,
    reload=undefined,
    setReload = (f)=> f,

})=> {
    const [info, setInfo]= useState({
        loading: false,
        success: false,
        clientToken : null,
        error: "",
        instance: {}
    })
    const userId = isAuthenticated  && isAuthenticated().user.id;
    //console.log(userId);
    const token = isAuthenticated && isAuthenticated().token;
    //console.log(token);
    const getToken = (userId, token)=>{
        getmeToken(userId, token)
        .then(info =>{
            if(info.error){
                setInfo({
                    ...info, 
                    error: info.error
                })
                signout(()=>{
                    return <Navigate to="/signin"/>;
                });
            }else {
                const clientToken = info.clientToken;
                console.log(clientToken);
                setInfo({clientToken })
            }
        });
    };

    useEffect(()=>{
        getToken(userId, token);
    },[]);

    const getAmount =()=>{
        let amount = 0;
        products.map( (product) =>{
            amount= amount + parseFloat(product.price)
    });
        return amount;
    };

    const onPurchase =()=>{
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
        .then(data =>{
            console.log("MYDATA", data);
            nonce = data.nonce;
            const paymentData ={
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
            .then(response =>{
                console.log("POINT-1", response);
                if(response.error){
                    if(response.code =='1'){
                        console.log("Payment Failed");
                        signout(()=>{
                            return <Navigate to="/signin" />
                        })
                    }
                }else{
                    setInfo({...info,
                      success:response.success, loading: false
                    })
                    console.log("Payment Success");
                    let product_names =""
                    products.forEach(function(item){
                        product_names += item.name + ", "
                    });
                    const orderData ={
                        products: product_names,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount
                    }
                    createOrder(userId, token, orderData)
                    .then(respnse => {
                        if(response.error){
                            if(response.code =='1'){
                                console.log("Order Failed")
                            }
                            signout(()=>{
                                return <Navigate to ="/signin" />;
                            })
                        }else {
                            if(response.success == true){
                                console.log("Order Placed");
                            }
                        }
                    })
                    .catch(error => {
                        setInfo({loading: false, success: false})
                        console.log("Order Failed", error);
                    })
                    cartEmpty(()=>{
                        console.log("Cart is emptyed out");
                    })
                    setReload(!reload)
                }
            })
            .catch(error=>console.log(error));
        })
        .catch(err => console.log("NONCE", err));

    };

    const showbtnDropIn = ()=> {
        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 ?
                    (
                        <div>
                            <DropIn 
                            options = {{authorization: info.clientToken}}
                            onInstance= {(instance) =>(info.instance = instance)}
                            ></DropIn>
                            <button  onClick={onPurchase} className='btn btn-block btn-success'>
                                Buy Now
                            </button>
                        </div>
                    ):
                    (
                       <h3>Please Login First or Add Something in Cart</h3> 
                    )
                }
            </div>
        );
    };

  return (
    <div>
      <h3>Your Bill is ₹ {getAmount()} </h3>
      {showbtnDropIn()}
    </div>
  );
};

export default PaymentB;
