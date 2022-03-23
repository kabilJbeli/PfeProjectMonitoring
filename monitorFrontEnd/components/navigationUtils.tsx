import {TabNavigator} from './Project';
import ProjectStatus, { ProjectTabStatusNavigator} from './ProjectStatus';
import Home from './Home';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, TouchableOpacity, View} from 'react-native';
import Category from './Category';
import Dashboard from './Dashboard';
import Sprint from './Sprint';
import Task from './Task';
import User from './Users';
import {Props} from "../utils";
import UserManagement, {UserTabNavigator} from "./UserManagement";

const Stack = createStackNavigator();


const NavigationDrawerStructure = (props: any) => {
	//Structure for the navigatin Drawer
	const toggleDrawer = () => {
		//Props to open/close the drawer
		props.navigationProps.toggleDrawer();
	};

	return (
		<View style={{flexDirection: 'row'}}>
			<TouchableOpacity onPress={toggleDrawer}>
				{/*Donute Button Image */}
				<Image
					source={{
						uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
					}}
					style={{width: 25, height: 25, marginLeft: 5}}
				/>
			</TouchableOpacity>
		</View>
	);
};
export const ProjectStack = ({navigation}: Props) => {
	return (
		<Stack.Navigator initialRouteName="TabNavigator">
			<Stack.Screen
				name="TabNavigator"
				component={TabNavigator}
				options={{
					title: 'Project Management', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerStructure navigationProps={navigation}/>
					),
					headerStyle: {
						backgroundColor: '#262626', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

export const ProjectStatusStack = ({navigation}: Props) => {
	return (
		<Stack.Navigator initialRouteName="projectStatus">
			<Stack.Screen
				name="projectStatus"
				component={ProjectTabStatusNavigator}
				options={{
					title: 'Project Status Management', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerStructure navigationProps={navigation}/>
					),
					headerStyle: {
						backgroundColor: '#262626', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

export const HomeStatusStack = ({navigation}: Props) => {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={Home}
				options={{
					title: 'Home', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerStructure navigationProps={navigation}/>
					),
					headerStyle: {
						backgroundColor: '#262626', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

export const CategoryStack = ({navigation}: Props) => {
	return (
		<Stack.Navigator initialRouteName="Category">
			<Stack.Screen
				name="Category"
				component={Category}
				options={{
					title: 'Category Management', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerStructure navigationProps={navigation}/>
					),
					headerStyle: {
						backgroundColor: '#262626', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

export const DashboardStack = ({navigation}: Props) => {
	return (
		<Stack.Navigator initialRouteName="Dashboard">
			<Stack.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					title: 'Dashboard Management', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerStructure navigationProps={navigation}/>
					),
					headerStyle: {
						backgroundColor: '#262626', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

export const SprintStack = ({navigation}: Props) => {
	return (
		<Stack.Navigator initialRouteName="Sprint">
			<Stack.Screen
				name="Sprint"
				component={Sprint}
				options={{
					title: 'Sprint Management', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerStructure navigationProps={navigation}/>
					),
					headerStyle: {
						backgroundColor: '#262626', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

export const TaskStack = ({navigation}: Props) => {
	return (
		<Stack.Navigator initialRouteName="Task">
			<Stack.Screen
				name="Task"
				component={Task}
				options={{
					title: 'Task Management', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerStructure navigationProps={navigation}/>
					),
					headerStyle: {
						backgroundColor: '#262626', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

export const UserStack = ({navigation}: Props) => {
	return (
		<Stack.Navigator initialRouteName="UserManagement">
			<Stack.Screen
				name="UserManagement"
				component={UserTabNavigator}
				options={{
					title: 'User Management', //Set Header Title
					headerLeft: () => (
						<NavigationDrawerStructure navigationProps={navigation}/>
					),
					headerStyle: {
						backgroundColor: '#262626', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
		</Stack.Navigator>
	);
};

