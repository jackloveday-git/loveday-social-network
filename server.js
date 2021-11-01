// server.js by Jack Loveday

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');

// Init app
const app = express();
const PORT = process.env.PORT || 3001;

// Setup express engine
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
app.use(require('./routes'));

// Setup mongo connection
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/loveday-social-network', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.listen(PORT, () => {
    console.log(`Connected on localhost:${PORT}`)
});