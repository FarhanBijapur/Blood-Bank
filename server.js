const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // Ensure this points correctly to your db.js file

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Middleware to parse JSON requests

// Serve static files from the root directory
app.use(express.static(path.join(__dirname))); // This will serve files from the project root


const validUsername = 'admin';
const validPassword = 'password';

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === validUsername && password === validPassword) {
        res.status(200).json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Fetch all donors
app.get('/api/donors', (req, res) => {
    const sql = 'SELECT * FROM donors';
    db.query(sql, [], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Add donor
// POST route to add a donor
app.post('/api/donors', (req, res) => {
    const { name, bloodGroup, address, contact } = req.body;

    const query = 'INSERT INTO donors (name, bloodGroup, address, contact) VALUES (?, ?, ?, ?)';
    const values = [name, bloodGroup, address, contact];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Database query error');
        }
        res.status(201).send('Donor added successfully');
    });
});
// Update donor
app.put('/api/donors', (req, res) => {
    const { name, bloodGroup, address, contact } = req.body;

    const sql = 'UPDATE donors SET bloodGroup = ?, address = ?, contact = ? WHERE name = ?';
    db.query(sql, [bloodGroup, address, contact, name], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to update donor' });
        }
        res.json({ message: 'Donor updated successfully' });
    });
}); 

// Delete donor
app.delete('/api/donors/:name', (req, res) => {
    const name = req.params.name;

    const sql = 'DELETE FROM donors WHERE name = ?';
    db.query(sql, [name], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to delete donor' });
        }
        res.json({ message: 'Donor deleted successfully' });
    });
});

app.get('/api/report', (req, res) => {
    const sql = 'SELECT name, bloodGroup, address, contact FROM donors';
    db.query(sql, [], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});


// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
