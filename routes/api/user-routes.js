// Thought Routes by Jack Loveday

// Import dependencies
const router = require('express').Router();

// Init User Commands
const {
    getUsers, // Get All
    getUserById, // Get by id
    createUser, // Create new user
    updateUser, // Update/edit user
    deleteUser, // Delete user
    addFriend, // Add friend
    removeFriend // Remove friend
} = require('../../controllers/user-controller');

// Base route, get users, create new user
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// Get user by id, update, or delete
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// Add a friend, or remove a friend
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

// Export the router
module.exports = router;