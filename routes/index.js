// Routes Index by Jack Loveday

// Import dependencies
const router = require('express').Router();
const apiRoutes = require('./api');

// Setup routes
router.use('/api', apiRoutes);

// Catch error status
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;