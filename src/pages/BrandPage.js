import React from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList';

const BrandPage = () => {
  const { brand } = useParams();
  return (
    <div>
      <h2>{brand} Products</h2>
      <ProductList brand={brand} />
    </div>
  );
};

export default BrandPage;
