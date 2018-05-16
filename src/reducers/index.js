import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MemeReducer from './MemeReducer';

export default combineReducers({
    auth: AuthReducer,
    meme: MemeReducer
});
