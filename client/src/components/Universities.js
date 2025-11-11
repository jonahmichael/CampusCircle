import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Universities = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        state: '',
        type: '',
        search: ''
    });
    const [states, setStates] = useState([]);
    const [types, setTypes] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        byType: {}
    });

    // Fetch Indian states and types
    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [statesRes, typesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/universities/states'),
                    axios.get('http://localhost:5000/api/universities/types')
                ]);
                setStates(statesRes.data);
                setTypes(typesRes.data);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };
        fetchMetadata();
    }, []);

    // Fetch universities based on filters
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (filters.state) params.append('state', filters.state);
                if (filters.type) params.append('type', filters.type);
                if (filters.search) params.append('search', filters.search);

                const response = await axios.get(`http://localhost:5000/api/universities/indian?${params.toString()}`);
                setUniversities(response.data.universities);
                
                // Calculate stats
                const total = response.data.universities.length;
                const byType = response.data.universities.reduce((acc, uni) => {
                    acc[uni.type] = (acc[uni.type] || 0) + 1;
                    return acc;
                }, {});
                
                setStats({ total, byType });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching universities:', error);
                setLoading(false);
            }
        };
        fetchUniversities();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const resetFilters = () => {
        setFilters({ state: '', type: '', search: '' });
    };

    return (
        <div className="universities-container">
            <div className="universities-header">
                <h1>Indian Universities Directory</h1>
                <p className="subtitle">
                    Curated list from AISHE (All India Survey on Higher Education)
                </p>
                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-number">{stats.total}</div>
                        <div className="stat-label">Total Universities</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{states.length}</div>
                        <div className="stat-label">States Covered</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{types.length}</div>
                        <div className="stat-label">Institution Types</div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="universities-filters">
                <div className="filter-group">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search universities..."
                        value={filters.search}
                        onChange={handleFilterChange}
                        className="search-input"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="state">State</label>
                    <select
                        id="state"
                        name="state"
                        value={filters.state}
                        onChange={handleFilterChange}
                    >
                        <option value="">All States</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="type">Institution Type</label>
                    <select
                        id="type"
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Types</option>
                        {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <button onClick={resetFilters} className="btn-reset">
                    Reset Filters
                </button>
            </div>

            {/* Universities List */}
            {loading ? (
                <div className="loading">Loading universities...</div>
            ) : (
                <>
                    <div className="universities-count">
                        Showing {universities.length} {universities.length === 1 ? 'university' : 'universities'}
                    </div>
                    <div className="universities-grid">
                        {universities.map((uni, index) => (
                            <div key={index} className="university-card">
                                <div className="university-header">
                                    <h3>{uni.name}</h3>
                                    <span className={`type-badge type-${uni.type.toLowerCase().replace(/\s+/g, '-')}`}>
                                        {uni.type}
                                    </span>
                                </div>
                                <div className="university-details">
                                    <div className="detail-item">
                                        <span className="detail-icon">📍</span>
                                        <span>{uni.city}, {uni.state}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Stats by Type */}
            {Object.keys(stats.byType).length > 0 && (
                <div className="stats-section">
                    <h3>Distribution by Type</h3>
                    <div className="stats-list">
                        {Object.entries(stats.byType)
                            .sort((a, b) => b[1] - a[1])
                            .map(([type, count]) => (
                                <div key={type} className="stat-item">
                                    <span className="stat-type">{type}</span>
                                    <span className="stat-count">{count}</span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Universities;
