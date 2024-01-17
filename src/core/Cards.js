import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment"
import {addItem, updateItem, removeItem} from "./CartHelpers"

const Card=({product, showViewProductButton=true, showAddtoCartButton=true, cartUpdate=false,          showRemoveProductButton=false}
    )=>{
       
    const [redirect,setRedirect]=useState(false)
    const [count, setCount]=useState(product.count)

    const addToCart=()=>{
        addItem(product,()=>{
            setRedirect(true)
        })
    }

    const shouldReirect=redirect=>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddtoCart=(showAddtoCartButton)=>{
        return (
            showAddtoCartButton &&
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                Add to Cart
            </button>
        )
    }

    const showRemoveButton=showRemoveProductButton=>{

        return (
            showRemoveProductButton &&
            <button onClick={()=>removeItem(product._id)} className="btn btn-outline-danger mt-2 mb-2">
                Remove Product
            </button>
        )
    }

    const showStock=(quantity)=>{
        return quantity>0 ? 
        (<span className="badge badge-primary badge-pill">In stock</span>):
        (<span className="badge badge-primary badge-pill">In stock</span>)
        
    }

    const showViewButton=(showViewProductButton)=>{
        return (
            showViewProductButton && (
                <Link className="mr-2" to={`/product/${product._id}`}>
                <button className="btn btn-outline-primary mt-2 mb-2">
                    View Product
                </button>
                </Link>
            )
        )
    }

    const handleChange=productId=>event=>{
        setCount(event.target.value< 1 ? 1: event.target.value)
        if(event.target.value>=1){
            updateItem(productId,event.target.value)
        }
    }

    const showCartUpdateOptions=cartUpdate=>{
        return cartUpdate && 
        <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        Adjust Quantity
                    </span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
            </div>
        </div>
    }

    return (
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    {shouldReirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <p className="lead mt-2">{product.description.substring(0, 70)}</p>
                    <p className="black-10">${product.price}</p>
                    <p className="black-9">Category : {product.category && product.category.name}</p>

                    <p className="black-8">
                        Added {moment(product.createdAt).fromNow()}
                    </p>
                        {showStock(product.quantity)}
                        <br></br>
                        {showViewButton(showViewProductButton)}
                        {showAddtoCart(showAddtoCartButton)}
                        {showRemoveButton(showRemoveProductButton)}
                        {showCartUpdateOptions(cartUpdate)}

                </div>
            </div>
    )
};
export default Card;

