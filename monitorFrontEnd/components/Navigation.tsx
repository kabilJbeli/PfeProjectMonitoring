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
import Project from './Project';
import Sprint from './Sprint';
import Task from './Task';
import User from './Users';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawerContent = (props: any) => {
  const logOut = () => {
    props.logout(true);
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={'Log Out'} onPress={logOut} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();
const Navigation = (props: any) => {
  const logOut = (val: any) => {
    props.logout(val);
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
          logout={(value: any) => logOut(value)}
          {...props}
        />
      )}>
      <Drawer.Screen
        name={'Home'}
        component={Home}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({focused, size}) => (
            <Icon name="home" size={22} color={'#000'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Category'}
        component={Category}
        options={{
          drawerLabel: 'Category',
          drawerIcon: ({focused, size}) => (
            <Icon name="animation" size={22} color={'#000'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Dashboard'}
        component={Dashboard}
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({focused, size}) => (
            <Icon name="view-dashboard" size={22} color={'#000'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Project'}
        component={Project}
        options={{
          drawerLabel: 'Project',
          drawerIcon: ({focused, size}) => (
            <Icon name="view-list" size={22} color={'#000'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Sprint'}
        component={Sprint}
        options={{
          drawerLabel: 'Sprint',
          drawerIcon: ({focused, size}) => (
            <Icon name="view-module" size={22} color={'#000'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Task'}
        component={Task}
        options={{
          drawerLabel: 'Task',
          drawerIcon: ({focused, size}) => (
            <Icon name="ticket-outline" size={22} color={'#000'} />
          ),
        }}
      />
      <Drawer.Screen
        name={'User'}
        component={User}
        options={{
          drawerLabel: 'User',
          drawerIcon: ({focused, size}) => (
            <Icon name="account" size={22} color={'#000'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default Navigation;
