import React from "react"
import { BrowserRouter,Switch, Route } from "react-router-dom"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import Home from "./core/Home"
import PrivateRoute from "./auth/PriavteRoute"
import Dashboard from "./user/userDashboard"
import AdminRoute from "./auth/AdminRoute"
import AdminDashboard from "./user/adminDashboard"
import AddCategory from "./admin/AddCategory"
import AddProduct from "./admin/AddProducts"
import Shop from "./core/Shop"
import Product from "./core/Product"
import Cart from "./core/Cart"



const Routed=()=>{
    return (
            <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}></PrivateRoute>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}>
                </AdminRoute>
                <AdminRoute path="/create/category" exact component={AddCategory}>
                </AdminRoute>
                <AdminRoute path="/create/products" exact component={AddProduct}>
                </AdminRoute>
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />

            </Switch>
            </BrowserRouter>
    )
}

export default Routed;

     