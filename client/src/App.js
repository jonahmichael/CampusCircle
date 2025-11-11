// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import components
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import LandingPage from './components/LandingPage.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import ShopPage from './components/ShopPage.js';
import BecomeSeller from './components/BecomeSeller.js';
import AddProduct from './components/AddProduct.js';
import Profile from './components/Profile.js';
import Settings from './components/Settings.js';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function AppContent() {
  return (
    <div className="App">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<ShopPage />} />
          
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute><Settings /></ProtectedRoute>
          } />
          <Route path="/become-seller" element={
            <ProtectedRoute><BecomeSeller /></ProtectedRoute>
          } />
          <Route path="/add-product" element={
            <ProtectedRoute><AddProduct /></ProtectedRoute>
          } />
          
          {/* Legacy route redirect */}
          <Route path="/dashboard" element={<Navigate to="/shop" replace />} />
          
          {/* Placeholder routes for footer and navigation links */}
          <Route path="/contact" element={<div className="placeholder-page"><h1>Contact Us</h1><p>Coming soon...</p></div>} />
          <Route path="/about" element={<div className="placeholder-page"><h1>About Us</h1><p>Coming soon...</p></div>} />
          <Route path="/careers" element={<div className="placeholder-page"><h1>Careers</h1><p>Coming soon...</p></div>} />
          <Route path="/help" element={<div className="placeholder-page"><h1>Help Center</h1><p>Coming soon...</p></div>} />
          <Route path="/terms" element={<div className="placeholder-page"><h1>Terms & Conditions</h1><p>Coming soon...</p></div>} />
          <Route path="/privacy" element={<div className="placeholder-page"><h1>Privacy Policy</h1><p>Coming soon...</p></div>} />
          <Route path="/orders" element={<ProtectedRoute><div className="placeholder-page"><h1>My Orders</h1><p>Coming soon...</p></div></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><div className="placeholder-page"><h1>Wishlist</h1><p>Coming soon...</p></div></ProtectedRoute>} />
          <Route path="/rewards" element={<ProtectedRoute><div className="placeholder-page"><h1>Rewards / Points</h1><p>Coming soon...</p></div></ProtectedRoute>} />
          <Route path="/membership" element={<ProtectedRoute><div className="placeholder-page"><h1>Membership Zone</h1><p>Coming soon...</p></div></ProtectedRoute>} />
          <Route path="/coupons" element={<ProtectedRoute><div className="placeholder-page"><h1>Coupons & Offers</h1><p>Coming soon...</p></div></ProtectedRoute>} />
          <Route path="/gift-cards" element={<ProtectedRoute><div className="placeholder-page"><h1>Gift Cards</h1><p>Coming soon...</p></div></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><div className="placeholder-page"><h1>Notifications</h1><p>Coming soon...</p></div></ProtectedRoute>} />
          <Route path="/returns" element={<div className="placeholder-page"><h1>Returns & Refunds</h1><p>Coming soon...</p></div>} />
          <Route path="/shipping" element={<div className="placeholder-page"><h1>Shipping Info</h1><p>Coming soon...</p></div>} />
          <Route path="/payments" element={<ProtectedRoute><div className="placeholder-page"><h1>Payments & Wallet</h1><p>Coming soon...</p></div></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><div className="placeholder-page"><h1>Shopping Cart</h1><p>Your cart is empty</p></div></ProtectedRoute>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;