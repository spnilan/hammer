const mongoose = require('mongoose');


const PageElementSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["inputText", "inputTextGroup", 
               "geolocation",
               "arLocation", "arImage", 
               "clock",  "imageScramble", "crossword",
               
               
               "text", "scrollingText", "image", "video" ]
    },
    content: {},
    options: {
        type: Object
    },
    validation: {
        type: Object
    }
    
});


module.exports = PageElement = mongoose.model('pageElement', PageElementSchema);