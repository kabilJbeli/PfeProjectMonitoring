import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
    return (
        <NavigationContainer>
            <Navigation/>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
