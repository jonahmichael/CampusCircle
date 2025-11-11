// client/src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-final">
            <div className="footer-final-container">
                {/* Column 1: ABOUT */}
                <div className="footer-column">
                    <h4 className="footer-heading">ABOUT</h4>
                    <ul className="footer-links">
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/press">Press</Link></li>
                    </ul>
                </div>

                {/* Column 2: CUSTOMER SUPPORT */}
                <div className="footer-column">
                    <h4 className="footer-heading">CUSTOMER SUPPORT</h4>
                    <ul className="footer-links">
                        <li><Link to="/payments">Payments</Link></li>
                        <li><Link to="/shipping">Shipping</Link></li>
                        <li><Link to="/cancellation">Cancellation & Returns</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/report">Report Infringement</Link></li>
                    </ul>
                </div>

                {/* Column 3: POLICIES */}
                <div className="footer-column">
                    <h4 className="footer-heading">POLICIES</h4>
                    <ul className="footer-links">
                        <li><Link to="/terms">Terms of Use</Link></li>
                        <li><Link to="/security">Security</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/sitemap">Sitemap</Link></li>
                        <li><Link to="/epr-compliance">EPR Compliance</Link></li>
                    </ul>
                </div>

                {/* Column 4: COMPANY / ADDRESSES */}
                <div className="footer-column">
                    <h4 className="footer-heading">COMPANY</h4>
                    <div className="footer-company-info">
                        <p className="company-address">
                            <strong>Registered Office Address:</strong><br />
                            CampusCircle Inc.<br />
                            123 University Avenue<br />
                            Tech City, TC 12345<br />
                            India
                        </p>
                        <p className="company-support">
                            <strong>Support Email:</strong><br />
                            <a href="mailto:support@campuscircle.com">support@campuscircle.com</a>
                        </p>
                        <p className="company-phone">
                            <strong>Phone:</strong><br />
                            +91 1800-XXX-XXXX (Toll-Free)
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <div className="footer-bottom-left">
                        <p>&copy; 2025 CampusCircle. All rights reserved.</p>
                    </div>
                    <div className="footer-bottom-center">
                        <p>
                            Designed & Developed by{' '}
                            <a 
                                href="https://github.com/jonahmichael" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="developer-link"
                            >
                                Jonah Paulin Joyce
                            </a>
                        </p>
                    </div>
                    <div className="footer-bottom-right">
                        <a 
                            href="https://github.com/jonahmichael/CampusCircle" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="github-link"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
