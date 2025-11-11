// client/src/components/LandingPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {/* Hero Section with Background */}
            <section className="hero-section-enhanced">
                <div className="hero-overlay"></div>
                <div className="hero-content-enhanced">
                    <h1 className="hero-title-enhanced">Welcome to CampusCircle</h1>
                    <p className="hero-tagline-enhanced">
                        Your Campus Marketplace. Buy, sell, and borrow from students you trust.
                    </p>
                    <button 
                        className="btn-shop-now-enhanced"
                        onClick={() => navigate('/shop')}
                    >
                        Shop Now
                    </button>
                </div>
            </section>

            {/* How It Works Section - Card Layout */}
            <section className="how-it-works-enhanced">
                <h2 className="section-title">How It Works</h2>
                <p className="section-subtitle">Getting started is simple and quick</p>
                
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-card-icon">
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <div className="step-card-content">
                            <h3 className="step-card-title">1. Sign Up</h3>
                            <p className="step-card-description">
                                Create your account with your college email and join your campus community instantly.
                            </p>
                            <button 
                                className="step-card-link"
                                onClick={() => navigate('/register')}
                            >
                                Register Now →
                            </button>
                        </div>
                    </div>

                    <div className="step-card">
                        <div className="step-card-icon">
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </div>
                        <div className="step-card-content">
                            <h3 className="step-card-title">2. Browse & Shop</h3>
                            <p className="step-card-description">
                                Discover amazing deals from your peers. Find textbooks, electronics, furniture, and more.
                            </p>
                            <button 
                                className="step-card-link"
                                onClick={() => navigate('/shop')}
                            >
                                Start Shopping →
                            </button>
                        </div>
                    </div>

                    <div className="step-card">
                        <div className="step-card-icon">
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <div className="step-card-content">
                            <h3 className="step-card-title">3. Become a Seller</h3>
                            <p className="step-card-description">
                                Turn your unused items into cash. List products, connect with buyers, and earn money.
                            </p>
                            <button 
                                className="step-card-link"
                                onClick={() => navigate('/become-seller')}
                            >
                                Start Selling →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust & Safety Section */}
            <section className="trust-section">
                <div className="trust-content">
                    <h2>Safe, Secure, and Trusted</h2>
                    <div className="trust-features">
                        <div className="trust-feature">
                            <div className="trust-icon">🔒</div>
                            <h4>Verified Students</h4>
                            <p>All users verified with college email</p>
                        </div>
                        <div className="trust-feature">
                            <div className="trust-icon">💳</div>
                            <h4>Secure Payments</h4>
                            <p>Safe and encrypted transactions</p>
                        </div>
                        <div className="trust-feature">
                            <div className="trust-icon">📱</div>
                            <h4>Easy Communication</h4>
                            <p>Chat with sellers directly</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
