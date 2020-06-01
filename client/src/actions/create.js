import { CREATE_QUEST, CREATE_QUEST_PAGE } from './types'


export const createNewQuest = (questTitle) => async dispatch => {
    try {
        const res = await axios.post(`/api/create`, {title: questTitle});
        console.log("created quest", res.data);
        // API call returns the QuestID of the newly created quest
        dispatch({
            type: CREATE_QUEST,
            payload: res.data
        });
    } catch (e) {
        console.log("error", e)
    }
}


export const addQuestPage = (questId) => async dispatch => {
    try {
        const res = await axios.post(`/api/create/`, {title: questTitle});
        console.log("created quest page", res.data);
        // API call returns the QuestID of the newly created quest
        dispatch({
            type: CREATE_QUEST_PAGE,
            payload: res.data
        });
    } catch (e) {
        console.log("error", e)
    }
}


export const addQuestPageElement = (questId, pageId, element) 