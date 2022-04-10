import * as React from 'react';
import {
	ActivityIndicator,
	Button,
	Dimensions,
	FlatList,
	Pressable,
	SafeAreaView, ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import AddCategory from "../category/AddCategory";
import Category from "../category/Category";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {getFocusedRouteNameFromRoute, useIsFocused, useNavigation} from "@react-navigation/native";
import AddTask from "./addTask";
import axios from "axios";
import Environment from "../../Environment";
import {useEffect, useState} from "react";
import {_retrieveData, _storeData} from "../../utils";
import {createStackNavigator} from "@react-navigation/stack";
import ViewTask from "./viewTask";


const taskTabStatus = createMaterialTopTabNavigator();


const Stack = createStackNavigator();


export const MainTaskStack = (props: any) => {
	return (
		<Stack.Navigator initialRouteName="taskTab"

		>
			<Stack.Screen name="taskTab" component={TaskTabStatusNavigator}
						  {...props}
						  options={{
							  headerShown: false,
						  }}
			/>
			<Stack.Screen name="viewTask" component={ViewTask}
						  {...props}
						  options={{
							  title: 'Consult Task Information',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>
		</Stack.Navigator>
	);
}

const getTabRoleBasedDisplay =(props:any)=>{

	const [userInfo, setUserInfo] = useState<any>(null);

	let taskTabNavigatorContent:any=(<taskTabStatus.Navigator
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
	</taskTabStatus.Navigator>);

	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			setUserInfo(JSON.parse(info));
		});
	}, [props]);

	if(userInfo && userInfo.roles.includes('MANAGER') || userInfo &&  userInfo.roles.includes('CLIENT')){
		taskTabNavigatorContent = (
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
	}


	return taskTabNavigatorContent;
}

export const TaskTabStatusNavigator = (props:any) => {
	return getTabRoleBasedDisplay(props)
};

const getTabBarVisibility = (route: any) => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

	if (routeName == 'GameDetails') {
		return 'none';
	}
	return 'flex';
};

