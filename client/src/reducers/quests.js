import { LOAD_USER_QUESTS, CLEAR_USER_QUESTS, DELETE_USER_QUEST } from '../actions/types'

const initialState = null;

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_USER_QUESTS:
        case DELETE_USER_QUEST:
            return payload;
        case CLEAR_USER_QUESTS:
            return initialState;
        default:
            return state;
    }
}
