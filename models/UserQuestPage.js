const mongoose = require('mongoose')

const UserQuestPageSchema = new mongoose.Schema({
    elements: [
        {
            element: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'pageElement'
            },
            shown: {
                type: Boolean,
                required: true,
                default: false
            },
            completed: {
                type: Boolean,
                required: true,
                default: false
            },
            validation: {}
        }
    ],
    /*
    validations: [
        {
            element: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'pageElement'
            },
            validated: {
                type: Boolean,
                required: true,
                default: false
            },
            value: {}
        }
    ],
    */
   questPage: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'questPage'
   },
    completed: {
        type: Boolean,
        default: false
    },
    timeStarted: {
        type: Date
    },
    timeEnded: {
        type: Date
    },
    mapIcon: {
        type: String,
        required: true
    },
    hint: {
        type: String
    }
});

module.exports = UserQuestPage = mongoose.model('userQuestPage', UserQuestPageSchema);