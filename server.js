const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
// Load the ***.js(ex: users.js) route file.
// Any request starting with '/api/***' (ex: 'api/users') goes to that file.
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
