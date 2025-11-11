import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filter states
    const [filters, setFilters] = useState({
        category: '',
        condition: '',
        for: '',
        search: ''
    });

    const categories = ['Electronics', 'Books', 'Clothing', 'Furniture', 'Sports', 'Other'];
    const conditions = ['New', 'Used'];
    const forOptions = ['Buy', 'Borrow'];

    // Fetch products with filters
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (filters.category) params.append('category', filters.category);
                if (filters.condition) params.append('condition', filters.condition);
                if (filters.for) params.append('for', filters.for);
                if (filters.search) params.append('search', filters.search);

                const res = await axios.get(`http://localhost:5000/api/products?${params.toString()}`);
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const resetFilters = () => {
        setFilters({
            category: '',
            condition: '',
            for: '',
            search: ''
        });
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>CampusCircle Marketplace</h1>
                <p>Discover products from your college community</p>
            </div>

            {/* Filter Section */}
            <div className="filter-section">
                <div className="filter-group">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={handleFilterChange}
                        className="search-input"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="condition">Condition</label>
                    <select
                        id="condition"
                        name="condition"
                        value={filters.condition}
                        onChange={handleFilterChange}
                    >
                        <option value="">Any Condition</option>
                        {conditions.map(cond => (
                            <option key={cond} value={cond}>{cond}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="for">Type</label>
                    <select
                        id="for"
                        name="for"
                        value={filters.for}
                        onChange={handleFilterChange}
                    >
                        <option value="">Buy or Borrow</option>
                        {forOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <button onClick={resetFilters} className="btn-reset">
                    Reset Filters
                </button>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="loading">Loading products...</div>
            ) : (
                <div className="product-grid">
                    {products.length === 0 ? (
                        <div className="no-products">
                            <p>No products found. Try adjusting your filters.</p>
                        </div>
                    ) : (
                        products.map(product => (
                            <div key={product._id} className="product-card">
                                <div className="product-image">
                                    {product.images && product.images.length > 0 ? (
                                        <img src={product.images[0]} alt={product.name} />
                                    ) : (
                                        <div className="placeholder-image">No Image</div>
                                    )}
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p className="product-price">${product.price}</p>
                                    <div className="product-meta">
                                        <span className={`badge badge-${product.condition.toLowerCase()}`}>
                                            {product.condition}
                                        </span>
                                        <span className={`badge badge-${product.for.toLowerCase()}`}>
                                            {product.for}
                                        </span>
                                    </div>
                                    <p className="product-category">{product.category}</p>
                                    <p className="product-seller">
                                        Seller: {product.seller?.name || 'Unknown'}
                                    </p>
                                    <button className="btn-view">View Details</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;