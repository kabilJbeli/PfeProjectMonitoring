import * as React from 'react';
import {
	ActivityIndicator, Alert,
	Dimensions,
	FlatList,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text, TouchableOpacity,
	View
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {_retrieveData, _storeData, showToastWithGravity} from "../../utils";
import {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from 'react-native-animatable';

import axios from "axios";
import Environment from "../../Environment";
import {Input} from "react-native-elements";

// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';
import IconAnt from "react-native-vector-icons/AntDesign";
import RNFetchBlob from "react-native-fetch-blob";
import DocumentPicker, {
	DirectoryPickerResponse,
	DocumentPickerResponse,
	isInProgress,
	types,
} from 'react-native-document-picker';

const ViewTask = (props: any) => {
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
	const [files, setFiles] = useState<any[]>([]);
	const [result, setResult] = React.useState<Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null>();
	const [getLoggedInTime, setLoggedIntTimeArray] = useState<any[]>([]);
	const [sprints, setSprints] = useState<any[]>([]);

	const [sprint, setSprint] = useState<any>(null);

	const defaultLoggedInTime = {
		loggedTime: {
			'Week': 0,
			'Day': 0,
			'Hour': 0,
			'Minute': 0,
		}
	};

	const [getLoggedTime, setLoggedTime] = useState<any>(defaultLoggedInTime);

	const [loggedInTime, setLoggedIntTime] = useState<any>({
		loggedInTime: {
			durationType: null,
			duration: null,
			task: null,
			loggedBy: null
		}
	});

	const [loggedInTimeByValue, setLoggedInTimeByValue] = useState({
		loggedInTime: [
			{
				label: 'Week',
				value: 'Week'
			},
			{
				label: 'Day',
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

	const handleError = (err: unknown) => {
		if (DocumentPicker.isCancel(err)) {
			console.warn('cancelled')
			// User cancelled the picker, exit any dialogs or menus and move on
		} else if (isInProgress(err)) {
			console.warn('multiple pickers were opened, only the last will be considered')
		} else {
			throw err
		}
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


	const getTaskDuration = (task: any) => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/taskDuration/findTaskDurationByTasks?id=${task.taskID}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				let updatedConfigTime = {
					loggedTime: {
						'Week': 0,
						'Day': 0,
						'Hour': 0,
						'Minute': 0,
					}
				}

				response.data.map((item: any) => {
					if (item.durationType === 'Day') {
						updatedConfigTime.loggedTime['Day'] = updatedConfigTime.loggedTime['Day'] + item.duration;
					} else if (item.durationType === 'Week') {
						updatedConfigTime.loggedTime['Week'] = updatedConfigTime.loggedTime['Week'] + item.duration;
					} else if (item.durationType === 'Hour') {
						updatedConfigTime.loggedTime['Hour'] = updatedConfigTime.loggedTime['Hour'] + item.duration;
					} else if (item.durationType === 'Minute') {
						updatedConfigTime.loggedTime['Minute'] = updatedConfigTime.loggedTime['Minute'] + item.duration;
					}

					if (updatedConfigTime.loggedTime['Minute'] % 60 === 0) {
						let opValue = updatedConfigTime.loggedTime['Minute'] / 60;

						updatedConfigTime.loggedTime['Minute'] = 0;
						updatedConfigTime.loggedTime['Hour'] = updatedConfigTime.loggedTime['Hour'] + opValue;
					} else if (updatedConfigTime.loggedTime['Minute'] % 60 !== 0 && updatedConfigTime.loggedTime['Minute'] / 60 >= 1) {
						let restOfOpt = updatedConfigTime.loggedTime['Minute'] % 60;
						let optValue = (updatedConfigTime.loggedTime['Minute'] - restOfOpt) / 60;
						updatedConfigTime.loggedTime['Minute'] = restOfOpt;
						updatedConfigTime.loggedTime['Hour'] = updatedConfigTime.loggedTime['Hour'] + optValue;
					}

					if (updatedConfigTime.loggedTime['Hour'] % 8 === 0) {
						let opValue = updatedConfigTime.loggedTime['Hour'] / 8;
						updatedConfigTime.loggedTime['Hour'] = 0;
						updatedConfigTime.loggedTime['Day'] = updatedConfigTime.loggedTime['Day'] + opValue;
					} else if (updatedConfigTime.loggedTime['Hour'] % 8 !== 0 && updatedConfigTime.loggedTime['Hour'] / 8 >= 1) {
						let restOfOpt = updatedConfigTime.loggedTime['Hour'] % 8;
						let optValue = (updatedConfigTime.loggedTime['Hour'] - restOfOpt) / 8;
						updatedConfigTime.loggedTime['Hour'] = restOfOpt;

						updatedConfigTime.loggedTime['Day'] = updatedConfigTime.loggedTime['Day'] + optValue;
					}

					if (updatedConfigTime.loggedTime['Day'] % 5 === 0) {
						let optValue = updatedConfigTime.loggedTime['Day'] / 5;
						updatedConfigTime.loggedTime['Day'] = 0;
						updatedConfigTime.loggedTime['Week'] = updatedConfigTime.loggedTime['Week'] + optValue;
					} else if (updatedConfigTime.loggedTime['Day'] % 5 !== 0 && updatedConfigTime.loggedTime['Day'] / 5 >= 1) {
						let restOfOpt = updatedConfigTime.loggedTime['Day'] % 5;
						let optValue = (updatedConfigTime.loggedTime['Day'] - restOfOpt) / 5;
						updatedConfigTime.loggedTime['Day'] = restOfOpt;
						updatedConfigTime.loggedTime['Week'] = updatedConfigTime.loggedTime['Week'] + optValue;
					}


				});

				setLoggedIntTimeArray(response.data);
				setLoggedTime(updatedConfigTime);

			})
			.catch((err: any) => {
				console.error('api/taskDuration/findTaskDurationByTasks', err);
			});

	}


	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			setUserInfo(JSON.parse(info));
			getMemberInformation(JSON.parse(info).email);
		});

		_retrieveData('taskInfo').then((task: any) => {
			setTaskInfo(JSON.parse(task));
			getSelectedProjectMembers(JSON.parse(task).project.projectID);
			setLoggedIntTime({
				loggedInTime: {
					durationType: loggedInTime.loggedInTime.durationType,
					duration: loggedInTime.loggedInTime.duration,
					task: JSON.parse(task),
				}
			});
			getTaskDuration(JSON.parse(task));
			getSprintsByProject(JSON.parse(task).project.projectID);
			getTaskSprint(JSON.parse(task).taskID);
		});

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
				setLoggedIntTime((prevState: any) => {
					let loggedInTime = Object.assign({}, prevState.loggedInTime);
					loggedInTime.loggedBy = response.data;
					return {loggedInTime};
				});
			})
			.catch((err: any) => {
				console.error('api/member/getMemberByEmail', err);
			});

	}


	const addFiles = (filesInfo: any[]) => {
		axios
			.post(`${Environment.API_URL}/api/file/add`, filesInfo)
			.then((res: any) => {
				getTaskInformationWs(taskInfo);
				setFiles([]);
				setResult(null);
			}).catch((error: any) => {
			showToastWithGravity('An Error Has Occurred!!!');
			console.error('api/file/add', error);
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
				getTaskInformationWs(task);
			})
			.catch((err: any) => {
				console.error('api/task/update', err)
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
						durationType: null,
						duration: null,
						task: response.data,
						loggedBy: member
					}
				});
				getSelectedProjectMembers(response.data.project.projectID);
			})
			.catch((err: any) => {
				console.error('api/task', err)
				showToastWithGravity('An Error Occurred!!!');
			});
	}


	const _renderHeader = (section: any, index: number, isActive: boolean) => {
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

	const getCommentSection = (): any => {
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
						durationType: null,
						duration: null,
						task: taskInfo,
						loggedBy: member
					}
				});
				setComment('');
			})
			.catch((err: any) => {
				console.error('api/taskComment/add', err);
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
		let returnedValue: any = (<View></View>);

		if (userInfo && userInfo.roles && userInfo.roles.includes('EMPLOYEE')) {
			returnedValue = (<View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
				<View style={{width: '33%'}}>
					<Text style={{marginTop: -20}}>Logged In Time</Text>
					<Input
						style={{minHeight: 30, height: 52, fontSize: 18, lineHeight: 1}}

						autoCompleteType={true}
						keyboardType="numeric"
						onChangeText={(value: any) => setLoggedIntTime((prevState: any) => {
							let loggedInTime = Object.assign({}, prevState.loggedInTime);
							loggedInTime.duration = value
							return {loggedInTime};
						})}
						value={loggedInTime.loggedInTime.duration}
					/>
				</View>
				<View style={{width: '33%'}}>
					<Dropdown
						style={{minHeight: 35, height: 52}}
						label={'Logged In Time'}
						data={loggedInTimeByValue.loggedInTime}
						onChangeText={(value: any) => setLoggedIntTime((prevState: any) => {
							let loggedInTime = Object.assign({}, prevState.loggedInTime);
							loggedInTime.durationType = value;
							return {loggedInTime};
						})}
						value={loggedInTime.loggedInTime.durationType}
					/>
				</View>
				<View style={{width: '25%'}}>
					<Pressable
						disabled={loggedInTime.loggedInTime.duration === null || loggedInTime.loggedInTime.durationType === null

						}
						style={[styles.button, {
							height: 52,
							alignItems: 'center',
							justifyContent: "center",
							opacity: loggedInTime.loggedInTime.duration === null || loggedInTime.loggedInTime.durationType === null ? 0.5 : 1
						}]}
						onPress={() => {
							setLogInTime()
						}}>
						<Text style={{color: '#fff', textAlign: 'center'}}>Login duration</Text>
					</Pressable>
				</View>
			</View>);
		}
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
				setLoggedIntTime({
					loggedInTime: {
						durationType: null,
						duration: null,
						task: taskInfo,
						loggedBy: member
					}
				})
				getTaskInformationWs(taskInfo);
				getTaskDuration(taskInfo);
				showToastWithGravity('Log In Duration Successfully');
			})
			.catch((err: any) => {
				console.error('api/taskDuration/add`', err)
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
						task: response.data,
						loggedBy: member
					}
				});
				getSelectedProjectMembers(response.data.project.projectID);
				showToastWithGravity('Status Successfully Updated');
			})
			.catch((err: any) => {
				console.error('api/task/changeTaskStatus', err)
				showToastWithGravity('An Error Occurred!!!');
			});
	}

	const getTaskSprint = (taskID:number):void =>{
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/task/getAttachedSprint/${taskID}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setSprint(response.data);
			})
			.catch((err: any) => {
				console.error(`/api/task/getAttachedSprint/${taskID}`, err);

				setSprint(null);
			});

	}

	const getSprintsByProject = (projectID: number) => {
		const localSprintData: any[] = [];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/sprint/getProjectSprints?projectID=${projectID}`,
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
	const getSprintDropdown = (): any => {
		let returnedDropDown: any = (<View></View>);
		if (userInfo && userInfo.roles && userInfo.roles.includes('MANAGER') && sprint === null ) {
			returnedDropDown = (<View style={{width: '100%', marginBottom: 15}}>
				<Dropdown
					style={{width: '100%'}}
					disabled={sprints.length === 0 ? true : false}
					label={'Assign To Sprint'}
					data={sprints}
					onChangeText={(value: any) => setTaskInfo((prevState: any) => {
						let taskInfo = Object.assign({}, prevState);
						taskInfo.sprint = value;
						setSprint(value);
						updateTask(taskInfo);
						return {taskInfo};
					})}
					value={taskInfo?.sprint || null}
				/>
			</View>);

		}
		return returnedDropDown;
	}

	const getAssigneeName = (): string => {
		let returnedValue: string = '';
		if (taskInfo?.assignee?.name && taskInfo?.assignee?.lastName) {
			returnedValue = taskInfo?.assignee?.name + ' ' + taskInfo?.assignee?.lastName;
		}
		return returnedValue;
	}

	const downloadReport = (file: any): void => {

		let filePath = RNFetchBlob.fs.dirs.DownloadDir + '/' + file.fileTitle;

		RNFetchBlob.fs.writeFile(filePath, file.fileBytes, 'base64')
			.then((response: any) => {
				Alert.alert('Successfully Downloaded', 'Path:' + filePath || '', [
					{text: "Ok", onPress: () => console.log('Ok pressed')},
				], {cancelable: true});
			})
			.catch((errors: any) => {
				console.error(" Error Log: ", errors);
			})
	}
	const getTaskInformation = (): any => {
		if (taskInfo !== undefined && taskInfo.taskID) {
			return (<ScrollView style={[styles.containerView, {height: Dimensions.get('screen').height - 285}]}>
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
					}}>Assignee:</Text> {getAssigneeName()}</Text>
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



				<View>
					<View style={{marginTop: 15}}>
						<Text style={{
							fontWeight: 'bold'
						}}>Attached Files:</Text>
					</View>

					<FlatList
						style={{
							maxHeight: Dimensions.get('screen').height - 460,
							width: Dimensions.get('screen').width
						}}
						keyExtractor={(item, index) => index.toString()}
						data={taskInfo.files}
						ItemSeparatorComponent={FlatListItemSeparator}
						initialNumToRender={taskInfo.length}
						renderItem={({item}) => (
							<View style={styles.project}>
								<View style={[
									{
										flexDirection: 'row', justifyContent: 'space-between', marginBottom: 0,
										paddingRight: 15, paddingLeft: 15, alignItems: 'center', height: 'auto'
									}
								]}>
									<Text style={styles.text}>
										{item.fileTitle}
									</Text>

									<View style={styles.buttonWrapper}>

										<Pressable
											style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.custombutton, styles.borderButton, styles.update]}
											onPress={() => {
												downloadReport(item);
											}}>

											<IconAnt name={'download'} color={'#ffff'} size={18}/>
										</Pressable>
									</View>
								</View>


							</View>
						)}
					/>

				</View>

				<View style={{width: '100%'}}>
					<TouchableOpacity
						style={[styles.buttonCreate, {opacity: 1, backgroundColor: '#3e8ed0'}]}
						onPress={() => {
							DocumentPicker.pick({
								allowMultiSelection: true,
								type: [types.doc, types.docx, types.pdf, types.ppt, types.pptx, types.images, types.xls, types.xlsx],
							})
								.then((result: DocumentPickerResponse[]) => {
									const localFiles: any[] = [];
									result.map((item: DocumentPickerResponse,index) => {
										console.log(item.uri);
										const filePath = item.uri.split('raw%3A')[1].replace(/\%2F/gm, '/');
										RNFetchBlob.fs.readFile(filePath, 'base64').then(base => {
											const file = {
												fileTitle: item.name,
												fileBytes: base,
												fileType: item.type,
												addedBy: member,
												task: taskInfo
											}
											localFiles.push(file);
											if(result.length-1 ===index ){
												setFiles(localFiles);
												setResult(result);
												addFiles(localFiles);
											}
										});
									});

								})
								.catch(handleError)
						}}
					>
						<Text style={{
							textAlign: 'center',
							color: '#fff',
							fontWeight: '500',
						}}>Upload Files {"\n"} <Text style={{
							marginTop: 15,
							fontSize: 12
						}}>PDF, DOC, XLS, PPT, IMAGE</Text></Text>
					</TouchableOpacity>

				</View>

				<View style={{marginTop: 15}}>
					<Text style={{
						fontWeight: 'bold'
					}}>Logged In Time</Text>
					<View style={styles.viewWrapper}>
						<Text>{getLoggedTime?.loggedTime.Week} Week</Text>
						<Text>{getLoggedTime?.loggedTime.Day} Day</Text>
						<Text>{getLoggedTime?.loggedTime.Hour} Hour</Text>
						<Text>{getLoggedTime?.loggedTime.Minute} Minutes</Text>
					</View>
				</View>

				<View style={styles.viewWrapper}>
					<View style={{width: '100%'}}>
						{getFunctionalityByRole(taskInfo)}
					</View>
				</View>

				<View style={styles.viewWrapper}>
					<View style={{width: '100%', marginTop: 15}}>
						{loggedIn(props)}
					</View>
				</View>
				{getSprintDropdown()}
				<View>
					<Text style={{
						fontWeight: 'bold',
						marginBottom: 15
					}}>Comments:</Text>
					{getCommentSection()}
				</View>

				<View style={{backgroundColor: '#fff', marginBottom: 15}}>
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
		paddingBottom: 0
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
	project: {
		backgroundColor: '#fff',
		padding: 20,
		paddingBottom: 0,
		paddingRight: 0,
		paddingTop: 0,
		paddingLeft: 0,
		margin: 15,
		marginLeft: 0,
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
	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	custombutton: {
		backgroundColor: '#fff',
		width: 'auto',
		padding: 10,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		minWidth: 50,
		alignItems: 'center'
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
	buttonCreate: {
		borderRadius: 0,
		padding: 10,
		elevation: 2,
		backgroundColor: '#1f9683'
	},
})
