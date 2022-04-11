import {getFocusedRouteNameFromRoute, useIsFocused} from "@react-navigation/native";
import {SafeAreaView, Text, View} from "react-native";
import * as React from "react";
import Task from "./TaskList";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import ViewTask from "./viewTask";
import {useEffect, useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {_retrieveData} from "../../utils";
import AddTask from "./addTask";
import TaskList from "./TaskList";




const taskTabStatus = createMaterialTopTabNavigator();


const Stack = createStackNavigator();


export const MainTaskStack = (props: any) => {
	return (
		<Stack.Navigator initialRouteName="taskTab"

		>
			<Stack.Screen name="taskTab" component={TaskTabStatusNavigator}
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

const getTabRoleBasedDisplay =(props:any)=>{

	const [userInfo, setUserInfo] = useState<any>(null);

	let taskTabNavigatorContent:any=(<taskTabStatus.Navigator
		initialRouteName="Task"
		screenOptions={{
			tabBarShowLabel: false,
			tabBarStyle: {backgroundColor: '#262626', height: 25},
			tabBarInactiveTintColor: '#fff',
			tabBarActiveTintColor: '#ffffff',
		}}>
		<taskTabStatus.Screen
			name="Task"
			component={TaskComponent}
			options={({route}) => ({
				tabBarStyle: {
					display: getTabBarVisibility(route),
					backgroundColor: '#3e3d3d',
				},
				tabBarLabel: 'Task List',
				tabBarIcon: ({color}) => (
					<Ionicons name="ios-medal-outline" color={color} size={25}/>
				),
			})}
		/>
	</taskTabStatus.Navigator>);

	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			setUserInfo(JSON.parse(info));
		});
	}, [props]);

	if(userInfo && userInfo.roles.includes('MANAGER') || userInfo &&  userInfo.roles.includes('CLIENT')){
		taskTabNavigatorContent = (
			<taskTabStatus.Navigator
				initialRouteName="Task"
				screenOptions={{
					tabBarShowLabel: false,
					tabBarStyle: {backgroundColor: '#262626', height: 25},
					tabBarInactiveTintColor: '#fff',
					tabBarActiveTintColor: '#ffffff',
				}}>
				<taskTabStatus.Screen
					name="Task"
					component={TaskComponent}
					options={({route}) => ({
						tabBarStyle: {
							display: getTabBarVisibility(route),
							backgroundColor: '#3e3d3d',
						},
						tabBarLabel: 'Task List',
						tabBarIcon: ({color}) => (
							<Ionicons name="ios-medal-outline" color={color} size={25}/>
						),
					})}
				/>

				<taskTabStatus.Screen
					name="AddTask"
					component={AddTask}
					options={({route}) => ({
						tabBarStyle: {
							display: getTabBarVisibility(route),
							backgroundColor: '#3e3d3d',
						},
						tabBarLabel: 'Add Task',
						tabBarIcon: ({color}) => (
							<Ionicons name="add" color={color} size={25}/>
						),
					})}
				/>
			</taskTabStatus.Navigator>
		);
	}


	return taskTabNavigatorContent;
}

export const TaskTabStatusNavigator = (props:any) => {
	return getTabRoleBasedDisplay(props)
};

const getTabBarVisibility = (route: any) => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

	if (routeName == 'GameDetails') {
		return 'none';
	}
	return 'flex';
};

export const TaskComponent = (props: any) => {
	const isFocused = useIsFocused();

	return (
		<SafeAreaView>
			<View>
				<View style={{
					height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
					backgroundColor: '#3a436c',

				}}>
					<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
						Task List</Text>
				</View>
				{isFocused ? <TaskList   {...props}
			/> : <Text>''</Text>}</View>
		</SafeAreaView>
	);
};
