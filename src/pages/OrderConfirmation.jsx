import React from 'react';
import { Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  // Generate a random order number
  const orderNumber = Math.floor(Math.random() * 1000000);
  
  return (
    <div className="order-confirmation">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <h1>Order Confirmed!</h1>
          <div className="check-icon">✓</div>
        </div>
        
        <div className="confirmation-details">
          <p>Thank you for your order with SkyEats.</p>
          <p>Your order number is: <span className="order-number">#{orderNumber}</span></p>
          <p>Your meal will be delivered to your seat during your flight.</p>
        </div>
        
        <div className="next-steps">
          <p>You will receive a confirmation email shortly with your order details.</p>
          <Link to="/" className="home-button">Return to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 