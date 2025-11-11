import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        collegeEmail: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { collegeEmail, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            console.log('Login response:', res.data);
            
            // Wait for the login to complete
            await login(res.data.token);
            
            console.log('Login completed, navigating to shop...');
            
            // Small delay to ensure state updates
            setTimeout(() => {
                navigate('/shop', { replace: true });
            }, 100);
        } catch (err) {
            console.error(err.response?.data);
            setError(err.response?.data?.msg || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login to CampusCircle</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={onSubmit} className="login-form">
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
                        placeholder="Enter your password" 
                        required 
                    />
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p className="auth-link">
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default Login;