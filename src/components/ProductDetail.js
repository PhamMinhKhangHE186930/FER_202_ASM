import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy thông tin sản phẩm từ API
    axios.get(`http://localhost:9999/products?id=${productId}`)
      .then(response => setProduct(response.data[0]))
      .catch(error => console.error("Error fetching product details:", error));

    // Lấy thông tin user từ localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);
  }, [productId]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.title} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h4>${product.price}</h4>
          <p><strong>Condition:</strong> {product.condition ? 'New' : 'Used'}</p>
          {user ? (
            <Button variant="primary" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          ) : (
            <p>Please log in to add products to your cart.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
