  import React, { useEffect, useState } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import CartItem from "../components/CartItem";
  import { getProductsRequest } from "../api/products";
  import { createOrderRequest } from "../api/orders";  // Importa la función para crear la orden
  import '../styles/ShoppingCartPage.css'
  import Navbar from "../components/Navbar";
  import { removeOneFromCart, removeAllFromCart, clearCart } from "../redux/shoppingReducer";

  function ShoppingCart() {
    const cartItems = useSelector((state) => state.shopping.cart);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const getCartItemsDetails = async () => {
        try {
          console.log("Cart Items:", cartItems);
          console.log("Fetching products...");
          const products = await getProductsRequest();
          console.log("Products fetched:", products);

          const cartItemsDetails = products.filter((product) =>
            cartItems.some((item) => item.id === product.id)
          );

          console.log("Cart items details:", cartItemsDetails);
          setProducts(cartItemsDetails);
        } catch (error) {
          console.error("Error al obtener los detalles de los productos:", error);
        }
      };

      getCartItemsDetails();
    }, [cartItems]);

    const handleRemoveOne = (itemId) => {
      dispatch(removeOneFromCart(itemId));
    };

    const handleRemoveAll = (itemId) => {
      dispatch(removeAllFromCart(itemId));
    };

    const handleClearCart = () => {
      dispatch(clearCart());
    };

    const handleCreateOrder = async () => {
      try {
        const orderData = {
          product_data: cartItems.map((item) => ({
            idProducto: item.id,
            quantity: item.quantity,
          })),
          // Otros datos necesarios para la orden
        };

        const createdOrder = await createOrderRequest(orderData);

        // Puedes manejar la respuesta según tus necesidades
        console.log('Orden creada:', createdOrder);

        // Puedes hacer algo con la respuesta, como mostrar un mensaje al usuario, etc.
        // Luego puedes limpiar el carrito
        dispatch(clearCart());
      } catch (error) {
        console.error('Error al crear la orden:', error);
        // Puedes manejar el error según tus necesidades
      }
    };

    return (
      <div>
        <Navbar />
        <div className="shopping-cart-container">
          {products.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemoveOne={() => handleRemoveOne(item.id)}
              onRemoveAll={() => handleRemoveAll(item.id)}
            />
          ))}
          {products.length > 0 && (
            <button className="create-order-button" onClick={handleCreateOrder}>
              Create Order
            </button>
          )}
          {products.length > 0 && (
            <button
              className="clear-cart-button"  // Nueva clase para el botón "Clear Cart"
              style={{ marginLeft: "auto" }} // Posiciona a la derecha
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    );
  }

  export default ShoppingCart;
