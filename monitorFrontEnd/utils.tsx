import {StackNavigationProp} from "@react-navigation/stack";
import {AsyncStorage, Pressable, Text, ToastAndroid, View} from "react-native";
import * as React from "react";

type RootStackParamList = {
	Home: { projectId: Number }, // undefined because you aren't passing any params to the home screen
	Profile: { name: string };
};
type ProfileScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Home'
	>;
export type Props = {
	navigation: ProfileScreenNavigationProp;
};


export const showToastWithGravity = (message: string) => {
	ToastAndroid.showWithGravityAndOffset(
		message,
		ToastAndroid.LONG,
		ToastAndroid.BOTTOM,
		25,
		50
	);
};


export const _storeData = async (key:string,value:string) => {
	try {
		await AsyncStorage.setItem(
			key,
			value
		);
	} catch (error) {
		// Error saving data
		console.error(error);
	}
};

export const  _retrieveData = async (key:string) => {
	let response ='';

	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			// We have data!!
			response = value;
		}
	} catch (error) {
		// Error retrieving data
		console.error(error);
	}
	return response;
};
