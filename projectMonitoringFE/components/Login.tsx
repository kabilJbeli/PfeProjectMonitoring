import * as React from 'react';
import {Button, Pressable, StyleSheet, Text, TextInput, View} from "react-native";

const signIn = (event:any)=>{
    event.preventDefault();
}
const Login =() => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder={"Username"}/>
            <TextInput style={styles.input}  placeholder={"Password"}/>
            <Pressable  style={styles.button}   onPress={signIn} >
                <Text>Sign In</Text></Pressable>
        </View>
    );
}
export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        width:"100%"
    },
    button:{
        width:"100%",
        backgroundColor: '#000',
        color:'#fff'
    }
});
