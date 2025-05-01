import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaUtensils, FaShoppingCart, FaClock } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Transform Your <span className="text-primary">Airport Experience</span></h1>
        <p className="hero-subtitle">Skip the lines, get fresh food delivered directly to your gate</p>
        <div className="hero-buttons">
          <Link to="/select-flight" className="btn">Order Now</Link>
          <a href="#how-it-works" className="btn btn-secondary">How It Works</a>
        </div>
        <div className="hero-image"></div>
      </section>

      <section className="partners section">
        <h3 className="section-title text-center">Partnering with top airport restaurants</h3>
        <div className="partners-logos">
          <div className="partner-logo">Restaurant 1</div>
          <div className="partner-logo">Restaurant 2</div>
          <div className="partner-logo">Restaurant 3</div>
          <div className="partner-logo">Restaurant 4</div>
          <div className="partner-logo">Restaurant 5</div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works section">
        <h2 className="section-title text-center">How It <span className="text-primary">Works</span></h2>
        <p className="section-description text-center">Order food from your favorite airport restaurants in just a few simple steps</p>
        
        <div className="steps">
          <div className="step-card">
            <div className="step-icon">
              <FaPlane />
            </div>
            <h3>Enter Flight Details</h3>
            <p>Enter your flight information so we know where to deliver your food</p>
          </div>
          
          <div className="step-card">
            <div className="step-icon">
              <FaUtensils />
            </div>
            <h3>Choose Restaurant</h3>
            <p>Browse menus from available restaurants at your airport terminal</p>
          </div>
          
          <div className="step-card">
            <div className="step-icon">
              <FaShoppingCart />
            </div>
            <h3>Place Your Order</h3>
            <p>Select your items, add them to cart, and proceed to checkout</p>
          </div>
          
          <div className="step-card">
            <div className="step-icon">
              <FaClock />
            </div>
            <h3>Receive Your Food</h3>
            <p>Your food will be delivered directly to your gate at the specified time</p>
          </div>
        </div>
      </section>

      <section className="benefits section">
        <div className="benefits-content">
          <div className="benefits-text">
            <h2>Why Choose <span className="text-primary">SkyEats</span>?</h2>
            <ul className="benefits-list">
              <li>Skip long restaurant lines at busy airports</li>
              <li>Fresh, delicious food delivered right to your gate</li>
              <li>Easy ordering process through our user-friendly app</li>
              <li>Support local airport restaurants and businesses</li>
              <li>Never miss your flight because of waiting for food</li>
            </ul>
            <Link to="/select-flight" className="btn">Get Started</Link>
          </div>
          <div className="benefits-image"></div>
        </div>
      </section>

      <section className="cta section">
        <div className="cta-card">
          <h2>Ready to Transform Your Airport Dining Experience?</h2>
          <p>Join thousands of travelers who enjoy stress-free dining at airports worldwide.</p>
          <Link to="/select-flight" className="btn">Order Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 