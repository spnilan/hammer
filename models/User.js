const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    quests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userQuest'
        }
    ],
    created: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quest'
        }
    ]

});

module.exports = User = mongoose.model('user', UserSchema);