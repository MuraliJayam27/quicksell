import React from 'react';
import '../styles/GroupSelector.css';

const GroupSelector = ({ groupBy, setGroupBy }) => (
  <div className="group-selector">
    <label htmlFor="group-by">Group By:</label>
    <select id="group-by" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
      <option value="status">Status</option>
      <option value="user">User</option>
      <option value="priority">Priority</option>
    </select>
  </div>
);

export default GroupSelector;
