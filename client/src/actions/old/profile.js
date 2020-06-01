import axios from 'axios';
import {
    GET_PROFILE,
    GET_PROFILES,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    GET_GITHUB_REPOS
} from '../types';
import { setAlert, ALERT_TYPES } from '../alert'


// Get current users profile

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }

};

export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get('/api/profile')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}


export const getProfileById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${id}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }

}

export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`)
        dispatch({
            type: GET_GITHUB_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}


    



export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? ALERT_TYPES.PROFILE_UPDATED : ALERT_TYPES.PROFILE_CREATED));


        if (!edit) {
            history.push('/dashboard')
        }

    } catch (err) {

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert( {
                ...ALERT_TYPES.VALIDATION_ERROR,
                msg: err.msg
            })));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
        
    }
}



export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(ALERT_TYPES.PROFILE_UPDATED));
        history.push('/dashboard');

    } catch (err) {

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert( {
                ...ALERT_TYPES.VALIDATION_ERROR,
                msg: err.msg
            })));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
        
    }
}


export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(ALERT_TYPES.PROFILE_UPDATED));
        history.push('/dashboard');

    } catch (err) {

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert( {
                ...ALERT_TYPES.VALIDATION_ERROR,
                msg: err.msg
            })));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
        
    }
}

export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(ALERT_TYPES.EXPERIENCE_REMOVED))

    } catch (err) {
        console.log("errpr", err);
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}



export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(ALERT_TYPES.EDUCATION_REMOVED))

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}
