import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import AddProjectStatus from "./addProjectStatus";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import ProjectStatus from "./ProjectStatus";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import AddCategory from "./AddCategory";
import {Props} from "../utils";
import {TabNavigator} from "./Project";

const categoryTabStatus = createMaterialTopTabNavigator();

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
    // console.log(route);
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    // console.log(routeName);

    if (routeName == 'GameDetails') {
        return 'none';
    }
    return 'flex';
};

const Category = () => {
  return (
    <SafeAreaView>
      <Text>Category Screen </Text>
    </SafeAreaView>
  );
};
export default Category;
