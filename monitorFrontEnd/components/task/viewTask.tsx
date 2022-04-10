import * as React from 'react';
import {ActivityIndicator, Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {_retrieveData, _storeData, showToastWithGravity} from "../../utils";
import {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from 'react-native-animatable';

// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';
import axios from "axios";
import Environment from "../../Environment";
import {Input, Switch} from "react-native-elements";


const ViewTask = (props: any) => {
	const location = useNavigation();
	const route = useRoute();
	const isFocused = useIsFocused();
	const navigation = useNavigation();
	const [userInfo, setUserInfo] = useState<any>({});
	const [taskInfo, setTaskInfo] = useState<any>({});
	const [members, setMembers] = useState<any[]>([]);
	const [member, setMember] = useState<any>({});
	const [comment, setComment] = useState<string>('');
	const defaultCommentState = {
		taskComment: {
			comment: null,
			commentedBy: null,
			task: null
		}
	}
	const [taskComment, setTaskComment] = useState<any>(defaultCommentState);
	const [state, setState] = useState<any>({
		activeSections: [],
	});

	const [loggedInTime, setLoggedIntTime] = useState<any>({
		loggedInTime: {
			durationType: null,
			duration: null,
			task: null
		}
	});

	const [loggedInTimeByValue, setLoggedInTimeByValue] = useState({
		loggedInTime: [
			{
				label: 'Week',
				value: 'Week'
			},
			{
				label: 'Days',
				value: 'Day'
			},
			{
				label: 'Hour',
				value: 'Hour'
			},
			{
				label: 'Minute',
				value: 'Minute'
			},
		]
	});


	useEffect(() => {
		_retrieveData('taskInfo').then((task: any) => {
			setTaskInfo(JSON.parse(task));
			getSelectedProjectMembers(JSON.parse(task).project.projectID);
			setLoggedIntTime({
				loggedInTime: {
					durationType: loggedInTime.loggedInTime.durationType,
					duration: loggedInTime.loggedInTime.duration,
					task: JSON.parse(task)
				}
			});
		})

		_retrieveData('userInfo').then((info: any) => {
			setUserInfo(JSON.parse(info));
			getMemberInformation(JSON.parse(info).email);
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
			})
			.catch((err: any) => {
				console.error(err);
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
			});

	}

	const updateTask = (task: any) => {
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


	const getTaskInformationWs = (task: any) => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/task/${task.taskID}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
		})
			.then(response => {
				_storeData('taskInfo', JSON.stringify(response.data)).then();
				setTaskInfo(response.data);
				setLoggedIntTime({
					loggedInTime: {
						durationType: loggedInTime.loggedInTime.durationType,
						duration: loggedInTime.loggedInTime.duration,
						task: response.data
					}
				});
				getSelectedProjectMembers(response.data.project.projectID);
			})
			.catch((err: any) => {
				console.error(err)
				showToastWithGravity('An Error Occurred!!!');
			});
	}

	const _renderSectionTitle = (section: any) => {
		return (
			<View style={styles.content}>
				<Text>{section.content}</Text>
			</View>
		);
	};

	const _renderHeader = (section: any, index: number, isActive: boolean, sections: any) => {
		return (<Animatable.View
			duration={300}
			transition="backgroundColor"
			style={[
				styles.header
				, {
					backgroundColor: (isActive ? '#3b436b' : '#3b436b'),
					marginBottom: (isActive ? 0 : 15)
				}]}>
			<View style={styles.headerTextWrapper}>
				<Text style={[styles.headerText, {color: (isActive ? '#fff' : '#fff')}]}>
					Written by: {section.commentedBy?.email}</Text>
				<Text style={[styles.headerText, {color: (isActive ? '#fff' : '#fff')}]}>{

					new Date(section.creationDate).toLocaleDateString() + ' ' + new Date(section.creationDate).toLocaleTimeString()

				}</Text>
			</View>
		</Animatable.View>);
	};

	const _renderContent = (section: any, i: number, isActive: boolean, sections: any) => {
		return (
			<Animatable.View
				duration={300}
				transition="backgroundColor"

				style={[
					styles.content
					, {backgroundColor: (isActive ? '#f6f8fa' : '#f6f8fa')}]}>
				<Animatable.Text
					duration={300}
					easing="ease-in-out"
					animation={isActive ? 'zoomIn' : 'zoomOut'}>
					{section.comment}
				</Animatable.Text>
			</Animatable.View>
		);
	};

	const _updateSections = (activeSections: any) => {
		setState({activeSections});
	};


	const getCommentSection = () => {

		return (
			<Accordion
				sections={taskInfo?.taskComment}
				activeSections={state.activeSections}
				renderHeader={_renderHeader}
				renderContent={_renderContent}
				onChange={_updateSections}
			/>
		)
	}

	const addComment = () => {
		const newTaskCommentValue = {
			taskComment: {
				task: taskInfo,
				commentedBy: member,
				comment: comment
			}
		}
		setTaskComment(newTaskCommentValue);
		axios({
			method: 'POST',
			url: `${Environment.API_URL}/api/taskComment/add`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			data: newTaskCommentValue.taskComment,
		})
			.then(response => {
				getTaskInformationWs(taskInfo);
				setLoggedIntTime({
					loggedInTime: {
						durationType: loggedInTime.loggedInTime.durationType,
						duration: loggedInTime.loggedInTime.duration,
						task: taskInfo
					}
				});

				setComment('');

			})
			.catch((err: any) => {
				console.error(err);
				showToastWithGravity('An Error Occurred!!!');

			});
	}


	const getFunctionalityByRole = (taskInfo: any): any => {
		let returnedFunctionalityValue: any = (<View></View>);

		if (userInfo && userInfo.roles && userInfo.roles.includes('MANAGER')) {
			returnedFunctionalityValue = (<Dropdown
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
			/>);
		} else if (userInfo && userInfo.roles && userInfo.roles.includes('EMPLOYEE')) {
			returnedFunctionalityValue = getDisplayButtonOfChangeTaskStatus(taskInfo);
		}

		return returnedFunctionalityValue;
	}

	const loggedIn = (props: any): any => {
		let returnedValue: any = (<View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
			<View style={{width: '33%'}}>
				<Text style={{marginTop: -20}}>Logged In Time</Text>
				<Input
					style={{minHeight: 30, height: 52, fontSize: 18, lineHeight: 1}}

					autoCompleteType={false}
					keyboardType="numeric"
					onChangeText={(value: any) => setLoggedIntTime((prevState: any) => {
						let loggedInTime = Object.assign({}, prevState.loggedInTime);
						loggedInTime.duration = value
						return {loggedInTime};
					})}
				/>
			</View>
			<View style={{width: '33%'}}>
				<Dropdown
					style={{minHeight: 35, height: 52}}

					label={'Logged In Time'}
					data={loggedInTimeByValue.loggedInTime}
					onChangeText={(value: any) => setLoggedIntTime((prevState: any) => {
						let loggedInTime = Object.assign({}, prevState.loggedInTime);
						loggedInTime.durationType = parseInt(value);
						return {loggedInTime};
					})}
					value={loggedInTime.loggedInTime.durationType}

				/>

			</View>
			<View style={{width: '25%'}}>
				<Pressable
					disabled={loggedInTime.loggedInTime.duration === null || loggedInTime.loggedInTime.durationType === null

					}
					style={[styles.button, {height: 52, alignItems: 'center', justifyContent: "center"}]}
					onPress={() => {
						setLogInTime()
					}}>
					<Text style={{color: '#fff', textAlign: 'center'}}>Log in duration</Text>
				</Pressable>
			</View>
		</View>);


		return returnedValue;
	}
	const setLogInTime = () => {
		axios({
			method: 'POST',
			url: `${Environment.API_URL}/api/taskDuration/add`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			data: loggedInTime.loggedInTime
		})
			.then(response => {
				_storeData('taskInfo', JSON.stringify(response.data)).then();

				getTaskInformationWs(taskInfo);
				showToastWithGravity('Log In Duration Successfully');
			})
			.catch((err: any) => {
				console.error(err)
				showToastWithGravity('An Error Occurred!!!');
			});
	}

	const changeTaskStatus = (taskStatus: String, taskID: number): void => {
		axios({
			method: 'PUT',
			url: `${Environment.API_URL}/api/task/changeTaskStatus?id=${taskID}&status=${taskStatus}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			data: {}
		})
			.then(response => {
				_storeData('taskInfo', JSON.stringify(response.data)).then();
				setTaskInfo(response.data);
				setLoggedIntTime({
					loggedInTime: {
						durationType: loggedInTime.loggedInTime.durationType,
						duration: loggedInTime.loggedInTime.duration,
						task: response.data
					}
				});
				getSelectedProjectMembers(response.data.project.projectID);
				showToastWithGravity('Status Successfully Updated');
			})
			.catch((err: any) => {
				console.error(err)
				showToastWithGravity('An Error Occurred!!!');
			});
	}

	const getDisplayButtonOfChangeTaskStatus = (taskInformation: any): any => {
		let returnedValue: any = (<View></View>);
		switch (taskInformation.taskStatus) {
			case "ToDo" : {
				returnedValue = (<Pressable style={styles.button} onPress={() => {
					changeTaskStatus('InProgress', taskInfo.taskID);
				}}>
					<Text style={{color: '#fff', textAlign: 'center'}}>
						Start Progress
					</Text>
				</Pressable>);
				break;
			}
			case 'InProgress' : {
				returnedValue = (<Pressable style={styles.button} onPress={() => {
					changeTaskStatus('Validating', taskInfo.taskID);

				}}>
					<Text style={{color: '#fff', textAlign: 'center'}}>
						Ask For Validation
					</Text>
				</Pressable>);
				break;
			}
			case 'Validating' : {
				returnedValue = (<Pressable style={styles.button} onPress={() => {
					changeTaskStatus('Testing', taskInfo.taskID);

				}}>
					<Text style={{color: '#fff', textAlign: 'center'}}>
						Ask For Test
					</Text>
				</Pressable>);
				break;
			}
			case 'Testing' : {
				returnedValue = (<Pressable style={styles.button} onPress={() => {
					changeTaskStatus('ReadyForRelease', taskInfo.taskID);

				}}>
					<Text style={{color: '#fff', textAlign: 'center'}}>
						Ready For Release
					</Text>
				</Pressable>);
				break;
			}
			case 'ReadyForRelease' : {
				returnedValue = (<Pressable style={styles.button} onPress={() => {
					changeTaskStatus('Released', taskInfo.taskID);

				}}>
					<Text style={{color: '#fff', textAlign: 'center'}}>
						Set As Released
					</Text>
				</Pressable>);
				break;
			}
			case 'Released' : {
				returnedValue = (<Pressable style={styles.button} onPress={() => {
					changeTaskStatus('Done', taskInfo.taskID);
				}}>
					<Text style={{color: '#fff', textAlign: 'center'}}>
						Set As Done
					</Text>
				</Pressable>);
				break;
			}
			case 'Done' : {
				returnedValue = (<View></View>);
				break;
			}
		}
		return returnedValue;
	}

	const getTaskInformation = (): any => {
		if (taskInfo !== undefined && taskInfo.taskID) {
			return (<ScrollView style={[styles.containerView, {height: Dimensions.get('screen').height - 200}]}>
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
					}}><Text style={{
						fontWeight: 'bold'
					}}>Summary:</Text> {taskInfo.taskTitle}</Text>
					<Text style={{
						fontWeight: 'normal'
					}}><Text style={{
						fontWeight: 'bold'
					}}>Type:</Text> {taskInfo.category?.categoryTitle}</Text>
				</View>

				<View style={styles.viewWrapper}>
					<Text style={{
						fontWeight: 'normal',
					}}><Text style={{
						fontWeight: 'bold'
					}}>Description:</Text> {taskInfo.taskDescription}</Text>
				</View>

				<View style={styles.viewWrapper}>

					<Text style={{
						fontWeight: 'normal'
					}}><Text style={{
						fontWeight: 'bold'
					}}>Creation Date:</Text> {new Date(taskInfo.creationDate).toLocaleDateString()}</Text>
					<Text style={{
						fontWeight: 'normal'
					}}><Text style={{
						fontWeight: 'bold'
					}}>Creation Time:</Text> {new Date(taskInfo.creationDate).toLocaleTimeString()}</Text>
				</View>

				<View style={styles.viewWrapper}>
					<Text style={{
						fontWeight: 'normal'
					}}><Text style={{
						fontWeight: 'bold'
					}}>Current Status:</Text> {taskInfo.taskStatus}</Text>
					<Text style={{
						fontWeight: 'normal'
					}}><Text style={{
						fontWeight: 'bold'
					}}>Priority:</Text> {taskInfo?.priority?.priorityTitle}</Text>
				</View>

				<View style={styles.viewWrapper}>
					<Text style={{
						fontWeight: 'normal'
					}}><Text style={{
						fontWeight: 'bold'
					}}>Reporter:</Text> {taskInfo?.reporter?.name + ' ' + taskInfo?.reporter?.lastName}</Text>
					<Text style={{
						fontWeight: 'normal'
					}}><Text style={{
						fontWeight: 'bold'
					}}>Assignee:</Text> {taskInfo?.assignee?.name + ' ' + taskInfo?.assignee?.lastName}</Text>
				</View>

				<View style={styles.viewWrapper}>
					<Text style={{
						fontWeight: 'normal'
					}}><Text style={{
						fontWeight: 'bold'
					}}>Project:</Text> {taskInfo?.project?.projectTitle}</Text>

					<Text style={{
						fontWeight: 'normal'
					}}><Text style={{
						fontWeight: 'bold'
					}}>Estimated Time:</Text> {taskInfo?.taskEstimation}/H</Text>
				</View>

				<View style={styles.viewWrapper}>

				</View>
				<View style={styles.viewWrapper}>
					<View style={{width: '100%', marginBottom: 15}}>
						{getFunctionalityByRole(taskInfo)}
					</View>
				</View>


				<View style={styles.viewWrapper}>
					<View style={{width: '100%', marginBottom: 15}}>
						{loggedIn(props)}
					</View>
				</View>
				<View>
					<Text style={{
						fontWeight: 'bold',
						marginBottom: 15
					}}>Comments:</Text>
					{getCommentSection()}
				</View>

				<View style={{backgroundColor: '#fff'}}>
					<Input autoCompleteType={false}
						   style={{marginBottom: 0}}
						   containerStyle={{height: 65}}
						   inputContainerStyle={{borderBottomWidth: 0}}
						   multiline={true}
						   onChangeText={(text: string) => setComment(text)
						   }
						   value={comment}
					/>
					<Pressable
						disabled={comment.trim() === ''}
						onPress={() => {
							addComment()
						}} style={{backgroundColor: '#57606a', padding: 15, paddingBottom: 8, paddingTop: 8}}>
						<Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
							Add New Comment
						</Text>
					</Pressable>
				</View>
			</ScrollView>)
		} else {
			return (<View style={{justifyContent: 'center', marginTop: 15}}>
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
		padding: 15,
	},
	loadingContainer: {
		display: 'flex',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	viewWrapper: {
		marginTop: 15,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	content: {
		padding: 15,
		marginBottom: 15,
		color: '#000'
	},
	header: {
		padding: 15,
		paddingBottom: 10,
		paddingTop: 10
	},
	headerTextWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headerText: {},
	button: {
		backgroundColor: '#00a3cc',
		padding: 10,
		textAlign: 'center',
	},
})
