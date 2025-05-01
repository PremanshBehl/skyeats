import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would connect to your authentication service
    if (isLogin) {
      console.log('Logging in with:', formData.email, formData.password);
      // loginUser(formData.email, formData.password);
    } else {
      console.log('Signing up with:', formData.name, formData.email, formData.password);
      // registerUser(formData.name, formData.email, formData.password);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-page full-width">
      <div className="login-container">
        <div className="auth-form-container">
          <h1>{isLogin ? 'Sign In' : 'Create Account'}</h1>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Sign in to order food for your flight' 
              : 'Create an account to get started with SkyEats'}
          </p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser className="input-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope className="input-icon" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="input-icon" />
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-control"
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                required
              />
            </div>
            
            {isLogin && (
              <div className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            )}
            
            <button type="submit" className="btn btn-full">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="auth-switch">
            {isLogin 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <button onClick={toggleForm} className="switch-btn">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
          
          <div className="auth-divider">
            <span>or</span>
          </div>
          
          <div className="social-login">
            <button className="social-btn google">
              Continue with Google
            </button>
            <button className="social-btn facebook">
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 