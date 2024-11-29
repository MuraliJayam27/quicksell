import React from 'react';
import '../styles/SortSelector.css';

const SortSelector = ({ sortBy, setSortBy }) => (
  <div className="sort-selector">
    <label htmlFor="sort-by">Sort By:</label>
    <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="priority">Priority</option>
      <option value="title">Title</option>
    </select>
  </div>
);

export default SortSelector;
