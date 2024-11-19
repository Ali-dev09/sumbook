import React, { useEffect, useState } from 'react';  // Use React hooks
import { useNavigate } from 'react-router-dom';
import { books } from './data/books.js';
import orders from './scripts/orders.js';  // Import the orders object

export default function OrdersPage() {
  const navigate = useNavigate();
  
  // Initialize orderList state with orders.ordersArray and set up reactivity
  const [orderList, setOrderList] = useState(orders.ordersArray);

  // Update orderList whenever orders.ordersArray is updated (e.g., when new orders are added)
  useEffect(() => {
    setOrderList(orders.ordersArray);
  }, [orders.ordersArray]);  // Only run this effect when orders.ordersArray changes
  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#ff7f11', // Orange color
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 6px 12px rgba(255, 127, 17, 0.4)', // Floating shadow effect
    cursor: 'pointer',
    transition: 'transform 0.3s',
    outline: 'none'
  };

  return (
    <>
      <div className='no-orders'>
        {orderList.length === 0 ? (
          <h1 style={
          {marginTop:"100px"}
          }>No orders yet!</h1>
        ) : (
          orderList.map(order => (
            <div key={order.id} className="order-container">
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.itemsArray.map(item => {
                    const matchingItem = books.find(book => book.id === item.bookId);
                    return (
                      <tr key={matchingItem.id}>
                        <td>{matchingItem ? matchingItem.name : 'Unknown'}</td>
                        <td>{item.quantity}</td>
                        <td>${(matchingItem ? matchingItem.priceCents : 0) / 100}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h3>Total Price: ${(order.price ).toFixed(2)}</h3> {/* Ensure price is in dollars */}
              <h3>Delivery Date: {order.date}</h3>
              <hr />
            </div>
          ))
        )}
        <button style={buttonStyle} onClick={() => navigate('/')}>Home</button>
      </div>
    </>
  );
}
