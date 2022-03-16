import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import AddProjectStatus from './addProjectStatus';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const projecTabStatus = createMaterialTopTabNavigator();

export const ProjecTabStatusNavigator = () => {
  return (
    <projecTabStatus.Navigator
      initialRouteName="ProjectStatus"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#262626', height: 25},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#ffffff',
      }}>
      <projecTabStatus.Screen
        name="ProjectStatus"
        component={ProjectStatus}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#3e3d3d',
          },
          tabBarLabel: 'Project Status',
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-medal-outline" color={color} size={25} />
          ),
        })}
      />

      <projecTabStatus.Screen
        name="addProjectStatus"
        component={AddProjectStatus}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#3e3d3d',
          },
          tabBarLabel: 'Add Project Status',
          tabBarIcon: ({color}) => (
            <Ionicons name="add" color={color} size={25} />
          ),
        })}
      />
    </projecTabStatus.Navigator>
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

const ProjectStatus = () => {
  return (
    <SafeAreaView>
      <Text>Project Status Screen</Text>
    </SafeAreaView>
  );
};
export default ProjectStatus;
