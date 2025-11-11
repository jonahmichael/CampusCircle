// server/routes/universities.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Static list of major Indian universities from AISHE data
// This is a curated list of major institutions
const indianUniversities = [
    // National Forensic Sciences University
    { name: "National Forensic Sciences University", state: "Gujarat", type: "Central University", city: "Gandhinagar" },
    
    // IITs
    { name: "Indian Institute of Technology Bombay", state: "Maharashtra", type: "Institute of National Importance", city: "Mumbai" },
    { name: "Indian Institute of Technology Delhi", state: "Delhi", type: "Institute of National Importance", city: "New Delhi" },
    { name: "Indian Institute of Technology Madras", state: "Tamil Nadu", type: "Institute of National Importance", city: "Chennai" },
    { name: "Indian Institute of Technology Kanpur", state: "Uttar Pradesh", type: "Institute of National Importance", city: "Kanpur" },
    { name: "Indian Institute of Technology Kharagpur", state: "West Bengal", type: "Institute of National Importance", city: "Kharagpur" },
    { name: "Indian Institute of Technology Roorkee", state: "Uttarakhand", type: "Institute of National Importance", city: "Roorkee" },
    { name: "Indian Institute of Technology Guwahati", state: "Assam", type: "Institute of National Importance", city: "Guwahati" },
    { name: "Indian Institute of Technology Hyderabad", state: "Telangana", type: "Institute of National Importance", city: "Hyderabad" },
    
    // IIMs
    { name: "Indian Institute of Management Ahmedabad", state: "Gujarat", type: "Institute of National Importance", city: "Ahmedabad" },
    { name: "Indian Institute of Management Bangalore", state: "Karnataka", type: "Institute of National Importance", city: "Bangalore" },
    { name: "Indian Institute of Management Calcutta", state: "West Bengal", type: "Institute of National Importance", city: "Kolkata" },
    { name: "Indian Institute of Management Lucknow", state: "Uttar Pradesh", type: "Institute of National Importance", city: "Lucknow" },
    { name: "Indian Institute of Management Indore", state: "Madhya Pradesh", type: "Institute of National Importance", city: "Indore" },
    
    // NITs
    { name: "National Institute of Technology Tiruchirappalli", state: "Tamil Nadu", type: "Institute of National Importance", city: "Tiruchirappalli" },
    { name: "National Institute of Technology Karnataka", state: "Karnataka", type: "Institute of National Importance", city: "Surathkal" },
    { name: "National Institute of Technology Rourkela", state: "Odisha", type: "Institute of National Importance", city: "Rourkela" },
    { name: "National Institute of Technology Warangal", state: "Telangana", type: "Institute of National Importance", city: "Warangal" },
    
    // AIIMS
    { name: "All India Institute of Medical Sciences Delhi", state: "Delhi", type: "Institute of National Importance", city: "New Delhi" },
    { name: "All India Institute of Medical Sciences Jodhpur", state: "Rajasthan", type: "Institute of National Importance", city: "Jodhpur" },
    
    // Central Universities
    { name: "Jawaharlal Nehru University", state: "Delhi", type: "Central University", city: "New Delhi" },
    { name: "University of Delhi", state: "Delhi", type: "Central University", city: "New Delhi" },
    { name: "Banaras Hindu University", state: "Uttar Pradesh", type: "Central University", city: "Varanasi" },
    { name: "Aligarh Muslim University", state: "Uttar Pradesh", type: "Central University", city: "Aligarh" },
    { name: "University of Hyderabad", state: "Telangana", type: "Central University", city: "Hyderabad" },
    
    // State Universities - Maharashtra
    { name: "University of Mumbai", state: "Maharashtra", type: "State Public University", city: "Mumbai" },
    { name: "Savitribai Phule Pune University", state: "Maharashtra", type: "State Public University", city: "Pune" },
    { name: "Shivaji University", state: "Maharashtra", type: "State Public University", city: "Kolhapur" },
    
    // State Universities - Karnataka
    { name: "Bangalore University", state: "Karnataka", type: "State Public University", city: "Bangalore" },
    { name: "Mysore University", state: "Karnataka", type: "State Public University", city: "Mysore" },
    { name: "Visvesvaraya Technological University", state: "Karnataka", type: "State Public University", city: "Belgaum" },
    
    // State Universities - Tamil Nadu
    { name: "Anna University", state: "Tamil Nadu", type: "State Public University", city: "Chennai" },
    { name: "University of Madras", state: "Tamil Nadu", type: "State Public University", city: "Chennai" },
    
    // State Universities - West Bengal
    { name: "University of Calcutta", state: "West Bengal", type: "State Public University", city: "Kolkata" },
    { name: "Jadavpur University", state: "West Bengal", type: "State Public University", city: "Kolkata" },
    
    // State Universities - Gujarat
    { name: "Gujarat University", state: "Gujarat", type: "State Public University", city: "Ahmedabad" },
    { name: "Maharaja Sayajirao University of Baroda", state: "Gujarat", type: "State Public University", city: "Vadodara" },
    
    // State Universities - Rajasthan
    { name: "University of Rajasthan", state: "Rajasthan", type: "State Public University", city: "Jaipur" },
    
    // State Universities - Kerala
    { name: "University of Kerala", state: "Kerala", type: "State Public University", city: "Thiruvananthapuram" },
    { name: "Cochin University of Science and Technology", state: "Kerala", type: "State Public University", city: "Kochi" },
    
    // Deemed Universities
    { name: "Manipal Academy of Higher Education", state: "Karnataka", type: "Deemed University - Private", city: "Manipal" },
    { name: "Birla Institute of Technology and Science", state: "Rajasthan", type: "Deemed University - Private", city: "Pilani" },
    { name: "VIT University", state: "Tamil Nadu", type: "Deemed University - Private", city: "Vellore" },
    { name: "Amity University", state: "Uttar Pradesh", type: "State Private University", city: "Noida" },
    { name: "SRM Institute of Science and Technology", state: "Tamil Nadu", type: "Deemed University - Private", city: "Chennai" },
    
    // Additional major universities
    { name: "Symbiosis International University", state: "Maharashtra", type: "Deemed University - Private", city: "Pune" },
    { name: "Christ University", state: "Karnataka", type: "Deemed University - Private", city: "Bangalore" },
    { name: "Lovely Professional University", state: "Punjab", type: "State Private University", city: "Phagwara" },
    { name: "Chandigarh University", state: "Punjab", type: "State Private University", city: "Mohali" },
];

