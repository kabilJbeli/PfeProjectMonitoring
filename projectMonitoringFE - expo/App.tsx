import {Button, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Navigation from "./components/Navigation";
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import * as React from "react";
import {useState} from "react";
import {StatusBar} from "expo-status-bar";
import {Provider} from "react-redux";
import {Store} from "./redux/Store";
import {authorize as auth} from 'react-native-app-auth';
import {makeRedirectUri, Prompt, ResponseType, useAuthRequest} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import Login from "./components/Login";

WebBrowser.maybeCompleteAuthSession();



const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);


    const getInitialView = (): any => {
        let returnedValue: any;
        if (loggedIn == true) {
            returnedValue = (
                <Provider store={Store}>
                    <NavigationContainer>
                        <StatusBar/>
                        <Navigation/>
                    </NavigationContainer>
                </Provider>
            )
        } else {
            returnedValue = (
                <Provider store={Store}>
                    <StatusBar/>
                    <SafeAreaView style={styles.container}>
                        <Login/>
                    </SafeAreaView>
                </Provider>

            )
        }
        return returnedValue;

    }

    return getInitialView()

}
export default App;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%"
    }, background: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 6},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    }
});
