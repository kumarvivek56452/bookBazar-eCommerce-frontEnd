import React,{useState,useEffect} from "react";
import Layout from "./layout";
import Card from "./Cards";
import { getCategories, getFilterProducts } from "./apiCore";
import CheckBox from "./CheckBox";
import {prices} from "./fixedPrices"
import RadioBox from "./Radiobox";


const Shop=()=>{
    const [myFilters, setMyFilters]=useState({
        filters:{category:[], price:[]}
    });
    const [categories, setCategories]=useState([])
    const [error, setError]=useState(false)
    const [limit, setLimit]=useState(12)
    const [skip, setSkip]=useState(0)
    const [size, setSize]=useState(0)
    const [filteredResults, setFilteredResults] = useState([]);

    const init =() =>{
        getCategories().then(data=>{
            if(data.error){
               setError(true)
            }
            else{
                setCategories(data)
            }
        })
    }

    const loadFilterResults = (newFilters)=>{
        // console.log(newFilters)
        getFilterProducts(skip, limit, newFilters).then( data =>{
            if(data.error){
                setError(data.error)
            } else {
                setFilteredResults(data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = ()=>{
        let toSkip = skip+limit
        // console.log(newFilters)
        getFilterProducts(toSkip, limit, myFilters.filters).then( data =>{
            if(data.error){
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
                // setLimit(data.size)
            }
        })
    }

    const loadMoreButton=()=>{
        return (
            size>0 && size>=limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
            )
        )
    }

    useEffect(()=>{
        init()
        loadFilterResults(skip, limit, myFilters.filters)
    },[])

    const handleFilters = (filters, filterBy)=>{
        // console.log("SHOP",filters, filterBy)
        const newFilters = {...myFilters}
        newFilters.filters[filterBy]=filters

        if(filterBy=="price"){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy]=priceValues;
        }
        loadFilterResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value =>{
        const data=prices
        let array=[]
        for (let key in data){
            if (data[key]._id === parseInt(value)){
                array=data[key].array;
            }
        }
        return array
    }

    
    return (
    <Layout title="Home Page" description="Node React E-Commerce App" className="container-fluid">

    <div className="row">
        <div className="col-4">
            <h4>Filter By Categories</h4>
            <ul>
            <CheckBox categories={categories} handleFilters={filters=>handleFilters(filters,"category")}/>
            </ul>
            <h4>Filter By Price Range</h4>
            <div>
            <RadioBox prices={prices} handleFilters={filters=>handleFilters(filters,"price")}/>
            </div>
            
        </div>
        <div className="col-8">
            <h2 className="mb-4">Products</h2>
            <div className="row">
                {filteredResults && filteredResults.map((product,i)=>(
                        <div key={i} className="col-4 mb-3"><Card  product={product}></Card></div>
                ))}
            </div>
            <hr />
            {loadMoreButton()}
        </div>
    </div>
    </Layout>)
}

export default Shop;