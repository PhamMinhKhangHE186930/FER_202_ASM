import React from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList';

const CategoryPage = () => {
  const { category } = useParams();
  return (
    <div>
      <h2>{category} Products</h2>
      <ProductList category={category} />
    </div>
  );
};

export default CategoryPage;
