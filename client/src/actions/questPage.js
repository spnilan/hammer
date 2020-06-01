import axios from "axios"
import { LOAD_USER_QUEST_PAGE, VALIDATE_ELEMENT, COMPLETE_ELEMENT, GET_HINT  } from './types'


export const loadQuestPage = (questId, pageId) => async dispatch => {
    try {
        const res = await axios.get(`/api/quest/${questId}/${pageId}`)

        console.log(res.data);
        dispatch({
            type: LOAD_USER_QUEST_PAGE,
            payload: res.data
        })
    } catch (e) {
        
    }
}


/*
export const showElement = (questId, pageId, elementId) => async dispatch => {
    
    dispatch({
        type: SHOW_ELEMENT,
        payload: elementId
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const formData = {
        elementId : elementId,
        completed: true
    };

    // Update server
    try {        
        await axios.put(`/api/quest/${questId}/${pageId}/`, formData, config);
    } catch (err) {
        console.log(err); 
    }
}

*/

export const completeElement = (questId, pageId, elementId) => async dispatch => {
    
    dispatch({
        type: COMPLETE_ELEMENT,
        payload: elementId
    });
    console.log("got here - complete");

    // Update server
    try {        
        await axios.put(`/api/quest/${questId}/${pageId}/${elementId}/complete`);
    } catch (err) {
        console.log(err); 
    }
}

export const validateElement = (questId, pageId, elementId, value) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const formData = {
        value: value
    }

    try {
        const res = await axios.put(`/api/quest/${questId}/${pageId}/${elementId}/validate`, formData, config)
        // only update the store if the element is validated!!!
        if (res.data.validation && res.data.validation.validated) {
            dispatch({
                type: VALIDATE_ELEMENT,
                payload: {
                    id: res.data.element,
                    validation: res.data.validation
                }
            });
        }
        
        
    } catch (err) {
        console.log(err); 
    }

}



export const getHint = (questId, pageId) => async dispatch => {
    try {
        const res = await axios.get(`/api/quest/${questId}/${pageId}/hint`)
        dispatch({
            type: GET_HINT,
            payload: res.data
        });
    } catch (err) {
        console.log(err); 
    }

}