import * as React from 'react';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
} from '@react-navigation/drawer';

import Home from '../home/Home';
import Category from '../category/CategoryList';
import Dashboard from '../dashboard/Dashboard';
import Project from '../project/Project';
import Sprint from '../sprint/Sprint';
import Task from '../task/TaskList';
import User from '../user/AddUser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/FontAwesome';
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import IconFeather from 'react-native-vector-icons/Feather'

import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

import {
	CategoryStack, ClientTaskStackUtil,
	DashboardStack,
	HomeStatusStack, PriorityStack, ProfileStack,
	ProjectStack,
	SprintStack,
	TaskStack,
	UserStack,
} from './navigationUtils';

import {_retrieveData, _storeData} from "../../utils";
import {useEffect, useState} from "react";


const CustomDrawerContent = (props: any) => {
	const {state, descriptors, navigation} = props;
	const logOut = () => {
		props.logout(true);
	};

	let lastGroupName = '';
	let newGroup = true;


	return (
		<DrawerContentScrollView
			style={{width: '100%'}} {...props}>
			{/* <DrawerItemList {...props} />*/}
			<View style={styles.profile}>
				<View style={styles.username}><IconE color={'#fff'} size={15} style={{paddingRight: 5}}
													 name={'user-circle-o'}/>
					<Text style={styles.profileText}>{props.userInfo?.name}</Text>
				</View>
				<View style={styles.username}>
					<Text style={styles.profileText}>Role: {props.userInfo?.roles.includes('MANAGER') ? 'Manager' :
						props.userInfo?.roles.includes('ADMINISTRATOR') ? 'Administrator' :
							props.userInfo?.roles.includes('CLIENT') ? 'Client' : 'Employee'
					}  </Text>
				</View>
				{/*<Text style={styles.emailText}>{userInfo?.email}</Text>*/}
				<Pressable style={{paddingTop: 5, paddingBottom: 5}}
						   onPress={() => {
							   navigation.navigate('Profile')
						   }}>
					<Text style={{color: '#fff', textDecorationLine: 'underline'}}>Update Profile Information</Text>
				</Pressable>
			</View>
			{state.routes.map((route: any) => {
				const {drawerLabel, activeTintColor, title, drawerIcon} =
					descriptors[route.key].options;
				if (lastGroupName !== title) {
					newGroup = true;
					lastGroupName = title;
				} else {
					newGroup = false;
				}
				return (
					<View key={route.key + 'GroupWrapper'}>
						{newGroup ? (
							<View key={route.key + 'Group'} style={styles.sectionContainer}>

								<Text key={drawerLabel + 'Label'} style={{marginLeft: 16}}>

									{drawerIcon(true, 15)} {'   '} {drawerLabel}
								</Text>
								<View key={route.key + 'GroupView'} style={styles.sectionLine}/>
							</View>
						) : null}
						<DrawerItem
							key={route.key}
							label={({color}) => <Text style={{color}}>{drawerLabel}</Text>}
							focused={
								state.routes.findIndex((e: any) => e.name === route.name) ===
								state.index
							}
							{...props}
							activeTintColor={activeTintColor}
							onPress={() => navigation.navigate(route.name)}
						/>
					</View>
				);
			})}
			<DrawerItem key={'logoutComponent1'} label={'Log Out'} onPress={logOut}
						icon={({focused, color, size}) => (<IconS color={color}
																  size={size} name={'logout'}/>)}
			/>

		</DrawerContentScrollView>
	);
};

const Drawer = createDrawerNavigator();


