import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import Home from './Home';
import Category from './Category';
import Dashboard from './Dashboard';
import Project, {TabNavigator} from './Project';
import Sprint from './Sprint';
import Task from './Task';
import User from './Users';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import ProjectStatus from './ProjectStatus';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';

import {
  categoryStack,
  dashboardStack,
  homeStatusStack,
  projectStack,
  projectStatusStack,
  sprintStack,
  taskStack,
  userStack,
} from './navigationUtils';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {_storeData} from "../utils";

const Stack = createStackNavigator();

const CustomDrawerContent = (props: any) => {
  const logOut = () => {
   props.logout(true);

  };
  const {state, descriptors, navigation} = props;
  let lastGroupName = '';
  let newGroup = true;
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} />*/}
      {state.routes.map((route:any) => {
        const {drawerLabel, activeTintColor, title,drawerIcon} =
          descriptors[route.key].options;
        if (lastGroupName !== title) {
          newGroup = true;
          lastGroupName = title;
        } else {
          newGroup = false;
        }
        return (
          <>
            {newGroup ? (
              <View style={styles.sectionContainer} >

                <Text key={drawerLabel} style={{marginLeft: 16}}>

                    {drawerIcon(true,15)} {'   '} {drawerLabel}
                </Text>
                <View style={styles.sectionLine} />
              </View>
            ) : null}
            <DrawerItem
              key={route.key}
              label={({color}) => <Text style={{color}}>{drawerLabel}</Text>}
              focused={
                state.routes.findIndex((e:any) => e.name === route.name) ===
                state.index
              }

              activeTintColor={activeTintColor}
              onPress={() => navigation.navigate(route.name)}
            />
          </>
        );
      })}
      <DrawerItem label={'Log Out'} onPress={logOut}  />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();
const Navigation = (props: any) => {
  const logOutOfApp = (val: any) => {
    props.logout(val);
      _storeData('loggedIn','false').then(result=>{});

  };
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: 200,
        },
        drawerPosition: 'left',
        drawerType: 'slide',
      }}
      drawerContent={props => (
        <CustomDrawerContent
            {...props}
          logout={(value: any) => logOutOfApp(value)}
          navigation={props.navigation}
        />
      )}>
      <Drawer.Screen
        name={'Home'}
        component={homeStatusStack}
        options={{
          drawerLabel: 'Home',
          title: 'home',
          headerShown: false,
          swipeEnabled: false,
          drawerIcon: ({focused, size}) => (
            <Icon name="home" size={22} color={'#262626'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Category'}
        component={categoryStack}
        options={{
          drawerLabel: 'Category',
          swipeEnabled: false,
          headerShown: false,
          title: 'project',
          drawerIcon: ({focused, size}) => (
            <Icon name="animation" size={22} color={'#262626'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Dashboard'}
        component={dashboardStack}
        options={{
          drawerLabel: 'Dashboard',
          swipeEnabled: false,
            headerShown: false,

            drawerIcon: ({focused, size}) => (
            <Icon name="view-dashboard" size={22} color={'#262626'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Project'}
        component={projectStack}
        options={{
          headerShown: false,
          title: 'project',
          drawerLabel: 'Project',
          swipeEnabled: false,
          drawerIcon: ({focused, size}) => (
            <Icon name="view-list" size={22} color={'#262626'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'ProjectStatus'}
        component={projectStatusStack}
        options={{
          headerShown: false,
          title: 'project',
          drawerLabel: 'Project Status',
          swipeEnabled: false,
          drawerIcon: ({focused, size}) => (
            <Icon name="view-list" size={22} color={'#262626'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Sprint'}
        component={sprintStack}
        options={{
          headerShown: false,
          title: 'sprint',
          drawerLabel: 'Sprint',
          swipeEnabled: false,
          drawerIcon: ({focused, size}) => (
            <Icon name="view-module" size={22} color={'#262626'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Task'}
        component={taskStack}
        options={{
          drawerLabel: 'Task',
          title: 'sprint',
          swipeEnabled: false,
          headerShown: false,

          drawerIcon: ({focused, size}) => (
            <Icon name="ticket-outline" size={22} color={'#262626'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'User'}
        component={userStack}
        options={{
          drawerLabel: 'User',
          swipeEnabled: false,
          headerShown: false,

          drawerIcon: ({focused, size}) => (
            <Icon name="account" size={22} color={'#262626'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default Navigation;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionLine: {
    backgroundColor: 'gray',
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 20,
  },
});
