const express = require('express');
const cors = require('cors'); // To allow cross-origin requests
const { Client } = require('pg');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL client configuration
const client = new Client({
  host: 'localhost',
  user: 'postgres',    // Replace with your username
  port: 5432,
  password: '1234',  // Replace with your password
  database: 'RSE',     // Replace with your database name
});

// Connect to the PostgreSQL database
client.connect((err) => {
  if (err) {
    console.error('Connection error:', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

// API endpoint to fetch client data
app.get('/api/clients', async (req, res) => {
  const searchName = req.query.name; // Get 'name' parameter from the URL
  try {
    const query = 'SELECT * FROM clientdata WHERE name ILIKE '%test%'';

    const result = await client.query(query, [`%${searchName}%`]); // Case-insensitive search
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).send('Error retrieving data');
  }
});

// Start the server
const PORT = 3003; // You can change the port if needed
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
