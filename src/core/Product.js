
import React,{useState,useEffect} from "react";
import Layout from "./layout";
import { read, listRelated } from "./apiCore";
import Card from "./Cards";



const Product=(props)=>{
    const [product, setProduct]=useState({})
    const [error, setError]=useState(false)
    const [relatedProduct, setRelatedProduct]=useState([])
    

    const loadSingleProduct = (productId) => {
        read(productId)
          .then((data) => {
            if (!data) {
              // If data is undefined, it means there was an issue with the request
              setError("Error loading product");
            } else if (data.error) {
              // If there is an error in the response data
              setError(data.error);
            } else {
              // If everything is fine, set the product data
              setProduct(data);
            //fetch related products
              listRelated(data._id).then(data=>{
                if(data.error){
                    setError(data.error)
                }
                else {
                    setRelatedProduct(data)
                }
              })
            }
          })
          .catch((error) => {
            // Handle any errors that occur during the request
            console.log("Error loading related product", error)
            setError("Error loading product");
            
          });

          
          
      };

    useEffect(()=>{
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    },[props])

    return (
    <Layout title={product && product.name} description={product && product.description && product.description.substring(0,100)} className="container-fluid">
        <div className="row">
            <div className="col-8">
            {
                product && product.description && 
                <Card product={product} showViewProductButton={false}/>
            }
            </div>
            <div className="col-4">
                <h4>Related Products</h4>
                {relatedProduct.map((p,i)=>(
                    <div className="mb-3" key={i}>
                        <Card  product={p} />
                    </div>

                ))}
            </div>
        </div>

    </Layout>)
}

export default Product;