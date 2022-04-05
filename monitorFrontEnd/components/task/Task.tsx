import * as React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import AddCategory from "../category/AddCategory";
import Category from "../category/Category";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import AddTask from "./addTask";


const taskTabStatus = createMaterialTopTabNavigator();

export const TaskTabStatusNavigator = () => {
    return (
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
                component={Task}
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
};

const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

    if (routeName == 'GameDetails') {
        return 'none';
    }
    return 'flex';
};

const Task = () => {
  return (
    <SafeAreaView>
        <View style={{
            height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
            backgroundColor: '#3a436c'

        }}>
            <Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
                Task List</Text>
        </View>
      <Text>Task Screen</Text>
    </SafeAreaView>
  );
};
export default Task;
