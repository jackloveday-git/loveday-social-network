// Thought Routes by Jack Loveday

// Import dependencies
const router = require('express').Router();

// Init Thought Commands
const {
    getAllThoughts, // Get All
    getThoughtById, // Get by id
    createThought, // Create new thought
    updateThought, // Update/edit thought
    deleteThought, // Delete thought
    addReaction, // Add a reaction
    removeReaction // Remove reaction
} = require('../../controllers/thought-controller')

// Base route - get thoughts, create new thought
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// By id, update, or delete
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// Add reaction
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

// Remove reaction
router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction)

// Export the router
module.exports = router;