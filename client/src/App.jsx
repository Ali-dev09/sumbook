import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./Hero.jsx";
import Row from "./Row.jsx";
import DetailBook from "./detail-book.jsx";
import Checkout from "./checkout.jsx";
import Order from "./order.jsx";
import Header from "./Header.jsx";
import cart from "./scripts/cart.js";
import orders from "./scripts/orders.js";
import OrdersPage from "./OrdersPage.jsx";
export default function App() {
  const [bookId, setBookId] = useState();
  const [cartQuantity, setCartQuantity] = useState(0);

  // Function to update cart quantity
  function updateCart() {
    console.log("updated");

    // Use reduce to sum the quantities of all items in the cart
    const totalQuantity = cart.cartArray.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    // Set the total quantity in the state
    setCartQuantity(totalQuantity);
  }

  // Optionally use useEffect to update cart quantity when cart changes
  useEffect(() => {
    updateCart();
  }, [cart.cartArray]); // This effect will run whenever cart.cartArray changes
  
  function zeroCart(){
    setCartQuantity(0)
  }
  const Headercomponent = <Header cartLength={cartQuantity} />;
  
  return (
    <>
      <Router>
        <Routes>
          <Route
            element={
              <>
                {Headercomponent}
                <Hero />
                <Row updateCart={updateCart} getId={(id) => setBookId(id)} />
              </>
            }
            path="/"
          />
          <Route
            element={
              <>
                {Headercomponent}
                <DetailBook updateCart={updateCart} bookId={bookId} />
              </>
            }
            path="/detail"
          />
          <Route
            element={
              <>
                {Headercomponent}
                <Checkout />
              </>
            }
            path="/checkout"
          />
          <Route
            element={
              <>
                {Headercomponent}
                <Order
                  saveOrder={(array, price, date) => {
                    orders.addOrder(array, price, date);
                  }}
                  zeroCart={() => {zeroCart()}}
                />
              </>
            }
            path="/order"
          />
          <Route
            element={
              <>
                {Headercomponent}
                <OrdersPage />
              </>
            }
            path="orders"
          />
        </Routes>
      </Router>
    </>
  );
}
