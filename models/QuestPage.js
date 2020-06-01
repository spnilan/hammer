const mongoose = require('mongoose')


const QuestPageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    questId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quest'
    },
    timeForHintMinutes: {
        type: Number,
        default: 30
    },
    mapIcon: {
        type: String,
        default: "images/icons/soccerball.png"
    },
    elements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pageElement'
        }
    ],
    hint: {
        type: String,
        default: ""
    }
});


module.exports = QuestPage = mongoose.model('questPage', QuestPageSchema);