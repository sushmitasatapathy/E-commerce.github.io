import React, { useState } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import { FaInstagram, FaFacebook, FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your login logic here
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div className="icons-container">
        <FaInstagram className="icon" />
        <FaFacebook className="icon" />
        <FaGoogle className="icon" />
      </div>
        <p className="signup-link">Don't have an account? <a href="#"><Link to="/signup">Sign up</Link></a></p>
      </form>
    </div>
  );
};

export default Login;