const Task = (props: any) => {
	const [tasks, setTasks] = useState<any[]>([]);
	const [mainTasks, setMainTasks] = useState<any[]>([]);

	const [currentSelectedStatus, setCurrentSelectedStatus] = useState<string>('All');
	const [loading, setLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<any>(null);
	const navigation = useNavigation();
	const isFocused = useIsFocused();

	const getTasksByReporter = (email: string) => {
		// Update the document title using the browser API
		setLoading(true);

		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/task/getTaskByReporter?email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setTasks(response.data);
				setMainTasks(response.data);
				setLoading(false);
			})
			.catch((err: any) => {
				console.error(err);
			});
	};

	const getTasksByMember = (email: string) => {
		// Update the document title using the browser API
		setLoading(true);

		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/task/getTaskByMember?email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setTasks(response.data);
				setMainTasks(response.data);
				setLoading(false);
			})
			.catch((err: any) => {
				console.error(err);
			});
	};
	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			setUserInfo(JSON.parse(info));
			if (JSON.parse(info).roles.includes('MANAGER')) {
				getTasksByReporter(JSON.parse(info).email);
			} else if (JSON.parse(info).roles.includes('EMPLOYEE')) {
				getTasksByMember(JSON.parse(info).email);
			}
		});
	}, [props]);

	const removeItem = (taskID: Number) => {
		axios({
			method: 'DELETE',
			url: `${Environment.API_URL}/api/task/delete/` + taskID,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then((response: any) => {
				useEffect(() => {
					// getPriorities();
				}, [props]);
			})
			.catch((err: any) => {
			});
	};

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

	const getTaskDisplayStatus = (status: string): string => {

		let returnedStatus: string = '';
		switch (status) {
			case 'ToDo': {
				returnedStatus = 'To Do';
				break;
			}
			case 'InProgress': {
				returnedStatus = 'In Progress';
				break;
			}
			case 'Validating': {
				returnedStatus = 'Validating';
				break;
			}
			case 'Testing': {
				returnedStatus = 'Testing';
				break;
			}
			case 'ReadyForRelease': {
				returnedStatus = 'Ready For Release';
				break;
			}
			case 'Released': {
				returnedStatus = 'Released';
				break;
			}
			case 'Done': {
				returnedStatus = 'Done';
				break;
			}
			default: {
				returnedStatus = 'To Do';
			}

		}

		return returnedStatus;
	}

	const filterTasks = (status: string) => {
		let filteredTasks: any[] = [];
		setCurrentSelectedStatus(status);
		switch (status) {

			case 'ToDo': {
				filteredTasks = mainTasks.filter(item => item.taskStatus === status);
				setTasks(filteredTasks);
				break;
			}
			case 'InProgress': {
				filteredTasks = mainTasks.filter(item => item.taskStatus === status);
				setTasks(filteredTasks);
				break;
			}
			case 'Validating': {
				filteredTasks = mainTasks.filter(item => item.taskStatus === status);
				setTasks(filteredTasks);
				break;
			}
			case 'Testing': {
				filteredTasks = mainTasks.filter(item => item.taskStatus === status);
				setTasks(filteredTasks);
				break;
			}
			case 'ReadyForRelease': {
				filteredTasks = mainTasks.filter(item => item.taskStatus === status);
				setTasks(filteredTasks);
				break;
			}
			case 'Released': {
				filteredTasks = mainTasks.filter(item => item.taskStatus === status);
				setTasks(filteredTasks);
				break;
			}
			case 'Done': {
				filteredTasks = mainTasks.filter(item => item.taskStatus === status);
				setTasks(filteredTasks);
				break;
			}
			case 'All': {
				setTasks(mainTasks);
				break;
			}
			default: {
				setTasks(mainTasks);
			}

		}
	}
	const getLatestTasks = () => {
		if (loading) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#d81e05"/>
				</View>
			);
		} else {
			return (
				<View>
					<View style={{
						height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
						backgroundColor: '#3a436c',

					}}>
						<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
							Task List</Text>
					</View>
					<View style={{padding: 15, paddingBottom: 0}}>
						<ScrollView horizontal={true} style={{paddingBottom: 15, flexDirection: 'row'}}>
							<Pressable
								onPress={() => {
									filterTasks('All')
								}}
								style={[styles.filterPressable, {opacity: currentSelectedStatus === 'All' ? 1 : 0.6}]}>
								<Text style={styles.pressableText}>All</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									filterTasks('ToDo')
								}}
								style={[styles.filterPressable, {opacity: currentSelectedStatus === 'ToDo' ? 1 : 0.6}]}>
								<Text style={styles.pressableText}>To Do</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									filterTasks('InProgress')
								}}
								style={[styles.filterPressable, {opacity: currentSelectedStatus === 'InProgress' ? 1 : 0.6}]}>
								<Text style={styles.pressableText}>In Progress</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									filterTasks('Validating')
								}}
								style={[styles.filterPressable, {opacity: currentSelectedStatus === 'Validating' ? 1 : 0.6}]}>
								<Text style={styles.pressableText}>Validating</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									filterTasks('Testing')
								}}
								style={[styles.filterPressable, {opacity: currentSelectedStatus === 'Testing' ? 1 : 0.6}]}>
								<Text style={styles.pressableText}>Testing</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									filterTasks('ReadyForRelease')
								}}
								style={[styles.filterPressable, {opacity: currentSelectedStatus === 'ReadyForRelease' ? 1 : 0.6}]}>
								<Text style={styles.pressableText}>Ready For Release</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									filterTasks('Released')
								}}
								style={[styles.filterPressable, {opacity: currentSelectedStatus === 'Released' ? 1 : 0.6}]}>
								<Text style={styles.pressableText}>Released</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									filterTasks('Done')
								}}
								style={[styles.filterPressable, {opacity: currentSelectedStatus === 'Done' ? 1 : 0.6}]}>
								<Text style={styles.pressableText}>Done</Text>
							</Pressable>
						</ScrollView>
					</View>
					<FlatList
						style={{height: Dimensions.get('window').height - 350}}
						keyExtractor={(item, index) => index.toString()}
						data={tasks}
						ItemSeparatorComponent={FlatListItemSeparator}
						initialNumToRender={tasks.length}
						renderItem={({item}) => (
							<View style={styles.project}>
								<View style={[
									{
										flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5,
										paddingRight: 15, paddingLeft: 15, alignItems: 'center', height: 'auto'
									}
								]}>
									<Text style={styles.text}>
										{item.project?.projectTitle.toUpperCase().replace(' ', '_') + '-' + item.taskID + ' '}
										({item.priority?.priorityTitle})
									</Text>
									<View
										style={[styles.status, {
											backgroundColor: item.taskStatus === 'ToDo' ? '#f5821e' : item.taskStatus === 'InProgress' ?
												'#00a3cc' : item.taskStatus === 'Validating' ?
													'#c83c1c' : item.taskStatus === 'Testing' ?
														'#001c4b' : item.taskStatus === 'ReadyForRelease' ?
															'#45b1b1' : item.taskStatus === 'Released' ?
																'#23ab96' : '#23ab96'

										}]}>
										<Text style={{
											color: '#fff',
											textAlign: 'center'
										}}>{getTaskDisplayStatus(item.taskStatus)
										}</Text>
									</View>
								</View>
								<View style={{paddingLeft: 15, paddingRight: 15, marginBottom: 5}}>
									<Text style={{
										fontWeight: 'bold'
									}}>Summary: {item.taskTitle}</Text>
								</View>
								<View style={{
									paddingLeft: 15,
									paddingRight: 15,
									marginBottom: 15,
									flexDirection: 'row',
									justifyContent: 'space-between'
								}}>
									<Text style={{
										fontWeight: 'bold'
									}}>Creation Date: {new Date(item.creationDate).toLocaleDateString()}</Text>
									<Text style={{
										fontWeight: 'bold'
									}}>Creation Time: {new Date(item.creationDate).toLocaleTimeString()}</Text>
								</View>
								<View style={styles.buttonWrapper}>

									<Pressable
										style={[styles.button, styles.borderButton, styles.view]}
										onPress={() => {
											_storeData('taskInfo', JSON.stringify(item));
											// @ts-ignore
											navigation.navigate('viewTask');
										}}>
										<Text
											style={{
												textAlign: 'center',
												color: '#fff',
												fontWeight: '500',
											}}>
											View Task
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

	return getLatestTasks();

};
export default Task;

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
		paddingTop: 0
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
		width: '100%',
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
		backgroundColor: '#c8003f',
	},
	view: {
		backgroundColor: '#3b436b',
	},
	update: {
		backgroundColor: '#1f9683',
	},
	status: {
		borderRadius: 90,
		//height:15,
		padding: 5,
		paddingLeft: 9,
		paddingRight: 9,
		color: '#fff',
		fontSize: 10,
		textAlign: 'center',
		minWidth: 100
	},
	filterPressable: {
		backgroundColor: '#00a3cc',
		width: 'auto',
		minWidth: 100,
		padding: 10,
		marginRight: 5
	},
	pressableText: {
		color: '#fff',
		textAlign: 'center'
	}
});
