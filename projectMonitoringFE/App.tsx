import {ImageBackground, StyleSheet, View} from 'react-native';
import Navigation from "./components/Navigation";
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import Images from "./assets/Images";
import * as React from "react";
import {StatusBar} from "expo-status-bar";
import Login from "./components/Login";
import {useState} from "react";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const changeSignInStatus = (value: boolean) => {
        setLoggedIn(value);
    }
    const getInitialView = (): any => {
        let returnedValue: any;
        if (loggedIn == true) {
            returnedValue = (
                <NavigationContainer>
                    <StatusBar/>
                    <View style={styles.background}>
                        <ImageBackground resizeMode="stretch" source={Images.project}
                                         style={{
                                             width: '100%', height: 150
                                         }}
                        />
                    </View>
                    <Navigation/>
                </NavigationContainer>
            )
        } else {
            returnedValue = (
                <Login changeSignInStatus={(value) => {
                    changeSignInStatus(value)
                }}/>
            )
        }
        return returnedValue;

    }

    return getInitialView()

}
export default App;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, background: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 6},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    }
});
