// Thought Controler by Jack Loveday

// Import dependencies
const { Thought, User } = require('../models');

// Init Thought Controller
const thoughtController = {
    // Get all Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            // Then return our data as a json
            .then(thoughtData => res.json(thoughtData))
            // Catch errors
            .catch(err => {
                res.status(400).json(err);
            })
    },

    // Get thought by id
    getThoughtById({
        params
    }, res) {
        Thought.findOne({
                _id: params.id
            })
            .select('-__v')
            .sort({ _id: -1 })
            // Then return our data as a json
            .then(thoughtData => res.json(thoughtData))
            // Catch errors
            .catch(err => {
                res.status(400).json(err);
            })
    },

    // Create a new Thought
    createThought({
        params,
        body
    }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                // Add the thought to our User
                return User.findOneAndUpdate({
                    username: body.username
                }, {
                    $push: {
                        thoughts: _id
                    }
                }, {
                    new: true
                });
            })
            // Then:
            .then(userData => {
                // Check if user data is valid
                if (!userData) {
                    res.status(404).json({
                        message: `No user with id: ${body.username}`
                    });
                    return;
                }
                // If it is valid, return our data as json
                res.json(userData);
            })
            // Catch any errors
            .catch(err => res.json(err));
    },

    // Add a reaction
    addReaction({
        params,
        body
    }, res) {
        Thought.findOneAndUpdate({
                // Add the reaction to our Thought
                _id: params.thoughtId
            }, {
                $push: {
                    reactions: body
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(thoughtData => {
                // Check if data is valid
                if (!thoughtData) {
                    res.status(404).json({
                        message: `No thought with id: ${params.thoughtId}`
                    });
                    return;
                }
                // Otherwise return our data as json
                res.json(thoughtData)
            })
            // Catch any errors
            .catch(err => res.json(err));
    },

    // Delete a reaction
    removeReaction({
        params
    }, res) {
        // Update our thought by id
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, {
                $pull: {
                    reactions: {
                        reactionId: params.reactionId
                    }
                }
            }, {
                new: true
            })
            // Then return our new data as json
            .then(thoughtData => res.json(thoughtData))
            // Catch any errors
            .catch(err => res.json(err));
    },

    // Update a thought
    updateThought({
        params,
        body
    }, res) {
        // Find the Thought by id
        Thought.findOneAndUpdate({
                    _id: params.id
                },
                body, {
                    new: true,
                    runValidators: true
                }
            )
            .then(updatedThought => {
                // Check if data is valid
                if (!updatedThought) {
                    return res.status(404).json({
                        message: `No thought with id: ${params.id}`
                    });
                }
                // Otherwise return data as json
                res.json(updatedThought);
            })
            // Catch any errors
            .catch(err => res.json(err));
    },

    // Delete a thought by id
    deleteThought({
        params,
        body
    }, res) {
        Thought.findOneAndDelete({
                _id: params.id
            })
            .then(deletedThought => {
                // Validate data
                if (!deletedThought) {
                    return res.status(404).json({
                        message: `No thought with id: ${params.id}`
                    })
                }
                // Otherwise return as json
                res.json(deletedThought);
            })
            // Catch errors
            .catch(err => res.json(err));
    }
};

// Export our Thought Controler
module.exports = thoughtController