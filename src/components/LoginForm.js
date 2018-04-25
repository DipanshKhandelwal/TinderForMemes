import React , {Component} from 'react';
import { Text } from "react-native";
import { Button, Card, CardSection, Input, Spinner } from './common';
import firebase from 'firebase';

export default class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error:'' , loading: true});
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSucces.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSucces.bind(this))
                    .catch(() => {
                        this.setState({error: 'Authentication Failed !!', loading: false});
                    });
            });
    }

    onLoginSucces() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false,
        });
    }

    renderButton() {
        if(this.state.loading) {
            return <Spinner size='small'/>
        }

        return (
            <Button text="Log in!!" onPress={this.onButtonPress.bind(this)}/>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="something@gmail.com"
                        label="Email"
                        value={ this.state.email }
                        onChangeText={ email => this.setState({ email }) }
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        value={ this.state.password }
                        onChangeText={ password => this.setState({ password }) }
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        color: 'red',
        alignSelf: 'center',
    },
};
