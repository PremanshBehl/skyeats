import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaDollarSign, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { restaurantData } from '../data/restaurantData';
import './RestaurantMenu.css';

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, getCartItemCount } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [itemCounts, setItemCounts] = useState({});
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const categoryRefs = useRef({});

  useEffect(() => {
    // Find restaurant from all airports and terminals
    let foundRestaurant = null;
    
    Object.keys(restaurantData).forEach(airport => {
      Object.keys(restaurantData[airport]).forEach(terminal => {
        const found = restaurantData[airport][terminal].find(
          r => r.id === restaurantId
        );
        if (found) foundRestaurant = found;
      });
    });
    
    // Get menu data
    const restaurantMenu = restaurantData[restaurantId] || null;

    // Simulate API loading
    const timer = setTimeout(() => {
      setRestaurant(foundRestaurant);
      setMenu(restaurantMenu);
      if (restaurantMenu && restaurantMenu.categories.length > 0) {
        setActiveCategory(restaurantMenu.categories[0].name);
      }
      setLoading(false);
    }, 800);
    
    // Initialize item counts based on cart
    const counts = {};
    cart.forEach(item => {
      counts[item.id] = item.quantity;
    });
    setItemCounts(counts);
    
    return () => clearTimeout(timer);
  }, [restaurantId, cart]);

  const scrollToCategory = (categoryName) => {
    setActiveCategory(categoryName);
    
    if (categoryRefs.current[categoryName]) {
      categoryRefs.current[categoryName].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    
    // Update item count
    setItemCounts(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
    
    // Show added message
    setShowAddedMessage(true);
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };

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
        <p>Loading menu...</p>
      </div>
    );
  }

  if (!restaurant || !menu) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Restaurant Not Found</h2>
          <p>Sorry, we couldn't find the restaurant you're looking for.</p>
          <button 
            className="btn" 
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-menu-page">
      <div className="container">
        <button 
          className="back-button" 
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Back to Restaurants
        </button>

        {/* Restaurant Header */}
        <div className="restaurant-header">
          <div className="restaurant-image">
            <img src={restaurant.image} alt={restaurant.name} />
          </div>
          <div className="restaurant-details">
            <h1>{restaurant.name}</h1>
            <p className="restaurant-cuisine">{restaurant.cuisine}</p>
            <div className="restaurant-rating">
              <div className="stars">{renderRatingStars(restaurant.rating)}</div>
              <span className="rating-number">{restaurant.rating.toFixed(1)}</span>
            </div>
            <div className="restaurant-meta">
              <span className="price-range">{renderPriceRange(restaurant.priceRange)}</span>
              <span className="delivery-time">{restaurant.deliveryTime}</span>
            </div>
            <p className="restaurant-description">{restaurant.description}</p>
          </div>
        </div>

        {/* Menu Content */}
        <div className="menu-content">
          {/* Category Sidebar */}
          <div className="category-sidebar">
            <h3>Menu</h3>
            <ul className="category-list">
              {menu.categories.map(category => (
                <li 
                  key={category.name} 
                  className={activeCategory === category.name ? 'active' : ''}
                  onClick={() => scrollToCategory(category.name)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Items */}
          <div className="menu-items-container">
            {menu.categories.map(category => (
              <div 
                key={category.name} 
                className="menu-category"
                ref={el => categoryRefs.current[category.name] = el}
              >
                <h2 className="category-title">{category.name}</h2>
                <div className="menu-items">
                  {category.items.map(item => (
                    <div className="menu-item" key={item.id}>
                      <div className="menu-item-image">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          onError={(e) => {
                            console.error(`Failed to load image for ${item.name}:`, item.image);
                            e.target.src = 'https://via.placeholder.com/100x100?text=Image+Error';
                          }}
                        />
                      </div>
                      <div className="menu-item-details">
                        <h3>{item.name}</h3>
                        <p className="menu-item-description">{item.description}</p>
                        <div className="menu-item-price-actions">
                          <span className="menu-item-price">${item.price.toFixed(2)}</span>
                          <div className="menu-item-actions">
                            {itemCounts[item.id] ? (
                              <div className="item-counter">
                                <button 
                                  className="counter-btn minus"
                                  onClick={() => handleAddToCart({...item, quantity: -1})}
                                >
                                  <FaMinus />
                                </button>
                                <span className="count">{itemCounts[item.id]}</span>
                                <button 
                                  className="counter-btn plus"
                                  onClick={() => handleAddToCart(item)}
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            ) : (
                              <button 
                                className="add-to-cart-btn"
                                onClick={() => handleAddToCart(item)}
                              >
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Cart Button */}
        <div className={`view-cart-container ${getCartItemCount() > 0 ? 'visible' : ''}`}>
          <button 
            className="view-cart-btn"
            onClick={() => navigate('/cart')}
          >
            <FaShoppingCart /> View Cart ({getCartItemCount()})
          </button>
        </div>

        {/* Added to Cart Message */}
        <div className={`added-message ${showAddedMessage ? 'show' : ''}`}>
          Item added to cart!
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu; 