import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaDollarSign, FaClock } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { restaurantData } from '../data/restaurantData';
import './Restaurants.css';

const Restaurants = () => {
  const navigate = useNavigate();
  const { flight } = useCart();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if flight is selected
    if (!flight) {
      navigate('/select-flight');
      return;
    }

    // Get restaurants based on airport and terminal
    const terminalRestaurants = restaurantData[flight.airport]?.[flight.terminal] || [];
    
    // Simulate API loading
    const timer = setTimeout(() => {
      setRestaurants(terminalRestaurants);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [flight, navigate]);

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="star half-filled" />);
      } else {
        stars.push(<FaStar key={i} className="star" />);
      }
    }
    
    return stars;
  };

  const renderPriceRange = (priceRange) => {
    return priceRange.split('').map((_, index) => (
      <FaDollarSign key={index} className="price-icon" />
    ));
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading restaurants...</p>
      </div>
    );
  }

  return (
    <div className="restaurants-page">
      <div className="container">
        <div className="flight-info-bar">
          <button 
            className="back-button" 
            onClick={() => navigate('/select-flight')}
          >
            <FaArrowLeft /> Back
          </button>
          <div className="flight-details">
            <h3>{flight.terminal}</h3>
            <p>{flight.airportName}</p>
            <p>Flight: {flight.flightNumber} at {flight.departureTime}</p>
          </div>
        </div>

        <div className="page-header">
          <h1>Available <span className="text-primary">Restaurants</span></h1>
          <p>Choose from restaurants available at {flight.terminal}</p>
        </div>

        {restaurants.length > 0 ? (
          <div className="restaurant-grid">
            {restaurants.map(restaurant => (
              <Link 
                to={`/menu/${restaurant.id}`} 
                className="restaurant-card" 
                key={restaurant.id}
              >
                <div className="restaurant-image">
                  <img src={restaurant.image} alt={restaurant.name} />
                </div>
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                  <div className="restaurant-rating">
                    <div className="stars">{renderRatingStars(restaurant.rating)}</div>
                    <span className="rating-number">{restaurant.rating.toFixed(1)}</span>
                  </div>
                  <div className="restaurant-meta">
                    <span className="price-range">{renderPriceRange(restaurant.priceRange)}</span>
                    <span className="delivery-time">
                      <FaClock className="icon" /> {restaurant.deliveryTime}
                    </span>
                  </div>
                  <p className="restaurant-description">{restaurant.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-restaurants">
            <h3>No restaurants found</h3>
            <p>We couldn't find any restaurants at this terminal. Please try a different terminal or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants; 