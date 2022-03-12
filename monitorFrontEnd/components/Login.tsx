import React, {useState} from 'react';

import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {authorize as auth} from 'react-native-app-auth';
import {Text} from 'react-native-elements';
import Images from '../assets/Images';
import axios from 'axios';
import Environment from '../Environment';

const config = {
  issuer: 'http://localhost:8080/auth',
  clientId: 'monitoringFE',
  realm: 'monitoring',
  clientSecret: '06e85065-5a63-4aec-b65d-d6b480c4cc50',
  redirectUrl: 'http://.0.2.2:8081',
  scopes: ['email', 'offline_access'],
};

const keyckloaks = async (configInfo: any) => {
  return await auth(configInfo)
    .then(val => {
      console.log(val);
    })
    .catch(err => {
      console.log(err);
    });
};
const Login = (props: any) => {
  const [user, setUser] = useState({
    user: {
      username: '',
      password: '',
    },
  });
  console.log(props);

  /*  keyckloaks(config)
    .then((val: any) => {
      console.log(val);
    })
    .catch(err => {
      console.error(err);
    });
*/
  const [error, setError] = useState(false);

  const onLoginPress = () => {
    axios
      .post(
        `${Environment.API_URL}/api/member/login/${user.user.username}/${user.user.password}`,
        {},
      )
      .then((res: any) => {
        console.log(res);
        if (res && res.memberID) {
          props.changeSignInStatus(true);
        } else {
          props.changeSignInStatus(false);
          setError(true);
        }
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
