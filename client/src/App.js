// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import Register from './components/Register.js';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import BecomeSeller from './components/BecomeSeller.js';
import AddProduct from './components/AddProduct.js';

function App() {
  const isLoggedIn = () => localStorage.getItem('token') !== null;

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-brand">
              <h1>CampusCircle</h1>
            </Link>
            <ul className="nav-links">
              {!isLoggedIn() ? (
                <>
                  <li><Link to="/register">Register</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/add-product">Add Product</Link></li>
                  <li><Link to="/become-seller">Become Seller</Link></li>
                  <li>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                      }}
                      className="btn-logout"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="home-page">
                <h2>Welcome to CampusCircle!</h2>
                <p>The peer-to-peer marketplace for college students</p>
                <div className="home-actions">
                  <Link to="/register" className="btn-primary">Get Started</Link>
                  <Link to="/dashboard" className="btn-secondary">Browse Products</Link>
                </div>
              </div>
            } />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/become-seller" element={
              isLoggedIn() ? <BecomeSeller /> : <Navigate to="/login" />
            } />
            <Route path="/add-product" element={
              isLoggedIn() ? <AddProduct /> : <Navigate to="/login" />
            } />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2025 CampusCircle. Built for students, by students.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;