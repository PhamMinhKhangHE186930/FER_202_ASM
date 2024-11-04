// Home.js
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProductList from '../components/ProductList';
import CategorySideBar from '../components/CategorySideBar';
import BannerSlide from '../components/BannerSlide';
import Search from '../components/Search';

const Home = () => {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products for display
  const [categories, setCategories] = useState([]); // List of categories
  const [searchTerm, setSearchTerm] = useState(''); // Search term for live search

  useEffect(() => {
    // Fetch all products
    axios.get('http://localhost:9999/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially show all products
      })
      .catch(error => console.error("Error fetching products:", error));

    // Fetch categories for sidebar filtering
    axios.get('http://localhost:9999/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  // Update filtered products based on search term and filters
  useEffect(() => {
    let updatedProducts = products;

    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, products]);

  const handleFilterChange = ({ category, brand, condition, minPrice, maxPrice }) => {
    let updatedProducts = products;

    if (category) {
      updatedProducts = updatedProducts.filter(product => product.categoryId === category.id);
    }

    if (brand) {
      updatedProducts = updatedProducts.filter(product => product.brandId === brand.id);
    }

    if (condition !== null) {
      updatedProducts = updatedProducts.filter(product => product.condition === condition);
    }

    if (minPrice !== null) {
      updatedProducts = updatedProducts.filter(product => product.price >= minPrice);
    }
    if (maxPrice !== null) {
      updatedProducts = updatedProducts.filter(product => product.price <= maxPrice);
    }

    setFilteredProducts(updatedProducts);
  };

  return (
    <div className="home">
      <Row className="mb-4">
        <BannerSlide />
      </Row>
      
      <Row className="justify-content-center mb-4">
        <div className="search-container" style={{ maxWidth: '1000px', width: '100%' }}>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </Row>
      
      <Row>
        <Col md={3}>
          <div className="category-sidebar-container">
            <CategorySideBar categories={categories} onFilterChange={handleFilterChange} />
          </div>
        </Col>
        <Col md={9}>
          <ProductList products={filteredProducts} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
