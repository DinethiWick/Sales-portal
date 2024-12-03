import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import '../styles/ProductDetails.css'
import NavBar from "../components/NavBar";

import { addToCart } from "../utils/products.handler";

const getProductDetails = async (productId) => {
    const details = await axios.get(`http://localhost:3000/api/v1/products/${productId}`);
    console.log("Product Details | Got",details.data.data)
    return details.data.data;
}

const ProductDetail = () => {
    let {productId} = useParams();

    const [productDetails, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () =>{
        setDetails(await getProductDetails(productId));
        setLoading(false);
    },[]);

    if(loading){
        return <div className="loader">Loading...</div>;
    }

    return(
        <div className="details-page">
            <NavBar/>
            <div className="product-card">
                <div className="product-image">
                    <img src={productDetails["image"]}/>
                </div>
                <div className="product-details">
                    <div className="column">
                        <div className="header-text">{productDetails["name"]}</div>
                        <div className="italic">Product ID: {productDetails["productId"]}</div>
                    </div>
                    <div className="column">
                        <div >{productDetails["description"]}</div>
                    </div>
                    <div className="italic">Price: <span className="text-price">${productDetails["price"]}</span></div>
                    <div className="italic">Category: <span className="text-category">{productDetails["category"]}</span></div>
                    <div className="row">
                        <div>
                            Quantity: <input type="number" id='qty' defaultValue={1}></input>
                        </div>
                        <div className="add-to-cart" onClick={()=>{addToCart('1234',productId,document.getElementById('qty').value)}}>
                            Add to Cart
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail