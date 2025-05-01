import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCreditCard, FaPlane, FaClock } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, flight, updateDeliveryDetails, deliveryDetails, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: deliveryDetails.name || '',
    gate: deliveryDetails.gate || '',
    deliveryTime: deliveryDetails.time || '',
    notes: deliveryDetails.notes || '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Redirect if cart is empty or no flight selected
    if (cart.length === 0 || !flight) {
      navigate('/cart');
    }
  }, [cart, flight, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.gate.trim()) {
      newErrors.gate = 'Gate information is required';
    }
    
    if (!formData.deliveryTime.trim()) {
      newErrors.deliveryTime = 'Delivery time is required';
    }
    
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number';
      }
      
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Name on card is required';
      }
      
      if (!formData.expiry.trim()) {
        newErrors.expiry = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        newErrors.expiry = 'Invalid format (MM/YY)';
      }
      
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Invalid CVV';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save delivery details
      updateDeliveryDetails({
        name: formData.name,
        gate: formData.gate,
        time: formData.deliveryTime,
        notes: formData.notes
      });
      
      // Simulate payment processing
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        // Clear cart and redirect to confirmation
        clearCart();
        navigate('/confirmation');
      }, 2000);
    }
  };

  const formatTime = (time) => {
    return time.replace(':', ' : ');
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <button 
          className="back-button" 
          onClick={() => navigate('/cart')}
        >
          <FaArrowLeft /> Back to Cart
        </button>

        <div className="page-header">
          <h1>Check<span className="text-primary">out</span></h1>
          <p>Complete your order by providing delivery and payment details</p>
        </div>

        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3><FaPlane className="section-icon" /> Delivery Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? 'error' : ''}`}
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gate">Gate Number</label>
                  <input
                    type="text"
                    id="gate"
                    name="gate"
                    className={`form-control ${errors.gate ? 'error' : ''}`}
                    placeholder="e.g. A12"
                    value={formData.gate}
                    onChange={handleInputChange}
                  />
                  {errors.gate && <div className="error-message">{errors.gate}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="deliveryTime">
                    <FaClock className="input-icon" />
                    Delivery Time
                  </label>
                  <input
                    type="time"
                    id="deliveryTime"
                    name="deliveryTime"
                    className={`form-control ${errors.deliveryTime ? 'error' : ''}`}
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                  />
                  {errors.deliveryTime && <div className="error-message">{errors.deliveryTime}</div>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="notes">Special Instructions (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-control"
                  placeholder="Any special delivery instructions"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div className="form-section">
              <h3><FaCreditCard className="section-icon" /> Payment Information</h3>
              
              <div className="payment-methods">
                <div className="payment-method">
                  <input
                    type="radio"
                    id="credit-card"
                    name="paymentMethod"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="credit-card">Credit Card</label>
                </div>
                
                <div className="payment-method disabled">
                  <input
                    type="radio"
                    id="apple-pay"
                    name="paymentMethod"
                    value="apple-pay"
                    disabled
                  />
                  <label htmlFor="apple-pay">Apple Pay (Coming Soon)</label>
                </div>
              </div>
              
              {formData.paymentMethod === 'credit-card' && (
                <div className="credit-card-form">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      className={`form-control ${errors.cardNumber ? 'error' : ''}`}
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength="19"
                    />
                    {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cardName">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      className={`form-control ${errors.cardName ? 'error' : ''}`}
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={handleInputChange}
                    />
                    {errors.cardName && <div className="error-message">{errors.cardName}</div>}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiry">Expiry Date</label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        className={`form-control ${errors.expiry ? 'error' : ''}`}
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        maxLength="5"
                      />
                      {errors.expiry && <div className="error-message">{errors.expiry}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        className={`form-control ${errors.cvv ? 'error' : ''}`}
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength="4"
                      />
                      {errors.cvv && <div className="error-message">{errors.cvv}</div>}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              type="submit" 
              className="place-order-btn"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="spinner"></div>
                  Processing...
                </>
              ) : (
                `Pay $${(getCartTotal() + 2.99 + getCartTotal() * 0.08).toFixed(2)}`
              )}
            </button>
          </form>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-flight">
              <div className="flight-icon">
                <FaPlane />
              </div>
              <div className="flight-info">
                <h4>{flight?.flightNumber}</h4>
                <p>{flight?.terminal}</p>
                <p>{flight?.airportName}</p>
              </div>
            </div>
            
            <div className="order-items">
              <h4>Items ({cart.length})</h4>
              {cart.map(item => (
                <div className="order-item" key={item.id}>
                  <div className="item-quantity">{item.quantity} ×</div>
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            <div className="price-summary">
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
            </div>
            
            {formData.deliveryTime && (
              <div className="delivery-time-display">
                <FaClock className="clock-icon" />
                <span>Estimated delivery at {formatTime(formData.deliveryTime)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 