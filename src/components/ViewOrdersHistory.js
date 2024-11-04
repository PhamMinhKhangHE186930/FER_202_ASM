import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

const ViewOrdersHistory = () => {
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
    <div style={styles.container}>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <Card key={order.id} style={styles.orderCard}>
            <Card.Body>
              <h4>Order Date: {new Date(order.date).toLocaleDateString()}</h4>
              <p><strong>Order Total:</strong> ${order.total}</p>
              <p><strong>Shipping Fee:</strong> ${order.shippingFee.toFixed(2)}</p>
              <p><strong>Shipping Address:</strong> {user.address || "N/A"}</p>
              
              <h5>Items:</h5>
              {order.items.map(item => (
                <Row key={item.id} style={styles.itemRow}>
                  <Col xs={2}>
                    <img 
                      src={`${item.image}`} 
                      alt={item.title} 
                      style={styles.productImage} 
                    />
                  </Col>
                  <Col xs={10}>
                    <h6>{item.title}</h6>
                    <p>Price: ${item.price} x Quantity: {item.quantity}</p>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  orderCard: {
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  itemRow: {
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    maxWidth: '80px',
    borderRadius: '5px',
  },
};

export default ViewOrdersHistory;
