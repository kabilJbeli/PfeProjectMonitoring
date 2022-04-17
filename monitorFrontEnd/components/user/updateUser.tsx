import {SafeAreaView, Text, View} from "react-native";
import * as React from "react";

export const updateUserComponent = (props: any) => {

	return (
		<SafeAreaView>
				<View style={{
					height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
					backgroundColor: '#da1971'

				}}>
					<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
						User Information</Text>
				</View>
			<View>
				<Text>Update User</Text>
			</View>
		</SafeAreaView>
	);
};
