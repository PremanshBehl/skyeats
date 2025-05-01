import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <FaUtensils className="logo-icon" />
            <span>Sky<span className="text-primary">Eats</span></span>
          </Link>
          <p>Delicious food delivered directly to your airport gate. Never be hungry during your travels again.</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/select-flight">Select Flight</Link></li>
            <li><Link to="/restaurants">Restaurants</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Support</h3>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} SkyEats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 