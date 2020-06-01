import { LOAD_USER_QUEST, CLEAR_USER_QUEST, LOAD_USER_QUEST_ERROR } from '../actions/types'

const initialState = {
    loading: true,
    currentStep: 0,
    totalSteps: 0,
    title: "Unknown",
    completed: false,
    hasSeenNewestPage: false,
    pages: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_USER_QUEST:
            return {
                loading: false,
                currentPage: payload.currentPage,
                id: payload._id,
                totalSteps: payload.totalSteps,
                title: payload.title,
                completed: payload.completed,
                hasSeenNewestPage: payload.hasSeenNewestPage,
                timeStarted: payload.timeStarted,
                timeEnded: payload.timeEnded,
                timeLimitMinutes: payload.timeLimitMinutes,
                pages: payload.pages
            };
        case CLEAR_USER_QUEST:
            return initialState;
        case LOAD_USER_QUEST_ERROR:
            return {
                ...initialState,
                loading: false
            }
        default:
            return state;
    }
}

