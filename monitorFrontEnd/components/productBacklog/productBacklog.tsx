import {getFocusedRouteNameFromRoute, useIsFocused} from "@react-navigation/native";
import {ActivityIndicator, SafeAreaView, Text, View} from "react-native";
import * as React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import ViewTask from "../task/viewTask";
import {useEffect, useState} from "react";
import {_retrieveData} from "../../utils";
import ProductBacklogList from "./productBacklogList";


const Stack = createStackNavigator();

export const MainProductBacklogStack = (props: any) => {
	return (
		<Stack.Navigator initialRouteName="consultProductBacklog"

		>
			<Stack.Screen name="consultProductBacklog" component={ProductBacklog}
						  {...props}
						  options={{
							  headerShown: false,
						  }}
			/>
			<Stack.Screen name="viewTask" component={ViewTask}
						  {...props}
						  options={{
							  title: 'Consult Task Information',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>
		</Stack.Navigator>
	);
}

export const ProductBacklog = (props: any) => {
	const isFocused = useIsFocused();
	return (
		<SafeAreaView>
			<View>
				{isFocused ? <ProductBacklogList  {...props}/> : <Text>''</Text>}</View>
		</SafeAreaView>
	);
};
