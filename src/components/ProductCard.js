import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <Card className="mb-4">
    <Card.Img variant="top" src={product.image} alt={product.title} />
    <Card.Body>
      <Card.Title>{product.title}</Card.Title>
      <Card.Text>${product.price}</Card.Text>
      <Link to={`/category/${product.categoryId}/product/${product.id}`}>
        <Button variant="primary">View Details</Button>
      </Link>
    </Card.Body>
  </Card>
);

export default ProductCard;
