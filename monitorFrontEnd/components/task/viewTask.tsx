import * as React from 'react';
import {ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {_retrieveData, _storeData, showToastWithGravity} from "../../utils";
import {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';
import axios from "axios";
import Environment from "../../Environment";


const ViewTask = (props: any) => {
	const location = useNavigation();
	const route = useRoute();
	const isFocused = useIsFocused();
	const navigation = useNavigation();
	const [taskInfo, setTaskInfo] = useState<any>({});
	const [members,setMembers]= useState<any[]>([]);
	useEffect(() => {
		_retrieveData('taskInfo').then((task: any) => {
			console.log('retrievedTask', task)
			setTaskInfo(JSON.parse(task));
			getSelectedProjectMembers(JSON.parse(task).project.projectID);
		})
	}, [props]);
	const getTaskTitle = (): any => {
		if (taskInfo !== undefined && taskInfo.taskID) {
			return taskInfo?.project?.projectTitle.toUpperCase().replace(' ', '_') + '-' + taskInfo?.taskID
		} else {
			return (<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#fff"/>
			</View>)
		}

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
			});

	}

	const updateTask = (task:any) => {
console.log(task);
		axios({
			method: 'PUT',
			url: `${Environment.API_URL}/api/task/update`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			data: task,
		})
			.then(response => {
				showToastWithGravity('Task Successfully Updated');
			})
			.catch((err: any) => {
				console.error(err)
				showToastWithGravity('An Error Occurred!!!');
			});
	}

	const getTaskInformation = ():any=>{
		if(taskInfo !== undefined && taskInfo.taskID){
			return (<View style={styles.containerView}>
				<View>
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

				<View style={styles.viewWrapper}>
					<Text style={{
						fontWeight: 'normal'
					}}><Text  style={{
						fontWeight: 'bold'
					}}>Summary:</Text> {taskInfo.taskTitle}</Text>
					<Text style={{
						fontWeight: 'normal'
					}}><Text  style={{
						fontWeight: 'bold'
					}}>Type:</Text> {taskInfo.category?.categoryTitle}</Text>
				</View>
				<View style={styles.viewWrapper}>
					<Text style={{
						fontWeight: 'normal'
					}}><Text  style={{
						fontWeight: 'bold'
					}}>Description:</Text> {taskInfo.taskDescription}</Text>


				</View>
				<View style={styles.viewWrapper}>

					<Text style={{
						fontWeight: 'normal'
					}}><Text  style={{
						fontWeight: 'bold'
					}}>Creation Date:</Text> {new Date(taskInfo.creationDate).toLocaleDateString()}</Text>
					<Text style={{
						fontWeight: 'normal'
					}}><Text  style={{
						fontWeight: 'bold'
					}}>Creation Time:</Text> {new Date(taskInfo.creationDate).toLocaleTimeString()}</Text>
				</View>

				<View style={styles.viewWrapper}>
					<Text style={{
						fontWeight: 'normal'
					}}><Text  style={{
						fontWeight: 'bold'
					}}>Current Status:</Text> {taskInfo.taskStatus}</Text>
					<Text style={{
						fontWeight: 'normal'
					}}><Text  style={{
						fontWeight: 'bold'
					}}>Priority:</Text> {taskInfo?.priority?.priorityTitle}</Text>
				</View>

				<View style={styles.viewWrapper}>
					<Text style={{
						fontWeight: 'normal'
					}}><Text  style={{
						fontWeight: 'bold'
					}}>Reporter:</Text> {taskInfo?.reporter?.name+' '+taskInfo?.reporter?.lastName}</Text>
					<Text style={{
						fontWeight: 'normal'
					}}><Text  style={{
						fontWeight: 'bold'
					}}>Assignee:</Text> {taskInfo?.assignee?.name+' '+taskInfo?.assignee?.lastName}</Text>
				</View>
				<View style={styles.viewWrapper}>

					<Text style={{
						fontWeight: 'normal'
					}}><Text  style={{
						fontWeight: 'bold'
					}}>Project:</Text> {taskInfo?.project?.projectTitle}</Text>

					<Text style={{
						fontWeight: 'normal'
					}}><Text  style={{
						fontWeight: 'bold'
					}}>Estimated Time:</Text> {taskInfo?.taskEstimation}/H</Text>

				</View>
				<View style={styles.viewWrapper}>
					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							label={'Re-assign the task'}
							disabled={members.length === 0 ? true : false}
							data={members}
							onChangeText={(value: any) => setTaskInfo((prevState: any) => {
								let taskInfo = Object.assign({}, prevState);
								taskInfo.assignee = value;
								updateTask(taskInfo);
								return taskInfo;
							})}
						/>

					</View>
				</View>
			</View>)
		}else {
			return (<View style={{justifyContent:'center',marginTop:15}}>
				<ActivityIndicator size="large" color="#3a436c"/>
			</View>)
		}

	}
	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#3a436c',

			}}>
				<Text style={{color: '#fff', fontSize: 28, textAlign: 'center'}}>
					{getTaskTitle()}
				</Text>
			</View>
			{getTaskInformation()}
		</SafeAreaView>
	);
};
export default ViewTask;
const styles = StyleSheet.create({
	containerView: {
		padding: 15
	},
	loadingContainer: {
		display: 'flex',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	viewWrapper:{
		marginTop:15,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})
