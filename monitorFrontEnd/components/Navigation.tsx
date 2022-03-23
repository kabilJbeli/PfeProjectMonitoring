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
import IconE from 'react-native-vector-icons/FontAwesome';


import IconS from 'react-native-vector-icons/SimpleLineIcons';

import ProjectStatus from './ProjectStatus';
import { StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

import {
	CategoryStack,
	DashboardStack,
	HomeStatusStack,
	ProjectStack,
	ProjectStatusStack,
	SprintStack,
	TaskStack,
	UserStack,
} from './navigationUtils';

import {_retrieveData, _storeData} from "../utils";
import {useEffect, useState} from "react";


const CustomDrawerContent = (props: any) => {
	const [userInfo, setUserInfo] = useState<any>(null);
	const {state, descriptors, navigation} = props;

	const logOut = () => {
		props.logout(true);
	};

	const retrieveUserInformation = () => {
		useEffect(() => {
			if(userInfo === null){
				_retrieveData('userInfo').then((userInfo: any) => {
					setUserInfo(JSON.parse(userInfo));
				});
			}

		}, [userInfo])
	}

	let lastGroupName = '';
	let newGroup = true;
	retrieveUserInformation();

	return (
		<DrawerContentScrollView
			style={{width: '100%'}} {...props}>
			{/* <DrawerItemList {...props} />*/}
			<View style={styles.profile}>
				<View style={styles.username}><IconE color={'#fff'} size={15} style={{paddingRight: 5}}
													 name={'user-circle-o'}/>
					<Text style={styles.profileText}>{userInfo?.firstName} {userInfo?.lastName}</Text>
				</View>
				<Text style={styles.emailText}>{userInfo?.email}</Text>
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
const Navigation = (props: any) => {
	const logOutOfApp = (val: any) => {
		props.logout(val);
		_storeData('loggedIn', 'false').then(result => {
		});

	};
	return (
		<Drawer.Navigator

			screenOptions={{
				drawerStyle: {
					width: 250,
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
			/>
			<Drawer.Screen
				name={'Category'}
				component={CategoryStack}
				options={{
					drawerLabel: 'Category',
					swipeEnabled: false,
					headerShown: false,
					title: 'project',
					drawerIcon: ({focused, size}) => (
						<Icon name="animation" size={22} color={'#262626'}/>
					),
				}}
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
			/>
			<Drawer.Screen
				name={'ProjectStatus'}
				component={ProjectStatusStack}
				options={{
					headerShown: false,
					title: 'project',
					drawerLabel: 'Project Status',
					swipeEnabled: false,
					drawerIcon: ({focused, size}) => (
						<Icon name="view-list" size={22} color={'#262626'}/>
					),
				}}
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
			/>
			<Drawer.Screen
				name={'Task'}
				component={TaskStack}
				options={{
					drawerLabel: 'Task',
					title: 'sprint',
					swipeEnabled: false,
					headerShown: false,

					drawerIcon: ({focused, size}) => (
						<Icon name="ticket-outline" size={22} color={'#262626'}/>
					),
				}}
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
