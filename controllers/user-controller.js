// User Controller by Jack Loveday

// Import dependencies
const { User } = require('../models')

// Init User Controller
const userController = {
    // Get all Users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            // Return data as json
            .then(userData => res.json(userData))
            // Catch errors
            .catch(err => {
                res.status(500).json(err)
            });
    },

    // Get user by id
    getUserById({
        params
    }, res) {
        User.findOne({
                _id: params.id
            })
            .populate({
                // Populate users thoughts
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                // Populate users friends
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            // Return data as json
            .then(userData => res.json(userData))
            // Catch errors
            .catch(err => {
                res.status(500).json(err)
            });
    },

    // Create a new user
    createUser({
        body
    }, res) {
        User.create(body)
            // Return data as json
            .then(userData => res.json(userData))
            // Catch any errors
            .catch(err => res.status(400).json(err));
    },

    //add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    //update User
    updateUser({
        params,
        body
    }, res) {
        User.findOneAndUpdate({
                _id: params.id
            }, body, {
                new: true,
                runValidators: true
            })
            .then(userData => {
                // Validate data
                if (!userData) {
                    res.status(404).json({
                        message: `No user with id: ${params.id}`
                    });
                    return;
                }
                // Otherwise return as json
                res.json(userData);
            })
            // Catch errors
            .catch(err => res.json(err))
    },

    // Delete a user by id
    deleteUser({
        params
    }, res) {
        User.findOneAndDelete({
                _id: params.id
            })
            .then(userData => {
                // Validate data
                if (!userData) {
                    res.status(404).json({
                        message: `No user with id: ${params.id}`
                    });
                    return;
                }

                // Otherwise return as json
                res.json(userData);
            })
            // Catch errors
            .catch(err => res.status(400).json(err))
    },

    // Remove a friend
    removeFriend({
        params
    }, res) {
        User.findOneAndUpdate({
                _id: params.userId
            }, {
                $pull: {
                    friends: params.friendId
                }
            }, {
                new: true
            })
            // Return data as json
            .then(userData => res.json(userData))
            // Catch errors
            .catch(err => res.json(err));
    }
};

// Export the User Controller
module.exports = userController