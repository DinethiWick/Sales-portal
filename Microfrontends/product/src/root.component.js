import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductComponent from "./screens/Product";
import ProductDetail from "./screens/ProductDetails";
import "./styles/Page.css"

export default function Root(props) {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path='/home' element={<ProductComponent/>}/>
        <Route path='/home/:productId' element={<ProductDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}
