import {v4 as uuidv4} from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const ALERT_TYPES = {
    PASSWORDS_DONT_MATCH: {
        alertType: 'danger',
        msg: "Passwords do not match"
    },
    REGISTER_ERROR: {
        alertType: 'danger',
        msg: "Register user error"
    },
    LOGIN_ERROR: {
        alertType: 'danger',
        msg: "Login user error"
    },
    VALIDATION_ERROR: {
        alertType: 'danger',
        msg: "Validation error"
    },
    PROFILE_ERROR: {
        alertType: 'danger',
        msg: 'Profile error'
    },
    PROFILE_UPDATED: {
        alertType: 'success',
        msg: 'Profile successfully updated'
    },
    PROFILE_CREATED: {
        alertType: 'success',
        msg: 'Profile successfully created'
    },
    EXPERIENCE_REMOVED: {
        alertType: 'success',
        msg: 'Experience removed'
    },
    EDUCATION_REMOVED: {
        alertType: 'success',
        msg: 'Education removed'
    },
    ACCOUNT_DELETED: {
        alertType: 'info',
        msg: 'Your account has been permanently deleted'
    },
    POST_DELETED: {
        alertType: 'success',
        msg: 'Your post has been deleted'
    },
    POST_CREATED: {
        alertType: 'success',
        msg: 'Your post has been created'
    },
    COMMENT_ADDED: {
        alertType: 'success',
        msg: 'Your comment has been added'
    },
    COMMENT_REMOVED: {
        alertType: 'success',
        msg: 'Your comment has been removed'
    }
}




export const setAlert = ({ msg, alertType, unique = true, timeout = 3000}) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    })

    if (timeout && timeout > 0) {
        setTimeout(() => dispatch({
            type: REMOVE_ALERT,
            payload: id
        }), timeout);
    }
};