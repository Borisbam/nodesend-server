const express = require('express');
const connectDB = require('./config/db');

// Create server

const app = express();

connectDB();

// Cors
const cors = require('cors');
const corsConfig = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(corsConfig) );
// Port
const port = process.env.PORT || 4000;

// Enable reading body values

app.use( express.json());

// Enable public route
app.use(express.static('uploads'));


// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));    
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));


// Run server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
})