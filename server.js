const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public folder

// Data storage path
const dataFilePath = path.join(__dirname, 'data.json');

// Load existing data
const loadData = () => {
    if (fs.existsSync(dataFilePath)) {
        const rawData = fs.readFileSync(dataFilePath);
        return JSON.parse(rawData);
    }
    return { clients: [], appointments: [], renewals: [] };
};

// Save data
const saveData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// API to get data
app.get('/api/data', (req, res) => {
    const data = loadData();
    res.json(data);
});

// API to save data
app.post('/api/data', (req, res) => {
    const newData = req.body;
    saveData(newData);
    res.status(200).send('Data saved successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
