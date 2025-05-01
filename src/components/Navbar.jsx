import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUtensils, FaShoppingCart, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const location = useLocation();
  // In a real app, you would get this from your auth context
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <FaUtensils className="logo-icon" />
          <span>Sky<span className="text-primary">Eats</span></span>
        </Link>

        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''} 
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/select-flight" 
              className={location.pathname === '/select-flight' ? 'active' : ''} 
              onClick={closeMenu}
            >
              Select Flight
            </Link>
          </li>
          <li>
            <Link 
              to="/restaurants" 
              className={location.pathname === '/restaurants' ? 'active' : ''} 
              onClick={closeMenu}
            >
              Restaurants
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <Link to="/login" className="login-button" onClick={closeMenu}>
            <FaUser />
            <span className="login-text">{isLoggedIn ? 'Account' : 'Sign In'}</span>
          </Link>
          
          <Link to="/cart" className="cart-icon" onClick={closeMenu}>
            <FaShoppingCart />
            {getCartItemCount() > 0 && (
              <span className="cart-count">{getCartItemCount()}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 