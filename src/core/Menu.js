import React from "react"
import {signout, isAutheticated} from "../auth"
import {Link, withRouter} from "react-router-dom"
import {itemTotal} from "./CartHelpers"

const isActive=(history,path)=>{
    if (history.location.pathname===path){
        return {color:"#ff9900"};
    }else{
        return {color:"#ffffff"}
    }
}


const Menu=({history})=>(
    <div>
        <ul className="nav nav-tabs bg-primary">
        
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/shop")} to="/shop">Shop</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/cart")} to="/cart">Cart<sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
            </li>

            {isAutheticated() && isAutheticated().user.role===0 && (
                <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/user/dashboard")} to="/user/dashboard">Dashboard</Link>
            </li>
            )}

            {isAutheticated() && isAutheticated().user.role===1 && (
                <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
            </li>
            )}

            {!isAutheticated() && (
                <div>
                    <ul className="nav nav-tabs bg-primary">
                    <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">Signin</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/signup")} to="/signup">Signup</Link>
            </li>
            </ul>
                </div>
            )}
            {isAutheticated() && (
                <div>
                    <li className="nav-item">
                <span className="nav-link" style={{cursor:"pointer", color:"#ffffff"}} onClick={()=>signout(()=>{
                    history.push("/")
                })}>Signout</span>
            </li>
                </div>
            )}
        </ul>
    </div>
)

export default withRouter(Menu);