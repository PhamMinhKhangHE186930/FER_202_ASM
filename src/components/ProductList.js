import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products available.</p>; // Display a message if no products are available
  }

  return (
    <Row>
      {products.map(product => (
        <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
