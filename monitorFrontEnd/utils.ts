import {StackNavigationProp} from "@react-navigation/stack";
import {AsyncStorage, ToastAndroid} from "react-native";

type RootStackParamList = {
	Home: undefined, // undefined because you aren't passing any params to the home screen
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
		console.log(error);

	}
};

export const  _retrieveData = async (key:string) => {
	let response ='';
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			// We have data!!
			response = value;
			console.log(value);
		}
	} catch (error) {
		// Error retrieving data
		console.log(error);

	}
	return response;
};
