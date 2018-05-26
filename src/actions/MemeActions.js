import firebase from 'firebase';
import { MEME_FETCH_SUCCESS, MEME_CREATE } from './types';
import { Actions } from 'react-native-router-flux';

export const memesFetch = () => {
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {
        firebase.database().ref(`/users/${ currentUser.uid }/memes`)
        .on( "value",
            snapshot => {
                dispatch({
                    type: MEME_FETCH_SUCCESS,
                    payload: snapshot.val()
                });
            });
    };
};

export const memeCreate = ({ url, id }) => {
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {
        firebase.database().ref(`/users/${ currentUser.uid }/memes`)
        .push({ id, url })
        .then( ()=> {
                dispatch({
                    type: MEME_CREATE
                });
                Actions.memeStack({ type: 'reset' });
            }
        );
    };
};
