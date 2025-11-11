import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        condition: 'New',
        for: 'Buy',
        images: ['']
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const categories = ['Electronics', 'Books', 'Clothing', 'Furniture', 'Sports', 'Other'];

    const { name, description, price, category, condition, images } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...images, ''] });
    };

    const removeImageField = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        // Filter out empty image URLs
        const filteredImages = images.filter(img => img.trim() !== '');

        const productData = {
            name,
            description,
            price: parseFloat(price),
            category,
            condition,
            for: formData.for,
            images: filteredImages
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to add a product');
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };

            const res = await axios.post('http://localhost:5000/api/products', productData, config);
            console.log('Product added:', res.data);
            setMessage('Product added successfully!');
            
            // Reset form
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                condition: 'New',
                for: 'Buy',
                images: ['']
            });

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            console.error('Error adding product:', err.response?.data);
            setError(err.response?.data?.msg || 'Failed to add product. Make sure you are a seller.');
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add New Product</h2>
            
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={onSubmit} className="add-product-form">
                <div className="form-group">
                    <label htmlFor="name">Product Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Enter product name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={onChange}
                        placeholder="Describe your product..."
                        rows="4"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Price ($) *</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={onChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category *</label>
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={onChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="condition">Condition *</label>
                        <select
                            id="condition"
                            name="condition"
                            value={condition}
                            onChange={onChange}
                            required
                        >
                            <option value="New">New</option>
                            <option value="Used">Used</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="for">Available For *</label>
                        <select
                            id="for"
                            name="for"
                            value={formData.for}
                            onChange={onChange}
                            required
                        >
                            <option value="Buy">Buy</option>
                            <option value="Borrow">Borrow</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Product Images (URLs)</label>
                    {images.map((img, index) => (
                        <div key={index} className="image-input-group">
                            <input
                                type="url"
                                value={img}
                                onChange={(e) => onImageChange(index, e.target.value)}
                                placeholder="Enter image URL"
                            />
                            {images.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeImageField(index)}
                                    className="btn-remove"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addImageField} className="btn-add-image">
                        + Add Another Image
                    </button>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        Add Product
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/dashboard')} 
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;