import * as React from 'react';
import {
	Button,
	Dimensions,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";

// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';
import axios from "axios";
import Environment from "../../Environment";
import {_retrieveData, showToastWithGravity} from "../../utils";
import Moment from "moment";
import DatePicker from "react-native-date-picker";
import {Input} from "react-native-elements";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

const CreateSprint = (props: any) => {
	const navigation = useNavigation();
	const defaultState = {
		sprint: {
			project: null,
			task: [],
			sprintTypes: '',
			sprintTitle: '',
			sprintStartDate: new Date(),
			sprintEndDate: new Date(),
			status: 'Created'
		}
	};

	const [tasks, setTasks] = useState<any[]>([]);
	const [selectedTasks, setSelectedTasks] = useState<any>([]);
	const [maxDate, setMaxDate] = useState<Date>(new Date());
	const [assignedTasks, setAssignedTasks] = useState<any>([]);

	const getButtonStatus = (): boolean => {
		return (
			sprint.sprint.sprintTitle === '' ||
			sprint.sprint.sprintTypes === '' ||
			sprint.sprint.project === null ||
			sprint.sprint.sprintStartDate === null ||
			sprint.sprint.sprintEndDate === null
		);
	};

	const [sprint, setSprint] = useState<any>(defaultState);
	const [projects, setProjects] = useState<any[]>([]);

	const [date, setDate] = useState(new Date());

	const [expectedEndDate, setExpectedEndDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [openEndDate, setOpenEndDate] = useState(false);
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

	const createSprint = () => {
		axios
			.post(`${Environment.API_URL}/api/sprint/add`, sprint.sprint)
			.then((res: any) => {
				// @ts-ignore
				navigation.navigate('sprint');

				showToastWithGravity('Sprint Successfully Created');
				setSprint(defaultState);
				setDate(new Date());
				setExpectedEndDate(new Date());
			}).catch((error: any) => {
			showToastWithGravity('An Error Has Occurred!!!');
			console.error(error);
		});
	}


	const getLastSprintEndDate = (projectID: any) => {
		return new Promise((resolve, reject) => {
			axios
				.get<any>(`${Environment.API_URL}/api/sprint/getProjectCurrentSprintEndDate?projectID=${projectID}`)
				.then((res: any) => {
					resolve(res.data);
				}).catch((error: any) => {
				console.error(error);
			});
		})
	}

	const getTasks = (projectID: number) => {
		return new Promise((resolve, reject) => {
			axios
				.get<any[]>(`${Environment.API_URL}/api/task/getUnassignedSprintTasks?projectID=${projectID}`, {})
				.then((res: any) => {
					resolve(res.data);
				}).catch((error: any) => {
				console.error(error);
			});
		})

	}


	const onConfirm = () => {
		if (assignedTasks[0] && assignedTasks[0].children) {
			setSprint((prevState: any) => {
				let sprint = Object.assign({}, prevState.sprint);
				sprint.task = assignedTasks[0].children;
				return {sprint};
			});
		}
	}

	const onSelectionsChange = (selectedArray: any) => {
		const retrievedTasks: any[] = [{
			name: 'Tasks',
			taskID: 0,
			children: []
		}];
		for (let taskID of selectedArray) {
			let task = tasks[0].children.find((item: any) => item.taskID === taskID);
			retrievedTasks[0].children.push(task);
		}
		setAssignedTasks(retrievedTasks);
		setSelectedTasks(selectedArray);

	}

	const getMultipleSelect = () => {
		return (<View style={{marginTop: 15}}>
			<SectionedMultiSelect
				disabled={tasks.length === 0}
				items={tasks}
				IconRenderer={Icon}
				uniqueKey="taskID"
				subKey="children"
				selectText="Choose Sprint Tasks..."
				searchPlaceholderText="Search for a task"
				onSelectedItemsChange={onSelectionsChange}
				selectedItems={selectedTasks}
				displayKey="name"
				chipsPosition="bottom"
				selectChildren={true}
				onConfirm={onConfirm}
				expandDropDowns={true}
				showDropDowns={false}
				styles={{
					chipsWrapper: {
						borderStyle: 'dashed',
						padding: 10,
						borderColor: '#b4b4ba',
						borderWidth: 2,
						backgroundColor: '#fff'
					},
					selectToggle: {
						backgroundColor: '#fff',
						padding: 15,
						marginBottom: 15,
						opacity: tasks.length === 0 ? 0.5 : 1,
					},
					chipText: {
						maxWidth: Dimensions.get('screen').width - 90,
						fontSize: 16
					},
					chipContainer: {
						backgroundColor: '#00a3cc'
					},
					itemText: {
						color: 'black'
					},
					selectedItemText: {
						color: 'blue',
					},
					subItemText: {
						color: 'black'
					},
					item: {
						paddingHorizontal: 10
					},
					subItem: {
						paddingHorizontal: 10
					},
					selectedItem: {
						backgroundColor: 'rgba(0,0,0,0.1)'
					},
					selectedSubItem: {
						backgroundColor: 'rgba(0,0,0,0.1)'
					},
					selectedSubItemText: {
						color: 'blue',
					},
					scrollView: {paddingHorizontal: 0}
				}}
				colors={{
					primary: '#00a3cc',
					success: '#00a3cc',
					chipColor: '#fff',
				}}
				hideChipRemove={true}
			/>

		</View>);
	}

	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				getUserSpecificProjects(parsedInfo);
			}
		});


	}, [props]);
	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#45b1b1'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Create Sprint</Text>
			</View>

			<ScrollView style={{padding: 15, height: Dimensions.get('screen').height - 250}}>
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
				<View style={styles.containerWrapper}>
					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							label={'Project'}
							data={projects}

							onChangeText={(value: any) => setSprint((prevState: any) => {
								let sprint = Object.assign({}, prevState.sprint);
								sprint.project = value;
								getLastSprintEndDate(value.projectID).then((data: any) => {
									console.log(data);
									setMaxDate(new Date(data));
									setSprint((prevState: any) => {
										let sprint = Object.assign({}, prevState.sprint);
										sprint.sprintStartDate = new Date(data);
										return {sprint};
									});
									setDate(new Date(data));
									setExpectedEndDate(new Date(data));
								}).catch(error => {
									console.error(`HTTP error: ${error.name} => ${error.message}`);
									throw "fail request at: GET /projectStatus";
								});

								getTasks(value.projectID).then((data: any) => {
									const tasks: any[] = [{
										name: 'Tasks',
										taskID: 0,
										children: []
									}];

									if (data) {
										data.map((item: any) => {
											item.name = item.project.projectTitle.trim().replace(' ', '_') + '-' + item.taskID + ' (' + item.taskTitle + ')';
											tasks[0].children.push(item);
										});
										setTasks(tasks);
									}
								}).catch(error => {
									console.error(`HTTP error: ${error.name} => ${error.message}`);
									throw "fail request at: GET /projectStatus";
								});
								return {sprint};
							})}
							value={sprint.sprint?.project || null}
						/>
					</View>

					<View style={{width: '100%', marginBottom: 15}}>
						<Dropdown
							style={{width: '100%'}}
							label={'Sprint Type'}
							data={[
								{label: 'Design', value: 'DESIGN'},
								{label: 'Development', value: 'DEVELOPMENT'}
							]}
							onChangeText={(value: any) => setSprint((prevState: any) => {
								let sprint = Object.assign({}, prevState.sprint);
								sprint.sprintTypes = value;
								return {sprint};
							})}
							value={sprint.sprint?.sprintTypes || null}
						/>
					</View>

					<View style={{width: '100%'}}>
						<Text>Sprint Title</Text>
						<Input
							leftIcon={<Icon name="tag" size={20} color={'#000'}/>}
							inputContainerStyle={styles.InputContainerStyle}
							leftIconContainerStyle={styles.LeftIconContainerStyle}
							errorStyle={styles.ErrorStyle}
							onChangeText={(text: string) =>
								setSprint((prevState: any) => {
									let sprint = Object.assign({}, prevState.sprint);
									sprint.sprintTitle = text;
									console.log(sprint)
									return {sprint};

								})
							}
							value={sprint.sprint.sprintTitle}
							autoCompleteType={false}
						/>
					</View>

					<View
						style={{
							width: '100%',
							marginBottom: 20,
						}}>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
							}}>
							<Text>Sprint Start Date: {Moment(date).format('DD-MM-YYYY')} </Text>
							<Button title="Change" onPress={() => setOpen(true)}/>
						</View>
						<DatePicker
							minimumDate={maxDate}
							modal
							mode={'date'}
							open={open}
							date={date}
							onConfirm={(startDate: any) => {
								setOpen(false);
								setDate(startDate);
								setSprint((prevState: any) => {
									let sprint = Object.assign({}, prevState.sprint);
									sprint.sprintStartDate = startDate;
									return {sprint};
								})
							}}
							onCancel={() => {
								setOpen(false);
							}}


						/>
					</View>


					<View style={{width: '100%', marginBottom: 20}}>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
							}}>
							<Text>
								Sprint End Date: {Moment(expectedEndDate).format('DD-MM-YYYY')}
							</Text>
							<Button title="Change" onPress={() => setOpenEndDate(true)}/>
						</View>
						<DatePicker
							minimumDate={maxDate}
							modal
							mode={'date'}
							open={openEndDate}
							date={expectedEndDate}
							onConfirm={(endDate: any) => {
								setOpenEndDate(false);
								setExpectedEndDate(endDate);
								setSprint((prevState: any) => {
									let sprint = Object.assign({}, prevState.sprint);
									sprint.sprintEndDate = endDate;
									console.log(sprint)
									return {sprint};
								})
							}}
							onCancel={() => {
								setOpenEndDate(false);
							}}

						/>
					</View>
					<View style={{marginBottom: 10}}>
						<Text style={{marginBottom: 0, fontWeight: 'bold'}}>Assign Tasks To Sprint:</Text>

						<View
						>
							{getMultipleSelect()}
						</View>
					</View>

					<View style={styles.columnDisplay}>
						<TouchableOpacity
							disabled={getButtonStatus()}
							style={getButtonStatus() ? styles.disabled : styles.buttonWrapper}
							onPress={() => {
								createSprint();
							}}>
							<Text
								style={{
									textAlign: 'center',
									color: '#fff',
									fontWeight: '500',
								}}>
								Create New Sprint
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cancelWrapper}
							onPress={() => {
								setSprint(defaultState);
								// @ts-ignore
								navigation.navigate('sprint');
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
export default CreateSprint;
const styles = StyleSheet.create({
	columnDisplay: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		width: '100%',
		justifyContent: 'space-between',
	},
	containerWrapper: {
		marginTop: 15,
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
	cancelWrapper: {
		backgroundColor: '#c8003f',
		padding: 10,
		opacity: 1,
		width: '100%',
		marginTop: 15,
		marginBottom: 30,
	},
	buttonWrapper: {
		backgroundColor: '#1f9683',
		padding: 10,
		opacity: 1,
		width: '100%'
	},
	disabled: {
		opacity: 0.5,
		backgroundColor: '#1f9683',
		padding: 10,
	},
});
