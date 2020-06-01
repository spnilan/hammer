import axios from "axios"
import { LOAD_USER_QUEST, CLEAR_USER_QUEST, LOAD_USER_QUEST_ERROR, DELETE_USER_QUEST, CLEAR_USER_QUEST_PAGE, LOAD_USER_QUESTS } from './types'

export const getQuests = (id) => async dispatch => {
    try {
        
    } catch (e) {
        
    }
}



export const loadQuest = (questId) => async dispatch => {
    dispatch({
        type: CLEAR_USER_QUEST_PAGE
    });
    try {
        const res = await axios.get(`/api/quest/${questId}`);
        console.log("load quest", res.data);

        dispatch({
            type: LOAD_USER_QUEST,
            payload: res.data
        });
    } catch (e) {
        console.log(e.response.data.errors);
        dispatch({
            type: LOAD_USER_QUEST_ERROR
        });
    }
}


export const loadQuests = () => async dispatch => {

    dispatch({
        type: CLEAR_USER_QUEST
    });

    try {
        const res = await axios.get(`/api/quest`);
        console.log("load quests", res.data);

        dispatch({
            type: LOAD_USER_QUESTS,
            payload: res.data
        });
    } catch (e) {
        console.log(e)
    }
}


export const deleteUserQuest = (userQuestId) => async dispatch => {

    try {
        console.log("got here at least")
        const res = await axios.delete(`/api/quest/${userQuestId}`);
        console.log("deleted", res);
        dispatch({
            type: DELETE_USER_QUEST,
            payload: res.data
        });
    } catch (e) {
        console.log(e)
    }



}