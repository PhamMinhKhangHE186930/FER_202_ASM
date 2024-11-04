// Navbar.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const NavbarComponent = ({ products, onSearchResults }) => {
  const { cart } = useCart();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        {/* Logo and Home link aligned to the left */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/logo.png"
            alt="Logo"
            width="80"
            height="30"
            className="d-inline-block align-top me-2"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
          </Nav>
          <Nav className="ml-auto d-flex align-items-center">
            {user ? (
              <Link to="/cart" className="nav-link">
                <FaShoppingCart /> Cart ({cart.length})
              </Link>
            ) : null}
            {user ? (
              <>
                <Link to="/account" className="nav-link ms-3">{user.name}</Link>
                <button className="nav-link btn btn-link ms-3" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link ms-3">Login</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
