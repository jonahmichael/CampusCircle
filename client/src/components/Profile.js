// client/src/components/Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/api/auth/me', {
                        headers: { 'x-auth-token': token }
                    });
                    setUserData(res.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                }
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <div className="loading">Loading profile...</div>;
    }

    return (
        <div className="profile-page">
            <h1>My Profile</h1>
            <div className="profile-card">
                <div className="profile-avatar">
                    {userData?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="profile-details">
                    <h2>{userData?.name}</h2>
                    <p className="email">{userData?.collegeEmail}</p>
                    <div className="seller-status">
                        <span className={`status-badge ${userData?.isSeller ? 'seller' : 'buyer'}`}>
                            {userData?.isSeller ? 'Seller Account' : 'Buyer Account'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
