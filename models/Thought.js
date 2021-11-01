// Thought Model by Jack Loveday

// Import Dependencies
const moment = require('moment');
const { Schema, model, Types } = require('mongoose');

// Create a new Raction Schema for Users
const ReactionSchema = new Schema({
    reactionId: {
        // Use Mongoose's Object id type
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        // Body is a required, string with a min and max length
        type: String,
        minlength: 1,
        maxlength: 280,
        required: true,
        trim: true
    },
    username: {
        // Username is a required string
        type: String,
        required: true,
    },
    createdAt: {
        // createdAt is a date object for the given reaction
        type: Date,
        default: Date.now,
        // Use Moment to create our object
        get: createdDate => {
            moment(createdDate).format('MMM DD, YYYY [at] hh:mm a');
        }
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
});

// Create a new Thought Schema
const ThoughtSchema = new Schema({
    thoughtText: {
        // Text is a required, string with a min and max length
        type: String,
        minlength: 1,
        maxlength: 280,
        required: true
    },
    createdAt: {
        // Similar to our Reaction 'createdAt'
        type: Date,
        default: Date.now,
        get: (createdDate) => {
            moment(createdDate).format('MMM DD, YYYY [at] hh:mm a');
        }
    },
    username: {
        // Username is a required, string that references User
        type: String,
        required: true,
        ref: 'User'
    },
    // Array of docs from our Reaction Schema
    reactions: [ReactionSchema],
}, {
    toJSON: {
        // Similar to our Reaction Schema but we want to allow virtual data
        virtuals: true,
        getters: true
    },
    id: false
})

// Create our Thought Obj using our Model
const Thought = model('Thought', ThoughtSchema);

// Get Reaction count
ThoughtSchema.virtual('reactionCount')
    .get(() => {
        return this.reactions.length;
    });

// Export the Thought Model
module.exports = Thought;