import { MEME_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case MEME_FETCH_SUCCESS:
            return action.payload;

        default:
            return state;
    }
};