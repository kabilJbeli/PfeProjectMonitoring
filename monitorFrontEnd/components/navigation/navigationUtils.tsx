import {MainProjectStack, TabNavigator} from '../project/Project';
import ProjectStatus, { ProjectTabStatusNavigator} from '../projectStatus/ProjectStatus';
import Home from '../home/Home';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, TouchableOpacity, View} from 'react-native';
import Category, {CategoryTabStatusNavigator} from '../category/Category';
import Dashboard from '../dashboard/Dashboard';
import Sprint from '../sprint/Sprint';
import Task, {MainTaskStack, TaskTabStatusNavigator} from '../task/Task';
import User from '../user/Users';
import {Props} from "../../utils";
import UserManagement, {UserTabNavigator} from "../user/UserManagement";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import {useNavigation} from '@react-navigation/native';
import ProfileInformation from "../profile/profileInformation";
import {PriorityTabStatusNavigator} from "../priority/priority";

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




export const ProjectStack = ({navigation}: Props,props:any) => {
	return (
		<Stack.Navigator initialRouteName="MainProjectStack">
			<Stack.Screen
				name="MainProjectStack"
				component={MainProjectStack}
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
				{...props}
			/>
		</Stack.Navigator>
	);
};


export const ProjectStatusStack = ({navigation}: Props,props:any) => {
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
				{...props}

			/>
		</Stack.Navigator>
	);
};

export const HomeStatusStack = ({navigation}: Props,props:any) => {
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
				{...props}

			/>
		</Stack.Navigator>
	);
};

export const CategoryStack = ({navigation}: Props,props:any) => {
	return (
		<Stack.Navigator initialRouteName="Category">
			<Stack.Screen
				name="Category"
				component={CategoryTabStatusNavigator}
				options={{
					title: 'Task Category Management', //Set Header Title
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
				{...props}

			/>
		</Stack.Navigator>
	);
};


export const PriorityStack = ({navigation}: Props,props:any) => {
	return (
		<Stack.Navigator initialRouteName="Priority">
			<Stack.Screen
				name="Priority"
				component={PriorityTabStatusNavigator}
				options={{
					title: 'Priority Management', //Set Header Title
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
				{...props}

			/>
		</Stack.Navigator>
	);
};
export const DashboardStack = ({navigation}: Props,props:any) => {
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
				{...props}

			/>
		</Stack.Navigator>
	);
};

export const SprintStack = ({navigation}: Props,props:any) => {
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
				{...props}

			/>
		</Stack.Navigator>
	);
};

export const TaskStack = ({navigation}: any,props:any) => {
	return (
		<Stack.Navigator initialRouteName="Task">
			<Stack.Screen
				name="Task"
				component={MainTaskStack}
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
				{...props}

			/>
		</Stack.Navigator>
	);
};

export const UserStack = ({navigation}: Props,props:any) => {
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
				{...props}

			/>
		</Stack.Navigator>
	);
};



export const ProfileStack = ({navigation}: Props,props:any) => {
	return (
		<Stack.Navigator initialRouteName="ProfileInformation">
			<Stack.Screen
				name="ProfileInformation"
				component={ProfileInformation}
				options={{
					title: 'Profile Information', //Set Header Title
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
				{...props}

			/>
		</Stack.Navigator>
	);
};
