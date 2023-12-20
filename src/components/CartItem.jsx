import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeOneFromCart, decrementQuantity, addToCart } from "../redux/shoppingReducer";
import '../styles/ShoppingCartProducts.css';  

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.shopping.cart.find((cartItem) => cartItem.id === item.id));

  const handleIncrement = () => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(decrementQuantity(item.id));
    } else {
      dispatch(removeOneFromCart(item.id));
    }
  };

  return (
    <div className="cart-item">
      <img src={item.urlImage} alt={item.name} className="cart-item-image" />
      <div className="cart-item-date">
        <div className="cart-item-date-price">
          <h3>{item.name}</h3>
          <p className="cart-item-description">{item.description}</p>
        </div>
        <p className="cart-item-price">${item.price}</p>
      </div>
      <div className="cart-item-quantity">
        <span className="cart-item-button-quantity-num"> {cartItem ? cartItem.quantity : 0}</span>

        <div className="cart-item-button-container">
          <button onClick={handleIncrement} className="cart-item-button">
            +
          </button>
          <button onClick={handleDecrement} className="cart-item-button">
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
