import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProjectsList from './ProjectLists';
import AddProjectComponent from './AddProjectComponent';
import {SafeAreaView} from 'react-navigation';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import UpdateProjectScreen from "./updateProject";
import {createStackNavigator} from "@react-navigation/stack";
import ViewProjectInformation from "./viewProjectInformation";
import {_retrieveData} from "../../utils";
import ViewSprint from "../sprint/viewSprint";
import {MainProductBacklogStack, ProductBacklog} from "../productBacklog/productBacklog";

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();


export const MainProjectStack = (props: any) => {
	return (
		<Stack.Navigator initialRouteName="projectTab"

		>
			<Stack.Screen name="projectTab" component={TabNavigator}
						  {...props}
						  options={{
							  headerShown: false,
						  }}
			/>
			<Stack.Screen name="updateProject" component={UpdateProjectScreen}
						  {...props}
						  options={{
							  title: 'Update Project',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>
			<Stack.Screen name="viewProjectInformation" component={ViewProjectInformation}
						  {...props}
						  options={{
							  title: 'Project Information',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>
			<Stack.Screen name="viewSprint" component={ViewSprint}
						  {...props}
						  options={{
							  title: 'Sprint Information',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>
			<Stack.Screen name="consultProductBacklog" component={MainProductBacklogStack}
						  {...props}
						  options={{
							  title: 'Product Backlog Information',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>



		</Stack.Navigator>
	);
}


export const TabNavigator = (props: any) => {
	const [roles, setRoles] = useState<string[]>([]);
	let conditionalTabNavigatorValue = (<View></View>);
	useEffect(() => {


		_retrieveData('userInfo').then((userInfo: any) => {
			setRoles(JSON.parse(userInfo).roles);
		});
	}, [props])
	if (roles.includes('ADMINISTRATOR')) {
		conditionalTabNavigatorValue = (
			<Tab.Navigator
				initialRouteName="projects"
				screenOptions={{
					tabBarShowLabel: false,
					tabBarStyle: {backgroundColor: '#262626', height: 25},
					tabBarInactiveTintColor: '#fff',
					tabBarActiveTintColor: '#fff',
				}}>
				<Tab.Screen
					name="projects"
					component={ProjectComponent}
					options={({route}) => ({
						tabBarStyle: {
							display: getTabBarVisibility(route),
							backgroundColor: '#3e3d3d',
						},
						tabBarLabel: 'Project List',
						tabBarIcon: ({color}) => (
							<Ionicons name="ios-medal-outline" color={color} size={25}/>
						),

					})}
					{...props}

				/>

				<Tab.Screen
					name="addProject"
					component={AddProjectComponent}
					options={({route}) => ({
						tabBarStyle: {
							display: getTabBarVisibility(route),
							backgroundColor: '#3e3d3d',
						},
						tabBarLabel: 'Add Project',
						tabBarIcon: ({color}) => (
							<Ionicons name="add" color={color} size={25}/>
						),
					})}
					{...props}

				/>
			</Tab.Navigator>
		);

	} else {

		conditionalTabNavigatorValue = (
			<Tab.Navigator
				initialRouteName="projects"
				screenOptions={{
					tabBarShowLabel: false,
					tabBarStyle: {backgroundColor: '#262626', height: 25},
					tabBarInactiveTintColor: '#fff',
					tabBarActiveTintColor: '#fff',

				}}>
				<Tab.Screen
					name="projects"
					component={ProjectComponent}
					options={({route}) => ({
						tabBarStyle: {
							display: getTabBarVisibility(route),
							backgroundColor: '#3e3d3d',
						},
						tabBarLabel: 'Project List',
						tabBarIcon: ({color}) => (
							<Ionicons name="ios-medal-outline" color={color} size={25}/>
						),
					})}
					{...props}

				/>

			</Tab.Navigator>
		);
	}
	return conditionalTabNavigatorValue;
};

const ProjectComponent = (props: any) => {
	const isFocused = useIsFocused();

	return (
		<SafeAreaView>

			<View>
				<View style={{
					height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
					backgroundColor: '#00a3cc'

				}}>
					<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
						Project List</Text>
				</View>
				{isFocused ? <ProjectsList   {...props}
				/> : <Text>''</Text>}</View>
		</SafeAreaView>
	);
};
export default ProjectComponent;
const styles = StyleSheet.create({
	containerView: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	loginScreenContainer: {
		flex: 1,
	},
	logoText: {
		fontSize: 40,
		fontWeight: '800',
		marginTop: 150,
		marginBottom: 30,
		textAlign: 'center',
	},
	loginFormView: {
		flex: 1,
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
	},
	loginFormTextInput: {
		height: 43,
		fontSize: 14,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#eaeaea',
		backgroundColor: '#fafafa',
		paddingLeft: 10,
		marginTop: 5,
		marginBottom: 5,
	},
	loginButton: {
		backgroundColor: '#d81e05',
		borderRadius: 0,
		height: 40,
		marginTop: 0,
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginButtonText: {
		color: '#fff',
		fontSize: 18,
	},
});
const getTabBarVisibility = (route: any) => {
	const routeName = getFocusedRouteNameFromRoute(route);

	if (routeName == 'viewProjectInformation') {
		return 'none';
	}
	return 'flex';
};
