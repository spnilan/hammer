import { LOAD_USER_QUEST_PAGE, SHOW_ELEMENT, ELEMENT_ERROR, 
    CLEAR_USER_QUEST_PAGE, COMPLETE_ELEMENT, VALIDATE_ELEMENT,
    GET_HINT } from '../actions/types'

const initialState = {
    loading: true,
    elements: []
}

let index;

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_USER_QUEST_PAGE:
            let myelems = payload.elements.map(element => ({
                id: element.element._id,
                type: element.element.type,
                shown: element.shown,
                completed: element.completed,
                validation: element.validation,
                content: element.element.content,
                options: element.element.options
            }));

            return {
                id: payload._id,
                elements: myelems,
                timeStarted: payload.timeStarted,
                timeEnded: payload.timeEnded,
                completed: payload.completed,
                hint: payload.hint,
                loading: false
            };
        case CLEAR_USER_QUEST_PAGE:
            return initialState;
        case VALIDATE_ELEMENT:
            index = state.elements.findIndex(element => element.id === payload.id);
            return {
                ...state,
                elements: [
                    ...state.elements.slice(0, index),
                    {
                        ...state.elements[index],
                        validation: payload.validation
                    },
                    ...state.elements.slice(index+1)
                ]
            } 
        case SHOW_ELEMENT:
            index = state.elements.findIndex(element => element.id === payload);
            if (index < state.elements.length){
                return {
                    ...state,
                    elements: [
                        ...state.elements.slice(0, index),
                        {
                            ...state.elements[index],
                            shown: true
                        },
                        ...state.elements.slice(index+1)
                    ]
                } 
            }
            else {
                    return state;
            }
        case COMPLETE_ELEMENT:
            index = state.elements.findIndex(element => element.id === payload);
            if (index + 1 < state.elements.length) {
                return {
                    ...state,
                    elements: [
                        ...state.elements.slice(0, index),
                        {
                            ...state.elements[index],
                            completed: true
                        },
                        {
                            ...state.elements[index + 1],
                            shown: true
                        },
                        ...state.elements.slice(index+2)
                    ]
                }
            } 
            else {
                return {
                    ...state,
                    elements: [
                        ...state.elements.slice(0, index),
                        {
                            ...state.elements[index],
                            completed: true
                        }
                    ]
                }
            }
        case GET_HINT:
            if (payload.id === state.id) {
                return {
                    ...state,
                    hint: payload.hint
                }
            } else {
                return state;
            }
        case ELEMENT_ERROR:
            return state
        default:
            return state;
    }
}