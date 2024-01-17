import React,{useState,useEffect} from "react";
import Layout from "./layout";
import { getProducts } from "./apiCore";
import Card from "./Cards";
import Search from "./Seach";

const Home=()=> {

    const [productBySell, setProductBysell]=useState([])
    const [productByArrival, setProductByArrival]=useState([])
    const [error,setError]=useState(false)

    const loadProductsBySell=()=>{
        getProducts("sold").then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setProductBysell(data)
            }
        })
    };

    const loadProductsByArrival=()=>{
        getProducts("createdAt").then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setProductByArrival(data)
            }
        })
    };

    useEffect(()=>{
        loadProductsByArrival()
        loadProductsBySell()
    },[])

    return (<Layout title="Home Page" description="Node React E-Commerce App" className="container-fluid">
        <Search />
    <h2 className="mb-4">New Arrival</h2>
    <div className="row">
    {productByArrival.map((product,i)=>(<div key={i} className="col-4 mb-3"><Card  product={product}></Card></div>))}
    </div>

    <h2 className="mb-4">Best Sellers</h2> 
    <div className="row">
    {productBySell.map((product,i)=>(<div key={i} className="col-4 mb-3"><Card  product={product}></Card></div>))}
    </div>

    </Layout>)
}


export default Home