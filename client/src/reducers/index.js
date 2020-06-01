import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import quest from './quest';
import questPage from './questPage';
import quests from './quests';

export default combineReducers({
    alert,
    auth,
    quests,
    quest,
    questPage
});