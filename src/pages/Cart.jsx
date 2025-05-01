import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaPlus, FaMinus, FaUtensils } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, flight } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (!flight) {
    return (
      <div className="cart-page full-width">
        <div className="cart-container">
          <div className="no-flight-message">
            <h2>No Flight Selected</h2>
            <p>Please select a flight before ordering food.</p>
            <button 
              className="btn" 
              onClick={() => navigate('/select-flight')}
            >
              Select Flight
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page full-width">
      <div className="cart-container">
        <button 
          className="back-button" 
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Back
        </button>

        <div className="page-header">
          <h1>Your <span className="text-primary">Cart</span></h1>
          <p>Review your items before checkout</p>
        </div>

        {cart.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <div className="quantity-control">
                      <button 
                        className="quantity-btn decrease"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn increase"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-sidebar">
              <div className="cart-summary">
                <h3>Order Summary</h3>
                
                <div className="summary-row flight-info">
                  <div className="flight-details">
                    <p><strong>Flight:</strong> {flight.flightNumber}</p>
                    <p><strong>Airport:</strong> {flight.airportName}</p>
                    <p><strong>Terminal:</strong> {flight.terminal}</p>
                  </div>
                </div>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${(getCartTotal() + 2.99 + getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                
                <button 
                  className="checkout-btn"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaUtensils />
            </div>
            <h2>Your cart is empty</h2>
            <p>Add items from restaurants to get started</p>
            <button 
              className="btn"
              onClick={() => navigate('/restaurants')}
            >
              Browse Restaurants
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 