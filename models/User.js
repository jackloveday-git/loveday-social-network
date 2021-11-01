// Model User by Jack Loveday

// Import dependencies
const { Schema, model } = require('mongoose');

// Create a new User Schema
const UserSchema = new Schema({
    username: {
        // Username is a required, unique, string
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        // Email is a required, unique, format matched string
        type: String,
        required: true,
        unique: true,
        trim: true,
        // Implement regex to check for email address, strict format
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'A valid email address is required.']
    },
    thoughts: [{
        // Array of values referencing our Thought Models
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        // Same as above but an array referencing User Models
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Create our User Obj using our Model
const User = model('User', UserSchema);

// Get friend count
UserSchema.virtual('friendCount')
    .get(() => {
        return this.friends.length;
    });


// export the User model
module.exports = User;