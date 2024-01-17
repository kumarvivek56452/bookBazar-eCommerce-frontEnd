import React,{useState,useEffect} from "react";
import Layout from "./layout";
import { getProducts, getBraintreeClientToken, processPayment } from "./apiCore";
import { emptyCart } from "./CartHelpers";
import Card from "./Cards";
import Search from "./Seach";
import { isAutheticated } from "../auth";
import {Link} from "react-router-dom"
import DropIn from "braintree-web-drop-in-react"



const Checkout=({products})=>{

    const [data, setData]=useState({
        success:false,
        clientToken:null,
        error:"",
        instance:{},
        loading:false
    })

    const userId=isAutheticated() && isAutheticated().user._id
    const token=isAutheticated() && isAutheticated().token    

    const getTotal=()=>{
        return products.reduce((currentVal, nextVal)=>{
            return currentVal+nextVal.count*nextVal.price
        },0)
    }

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token)
        .then(data=>{
            if(data.error){
                setData({...data, error:data.error})  
            } else {
                setData({ clientToken:data.clientToken})
            }
        })
          
      };

    useEffect(()=>{
        getToken(userId, token)
    },[])

   
    const showCheckout=()=>{
        return isAutheticated() ? (
                <button >{showDropIn()}</button>
           ) : (
               <Link to="/signin"><button className="btn btn-primary">Signin to Checkout</button></Link>
           )}

           const buy = () => {
            // Ensure data.instance is defined
            if (data.instance) {
              // Send nonce to your server (data.instance.requestPaymentMethod())
              let nonce;
              data.instance
                .requestPaymentMethod()
                .then((response) => {
                  nonce = response.nonce;
                  // Once you have the nonce (card no., type), send it as "paymentmethod"
                //   console.log("Send nonce and total to process:", nonce, getTotal(products));
                const paymentData={
                    paymentMethodNonce:nonce,
                    amount:getTotal(products)
                }
                processPayment(userId,token,paymentData).then(response=>{
                    console.log(response)

                     
                    setData({...data,success:response.success})
                    
                    
                    emptyCart(()=>{
                        console.log("payment success and empty cart")
                    })
                }).catch(error=>{
                    console.log(error)
                })
                })
                .catch((error) => {
                //   console.log("Dropin error", error);
                  setData({ ...data, error: error.message });
                });
            } else {
              console.error("Drop-in instance is not available.");
              setData({ ...data, error: "Payment method is not available." });
            }
          };

        
        
    const showDropIn=()=>(
        <div onBlur={()=>setData({...data,error:""})}>
            {data.clientToken !=null && products.length>0 ? (
                <div>
                        
                        <DropIn options={{
                            authorization:data.clientToken
                        }} onInstance={instance=>(data.instance=instance)} /><button onClick={buy} className="btn btn-success btn-block">
                            Pay
                        </button>
                </div>
            ) : null}
        </div>
    )

    const showError=error=>(
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
        </div>
    )

    const showSuccess=success=>(
        <div className="alert alert-info" style={{display: success ? "" : "none"}}>
            Thanks! Your paymnet is successfull
        </div>
    )
    

    return (
    <div>
        <h2>Total : ${getTotal()}</h2>
        {showSuccess(data.success)}
        {showError(data.error)}
        {showCheckout()}
    </div>)

}



export default Checkout;