import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);

    if (loggedInUser) {
      axios.get(`http://localhost:9999/orders?customerId=${loggedInUser.id}`)
        .then(response => setOrders(response.data))
        .catch(error => console.error("Error fetching orders:", error));
    }
  }, []);

  if (!user) return <p>Please log in to view your order history.</p>;

  return (
    <div>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <h3>Order Date: {new Date(order.date).toLocaleDateString()}</h3>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Shipping Fee:</strong> ${order.shippingFee.toFixed(2)}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.title} - ${item.price} x {item.quantity}</li>
              ))}
            </ul>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistoryPage;
