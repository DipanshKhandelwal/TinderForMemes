import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import MemeStack from './components/MemeStack'

const RouterComponent = () => {
    return(
        <Router sceneStyle={{ paddingTop: 65 }} >
            <Scene key='auth' initial>
                <Scene
                    initial
                    key='Login'
                    component = {LoginForm}
                    title='Please Login'
                />
            </Scene>

            <Scene key='main'>
                <Scene
                    key='memeStack'
                    component = {MemeStack}
                    title='Memes'
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
