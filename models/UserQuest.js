const mongoose = require('mongoose');

const UserQuestSchema = new mongoose.Schema({
    quest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quest'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String
    },
    timeLimitMinutes: {
        type: Number
    },
    timeStarted: {
        type: Date
    },
    timeEnded: {
        type: Date
    },
    hasSeenNewestPage: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    currentPage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userQuestPage'
    },
    totalSteps: {
        type: Number,
        default: 0
    },
    // The pages array should ONLY track user input. What differs from the quest model steps 
    pages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userQuestPage'
        }
    ]
});


module.exports = UserQuest = mongoose.model('userQuest', UserQuestSchema);