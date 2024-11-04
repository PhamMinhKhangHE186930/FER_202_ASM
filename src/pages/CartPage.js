import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    } else {
      removeFromCart(productId);
    }
  };

  // Calculate the total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container className="my-5">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <Row key={item.id} className="mb-3 align-items-center">
              <Col md={2}>
                <Image src={item.image} fluid />
              </Col>
              <Col md={4}>
                <h5>{item.title}</h5>
                <p>Price: ${item.price}</p>
              </Col>
              <Col md={3}>
                <label>Quantity: </label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  min="1"
                  className="form-control d-inline-block"
                  style={{ width: '60px', marginLeft: '10px' }}
                />
              </Col>
              <Col md={3} className="text-end">
                <Button variant="danger" onClick={() => removeFromCart(item.id)} className="mb-2">
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <Row className="mt-4">
            <Col>
              <h2>Total: ${calculateTotal()}</h2>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="text-end">
              <Button variant="primary" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default CartPage;
