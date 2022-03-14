import React, {useState} from 'react';

import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Text} from 'react-native-elements';
import Images from '../assets/Images';
import axios from 'axios';
import Environment from '../Environment';

const Login = (props: any) => {
  const [user, setUser] = useState({
    user: {
      username: '',
      password: '',
    },
  });
  console.log(props);

  const [error, setError] = useState(false);

  const onLoginPress = async () => {
    await axios({
      method: 'GET',
      url: `${Environment.API_URL}/api/member/login/${user.user.password}/${user.user.username}`,
      headers: {
        'Content-Type': 'application/json',
        useQueryString: false,
      },
      params: {},
    })
      .then(response => {
        if (response.data !== '') {
          props.changeSignInStatus(true);
        } else {
          props.changeSignInStatus(false);
          setError(true);
        }
        console.log(response);
      })
      .catch(err => {
        props.changeSignInStatus(false);
        setError(true);
        console.log(err);
      });
  };
  const renderAuthResponse = () => {
    if (error) {
      return (
        <View>
          <Text style={styles.errorMessage}>
            The username and password combination is wrong{' '}
          </Text>
        </View>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      enabled={true}
      style={styles.containerView}
      behavior="padding"
      keyboardVerticalOffset={-300}>
      <View style={styles.loginScreenContainer}>
        <View style={styles.loginFormView}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={Images.logo}
              resizeMode={'contain'}
              style={{
                width: '80%',
                height: 120,
              }}
            />
          </View>
          {renderAuthResponse()}
          <TextInput
            placeholder="Username"
            onChangeText={username => {
              setUser(prevState => {
                console.log(prevState);

                let user: any = Object.assign({}, prevState.user);
                user.username = username;
                return {user};
              });
            }}
            style={styles.loginFormTextInput}
          />
          <TextInput
            placeholder="Password"
            onChangeText={password => {
              setUser(prevState => {
                console.log(prevState);
                let user = Object.assign({}, prevState.user);
                user.password = password;
                return {user};
              });
            }}
            style={styles.loginFormTextInput}
            secureTextEntry={true}
          />
          <Pressable
            style={styles.loginButton}
            onPress={() => {
              onLoginPress();
            }}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Login;
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#d81e05',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  errorMessage: {
    color: 'red',
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 12,
  },
});
