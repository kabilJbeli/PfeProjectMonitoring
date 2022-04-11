import {getFocusedRouteNameFromRoute, useIsFocused} from "@react-navigation/native";
import {SafeAreaView, Text, View} from "react-native";
import * as React from "react";
import UserManagement from "./UserManagement";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Props} from "../../utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import User from "./AddUser";

const Tab = createMaterialTopTabNavigator();

export const UserTabNavigator = ({navigation}: Props) => {
	return (
		<Tab.Navigator
			initialRouteName="UserManagement"
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {backgroundColor: '#262626', height: 25},
				tabBarInactiveTintColor: '#fff',
				tabBarActiveTintColor: '#fff',
			}}>
			<Tab.Screen
				name="UserManagement"
				component={UserComponent}
				options={({route}) => ({
					tabBarStyle: {
						display: getTabBarVisibility(route),
						backgroundColor: '#3e3d3d',
					},
					tabBarLabel: 'User List',
					tabBarIcon: ({color}) => (
						<Ionicons name="ios-medal-outline" color={color} size={25}/>
					),
				})}
			/>

			<Tab.Screen
				name="AddUser"
				component={User}
				options={({route}) => ({
					tabBarStyle: {
						display: getTabBarVisibility(route),
						backgroundColor: '#3e3d3d',
					},
					tabBarLabel: 'Add User',
					tabBarIcon: ({color}) => (
						<Ionicons name="add" color={color} size={25}/>
					),
				})}
			/>
		</Tab.Navigator>
	);
};

const getTabBarVisibility = (route: any) => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

	if (routeName == 'GameDetails') {
		return 'none';
	}
	return 'flex';
};

export const UserComponent = (props: any) => {
	const isFocused = useIsFocused();

	return (
		<SafeAreaView>
			<View>
				<View style={{
					height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
					backgroundColor: '#da1971'

				}}>
					<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
						User List</Text>
				</View>
				{isFocused ? <UserManagement   {...props}
			/> : <Text>''</Text>}</View>
		</SafeAreaView>
	);
};
