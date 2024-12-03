import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getProducts = (query)=>{
    return new Promise(async (resolve,reject)=>{
        let products
        try {
            products = await axios.get(`http://localhost:3000/api/v1/products?query=${query}`);
            console.log("Get Products | Populated menu");       
            resolve(products.data.data);
        } catch (error) {
            console.log(error.message);
            reject(error);
        }
    });
}

const getCategories = ()=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const categories = await axios.get('http://localhost:3000/api/v1/products/categories/all');
            console.log("Get Categories | Retrieved categories");       
            resolve(categories.data.data);
        } catch (error) {
            console.log(error.message);
            reject(error);
        }
    });
}

const addToCart = (cartId, productId, quantity)=>{
    console.log("Add to Cart | Adding product to cart:",productId,quantity);
    let data = {
        cartItemList: [
            {
                "itemId": productId,
                "quantity": quantity
            },
        ],
    }
    return new Promise(async (resolve,reject)=>{
        try {
            console.log(data);
            const result = await axios.patch(`http://localhost:3000/api/v1/carts/${cartId}`, data);
            toast("Added to your cart");
            console.log("Add to Cart | Successfully added to cart");
            resolve(result);
        } catch (error) {
            toast("Failed to add to cart");
            console.log(error.message);
            reject(error);
        }
    });
}

export {getProducts, getCategories, addToCart};