const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cookieParser()); // Add after express.json()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
