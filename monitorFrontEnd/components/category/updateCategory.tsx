import {SafeAreaView, Text, View} from "react-native";
import * as React from "react";

export const updateCategoryComponent = (props: any) => {

	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#3a436c',

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Update Category</Text>
			</View>
			<View>
				<Text>Update Category</Text>
			</View>
		</SafeAreaView>
	);
};
