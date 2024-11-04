import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [user, setUser] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);

    const savedShippingFee = localStorage.getItem('shippingFee');
    if (savedShippingFee) {
      setShippingFee(parseFloat(savedShippingFee));
    } else {
      const newShippingFee = Math.floor(Math.random() * 101);
      setShippingFee(newShippingFee);
      localStorage.setItem('shippingFee', newShippingFee);
    }
  }, []);

  const calculateTotal = () => {
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return (cartTotal + shippingFee).toFixed(2);
  };

  const handleCheckout = async () => {
    const order = {
      id: Date.now(),
      customerId: user.id,
      items: cart,
      shippingFee,
      total: calculateTotal(),
      date: new Date().toISOString()
    };

    try {
      const response = await axios.post('http://localhost:9999/orders', order);
      if (response.status === 201) {
        clearCart();
        localStorage.removeItem('shippingFee');
        alert('Order placed successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (cart.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      <h1>Checkout</h1>
      {user && (
        <div className="customer-info mb-4">
          <h2>Customer Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
      )}
      <Form>
        <Form.Group controlId="address">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control type="text" placeholder="Enter your address" defaultValue={user ? user.address : ''} />
        </Form.Group>
        <Form.Group controlId="payment">
          <Form.Label>Payment Method</Form.Label>
          <Form.Control as="select">
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>PayPal</option>
          </Form.Control>
        </Form.Group>
        <div className="mt-4">
          <Row>
            <Col><h5>Shipping Fee:</h5></Col>
            <Col className="text-end"><h5>${shippingFee.toFixed(2)}</h5></Col>
          </Row>
          <Row>
            <Col><h4>Total:</h4></Col>
            <Col className="text-end"><h4>${calculateTotal()}</h4></Col>
          </Row>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={() => navigate('/cart')}>
            Back to Cart
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Place Order
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CheckoutPage;
