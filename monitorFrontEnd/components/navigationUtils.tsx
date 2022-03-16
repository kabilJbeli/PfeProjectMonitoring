import {TabNavigator} from './Project';
import ProjectStatus, {ProjecTabStatusNavigator} from './ProjectStatus';
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
export const projectStack = ({navigation}:Props) => {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          title: 'Project Management', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
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

export const projectStatusStack = ({navigation}:Props) => {
  return (
    <Stack.Navigator initialRouteName="projectStatus">
      <Stack.Screen
        name="projectStatus"
        component={ProjecTabStatusNavigator}
        options={{
          title: 'Project Status Management', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
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

export const homeStatusStack = ({navigation}:Props) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
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

export const categoryStack = ({navigation}:Props) => {
  return (
    <Stack.Navigator initialRouteName="Category">
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          title: 'Category', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
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

export const dashboardStack = ({navigation}:Props) => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
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

export const sprintStack = ({navigation}:Props) => {
  return (
    <Stack.Navigator initialRouteName="Sprint">
      <Stack.Screen
        name="Sprint"
        component={Sprint}
        options={{
          title: 'Sprint', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
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

export const taskStack = ({navigation}:Props) => {
  return (
    <Stack.Navigator initialRouteName="Task">
      <Stack.Screen
        name="Task"
        component={Task}
        options={{
          title: 'Task', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
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

export const userStack = ({navigation}:Props) => {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen
        name="User"
        component={User}
        options={{
          title: 'User', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
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
