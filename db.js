const mongoose = require('mongoose');
require('dotenv').config();
// Define MongoDB connection URL
// const mongoURL = 'mongodb://127.0.0.1:27017/hotels'; // local mongo db server

const mongoURL=process.env.DB_URL;    /// on server  "password - vSrKNcNEIfHUkqWN" ( mongo db atlas)

// Setup MongoDB connection
mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB server'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Get default connection
const db = mongoose.connection;

// Optional: Notify on disconnection
db.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
});
