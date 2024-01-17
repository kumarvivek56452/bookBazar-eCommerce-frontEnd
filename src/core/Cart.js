import React,{useState,useEffect} from "react";
import Layout from "./layout";
import Card from "./Cards";
import {getCart, removeItem} from "./CartHelpers"
import {Link} from "react-router-dom";
import Checkout from "./Checkout";

const Cart=()=>{
    const [items, setItems]=useState([])

    const showItems=items=>{
        return (
            <div>
                <h2>Your Cart has {`${items.length}`} items</h2> <hr></hr>
                {items.map((product,i)=>(
                    <Card key={i} product={product} showAddtoCartButton={false} 
                    cartUpdate={true}
                    showRemoveProductButton={true} />
                ))}
            </div>
        )
    }

    const noItemsMessage=()=>{
        return (<h2>Your Cart is Empty<br /><Link to="/shop">Continue Shopping</Link></h2>)
    }

    useEffect(()=>{
        setItems(getCart())
    },[items])

    return (
    <Layout title="Shopping Cart" description="Manage your Cart Items and Checkout or continue Shopping" className="container-fluid">
        <div className="row">
            <div className="col-8">
            {items.length>0 ? showItems(items) : noItemsMessage()}
            </div>
            <div className="col-4">
                <h2 className="mb-4">Your Cart Summary</h2>
                <hr />
                <Checkout products={items}/>
            </div>
        </div>
        
    </Layout>)
}

export default Cart;