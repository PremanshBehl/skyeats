import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './FlightSelect.css';

const airports = [
  { id: 'del', name: 'Indira Gandhi International Airport (DEL)', city: 'Delhi' },
  { id: 'bom', name: 'Chhatrapati Shivaji Maharaj International Airport (BOM)', city: 'Mumbai' },
  { id: 'ccu', name: 'Netaji Subhash Chandra Bose International Airport (CCU)', city: 'Kolkata' },
  { id: 'maa', name: 'Chennai International Airport (MAA)', city: 'Chennai' }
];

const terminals = {
  del: ['Terminal 1', 'Terminal 2', 'Terminal 3'],
  bom: ['Terminal 1', 'Terminal 2'],
  ccu: ['Terminal 1', 'Terminal 2'],
  maa: ['Terminal 1', 'Terminal 2']
};

const FlightSelect = () => {
  const navigate = useNavigate();
  const { setFlightDetails, flight } = useCart();
  
  const [formData, setFormData] = useState({
    flightNumber: flight?.flightNumber || '',
    airport: flight?.airport || '',
    terminal: flight?.terminal || '',
    departureDate: flight?.departureDate || '',
    departureTime: flight?.departureTime || ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // If airport changes, reset terminal
    if (name === 'airport') {
      setFormData(prevState => ({
        ...prevState,
        terminal: ''
      }));
    }
    
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
    
    if (!formData.flightNumber.trim()) {
      newErrors.flightNumber = 'Flight number is required';
    }
    
    if (!formData.airport) {
      newErrors.airport = 'Airport is required';
    }
    
    if (!formData.terminal) {
      newErrors.terminal = 'Terminal is required';
    }
    
    if (!formData.departureDate) {
      newErrors.departureDate = 'Departure date is required';
    }
    
    if (!formData.departureTime) {
      newErrors.departureTime = 'Departure time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const flightDetails = {
        flightNumber: formData.flightNumber,
        airport: formData.airport,
        airportName: airports.find(a => a.id === formData.airport)?.name || '',
        terminal: formData.terminal,
        departureDate: formData.departureDate,
        departureTime: formData.departureTime
      };
      
      setFlightDetails(flightDetails);
      navigate('/restaurants');
    }
  };

  return (
    <div className="flight-select-page">
      <div className="flight-container">
        <div className="page-header">
          <h1>Select Your <span className="text-primary">Flight</span></h1>
          <p>Enter your flight details so we can provide you with available restaurants at your terminal</p>
        </div>
        
        <div className="flight-form-container">
          <form className="flight-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="flightNumber">
                <FaPlane className="input-icon" />
                Flight Number
              </label>
              <input
                type="text"
                id="flightNumber"
                name="flightNumber"
                className={`form-control ${errors.flightNumber ? 'error' : ''}`}
                placeholder="e.g. AA1234"
                value={formData.flightNumber}
                onChange={handleInputChange}
              />
              {errors.flightNumber && <div className="error-message">{errors.flightNumber}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="airport">
                <FaMapMarkerAlt className="input-icon" />
                Airport
              </label>
              <select
                id="airport"
                name="airport"
                className={`form-control ${errors.airport ? 'error' : ''}`}
                value={formData.airport}
                onChange={handleInputChange}
              >
                <option value="">Select Airport</option>
                {airports.map(airport => (
                  <option key={airport.id} value={airport.id}>
                    {airport.name} - {airport.city}
                  </option>
                ))}
              </select>
              {errors.airport && <div className="error-message">{errors.airport}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="terminal">Terminal</label>
              <select
                id="terminal"
                name="terminal"
                className={`form-control ${errors.terminal ? 'error' : ''}`}
                value={formData.terminal}
                onChange={handleInputChange}
                disabled={!formData.airport}
              >
                <option value="">Select Terminal</option>
                {formData.airport && terminals[formData.airport].map(terminal => (
                  <option key={terminal} value={terminal}>
                    {terminal}
                  </option>
                ))}
              </select>
              {errors.terminal && <div className="error-message">{errors.terminal}</div>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="departureDate">
                  <FaCalendarAlt className="input-icon" />
                  Departure Date
                </label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  className={`form-control ${errors.departureDate ? 'error' : ''}`}
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.departureDate && <div className="error-message">{errors.departureDate}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="departureTime">Departure Time</label>
                <input
                  type="time"
                  id="departureTime"
                  name="departureTime"
                  className={`form-control ${errors.departureTime ? 'error' : ''}`}
                  value={formData.departureTime}
                  onChange={handleInputChange}
                />
                {errors.departureTime && <div className="error-message">{errors.departureTime}</div>}
              </div>
            </div>
            
            <button type="submit" className="btn btn-full">Continue to Restaurants</button>
          </form>
          
          <div className="flight-info-sidebar">
            <div className="flight-tips">
              <h3>Tips for Delivery</h3>
              <ul>
                <li>Enter your correct flight details to ensure accurate delivery</li>
                <li>We recommend ordering at least 2 hours before your departure</li>
                <li>You can update your gate information later if it changes</li>
                <li>Food delivery typically takes 30-45 minutes after ordering</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSelect; 