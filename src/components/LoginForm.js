import React , {Component} from 'react';
import { Text } from 'react-native';
import { Card, Button, CardSection, Input, Spinner } from './common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return(
            <Button
                text='Login'
                onPress={this.onButtonPress.bind(this)}
            />
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                        placeholder="something@gmail.com"
                        label="Email"
                    />
                </CardSection>
                <CardSection>
                    <Input
                        onChangeText={this.onPasswordChange.bind(this)}
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        value={this.props.password}
                    />
                </CardSection>
                <Text style={ styles.errorTextStyle }>
                    {this.props.error}
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
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStatetoProps = ({ auth }) => {
    const { email, password, error, user, loading } = auth;

    return{ email, password, error, user, loading };
};

export default connect(mapStatetoProps, { emailChanged, passwordChanged, loginUser } )(LoginForm);
