import {useIsFocused} from "@react-navigation/native";
import {SafeAreaView, Text, View} from "react-native";
import * as React from "react";

export const ViewClientTaskComponent = (props: any) => {
	const isFocused = useIsFocused();

	return (
		<SafeAreaView>
			<View>
				<Text>Client Tasks</Text>
			</View>
		</SafeAreaView>
	);
};
