/*

const EventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true
    },
    eventActions: [
        {
            actionType: {
                type: String,

            }
        }

    ]
})
*/

/*
We're going to need separate event and action schemas eventually

ElementID           EventType       ActionID
image#235426        click           [action12562, action151, action516]


ActionID            ActionType        Element           ElementAction
action12562         ElementChange     textbox#1516      {type: "reveal", delay: "3s"}
action151           ServiceCall       


*/
