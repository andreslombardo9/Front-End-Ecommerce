import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductsRequest } from "../api/products";
import Product from "../components/ProductItem";
import Navbar from "../components/Navbar";
import { addToCart } from "../redux/shoppingReducer";
import { logoutRequest } from "../api/auth";
import '../styles/Homepage.css';
import CarouselCategories from "../components/CarouselCategories";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const cartCount = useSelector((state) => state.cartCount.cartCount);

  const handleLogout = async () => {
    try {
      dispatch(logoutRequest());
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const addProductToCart = (id) => {
    dispatch(addToCart({ id }));
  };

  useEffect(() => {
    const getCachedProducts = () => {
      const cachedProducts = localStorage.getItem("cachedProducts");
      if (cachedProducts) {
        setProducts(JSON.parse(cachedProducts));
        setLoading(false);
      }
    };

    getCachedProducts();

    getProductsRequest()
      .then((data) => {
        if (data) {
          localStorage.setItem("cachedProducts", JSON.stringify(data));
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product list:", error);
        setLoading(false);
      });
  }, []);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} cartCount={cartCount} toggleNav={toggleNav} isNavOpen={isNavOpen} />

      <div className="homepage-container">
        <h1 className="text-3xl font-semibold my-4">Categories</h1>
        <CarouselCategories/>

        <h1 className="text-3xl font-semibold my-4">Product List</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <ul className="product-card-ul-home">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                addToCart={addProductToCart}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
