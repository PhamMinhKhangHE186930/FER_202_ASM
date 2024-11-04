// Search.js
import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value); // Update the search term directly
  };

  return (
    <input
      type="text"
      placeholder="Search for products"
      value={searchTerm}
      onChange={handleChange}
      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
    />
  );
};

export default Search;
