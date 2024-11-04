import React, { useState, useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';
import { ProductContext } from '../context/ProductContext';
import { Dropdown } from 'react-bootstrap';

const CategoryQuickLinks = () => {
  const { categories } = useContext(CategoryContext);
  const { products } = useContext(ProductContext);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const getCategoryProducts = (categoryId) => {
    return products.filter(product => product.categoryId === categoryId).slice(0, 3); // Show top 3 products
  };

  return (
    <div className="d-flex justify-content-around my-3">
      {categories.map((category) => (
        <div
          key={category.id}
          onMouseEnter={() => setHoveredCategory(category.id)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <Dropdown>
            <Dropdown.Toggle as="a" href={`/category/${category.name}`} className="category-link">
              {category.name}
            </Dropdown.Toggle>
            <Dropdown.Menu show={hoveredCategory === category.id}>
              {getCategoryProducts(category.id).map((product) => (
                <Dropdown.Item href={`/product/${product.id}`} key={product.id}>
                  {product.title} - ${product.price}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ))}
    </div>
  );
};

export default CategoryQuickLinks;
