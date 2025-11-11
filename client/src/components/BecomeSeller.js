import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BecomeSeller = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ 
        upiId: '', 
        collegeIdPhotoUrl: '' 
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { upiId, collegeIdPhotoUrl } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        const config = {
            headers: { 
                'x-auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put('http://localhost:5000/api/seller/become-seller', formData, config);
            setMessage(res.data.msg);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            console.error(err.response?.data);
            setError(err.response?.data?.msg || 'Failed to become seller');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="become-seller-container">
            <h2>Become a Seller</h2>
            <p className="info-text">
                To sell products on CampusCircle, you need to verify your identity by providing 
                your college ID photo and UPI ID for payments.
            </p>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={onSubmit} className="become-seller-form">
                <div className="form-group">
                    <label htmlFor="upiId">UPI ID *</label>
                    <input 
                        type="text" 
                        id="upiId"
                        name="upiId" 
                        value={upiId} 
                        onChange={onChange} 
                        placeholder="yourname@upi" 
                        required 
                    />
                    <small>This will be used for receiving payments</small>
                </div>

                <div className="form-group">
                    <label htmlFor="collegeIdPhotoUrl">College ID Photo URL *</label>
                    <input 
                        type="url" 
                        id="collegeIdPhotoUrl"
                        name="collegeIdPhotoUrl" 
                        value={collegeIdPhotoUrl} 
                        onChange={onChange} 
                        placeholder="https://example.com/your-id-photo.jpg" 
                        required 
                    />
                    <small>Upload your college ID to a cloud service and paste the URL here</small>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : 'Become a Seller'}
                </button>
            </form>
        </div>
    );
};

export default BecomeSeller;