import {getFocusedRouteNameFromRoute, useIsFocused} from "@react-navigation/native";
import {SafeAreaView, Text, View} from "react-native";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {ViewClientTaskComponent} from "./ViewClientTaskTask";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserManagement from "../user/UserManagement";
import {ClientTaskListComponent} from "./ClientTaskList";
import {useState} from "react";

const taskTabStatus = createMaterialTopTabNavigator();


const Stack = createStackNavigator();

export const ClientTaskStack = (props: any) => {
	return (
		<Stack.Navigator initialRouteName="ClientTaskTabStatusNavigator"

		>
			<Stack.Screen name="ClientTaskTabStatusNavigator" component={ClientTaskTabStatusNavigator}
						  {...props}
						  options={{
							  headerShown: false,
						  }}
			/>
			<Stack.Screen name="viewClientTask" component={ViewClientTaskComponent}
						  {...props}
						  options={{
							  title: 'Consult Client Task Information',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>
		</Stack.Navigator>
	);
}

export const ClientTaskTabStatusNavigator = (props: any) => {
	return (
		<taskTabStatus.Navigator
			initialRouteName="ClientTask"
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {backgroundColor: '#262626', height: 25},
				tabBarInactiveTintColor: '#fff',
				tabBarActiveTintColor: '#ffffff',
			}}>
			<taskTabStatus.Screen
				name="ClientTask"
				component={ClientTaskComponent}
				options={({route}) => ({
					tabBarStyle: {
						display: getTabBarVisibility(route),
						backgroundColor: '#3e3d3d',
					},
					tabBarLabel: 'Clients Task',
					tabBarIcon: ({color}) => (
						<Ionicons name="ios-medal-outline" color={color} size={25}/>
					),
				})}
			/>

		</taskTabStatus.Navigator>
	);
};


const getTabBarVisibility = (route: any) => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

	if (routeName == 'GameDetails') {
		return 'none';
	}
	return 'flex';
};


export const ClientTaskComponent = (props: any) => {
	const isFocused = useIsFocused();
	return (
		<SafeAreaView>

			<View>
				{isFocused ? <ClientTaskListComponent   {...props}
				/> : <Text>''</Text>}
			</View>
		</SafeAreaView>
	);
};
