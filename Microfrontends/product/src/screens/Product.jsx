import React, {useState, useEffect} from "react";
import '../styles/Product.css'
import {getProducts, getCategories, setCategoryArray, getCategoryArray} from '../utils/products.handler.js'

import ProductCard from "../components/ProductCard.jsx";
import NavBar from "../components/NavBar.jsx";
import CategoryEntry from '../components/CategoryEntry.jsx';

const ProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const [searchCat, setSearchCat] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async ()=>{
        setProducts(await getProducts(searchQuery));
        setCategories(await getCategories());
        setLoading(false);
    },[searchQuery,searchCat]);

    if(loading){
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className="product-page">
            <NavBar
                callback={(param)=>{setSearchQuery(param)}}
                search={true}
            />
            <div className="content">
                <div className="category-bar">
                    <div className="category-bar-header">Categories</div>
                    {
                        categories.map((category)=>(
                            <div key={category} className="category-item">
                                <CategoryEntry 
                                    category={category}
                                    callback={()=>{
                                        if(searchCat.includes(category)){
                                            searchCat.splice(category,1);
                                            setSearchCat([...searchCat]);
                                        } else {
                                            (setSearchCat([...searchCat,category]));
                                        }
                                    }}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="product-catalogue">
                    {
                        products.map((product) => {
                            return (
                                (searchCat.length == 0 || searchCat.includes(product.category))&&<div key={product.productId} className="product-item">
                                    <ProductCard
                                        id={product.productId}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        brand={product.brand}
                                        description={product.description}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
    
};

export default ProductComponent;
