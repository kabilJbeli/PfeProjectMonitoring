import React, {useState} from "react";

import {StyleSheet, Image, KeyboardAvoidingView, Text, TextInput, View, Pressable} from "react-native";
import {Button} from "react-native-elements";
import Images from "../assets/Images";


const Login = (props) => {
    const [user, setUser] = useState({
        user: {
            username: '',
            password: ''
        }
    });

    const [error, setError] = useState(false);

    const onLoginPress = () => {

        if (user.user.username === 'kabil' && user.user.password === 'admin') {
            props.changeSignInStatus(true);
        } else {
            props.changeSignInStatus(false);

            setError(true);
        }
    };
    const renderAuthResponse = () => {
        if (error) {
            return (
                <View><Text style={styles.errorMessage}>The username and password combination is wrong </Text></View>)
        }
    }


    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                        <Image source={Images.logo} resizeMode={'contain'}
                               style={{
                                   width: '100%', height: 120
                               }}
                        />
                    {renderAuthResponse()}
                    <TextInput placeholder="Username" onChangeText={(username) => {
                        setUser(prevState => {
                            let user = Object.assign({}, prevState.user);
                            user.username = username;
                            return {user};
                        })

                    }} style={styles.loginFormTextInput}/>
                    <TextInput placeholder="Password" onChangeText={(password) => {

                        setUser(prevState => {
                            let user = Object.assign({}, prevState.user);
                            user.password = password;
                            return {user};
                        })
                    }} style={styles.loginFormTextInput}
                               secureTextEntry={true}/>
                    <Pressable style={styles.loginButton} onPress={() => onLoginPress()} >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
export default Login;
const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        display:'flex',
        justifyContent:'center',
        alignItems: "center" ,
        height:'100%'
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: "center",
    },
    loginFormView: {
        flex: 1,
        display:'flex',
        height:'100%',
        justifyContent:'center'
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#eaeaea",
        backgroundColor: "#fafafa",
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    loginButton: {
        backgroundColor: "#3897f1",
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        width: 350,
        display:'flex',
        justifyContent:'center',
        alignItems: "center"
    },
    loginButtonText:{
        color:'#fff',
        fontSize:18
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
        fontSize: 12
    }
});
