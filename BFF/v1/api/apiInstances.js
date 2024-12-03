import axios from "axios";
import config from "../config/conf.js";

const productApi = axios.create({
    baseURL: config.productUrlPrefix+"/products",
    withCredentials: false,
});

const cartApi = axios.create({
    baseURL: config.cartUrlPrefix+"/carts",
    withCredentials: false,
});

const userApi = axios.create({
    baseURL: config.userUrlPrefix+"/users",
    withCredentials: false,
});

export {productApi,cartApi,userApi};