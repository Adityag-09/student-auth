import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Student Authentication System</h1>
        <p>Secure login and registration for students</p>

        <div className="cta-buttons">
          <button className="btn-primary" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="btn-secondary" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>

        <div className="features">
          <div className="feature">
            <h3>🔐 Secure</h3>
            <p>Password hashing with bcrypt and JWT authentication</p>
          </div>
          <div className="feature">
            <h3>👤 Easy Registration</h3>
            <p>Simple signup process with course selection</p>
          </div>
          <div className="feature">
            <h3>⚙️ Manage Profile</h3>
            <p>Update password and course from your dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
