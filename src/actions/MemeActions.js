import firebase from 'firebase';
import { MEME_FETCH_SUCCESS } from './types';
import { Actions } from 'react-native-router-flux';

export const memesFetch = () => {
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {
        firebase.database().ref(`/users/${ currentUser.uid }`)
        .on( "value",
            snapshot => {
                dispatch({
                    type: MEME_FETCH_SUCCESS,
                    payload: snapshot.val()
                });
            });
    };
};
