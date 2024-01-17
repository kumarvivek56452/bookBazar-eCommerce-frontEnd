import React,{useState} from "react"
import Layout from "../core/layout";
import {Redirect} from "react-router-dom"
import { signin, authenticate, isAutheticated } from "../auth";


const Signin=()=> {
    const [values, setValues]=useState({
        email:"kumarvivek@ug.cusat.ac.in",
        password:"123456",
        error:"",
        loading:false,
        redirectToReferrer:false
    })

    const {name,email,password, loading, error, redirectToReferrer}=values;

    const {user}=isAutheticated()

    const handleChange=name=>event=>{
        setValues({...values, error:false, [name]:event.target.value})
    }

    const clickSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,error:false, loading:true})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }else{
                authenticate(data,()=>{
                    setValues({...values,redirectToReferrer:true})
                })
            }
        })
    }

    const signUpForm =()=>(
        <form>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange("email")} type="email" className="form-control" value={email}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange("password")} type="password" className="form-control" value={password}/>
            </div>
            <buttton onClick={clickSubmit} className="btn btn-primary">Submit</buttton>
             
        </form>
    )

    const showError=()=>(
        <div className="alert alert-danger" style={{display:error?"":"none"}}>
            {error}
        </div>
    )

    const showLoading=()=>(
        loading && (<div className="alert alert-info"><h2>loading....</h2></div>)
    );

        const redirectUser=()=>{
            if(redirectToReferrer){
                if (user && user.role===1){
                    return <Redirect to="/admin/dashboard" />
                } else {
                    return <Redirect to="/user/dashboard" />
                }
            }
            if (isAutheticated()){
                return <Redirect to="/"></Redirect>
            }
        }

    return (
        <Layout title="Signin" description="Node React E-Commerce App" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin