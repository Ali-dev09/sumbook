import React, { useState, useEffect } from "react";
import cart from "./scripts/cart.js";
import { books } from "./data/books.js";
import "./styles/order.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function Order(props) {
  const [deliveryOption, setDeliveryOption] = useState(7); // Default to 7 days
  const [displayDeliveryOption, setDisplayDeliveryOption] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);

  const navigate = useNavigate();

  function travel(page) {
    navigate(`/${page}`);
  }

  if (cart.cartArray.length === 0) {
    return (
      <div>
        <h1>You cannot order an empty cart</h1>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    );
  }

  const totalBeforeTax = cart.cartArray.reduce((total, item) => {
    const matchingItem = books.find((book) => book.id === item.bookId);
    if (matchingItem) {
      total += (matchingItem.priceCents / 100) * item.quantity;
    }
    return total;
  }, 0);

  const tax = totalBeforeTax * 0.1;
  const totalBill = totalBeforeTax + tax + deliveryFee;

  function sendOrder(array, price, deliveryOption) {
    props.saveOrder(array, price, deliveryOption);
    travel("orders");
  }

  function handleDeliveryOption(e) {
    const value = e.target.value;
    setDeliveryOption(value);

    // Calculate the delivery date
    const displayOption = dayjs()
      .add(Number(value), "days")
      .format("dddd MMM DD YYYY");
    setDisplayDeliveryOption(displayOption);

    // Set the delivery fee based on the selected option
    let fee = 0;
    if (value === "1")
      fee = 10; // 1 day delivery
    else if (value === "3")
      fee = 5; // 3 day delivery
    else fee = 0; // 7 days delivery is free
    setDeliveryFee(fee);
  }

  useEffect(() => {
    // Initialize with the default 7 days delivery
    const displayOption = dayjs().add(7, "days").format("dddd MMM DD YYYY");
    setDisplayDeliveryOption(displayOption);
    setDeliveryFee(0); // Free delivery for 7 days
  }, []);

  return (
    <div className="order-container">
      <h2>Your Order</h2>

      <table className="order-table">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartArray.map((item, index) => {
            const matchingItem = books.find((book) => book.id === item.bookId);
            if (!matchingItem) return null;

            const itemTotal = (matchingItem.priceCents / 100) * item.quantity;

            return (
              <tr key={index}>
                <td>{matchingItem.name}</td>
                <td>{item.quantity}</td>
                <td>${(matchingItem.priceCents / 100).toFixed(2)}</td>
                <td>${itemTotal.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="delivery-options">
        <select onChange={handleDeliveryOption} value={deliveryOption}>
          <option value={7}>7 days (Free)</option>
          <option value={3}>3 days ($5)</option>
          <option value={1}>1 day ($10)</option>
        </select>
      </div>

      <div className="total-bill">
        <h3>Total Before Tax: ${totalBeforeTax.toFixed(2)}</h3>
        <h3>Tax (10%): ${tax.toFixed(2)}</h3>
        <h3>Delivery Fee: ${deliveryFee.toFixed(2)}</h3>
        <h3>Total Bill: ${totalBill.toFixed(2)}</h3>
        <h3>Delivery Date: {displayDeliveryOption}</h3>
        <button
          onClick={() => sendOrder(cart.cartArray, totalBill, displayDeliveryOption)}
          className="send-button"
        >
          Send Order
        </button>
      </div>

      <button className="back-home" onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
}
