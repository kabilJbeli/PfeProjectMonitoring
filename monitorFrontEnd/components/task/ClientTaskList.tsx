import {useIsFocused, useNavigation} from "@react-navigation/native";
import {Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {_retrieveData, _storeData} from "../../utils";
import {useEffect, useState} from "react";
import axios from "axios";
import Environment from "../../Environment";
// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';

export const ClientTaskListComponent = (props: any) => {
	const [tasks, setTasks] = useState<any[]>([]);
	const [mainTasks, setMainTasks] = useState<any[]>([]);
	const [userInfo, setUserInfo] = useState<any>(null);
	const [projects, setProjects] = useState<any[]>([]);
	const [state, setState] = useState<string>('ALL');

	const navigation = useNavigation();


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


	const getUserSpecificProjects = (userInfoParam?: any) => {
		// Update the document title using the broconwser API
		const localProject: any = [{
				label: 'ALL', value: {
				projectTitle:'ALL'
			}
		}];
		axios({
			method: 'POST',
			url: `${Environment.API_URL}/api/project/getProjectsByProjectManager?email=${userInfoParam.email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
			data: {}
		})
			.then(response => {

				response.data.map((item: any) => {
					localProject.push({
						label: item.projectTitle, value: item
					})
				})
				setProjects(localProject);
			})
			.catch((err: any) => {
			});
	};


	const getClientTasks = (email: string) => {
		// Update the document title using the browser API

		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/task/getAllPendingTasksCreatedByClient?email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setTasks(response.data);
				setMainTasks(response.data);
			})
			.catch((err: any) => {
				console.error('api/task/getAllPendingTasksCreatedByClient',err);
			});

	}
	const filterTask = (projectTitle: string) => {
		if(projectTitle === 'ALL'){
			setTasks(mainTasks);
			setState(projectTitle.trim());
		}else {
			const filteredTasks = mainTasks.filter(item => item.project.projectTitle === projectTitle);
			setTasks(filteredTasks);
			setState(projectTitle.trim());

		}
	}
	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			setUserInfo(JSON.parse(info));
			getClientTasks(JSON.parse(info).email);
			getUserSpecificProjects(JSON.parse(info))
		});
	}, [props]);

	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#3a436c'
			}}>
				<Text style={{color: '#fff', fontSize: 38, textAlign: 'center'}}>
					Pending Client Task ({state})</Text>
			</View>
			<View style={{width: '100%', marginBottom: 0, padding: 10}}>
				<Dropdown
					style={{width: '100%'}}
					label={'Filter by project'}
					data={projects}
					onChangeText={(value: any) => filterTask(value.projectTitle)}
				/>
			</View>
			<FlatList
				style={{height: Dimensions.get('screen').height - 390}}
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
								}}>Pending</Text>
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
								style={({pressed}) => [{opacity: pressed ? 1 : 0.8}, styles.button, styles.borderButton, styles.view]}
								onPress={() => {
									_storeData('taskInfo', JSON.stringify(item));
									// @ts-ignore
									navigation.navigate('viewClientTask');
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
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	customMargin: {
		marginTop: 15,
		paddingBottom: 0,
		marginBottom: 0,
	},
	loadingContainer: {
		display: 'flex',
		height: Dimensions.get('screen').height - 350,
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
