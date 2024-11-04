import React, { useState, useEffect } from 'react';
import { ListGroup, Form } from 'react-bootstrap';
import axios from 'axios';

const CategorySidebar = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [condition, setCondition] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    axios.get('http://localhost:9999/brands')
      .then(response => setBrands(response.data))
      .catch(error => console.error("Error fetching brands:", error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const categoryBrands = brands.filter(brand => brand.categoryId === selectedCategory.id);
      setFilteredBrands(categoryBrands);
    } else {
      setFilteredBrands([]);
    }
  }, [selectedCategory, brands]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedBrand(null);
    onFilterChange({ category, brand: null, condition, minPrice, maxPrice });
  };

  const handleBrandSelect = (event) => {
    const brandId = event.target.value;
    const brand = filteredBrands.find(b => b.id === parseInt(brandId));
    setSelectedBrand(brand);
    onFilterChange({ category: selectedCategory, brand, condition, minPrice, maxPrice });
  };

  const handleConditionSelect = (selectedCondition) => {
    const conditionValue = selectedCondition === 'all' ? null : selectedCondition === 'true';
    setCondition(conditionValue);
    onFilterChange({ category: selectedCategory, brand: selectedBrand, condition: conditionValue, minPrice, maxPrice });
  };

  const handlePriceSelect = (priceType, value) => {
    if (priceType === 'min') {
      setMinPrice(value);
      onFilterChange({ category: selectedCategory, brand: selectedBrand, condition, minPrice: value, maxPrice });
    } else {
      setMaxPrice(value);
      onFilterChange({ category: selectedCategory, brand: selectedBrand, condition, minPrice, maxPrice: value });
    }
  };

  return (
    <div className="category-sidebar">
      <h5>Categories</h5>
      <ListGroup>
        <ListGroup.Item
          action
          onClick={() => handleCategorySelect(null)}
          active={!selectedCategory}
        >
          All
        </ListGroup.Item>
        {categories.map(category => (
          <ListGroup.Item
            key={category.id}
            action
            onClick={() => handleCategorySelect(category)}
            active={selectedCategory && selectedCategory.id === category.id}
          >
            {category.name}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {filteredBrands.length > 0 && (
        <>
          <h5 className="mt-3">Brands</h5>
          <Form.Select value={selectedBrand ? selectedBrand.id : ""} onChange={handleBrandSelect}>
            <option value="">All Brands</option>
            {filteredBrands.map(brand => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </Form.Select>
        </>
      )}

      <h5 className="mt-3">Condition</h5>
      <Form.Check 
        type="radio" 
        label="All" 
        value="all" 
        checked={condition === null} 
        onChange={() => handleConditionSelect('all')} 
      />
      <Form.Check 
        type="radio" 
        label="New" 
        value="true" 
        checked={condition === true} 
        onChange={() => handleConditionSelect('true')} 
      />
      <Form.Check 
        type="radio" 
        label="Used" 
        value="false" 
        checked={condition === false} 
        onChange={() => handleConditionSelect('false')} 
      />

      <h5 className="mt-3">Price Range</h5>
      <Form.Control 
        type="number" 
        placeholder="Min" 
        value={minPrice} 
        onChange={(e) => handlePriceSelect('min', Number(e.target.value))} 
      />
      <Form.Control 
        type="number" 
        placeholder="Max" 
        value={maxPrice} 
        onChange={(e) => handlePriceSelect('max', Number(e.target.value))} 
      />
    </div>
  );
};

export default CategorySidebar;
