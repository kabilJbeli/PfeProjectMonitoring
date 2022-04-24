import {getFocusedRouteNameFromRoute, useIsFocused} from "@react-navigation/native";
import {SafeAreaView, Text, View} from "react-native";
import * as React from "react";
import CategoryList from "./CategoryList";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddCategory from "./AddCategory";
import {createStackNavigator} from "@react-navigation/stack";
import ViewTask from "../task/viewTask";
import {TaskTabStatusNavigator} from "../task/Task";
import {updateCategoryComponent} from "./updateCategory";

const categoryTabStatus = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

export const MainCategoryStack = (props: any) => {
	return (
		<Stack.Navigator initialRouteName="Category"

		>
			<Stack.Screen name="Category" component={CategoryTabStatusNavigator}
						  {...props}
						  options={{
							  headerShown: false,
						  }}
			/>
			<Stack.Screen name="updateCategory" component={updateCategoryComponent}
						  {...props}
						  options={{
							  title: 'Update Category',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>
		</Stack.Navigator>
	);
}

export const CategoryTabStatusNavigator = () => {
	return (
		<categoryTabStatus.Navigator
			initialRouteName="Category"
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {backgroundColor: '#262626', height: 25},
				tabBarInactiveTintColor: '#fff',
				tabBarActiveTintColor: '#ffffff',
			}}>
			<categoryTabStatus.Screen
				name="Category"
				component={Category}
				options={({route}) => ({
					tabBarStyle: {
						display: getTabBarVisibility(route),
						backgroundColor: '#3e3d3d',
					},
					tabBarLabel: 'Category List',
					tabBarIcon: ({color}) => (
						<Ionicons name="ios-medal-outline" color={color} size={25}/>
					),
				})}
			/>

			<categoryTabStatus.Screen
				name="AddCategory"
				component={AddCategory}
				options={({route}) => ({
					tabBarStyle: {
						display: getTabBarVisibility(route),
						backgroundColor: '#3e3d3d',
					},
					tabBarLabel: 'Add Category',
					tabBarIcon: ({color}) => (
						<Ionicons name="add" color={color} size={25}/>
					),
				})}
			/>
		</categoryTabStatus.Navigator>
	);
};



const getTabBarVisibility = (route: any) => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

	if (routeName == 'GameDetails') {
		return 'none';
	}
	return 'flex';
};



export const Category = (props: any) => {
	const isFocused = useIsFocused();

	return (
		<SafeAreaView>
			<View>
				<View style={{
					height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
					backgroundColor: '#3a436c',

				}}>
					<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
						Category List</Text>
				</View>
				{isFocused ? <CategoryList   {...props}
				/> : <Text>''</Text>}</View>
		</SafeAreaView>
	);
};
