// Api Route Index by Jack Loveday

// Import dependencies
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');
const router = require('express').Router();

// Add api routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;