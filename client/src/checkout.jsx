import { useNavigate } from "react-router-dom";
import { useState } from "react";
import cart from "./scripts/cart.js";
import { books } from './data/books.js'; 
import './styles/checout.css';
export default function Checkout() {
  const [cartItems, setCartItems] = useState(cart.cartArray);
  const navigate = useNavigate();

  // Check if the cart is empty before rendering cart items
  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h1>Your cart is empty</h1>
        <button className="button" onClick={() => navigate("/")}>Back Home</button>
      </div>
    );
  }

  function delet(id){
    cart.removeFromCart(id);
    const updatedCart = cart.cartArray; // Corrected to avoid unnecessary double function call
    setCartItems(updatedCart);
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Your Shopping Cart</h1>
       
      </div>

      {cartItems.map((item, index) => {
        const matchingItem = books.find(book => book.id === item.bookId);

        // Add a check to ensure `matchingItem` exists
        if (!matchingItem) {
          console.warn(`No matching item found for bookId: ${item.bookId}`);
          return null;
        }

        return (
          <div key={index} className="cart-item">
            <h2>{matchingItem.name}</h2>
            <p> one book Price: ${(matchingItem.priceCents / 100).toFixed(2)}</p>
            <p> price ${(item.quantity * matchingItem.priceCents / 100).toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <button className="delete-button" onClick={() => delet(matchingItem.id)}>Delete</button>
          </div>
        );
      })}

      <div className="checkout-footer">
        <button className="button" onClick={() => navigate("/")}>Back Home</button>
        <button className="button" onClick={() => {navigate('/order')}}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
