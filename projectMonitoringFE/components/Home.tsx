import * as React from 'react';
import {SafeAreaView, Text, View} from "react-native";
import {StatusBar} from 'expo-status-bar';

const Home =() => {
    return (
        <SafeAreaView>
            <StatusBar/>

            <Text>Hello World</Text>
        </SafeAreaView>
    );
}
export default Home;
