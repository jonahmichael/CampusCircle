// client/src/components/Register.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        collegeName: '',
        collegeCountry: '',
        city: '',
        address: '',
        collegeEmail: '',
        password: ''
    });

    // University data state
    const [loading, setLoading] = useState(true);

    const { name, dob, collegeName, city, address, collegeEmail, password } = formData;

    // Fetch university data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Automatically set country to India
                setFormData(prev => ({ ...prev, collegeCountry: 'India' }));
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            // Register the user
            const registerRes = await axios.post('http://localhost:5000/api/auth/register', formData);
            console.log('Registration successful:', registerRes.data);
            
            // Automatically log in the user
            const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
                collegeEmail: formData.collegeEmail,
                password: formData.password
            });
            
            console.log('Auto-login successful, token:', loginRes.data.token);
            
            // Use AuthContext to set user state
            await login(loginRes.data.token);
            
            console.log('Login completed, navigating to shop...');
            
            // Small delay to ensure state updates
            setTimeout(() => {
                navigate('/shop', { replace: true });
            }, 100);
        } catch (err) {
            console.error(err.response?.data);
            alert('Error: ' + (err.response?.data?.msg || 'Registration failed'));
        }
    };

    return (
        <div className="register-container">
            <h2>Register for CampusCircle</h2>
            
            <form onSubmit={onSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        value={name} 
                        onChange={onChange} 
                        placeholder="Enter your full name" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input 
                        type="date" 
                        id="dob"
                        name="dob" 
                        value={dob} 
                        onChange={onChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="collegeCountry">College Country</label>
                    <input 
                        type="text"
                        id="collegeCountry"
                        name="collegeCountry" 
                        value="India"
                        readOnly
                        disabled
                        style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                    />
                    <small>Currently supporting Indian universities only</small>
                </div>

                <div className="form-group">
                    <label htmlFor="collegeName">College/University Name</label>
                    <input 
                        type="text"
                        id="collegeName"
                        name="collegeName" 
                        value={collegeName} 
                        onChange={onChange} 
                        placeholder="Enter your college/university name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input 
                        type="text"
                        id="city"
                        name="city" 
                        value={city} 
                        onChange={onChange} 
                        placeholder="Enter your city"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        id="address"
                        name="address" 
                        value={address} 
                        onChange={onChange} 
                        placeholder="Enter your address" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="collegeEmail">College Email</label>
                    <input 
                        type="email" 
                        id="collegeEmail"
                        name="collegeEmail" 
                        value={collegeEmail} 
                        onChange={onChange} 
                        placeholder="your.email@college.edu" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        placeholder="Enter a secure password" 
                        required 
                        minLength="6" 
                    />
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;