// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '15%', height: '100vh', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <h3>Quotation System</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ margin: '15px 0' }}>
          <Link to="/quotation-form" style={{ textDecoration: 'none', color: '#333' }}>
            Quotation Form
          </Link>
        </li>
        <li style={{ margin: '15px 0' }}>
          <Link to="/quotation-list" style={{ textDecoration: 'none', color: '#333' }}>
           Client ( Quotation ) List
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;