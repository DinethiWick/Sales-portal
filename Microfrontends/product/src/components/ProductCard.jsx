import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css'

const ProductCard = ({ id,image, name, price, brand, description }) => {
  return (
    <div class="card">
      <img src={image} alt={name} class="image" />
      <div class = "details">
        <h2 class="title">{name}</h2>
        <p class="brand">{brand}</p>
        <p class="description">{description}</p>
        <p class="price">${price}</p>
      </div>
      <div class="addtocart">
        <Link to={`/home/${id}`}><button >+</button></Link>
      </div>
    </div>
  );
};

export default ProductCard;
