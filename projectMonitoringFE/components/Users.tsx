import * as React from 'react';
import {SafeAreaView, Text, View} from "react-native";
import {StatusBar} from 'expo-status-bar';

const User =() => {
    return (
        <SafeAreaView>
            <StatusBar/>
            <Text>Hello World</Text>
        </SafeAreaView>
    );
}
export default User;
