import {useIsFocused, useNavigation} from "@react-navigation/native";
import {Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import {_retrieveData, showToastWithGravity} from "../../utils";
import axios from "axios";
import Environment from "../../Environment";
// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';

import {Input} from "react-native-elements";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";

export const ViewClientTaskComponent = (props: any) => {
	const navigation = useNavigation();
	const defaultTask = {
		task: {
			sprint: null,
			project: null,
			category: null,
			priority: null,
			taskStatus: 'ToDo',
			assignee: null,
			reporter: null,
			taskTitle: '',
			taskDuration: null,
			taskDescription: '',
			taskEstimation: null,
			isCreatedByClient: false,
			isClientTaskValidated:false,
			client: null
		}
	};
	const [userInfo, setUserInfo] = useState<any>({});
	const [task, setTask] = useState<any>(defaultTask);
	const [member, setMember] = useState<any>({});
	const [projects, setProjects] = useState<any[]>([]);

	const [taskType, setTaskType] = useState<any[]>([]);

	const [sprints, setSprints] = useState<any[]>([]);
	const [members, setMembers] = useState<any[]>([]);
	const [priorities, setPriorities] = useState<any[]>([]);

	const getMemberInformation = (email: string) => {
		const localMemberData: any[] = [];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/member/getMemberByEmail?email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setMember(response.data);
				setTask((prevState: any) => {
					let task = Object.assign({}, prevState.task);
					task.reporter = response.data;
					return {task};
				});
			})
			.catch((err: any) => {
				console.error('api/member/getMemberByEmail',err);
			});
	}


	const getSprintsByProject = (projectID:number)=>{
		const localSprintData:any[]=[];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/sprint/getCurrentSprintByProject?projectID=${projectID}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				response.data.map((item: any) => {
					localSprintData.push({label: item.sprintTitle, value: item});
				})
				setSprints(localSprintData);
			})
			.catch((err: any) => {
			});

	}

	const getSelectedProjectMembers = (projectId: number) => {
		const localMemberData: any[] = [];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/project/findProjectMembers?projectId=${projectId}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				response.data.map((item: any) => {
					localMemberData.push({label: item.name + ' ' + item.lastName, value: item});
				})
				setMembers(localMemberData);
			})
			.catch((err: any) => {
				console.error('api/member/getMemberByEmail',err);
			});
	}


	const getTaskTypes = () => {
		// Update the document title using the broconwser API
		const localTask: any = [];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/category/all`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				response.data.map((item: any) => {
					localTask.push({
						label: item.categoryTitle, value: item
					})
				})
				setTaskType(localTask);
			})
			.catch((err: any) => {
			});
	};

	const validateTask = () => {
		axios
			.put(`${Environment.API_URL}/api/task/update`, task.task)
			.then((res: any) => {
				// @ts-ignore
				navigation.navigate('ClientTaskTabStatusNavigator');
				showToastWithGravity('Task Successfully Validated');
				setTask(defaultTask);
			}).catch((error: any) => {
			showToastWithGravity('An Error Has Occurred!!!');
			console.error('api/task/update',error);
		});
	}

	const getButtonStatus = (): boolean | undefined => {
			return task.task.project === null || task.task.assignee === null || task.task.priority === null ||
				task.task.taskDescription === null || task.task.taskTitle === null || task.task.taskEstimation === null ||
				task.task.project === '' || task.task.assignee === '' || task.task.priority === '' ||
				task.task.taskDescription === '' || task.task.taskTitle === '' || task.task.taskEstimation === '';
	}


	const getPriorities = () => {
		// Update the document title using the browser API
		const priorityLocal: any[] = [];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/priority/all`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				response.data.map((item: any) => {
					priorityLocal.push({label: item.priorityTitle, value: item})
				})
				setPriorities(priorityLocal);
			})
			.catch((err: any) => {
				console.error('api/priority/all',err);

			});
	};

	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			let parsedInfo = JSON.parse(info)
			getTaskTypes();
			setUserInfo(JSON.parse(info));
			console.log(JSON.parse(info).email);
			getMemberInformation(JSON.parse(info).email);
			getUserSpecificProjects(parsedInfo);

		});
		getPriorities();
		_retrieveData('taskInfo').then((taskInfo: any) => {
			setTask((prevState: any) => {
				let task = Object.assign({}, prevState.task);
				task = JSON.parse(taskInfo);
				task.isClientTaskValidated = true;
				getSprintsByProject(JSON.parse(taskInfo).project.projectID);
				getSelectedProjectMembers(JSON.parse(taskInfo).project.projectID);

				return {task};
			});
		});
	}, [props]);
	const cancelTask = () => {
		// @ts-ignore
		navigation.navigate('ClientTaskTabStatusNavigator');
		showToastWithGravity('Task Validation Canceled');

	}

	const getUserSpecificProjects = (userInfoParam?: any) => {
		// Update the document title using the broconwser API
		const localProject: any = [];
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


	return (
		<SafeAreaView style={{backgroundColor: '#fff', height: '100%'}}>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#3a436c'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Validate Client Task</Text>
			</View>

			<ScrollView scrollEnabled={true} style={{height: Dimensions.get('screen').height - 280, paddingBottom: 15}}>
				<View style={{padding:15,paddingBottom:0}}>
					<Pressable
						style={{width: 80, flexDirection: 'row'}}
						onPress={() => {
							navigation.goBack();
						}}
					><Icon name='arrow-back' size={20} color={'#000'}/>
						<Text style={{paddingLeft: 10, fontWeight: 'bold'}}
						>Go Back</Text>
					</Pressable>
				</View>
				<View style={styles.containerWrapper}>

					<View style={{width: '100%', marginBottom: 15,backgroundColor:'#e7e7e7',padding:15}}>
						<Text style={{fontSize:13,marginBottom:5}}>Project:</Text>
						<Text style={{fontWeight:'bold'}}>{task.task?.project?.projectTitle || ''}</Text>
					</View>
					<View style={{width: '100%', marginBottom: 15,backgroundColor:'#e7e7e7',padding:15}}>
						<Text style={{fontSize:13,marginBottom:5}}>Category:</Text>
						<Text style={{fontWeight:'bold'}}>{task.task?.category?.categoryTitle || ''}</Text>
					</View>
					<View style={{width: '100%'}}>
						<Text>Summary</Text>
						<Input
							leftIcon={<MaterialIcons name="title" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							errorStyle={styles.ErrorStyle}
							onChangeText={(text: string) =>
								setTask((prevState: any) => {
									let task = Object.assign({}, prevState.task);
									task.taskTitle = text;
									return {task};
								})
							}
							value={task.task.taskTitle}
							autoCompleteType={false}
						/>
					</View>

					<View style={{width: '100%', marginBottom: 15,backgroundColor:'#e7e7e7',padding:15}}>
						<Text style={{fontSize:13,marginBottom:5}}>Priority:</Text>
						<Text style={{fontWeight:'bold'}}>{task.task?.priority?.priorityTitle || ''}</Text>
					</View>

					<View style={{width: '100%'}}>
						<Text>Description</Text>
						<Input
							multiline={true}
							leftIcon={<MaterialIcons name="description" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							errorStyle={styles.ErrorStyle}
							onChangeText={(text: string) =>
								setTask((prevState: any) => {
									let task = Object.assign({}, prevState.task);
									task.taskDescription = text;
									return {task};
								})
							}
							value={task.task.taskDescription}
							autoCompleteType={false}
						/>
					</View>

					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							label={'Assignee'}
							disabled={members.length === 0 ? true : false}
							data={members}
							onChangeText={(value: any) => setTask((prevState: any) => {
								let task = Object.assign({}, prevState.task);
								task.assignee = value;
								return {task};
							})}
							value={task.task?.assignee || null}
						/>
					</View>

					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							disabled={sprints.length === 0 ? true : false}
							label={'Sprint (optional)'}
							data={sprints}
							onChangeText={(value: any) => setTask((prevState: any) => {
								let task = Object.assign({}, prevState.task);
								task.sprint = value;
								return {task};
							})}
							value={task.task?.sprint || null}
						/>
					</View>

					<View style={{width: '100%'}}>
						<Text>Estimated Time in hours</Text>
						<Input
							leftIcon={<Ionicons name="time" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							errorStyle={styles.ErrorStyle}
							onChangeText={(text: string) =>
								setTask((prevState: any) => {
									let task = Object.assign({}, prevState.task);
									task.taskEstimation = text;
									return {task};
								})
							}
							value={task.task.taskEstimation}
							keyboardType="numeric"
							autoCompleteType={true}
						/>
					</View>

					<View style={{width: '100%'}}>
						<TouchableOpacity
							style={[styles.buttonCreate, {opacity: getButtonStatus() ? 0.5 : 1}]}

							disabled={getButtonStatus()}
							onPress={() => {
							validateTask();
							}}>
							<Text
								style={{
									textAlign: 'center',
									color: '#fff',
									fontWeight: '500',
								}}>
								Validate Task
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonCancel}
							onPress={() => {
								cancelTask();
							}}>
							<Text
								style={{
									textAlign: 'center',
									color: '#fff',
									fontWeight: '500',
								}}>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>


				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	containerWrapper: {
		padding: 15,
		height: "100%"
	},
	title: {
		fontSize: 22,
	},
	buttonCreate: {
		borderRadius: 0,
		padding: 10,
		elevation: 2,
		backgroundColor: '#1f9683',
	},
	buttonCancel: {
		borderRadius: 0,
		padding: 10,
		elevation: 2,
		backgroundColor: '#c8003f',
		marginTop: 15
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	InputContainerStyle: {
		width: '100%',
		borderStyle: 'solid',
		borderColor: '#000',
		display: 'flex',
		justifyContent: 'center',
	},
	LeftIconContainerStyle: {},
	ErrorStyle: {},
});
