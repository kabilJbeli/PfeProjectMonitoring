import * as React from 'react';
import {ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import User from "./Users";
import {getFocusedRouteNameFromRoute, useIsFocused} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Moment from "moment";
import {useEffect, useState} from "react";
import {Project} from "../models/Project";
import axios from "axios";
import Environment from "../Environment";
import {Props} from "../utils";

const Tab = createMaterialTopTabNavigator();

export const UserTabNavigator = ({navigation}: Props) => {
	return (
		<Tab.Navigator
			initialRouteName="UserManagement"
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {backgroundColor: '#262626', height: 25},
				tabBarInactiveTintColor: '#fff',
				tabBarActiveTintColor: '#fff',
			}}>
			<Tab.Screen
				name="UserManagement"
				component={UserManagement}
				options={({route}) => ({
					tabBarStyle: {
						display: getTabBarVisibility(route),
						backgroundColor: '#3e3d3d',
					},
					tabBarLabel: 'User List',
					tabBarIcon: ({color}) => (
						<Ionicons name="ios-medal-outline" color={color} size={25}/>
					),
				})}
			/>

			<Tab.Screen
				name="AddUser"
				component={User}
				options={({route}) => ({
					tabBarStyle: {
						display: getTabBarVisibility(route),
						backgroundColor: '#3e3d3d',
					},
					tabBarLabel: 'Add User',
					tabBarIcon: ({color}) => (
						<Ionicons name="add" color={color} size={25}/>
					),
				})}
			/>
		</Tab.Navigator>
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

const UserManagement = ({navigation}: Props) => {
	const [users, setUsers] = useState<any[]>([]);

	const [loading, setLoading] = useState(true);
	const isFocused = useIsFocused();

	const FlatListItemSeparator = () => {
		return (
			<View
				style={{
					height: 1,
					width: '100%',
					backgroundColor: 'transparent',
				}}
			/>
		);
	};

	const getUsers = () => {
		useEffect(() => {
			// Update the document title using the browser API
				axios({
					method: 'GET',
					url: `${Environment.API_URL}/api/member/all`,
					headers: {
						'Content-Type': 'application/json',
						useQueryString: false,
					},
					params: {},
				})
					.then(response => {
						console.log(response.data)
						setUsers(response.data);
						setLoading(false);
					})
					.catch((err: any) => {
					});
				setTimeout(() => setLoading(false), 1000);

		}, [loading]);
	};
	getUsers();
	const removeItem = (email: String) => {
		axios({
			method: 'DELETE',
			url: `${Environment.API_URL}/api/keycloak/user/?username=` + email,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then((response: any) => {
				setLoading(true);
				getUsers();
			})
			.catch((err: any) => {
			});
	};
	const updateItem = (projectID: Number) => {
		//	navigation.navigate("AddUser", {id: projectID});
	};

	const getLatestUserInfo = () => {
		if (loading && !isFocused) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#d81e05"/>
				</View>
			);
		} else {
			return (
				<View>
					<FlatList
						keyExtractor={(item, index) => index.toString()}
						data={users}
						ItemSeparatorComponent={FlatListItemSeparator}
						initialNumToRender={users.length}
						renderItem={({item}) => (
							<View style={styles.project}>
								<View>
									<Text style={styles.text}>User Name: {item.name}</Text>

								</View>
								<View>
									<Text style={styles.text}>Last Name: {item.lastName}</Text>
								</View>
								<View>
									<Text style={styles.text}>
										Email: {item.email}
									</Text>
								</View>

								<View style={{
									display: 'flex', width: '100%', justifyContent: 'space-between',
									flexDirection: 'row', paddingBottom: 15

								}}>
									<Text style={styles.text}>
										Telephone: {item.Telephone}
									</Text>

									<Text style={styles.text}>
										Role: {item.role}
									</Text>
								</View>
								<View style={styles.buttonWrapper}>
									<Pressable
										style={[styles.button, styles.delete]}
										onPress={() => {
											removeItem(item.email);
										}}>
										<Text
											style={{
												textAlign: 'center',
												color: '#fff',
												fontWeight: '500',
											}}>
											Remove
										</Text>
									</Pressable>
									<Pressable
										style={[styles.button, styles.borderButton, styles.view]}
										onPress={() => {
											//updateItem(item.userID);
										}}>
										<Text
											style={{
												textAlign: 'center',
												color: '#fff',
												fontWeight: '500',
											}}>
											View
										</Text>
									</Pressable>
								</View>
							</View>
						)}
					/>
				</View>
			);
		}
	};


	return getLatestUserInfo();
};
export default UserManagement;
const styles = StyleSheet.create({
	customMargin: {
		marginTop: 15,
		paddingBottom: 0,
		marginBottom: 0,
	},
	loadingContainer: {
		display: 'flex',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	overlay: {
		backgroundColor: '#fff',
		height: '100%',
		width: '100%',
		position: 'relative',
		top: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 3,
		flex: 1,
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#fff',
		justifyContent: 'space-between',
	},
	project: {
		backgroundColor: '#fff',
		padding: 20,
		paddingBottom: 0,
		paddingRight: 0,
		paddingLeft: 0,
		margin: 15,
		marginTop: 10,
		shadowColor: '#171717',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	text: {
		color: '#000',
		textTransform: 'none',
		width: 'auto',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
	},
	titleWrapper: {
		paddingLeft: 15,
		paddingRight: 15,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',

	},
	title: {
		color: '#000',
		fontSize: 20,
		textTransform: 'none',
		maxWidth: 250,
		overflow: 'hidden',
		height: 30
	},
	footer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15,
		marginBottom: 15,
	},
	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		backgroundColor: '#fff',
		width: '50%',
		padding: 10,
		textAlign: 'center',
	},
	borderButton: {
		borderStyle: 'solid',
		borderLeftColor: '#fff',
		borderWidth: 1,
		borderBottomColor: 'transparent',
		borderTopColor: 'transparent',
		borderRightColor: 'transparent',
	},
	delete: {
		backgroundColor: '#b5483a',
	},
	view: {
		backgroundColor: '#6e6e6e',
	},
	update: {
		backgroundColor: '#3ab56b',
	},
	status: {
		backgroundColor: '#6e6e6e',
		borderRadius: 90,
		//height:15,
		padding: 5,
		paddingLeft: 9,
		paddingRight: 9,
		color: '#fff',
		fontSize: 10,
		textAlign: 'center'
	}
});
