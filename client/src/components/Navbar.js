// client/src/components/Navbar.js

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gsap } from 'gsap';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const menuRef = useRef(null);
    const profileRef = useRef(null);
    const profileIconRef = useRef(null);

    // Debug logging
    useEffect(() => {
        console.log('Navbar - isLoggedIn:', isLoggedIn, 'user:', user);
    }, [isLoggedIn, user]);

    // GSAP Animation for Profile Icon
    useEffect(() => {
        if (profileIconRef.current && isLoggedIn) {
            const icon = profileIconRef.current;
            
            // Continuous gradient color shift animation
            const colorTl = gsap.timeline({ repeat: -1, yoyo: true });
            colorTl.to(icon, {
                background: 'linear-gradient(135deg, #F2C12E 0%, #024959 50%, #F2AE30 100%)',
                duration: 4,
                ease: 'sine.inOut'
            }).to(icon, {
                background: 'linear-gradient(135deg, #F2AE30 0%, #F2C12E 50%, #024959 100%)',
                duration: 4,
                ease: 'sine.inOut'
            });

            // Subtle pulse animation
            gsap.to(icon, {
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(242, 193, 46, 0.3)',
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
            
            // Hover animations
            const handleMouseEnter = () => {
                gsap.to(icon, {
                    scale: 1.15,
                    boxShadow: '0 8px 30px rgba(242, 193, 46, 0.5), 0 0 40px rgba(242, 174, 48, 0.3)',
                    duration: 0.4,
                    ease: 'back.out(1.7)'
                });
            };

            const handleMouseLeave = () => {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            };

            icon.addEventListener('mouseenter', handleMouseEnter);
            icon.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                icon.removeEventListener('mouseenter', handleMouseEnter);
                icon.removeEventListener('mouseleave', handleMouseLeave);
                colorTl.kill();
            };
        }
    }, [isLoggedIn]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setProfileDropdownOpen(false);
        navigate('/');
    };

    const getInitial = () => {
        return user?.name ? user.name.charAt(0).toUpperCase() : 'U';
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar-final">
            <div className="navbar-final-container">
                {/* Left Section - Hamburger + Brand */}
                <div className="navbar-left">
                    <div className="hamburger-container" ref={menuRef}>
                        <button 
                            className={`hamburger-btn ${menuOpen ? 'active' : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>

                        {/* Hamburger Dropdown Menu */}
                        {menuOpen && (
                            <div className="nav-card-menu">
                                {isLoggedIn && (
                                    <>
                                        <div className="nav-menu-section">
                                            <h4 className="nav-menu-heading">User Zone</h4>
                                            <Link to="/profile" className="nav-menu-item" onClick={closeMenu}>
                                                My Profile
                                            </Link>
                                            <Link to="/orders" className="nav-menu-item" onClick={closeMenu}>
                                                My Orders
                                            </Link>
                                            <Link to="/wishlist" className="nav-menu-item" onClick={closeMenu}>
                                                Wishlist
                                            </Link>
                                            <Link to="/rewards" className="nav-menu-item" onClick={closeMenu}>
                                                Rewards / Points Zone
                                            </Link>
                                            <Link to="/membership" className="nav-menu-item" onClick={closeMenu}>
                                                Membership Zone
                                            </Link>
                                            <Link to="/coupons" className="nav-menu-item" onClick={closeMenu}>
                                                Coupons & Offers
                                            </Link>
                                            <Link to="/gift-cards" className="nav-menu-item" onClick={closeMenu}>
                                                Gift Cards
                                            </Link>
                                            <Link to="/notifications" className="nav-menu-item" onClick={closeMenu}>
                                                Notifications
                                            </Link>
                                        </div>
                                        <hr className="nav-menu-divider" />
                                    </>
                                )}

                                <div className="nav-menu-section">
                                    <h4 className="nav-menu-heading">Support / Help</h4>
                                    <Link to="/help" className="nav-menu-item" onClick={closeMenu}>
                                        Help Center
                                    </Link>
                                    <Link to="/returns" className="nav-menu-item" onClick={closeMenu}>
                                        Returns & Refunds
                                    </Link>
                                    <Link to="/shipping" className="nav-menu-item" onClick={closeMenu}>
                                        Shipping Info
                                    </Link>
                                    <Link to="/payments" className="nav-menu-item" onClick={closeMenu}>
                                        Payments & Wallet
                                    </Link>
                                </div>

                                <hr className="nav-menu-divider" />

                                <div className="nav-menu-section">
                                    <h4 className="nav-menu-heading">Legal / Info</h4>
                                    <Link to="/terms" className="nav-menu-item" onClick={closeMenu}>
                                        Terms & Conditions
                                    </Link>
                                    <Link to="/privacy" className="nav-menu-item" onClick={closeMenu}>
                                        Privacy Policy
                                    </Link>
                                </div>

                                {isLoggedIn && (
                                    <>
                                        <hr className="nav-menu-divider" />
                                        <div className="nav-menu-section">
                                            <h4 className="nav-menu-heading">Seller Zone</h4>
                                            {!user?.isSeller ? (
                                                <Link 
                                                    to="/become-seller" 
                                                    className="nav-menu-item nav-menu-become-seller" 
                                                    onClick={closeMenu}
                                                >
                                                    Become a Seller
                                                </Link>
                                            ) : (
                                                <Link 
                                                    to="/add-product" 
                                                    className="nav-menu-item nav-menu-add-product" 
                                                    onClick={closeMenu}
                                                >
                                                    Add Product
                                                </Link>
                                            )}
                                        </div>
                                        <hr className="nav-menu-divider" />
                                        <div className="nav-menu-section">
                                            <button 
                                                className="nav-menu-item nav-menu-logout" 
                                                onClick={() => {
                                                    closeMenu();
                                                    handleLogout();
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <Link to="/" className="navbar-brand-final">
                        CampusCircle
                    </Link>
                </div>

                {/* Right Section - Auth Links or Profile */}
                <div className="navbar-right-final">
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="nav-link-auth">Login</Link>
                            <Link to="/register" className="nav-link-auth nav-link-register">
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Cart Icon */}
                            <button 
                                className="cart-icon-btn"
                                onClick={() => navigate('/cart')}
                                aria-label="Shopping cart"
                            >
                                <svg 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2"
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                <span className="cart-badge">0</span>
                            </button>

                            {/* Profile Dropdown */}
                            <div className="profile-container" ref={profileRef}>
                                <button 
                                    ref={profileIconRef}
                                    className="profile-icon-final"
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    aria-label="Profile menu"
                                >
                                    {getInitial()}
                                </button>

                                {/* Profile Dropdown */}
                                {profileDropdownOpen && (
                                    <div className="profile-dropdown-final">
                                        <div className="profile-dropdown-header">
                                            <p className="profile-user-name">{user?.name}</p>
                                            <p className="profile-user-email">{user?.collegeEmail}</p>
                                        </div>
                                        <hr className="profile-dropdown-divider" />
                                        
                                        <Link 
                                            to="/profile" 
                                            className="profile-dropdown-item"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link 
                                            to="/settings" 
                                            className="profile-dropdown-item"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            Settings
                                        </Link>
                                        
                                        <hr className="profile-dropdown-divider" />
                                        
                                        {!user?.isSeller ? (
                                            <Link 
                                                to="/become-seller" 
                                                className="profile-dropdown-item profile-become-seller"
                                                onClick={() => setProfileDropdownOpen(false)}
                                            >
                                                Become a Seller
                                            </Link>
                                        ) : (
                                            <Link 
                                                to="/add-product" 
                                                className="profile-dropdown-item profile-seller-link"
                                                onClick={() => setProfileDropdownOpen(false)}
                                            >
                                                Add Product
                                            </Link>
                                        )}
                                        
                                        <hr className="profile-dropdown-divider" />
                                        
                                        <button 
                                            className="profile-dropdown-item profile-logout"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

