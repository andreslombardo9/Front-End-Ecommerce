import React from "react";
import "../styles/ProductCard.css";
const Product = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product.id);
  };

  return (
    <li key={product.id} className="product-card-container">
      <img
        src={product.urlImage}
        alt={product.name}
        className="product-card-img"
        style={{ objectFit: "contain" }}
      />
      <div className="product-card-info">
        <div className="product-card-name-price">
          <h3 className="text-blue-500 text-xl font-semibold mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
        <div>
          <p className="text-blue-500 font-semibold text-lg">
            ${product.price}
          </p>
        </div>
      </div>
      <button
       className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-full text-sm"
        onClick={handleAddToCart}
      >
        +
      </button>
    </li>
  );
};

export default Product;
