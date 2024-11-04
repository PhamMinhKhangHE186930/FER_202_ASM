import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3>Account</h3>
      <Nav className="flex-column">
        <NavLink to="/account/personal-info" style={styles.link} activeStyle={styles.activeLink}>
          Personal Information
        </NavLink>
        <NavLink to="/account/order-history" style={styles.link} activeStyle={styles.activeLink}>
          Order History
        </NavLink>
      </Nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    padding: '20px',
    borderRight: '1px solid #ddd',
    height: '100vh',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    padding: '10px 0',
    display: 'block',
  },
  activeLink: {
    fontWeight: 'bold',
    color: '#007bff',
  },
};

export default Sidebar;
