import {API} from "../config"


export const createCategory=(userID, token, category)=>{
    return fetch(`${API}/category/create/${userID}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


export const createProduct=(userID, token, product)=>{
    return fetch(`${API}/product/create/${userID}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`,

        },
        body: product
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}



export const getCategories = () =>{
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}