const getRoleBasedDrawerNavigator = (props: any, userInfo: any): any => {
	let [roles, setRoles] = useState<string[]>([]);


	let returnedData: any = (<View></View>);

	const logOutOfApp = (val: any) => {
		props.logout(val);
		_storeData('loggedIn', 'false').then(result => {
		});
	};

	if (userInfo?.roles.includes('ADMINISTRATOR')) {
		returnedData = (
			<Drawer.Navigator
				screenOptions={{
					drawerStyle: {
						width: 250,
					},
					drawerPosition: 'left',
					drawerType: 'slide',
					drawerInactiveTintColor: '#fff',
					drawerAllowFontScaling: true,
					drawerActiveTintColor: '#999999',
					drawerIcon: () => (
						<IconFeather name="menu" size={24} style={{color: '#fff'}}/>
					),
				}}
				drawerContent={props => (
					<CustomDrawerContent
						{...props}
						logout={(value: any) => logOutOfApp(value)}
						userInfo={userInfo}
						navigation={props.navigation}
					/>
				)}>

				<Drawer.Screen
					name={'Home'}
					component={HomeStatusStack}
					options={{
						drawerLabel: 'Home',
						title: 'home',
						headerShown: false,
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="home" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Dashboard'}
					component={DashboardStack}
					options={{
						drawerLabel: 'Dashboard',
						swipeEnabled: false,
						headerShown: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="view-dashboard" size={22} color={'#262626'}/>
						),
					}}
				/>
				<Drawer.Screen
					name={'Category'}
					component={CategoryStack}
					options={{
						headerShown: false,
						drawerLabel: 'Task Category',
						title: 'task',
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="animation" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Priority'}
					component={PriorityStack}
					options={{
						headerShown: false,
						drawerLabel: 'Priorities',
						title: 'task',
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="animation" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>

				<Drawer.Screen
					name={'Project'}
					component={ProjectStack}
					options={{
						headerShown: false,
						title: 'project',
						drawerLabel: 'Project',
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="view-list" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'User'}
					component={UserStack}
					options={{
						drawerLabel: 'User',
						swipeEnabled: false,
						title: 'user',
						headerShown: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="account" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Profile'}
					component={ProfileStack}
					options={{
						drawerLabel: 'Profile',
						title: 'profile',
						headerShown: false,
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<IconE name="user" size={20} color={'#262626'}/>
						),
					}}
					{...props}
				/>
			</Drawer.Navigator>
		);

	} else if (userInfo?.roles.includes('MANAGER')) {

		returnedData = (
			<Drawer.Navigator
				screenOptions={{
					drawerStyle: {
						width: 250,
					},
					drawerPosition: 'left',
					drawerType: 'slide',
					drawerActiveTintColor: '#999999',

					drawerIcon: () => (
						<IconFeather name="menu" size={24} style={{color: '#fff'}}/>
					),
				}}
				drawerContent={props => (
					<CustomDrawerContent
						{...props}
						logout={(value: any) => logOutOfApp(value)}
						userInfo={userInfo}
						navigation={props.navigation}
					/>
				)}>

				<Drawer.Screen
					name={'Home'}
					component={HomeStatusStack}
					options={{
						drawerLabel: 'Home',
						title: 'home',
						headerShown: false,
						swipeEnabled: false,

						drawerIcon: ({focused, size}) => (
							<Icon name="home" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Dashboard'}
					component={DashboardStack}
					options={{
						drawerLabel: 'Dashboard',
						swipeEnabled: false,
						headerShown: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="view-dashboard" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Project'}
					component={ProjectStack}
					options={{
						headerShown: false,
						title: 'project',
						drawerLabel: 'Project',
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="view-list" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>

				<Drawer.Screen
					name={'Sprint'}
					component={SprintStack}
					options={{
						headerShown: false,
						title: 'sprint',
						drawerLabel: 'Sprint',
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="view-module" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Task'}
					component={TaskStack}
					options={{
						drawerLabel: 'Task',
						title: 'task',
						swipeEnabled: false,
						headerShown: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="ticket-outline" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>

				<Drawer.Screen
					name={'ClientTask'}
					component={ClientTaskStackUtil}
					options={{
						drawerLabel: 'Clients Task',
						title: 'task',
						swipeEnabled: false,
						headerShown: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="ticket-outline" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Profile'}
					component={ProfileStack}
					options={{
						drawerLabel: 'Profile',
						title: 'profile',
						headerShown: false,
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<IconE name="user" size={20} color={'#262626'}/>
						),
					}}
					{...props}
				/>
			</Drawer.Navigator>
		);

	} else if (userInfo?.roles.includes('EMPLOYEE')) {

		returnedData = (
			<Drawer.Navigator
				screenOptions={{
					drawerStyle: {
						width: 250,
					},
					drawerPosition: 'left',
					drawerType: 'slide',
					drawerInactiveTintColor: '#fff',
					drawerAllowFontScaling: true,
					drawerActiveTintColor: '#999999',
					drawerIcon: () => (
						<IconFeather name="menu" size={24} style={{color: '#fff'}}/>
					),
				}}
				drawerContent={props => (
					<CustomDrawerContent
						{...props}
						logout={(value: any) => logOutOfApp(value)}
						userInfo={userInfo}
						navigation={props.navigation}
					/>
				)}>

				<Drawer.Screen
					name={'Home'}
					component={HomeStatusStack}
					options={{
						drawerLabel: 'Home',
						title: 'home',
						headerShown: false,
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="home" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Dashboard'}
					component={DashboardStack}
					options={{
						drawerLabel: 'Dashboard',
						swipeEnabled: false,
						headerShown: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="view-dashboard" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Sprint'}
					component={SprintStack}
					options={{
						headerShown: false,
						title: 'sprint',
						drawerLabel: 'Sprint',
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="view-module" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Task'}
					component={TaskStack}
					options={{
						drawerLabel: 'My Tasks',
						title: 'task',
						swipeEnabled: false,
						headerShown: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="ticket-outline" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Profile'}
					component={ProfileStack}
					options={{
						drawerLabel: 'Profile',
						title: 'profile',
						headerShown: false,
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<IconE name="user" size={20} color={'#262626'}/>
						),
					}}
					{...props}
				/>
			</Drawer.Navigator>
		);

	} else if (userInfo?.roles.includes('CLIENT')) {

		returnedData = (
			<Drawer.Navigator
				screenOptions={{
					drawerStyle: {
						width: 250,
					},
					drawerPosition: 'left',
					drawerType: 'slide',
					drawerInactiveTintColor: '#fff',
					drawerAllowFontScaling: true,
					drawerActiveTintColor: '#999999',
					drawerIcon: () => (
						<IconFeather name="menu" size={24} style={{color: '#fff'}}/>
					),
				}}
				drawerContent={props => (
					<CustomDrawerContent
						{...props}
						logout={(value: any) => logOutOfApp(value)}
						userInfo={userInfo}
						navigation={props.navigation}
					/>
				)}>
				<Drawer.Screen
					name={'Home'}
					component={HomeStatusStack}
					options={{
						drawerLabel: 'Home',
						title: 'home',
						headerShown: false,
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="home" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>

				<Drawer.Screen
					name={'Dashboard'}
					component={DashboardStack}
					options={{
						drawerLabel: 'Dashboard',
						swipeEnabled: false,
						headerShown: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="view-dashboard" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Project'}
					component={ProjectStack}
					options={{
						headerShown: false,
						title: 'project',
						drawerLabel: 'Project',
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="view-list" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Sprint'}
					component={SprintStack}
					options={{
						headerShown: false,
						title: 'sprint',
						drawerLabel: 'Sprint',
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="view-module" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Task'}
					component={TaskStack}
					options={{
						drawerLabel: 'Task',
						title: 'task',
						swipeEnabled: false,
						headerShown: false,
						drawerIcon: ({focused, size}) => (
							<Icon name="ticket-outline" size={22} color={'#262626'}/>
						),
					}}
					{...props}
				/>
				<Drawer.Screen
					name={'Profile'}
					component={ProfileStack}
					options={{
						drawerLabel: 'Profile',
						title: 'profile',
						headerShown: false,
						swipeEnabled: false,
						drawerIcon: ({focused, size}) => (
							<IconE name="user" size={20} color={'#262626'}/>
						),
					}}
					{...props}
				/>
			</Drawer.Navigator>
		);

	}

	useEffect(() => {
		if (userInfo && userInfo.roles !== null) {
			setRoles(userInfo.roles);
		}
	}, []);

	return returnedData;

}

const Navigation = (props: any) => {
	const [userInfo, setUserInfo] = useState<any>(null);
	const retrieveUserInformation = () => {
		useEffect(() => {
			if (userInfo === null) {
				_retrieveData('userInfo').then((userInfo: any) => {
					setUserInfo(JSON.parse(userInfo));
				});
			}
		}, [userInfo])
	}
	retrieveUserInformation();

	return getRoleBasedDrawerNavigator(props, userInfo);
};
export default Navigation;

const styles = StyleSheet.create({
	sectionContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 0,
		paddingTop: 15,
		paddingBottom: 15,
		height: '90%'
	},
	profile: {
		backgroundColor: '#00a99d',
		color: '#fff',
		marginTop: -5,
		padding: 10,
		justifyContent: 'center',
	},
	profileText: {
		color: '#fff',
		fontWeight: 'bold'
	},
	emailText: {
		color: '#fff',
	},
	sectionLine: {
		backgroundColor: 'gray',
		flex: 1,
		height: 1,
		marginLeft: 10,
		marginRight: 20,
	},
	scrollSection: {
		maxHeight: '500',
	},
	username: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	}
});