// @route   GET api/universities/indian
// @desc    Get list of Indian universities
router.get('/indian', async (req, res) => {
    try {
        const { state, type, search } = req.query;
        
        let filteredUniversities = [...indianUniversities];
        
        // Filter by state
        if (state) {
            filteredUniversities = filteredUniversities.filter(uni => 
                uni.state.toLowerCase() === state.toLowerCase()
            );
        }
        
        // Filter by type
        if (type) {
            filteredUniversities = filteredUniversities.filter(uni => 
                uni.type.toLowerCase().includes(type.toLowerCase())
            );
        }
        
        // Search by name
        if (search) {
            filteredUniversities = filteredUniversities.filter(uni => 
                uni.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        res.json({
            count: filteredUniversities.length,
            universities: filteredUniversities
        });
    } catch (err) {
        console.error('Error fetching Indian universities:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET api/universities/states
// @desc    Get list of Indian states
router.get('/states', (req, res) => {
    const states = [...new Set(indianUniversities.map(uni => uni.state))].sort();
    res.json(states);
});

// @route   GET api/universities/types
// @desc    Get list of university types
router.get('/types', (req, res) => {
    const types = [...new Set(indianUniversities.map(uni => uni.type))].sort();
    res.json(types);
});

// @route   GET api/universities/cities
// @desc    Get list of Indian cities from CSV file
router.get('/cities', async (req, res) => {
    try {
        const { state } = req.query;
        const csvPath = 'D:\\archive (8)\\Cities_Towns_District_State_India.csv';
        
        console.log('Cities API called with state:', state);
        console.log('CSV Path:', csvPath);
        
        // Check if file exists
        if (!fs.existsSync(csvPath)) {
            console.log('CSV file not found!');
            return res.status(404).json({ msg: 'Cities data file not found' });
        }
        
        console.log('CSV file exists, reading...');

        const cities = [];
        let rowCount = 0;
        
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => {
                rowCount++;
                // CSV column names: "City/Town", "State/Union territory*", "District"
                const cityName = row['City/Town'];
                const stateName = row['State/Union territory*'];
                const districtName = row['District'];
                
                // Debug first few rows
                if (rowCount <= 3) {
                    console.log('Row', rowCount, ':', { cityName, stateName, districtName });
                }
                
                // Filter by state if provided
                if (state) {
                    if (stateName && stateName.trim().toLowerCase() === state.toLowerCase() && cityName) {
                        cities.push({
                            name: cityName.trim(),
                            district: districtName ? districtName.trim() : '',
                            state: stateName.trim()
                        });
                    }
                } else {
                    if (cityName && stateName) {
                        cities.push({
                            name: cityName.trim(),
                            district: districtName ? districtName.trim() : '',
                            state: stateName.trim()
                        });
                    }
                }
            })
            .on('end', () => {
                console.log(`Total rows processed: ${rowCount}, Cities found: ${cities.length}`);
                // Remove duplicates and sort
                const uniqueCities = Array.from(
                    new Map(cities.map(city => [city.name, city])).values()
                ).sort((a, b) => a.name.localeCompare(b.name));
                
                res.json({
                    count: uniqueCities.length,
                    cities: uniqueCities
                });
            })
            .on('error', (error) => {
                console.error('Error reading CSV:', error);
                res.status(500).json({ msg: 'Error reading cities data' });
            });
    } catch (err) {
        console.error('Error fetching cities:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET api/universities/all
// @desc    Get universities from multiple sources (Hipo API + Indian universities)
router.get('/all', async (req, res) => {
    try {
        const { country } = req.query;
        
        // If India is requested, return Indian universities
        if (country && country.toLowerCase() === 'india') {
            return res.json({
                source: 'AISHE',
                count: indianUniversities.length,
                universities: indianUniversities.map(uni => ({
                    name: uni.name,
                    country: 'India',
                    state: uni.state,
                    city: uni.city,
                    type: uni.type
                }))
            });
        }
        
        // Otherwise, fetch from Hipo API
        const hipoResponse = await axios.get('http://universities.hipolabs.com/search', {
            params: { country: country || '' }
        });
        
        const universities = hipoResponse.data.map(uni => ({
            name: uni.name,
            country: uni.country,
            state: uni['state-province'] || '',
            city: '',
            type: 'International University',
            website: uni.web_pages?.[0] || '',
            domains: uni.domains || []
        }));
        
        res.json({
            source: 'Hipo API',
            count: universities.length,
            universities
        });
    } catch (err) {
        console.error('Error fetching universities:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET api/universities/search
// @desc    Search universities across all sources
router.get('/search', async (req, res) => {
    try {
        const { query, country } = req.query;
        
        if (!query) {
            return res.status(400).json({ msg: 'Search query is required' });
        }
        
        let results = [];
        
        // Search Indian universities
        const indianResults = indianUniversities
            .filter(uni => 
                uni.name.toLowerCase().includes(query.toLowerCase()) ||
                uni.state.toLowerCase().includes(query.toLowerCase()) ||
                uni.city.toLowerCase().includes(query.toLowerCase())
            )
            .map(uni => ({
                ...uni,
                country: 'India',
                source: 'AISHE'
            }));
        
        results = [...results, ...indianResults];
        
        // If not restricted to India, also search international universities
        if (!country || country.toLowerCase() !== 'india') {
            try {
                const hipoResponse = await axios.get(`http://universities.hipolabs.com/search?name=${query}`);
                const hipoResults = hipoResponse.data.map(uni => ({
                    name: uni.name,
                    country: uni.country,
                    state: uni['state-province'] || '',
                    city: '',
                    type: 'International University',
                    source: 'Hipo API'
                }));
                results = [...results, ...hipoResults];
            } catch (hipoErr) {
                console.error('Error fetching from Hipo API:', hipoErr.message);
            }
        }
        
        res.json({
            query,
            count: results.length,
            results
        });
    } catch (err) {
        console.error('Error searching universities:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
