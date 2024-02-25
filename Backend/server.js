const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 8000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'yuva6384',
  database: 'postgres', 
  port: 5432,
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());

let books = []; 



app.get('/api/books', async (req, res) => {
  try {
    const { title, author } = req.query;
    let query = 'SELECT * FROM books';

    const values = [];
    if (title) {
      query += ' WHERE LOWER(title) LIKE LOWER($1)';
      values.push(`%${title}%`);
    }
    if (author) {
      query += title ? ' AND LOWER(author) LIKE LOWER($2)' : ' WHERE LOWER(author) LIKE LOWER($1)';
      values.push(`%${author}%`);
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing SQL', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// DELETE a book by ID
app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting book with ID:', id); // Add this line for logging
    const query = 'DELETE FROM books WHERE id = $1';
    await pool.query(query, [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error executing SQL', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// POST a new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author } = req.body;
    const query = `INSERT INTO books (title, author) VALUES ('${title}', '${author}')`;
    console.log(query);
    const result = await pool.query(query);
    const newBook = result.rows;
    console.log(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error executing SQL', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
