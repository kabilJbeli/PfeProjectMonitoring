import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProjectsList from './ProjectLists';
import AddProjectComponent from './AddProjectComponent';
import {SafeAreaView} from 'react-navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export const TabNavigator = () => {
  return (
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
            <Ionicons name="ios-medal-outline" color={color} size={25} />
          ),
        })}
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
            <Ionicons name="add" color={color} size={25} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const ProjectComponent = () => {
  const isFocused = useIsFocused();

  return (
    <SafeAreaView>
      <View>{isFocused ? <ProjectsList /> : <Text>''</Text>}</View>
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
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if (routeName == 'GameDetails') {
    return 'none';
  }
  return 'flex';
};
