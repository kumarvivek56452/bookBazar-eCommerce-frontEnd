import React,{useState,useEffect} from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Cards";


const Search=()=>{

    const [data, setData] = useState({
        categories:[],
        category:"",
        search:"",
        result:[],
        searched:false
    })

    const {categories, category, search, result, searched}=data;

    const loadCategories=()=>{
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            } else {
                setData({...data, categories:data})
            }
        })
    }

    const searchData=()=>{
        //console.log(search, category)
        console.log(list)
        if(search){
            list({search:search || undefined, category:category}).then(res=>{
                if(res.error){
                    console.log(res.error)
                } else {
                    setData({...data, result:res, searched:true})
                }
            })
        }
    }
    
    const searchSubmit=(e)=>{
        e.preventDefault()
        searchData()
    }

    const handleChange=(name)=>event=>{
        setData({...data,[name]:event.target.value,searched:false})
    }

    const searchedProducts=(result=[])=>{
        return (<div className="row">
            {result.map((p,i)=>(<Card key={i} product={p}/>))}
        </div>)
    }

    const searchForm=()=>(
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">Pick Category</option>
                            {categories.map((c,i)=>(<option key={i} value={c._id}>
                                {c.name}
                            </option>))}
                        </select>
                    </div>
                <input type="search" className="form-control" onChange={handleChange("search")} placeholder="Search By Name"></input>
                </div>
                <div className="btn input-group-append" style={{border:"none"}}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    )

    useEffect(()=>{
        loadCategories()
    },[])
    return (
        <div className="row">
            <div className="container">
                {searchForm()}
            </div>
            <div className="container-fluid">
            {searchedProducts(result)}
            </div>
        </div>
    )
}

export default Search;