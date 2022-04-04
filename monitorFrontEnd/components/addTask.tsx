import * as React from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from "react";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';
import axios from "axios";
import Environment from "../Environment";
import {_retrieveData, showToastWithGravity} from "../utils";
import {useNavigation} from "@react-navigation/native";

const AddTask = (props: any) => {
	const defaultTask = {
		task: {
			sprint: null,
			project: null,
			category: null,
			priority: null,
			taskStatus: 'Created',
			assignee: null,
			reporter: null,
			taskTitle: null,
			taskDescription: null,
			CreationDate: new Date(),
			taskDuration: null,
			taskEstimation: null
		}
	};
	const [userInfo, setUserInfo] = useState<any>(null);
	const [task, setTask] = useState<any>(defaultTask);
	const [projects, setProjects] = useState<any[]>([]);
	const [taskType, setTaskType] = useState<any[]>([]);

	const [sprints, setSprints] = useState<any[]>([]);
	const [members, setMembers] = useState<any[]>([]);

	const navigation = useNavigation();

	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			console.log('userInfo Called')
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				getTaskTypes();

				setUserInfo(parsedInfo);
				getUserSpecificProjects(parsedInfo);
			}

		});

	}, [props]);

	const createTask = () => {
		axios
			.post(`${Environment.API_URL}/api/task/add`, task.task)
			.then((res: any) => {
				// @ts-ignore
				navigation.navigate('Task');
				showToastWithGravity('Task Successfully Created');
				setTask(defaultTask);
			}).catch((error: any) => {
			showToastWithGravity('An Error Has Occurred!!!');
			console.error(error);
		});
	}
const cancelTask = ()=>{
	setTask(defaultTask);
	// @ts-ignore
	navigation.navigate('Task');
	showToastWithGravity('Task Creation Canceled');

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

	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#3a436c'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Create Task</Text>
			</View>
			<ScrollView scrollEnabled={true} style={{height: Dimensions.get('window').height-280, backgroundColor: '#fff',paddingBottom:15}}>
				<View style={styles.containerWrapper}>
					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							label={'Project'}
							data={projects}
							onChangeText={(value: any) => setTask((prevState: any) => {
								let task = Object.assign({}, prevState.task);
								task.project = value;
								return {task};
							})}
							value={task.task?.project || null}
						/>
					</View>
					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							label={'Issue Type'}
							data={taskType}
							onChangeText={(value: any) => setTask((prevState: any) => {
								let task = Object.assign({}, prevState.task);
								task.category = value;
								return {task};
							})}
							value={task.task?.category || null}
						/>
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

					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							label={'Priority'}
							data={[
								{label: 'Minor', value: 'Minor'},
								{label: 'Major', value: 'Major'},
								{label: 'Medium', value: 'Medium'},
								{label: 'Critical', value: 'Critical'},
								{label: 'Blocker', value: 'Blocker'},
							]}
							onChangeText={(value: any) => setTask((prevState: any) => {
								let task = Object.assign({}, prevState.task);
								task.priority = value;
								return {task};
							})}
							value={task.task?.priority || null}
						/>
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
						<Text>Estimated Time (eg: 1h, 30m, 1w)</Text>
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
							autoCompleteType={false}
						/>
					</View>
					<View style={{width: '100%'}}>
						<TouchableOpacity
							style={styles.buttonCreate}
							onPress={() => {
								createTask();
							}}>
							<Text
								style={{
									textAlign: 'center',
									color: '#fff',
									fontWeight: '500',
								}}>
								Create
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
export default AddTask;
const styles = StyleSheet.create({
	containerWrapper: {
		padding: 15,
		backgroundColor: "#fff",
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
		marginTop:15
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
