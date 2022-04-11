import {getFocusedRouteNameFromRoute, useIsFocused} from "@react-navigation/native";
import {SafeAreaView, Text, View} from "react-native";
import TaskList from "../task/TaskList";
import * as React from "react";
import PriorityList from "./PriorityList";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddPriority from "./addPriority";


const priorityTabStatus = createMaterialTopTabNavigator();


export const PriorityTabStatusNavigator = () => {
	return (
		<priorityTabStatus.Navigator
			initialRouteName="Priority"
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {backgroundColor: '#262626', height: 25},
				tabBarInactiveTintColor: '#fff',
				tabBarActiveTintColor: '#ffffff',
			}}>
			<priorityTabStatus.Screen
				name="Priority"
				component={Priority}
				options={({route}) => ({
					tabBarStyle: {
						display: getTabBarVisibility(route),
						backgroundColor: '#3e3d3d',
					},
					tabBarLabel: 'Priority List',
					tabBarIcon: ({color}) => (
						<Ionicons name="ios-medal-outline" color={color} size={25}/>
					),
				})}
			/>

			<priorityTabStatus.Screen
				name="AddPriority"
				component={AddPriority}
				options={({route}) => ({
					tabBarStyle: {
						display: getTabBarVisibility(route),
						backgroundColor: '#3e3d3d',
					},
					tabBarLabel: 'Add Priority',
					tabBarIcon: ({color}) => (
						<Ionicons name="add" color={color} size={25}/>
					),
				})}
			/>
		</priorityTabStatus.Navigator>
	);
};




const getTabBarVisibility = (route: any) => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
	if (routeName == 'GameDetails') {
		return 'none';
	}
	return 'flex';
};

export const Priority = (props: any) => {
	const isFocused = useIsFocused();

	return (
		<SafeAreaView>
			<View>
				<View style={{
					height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
					backgroundColor: '#3a436c',

				}}>
					<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
						Priorities List</Text>
				</View>
				{isFocused ? <PriorityList   {...props}
				/> : <Text>''</Text>}</View>
		</SafeAreaView>
	);
};
