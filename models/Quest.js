const mongoose = require('mongoose')

const QuestSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    pages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'questPage'
        }
    ],
    timeLimitMinutes: {
        type: Number,
        default: 240
    },
    reward: {
        type: String
    }
});


module.exports = Quest = mongoose.model('quest', QuestSchema);