import * as React from 'react';
import {
	ActivityIndicator,
	Button,
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";
import Environment from "../Environment";
import {_retrieveData, _storeData, showToastWithGravity} from "../utils";
// @ts-ignore
import SelectMultiple from 'react-native-select-multiple';
//import MultiSelect from 'react-native-multiple-select';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

const ViewProjectInformation = (props: any) => {
	const [projectInfo, setProjectInfo] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [employees, setEmployees] = useState<any>([]);
	const isFocused = useIsFocused();
	const navigation = useNavigation();
	const [assignedEmployees, setAssignedEmployees] = useState<any>([]);
	const [selectedEmployees, setSelectedEmployees] = useState<any>([]);

	const getEmployees = () => {
		return new Promise((resolve, reject) => {
			axios
				.get<any[]>(`${Environment.API_URL}/api/member/getMemberByRole?role=EMPLOYEE`, {})
				.then((res: any) => {
					resolve(res.data);
				}).catch((error: any) => {
				console.error(error);
			});
		})

	}

	useEffect(() => {
		getEmployees().then((data: any) => {
			const employees: any[] = [{
				name: 'Employees',
				memberID: 0,
				children: []
			}];
			if (data) {
				data.map((item: any) => {
					employees[0].children.push(item);
				});
				setEmployees(employees);
			}
		}).catch(error => {
			console.error(`HTTP error: ${error.name} => ${error.message}`);
			throw "fail request at: GET /projectStatus";
		});
	}, []);

	useEffect(() => {
		if (loading) {


			_retrieveData('updatedProjectId').then((projectID: string) => {
				getProjectInfo(projectID);
				showToastWithGravity('Project ID Retrieved Successfully');
			}).catch(err => {
				showToastWithGravity('ERR Project ID ' + err);
			});
		}
	}, [props]);

	const getProjectInfo = (projectID?: string) => {
		const members: any[] = [{
			name: 'Employees',
			memberID: 0,
			children: []
		}];

		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/project/${projectID}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then((response: any) => {
				setProjectInfo(response.data);
				response.data.members.map((item: any) => {
					members[0].children.push(item)
				})
				setAssignedEmployees(members);
			})
			.catch((err: any) => {
				showToastWithGravity(err);
			});

	}

	const changeProjectStatus = (projectID: number, projectStatus: string) => {
		const members: any[] = [{
			name: 'Employees',
			memberID: 0,
			children: []
		}];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/project/changeProjectStatus?projectId=${projectID}&projectStatus=${projectStatus}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: true,
			},
		})
			.then((response: any) => {
				setProjectInfo(response.data);
				response.data.members.map((item: any) => {
					members[0].children.push(item)
				})
				setAssignedEmployees(members);
				showToastWithGravity('Project Information Retrieved Successfully');
			})
			.catch((err: any) => {
				showToastWithGravity(err);
			});
	}


	const changeStatus = (projectID: number, currentStatus: string) => {

		switch (currentStatus) {
			case 'Created': {
				changeProjectStatus(projectID, 'InProgress');
				break;
			}
			case 'InProgress': {
				changeProjectStatus(projectID, 'Released');
				break;
			}
			case 'Released': {
				changeProjectStatus(projectID, 'Finished');
				break;
			}
			case 'Finished': {
				break;
			}
			default: {
				break;
			}
		}


	}

	const getNextDisplayedProjectStatusLabel = (currentStatus: string): string => {
		let nextProjectStatus: any;

		switch (currentStatus) {
			case 'Created': {
				nextProjectStatus = (<Pressable style={styles.button} onPress={() => {
					changeStatus(projectInfo.projectID, projectInfo.projectStatus);
				}}>
					<Text
						style={styles.buttonText}>
						Start Progress
					</Text>
				</Pressable>)
				break;
			}
			case 'InProgress': {
				nextProjectStatus = (<Pressable style={styles.button} onPress={() => {
					changeStatus(projectInfo.projectID, projectInfo.projectStatus);
				}}>
					<Text
						style={styles.buttonText}>
						Set As Released
					</Text>
				</Pressable>)
				break;
			}
			case 'Released': {
				nextProjectStatus = (<Pressable style={styles.button} onPress={() => {
					changeStatus(projectInfo.projectID, projectInfo.projectStatus);
				}}>
					<Text
						style={styles.buttonText}>
						Finish Project
					</Text>
				</Pressable>)

				break;
			}
			case 'Finished': {
				nextProjectStatus = (<View></View>)
				break;
			}
			default: {
				nextProjectStatus = (<View></View>)
				break;
			}
		}

		return nextProjectStatus;
	}
	const onConfirm = () => {
		console.log('Confirmed selectedEmployees ========>', selectedEmployees)
		const retrievedMembers: any[] = [{
			name: 'Employees',
			memberID: 0,
			children: []
		}];
		const selectedEmployeesArray: any[] = [];
		console.log('selectedEmployees =============>', selectedEmployees)
		selectedEmployees.map((item: any) => {
			if (item) {
				selectedEmployeesArray.push(item.value);
			}
		})

		axios({
			method: 'POST',
			url: `${Environment.API_URL}/api/project/assignMembersToProject?projectId=${projectInfo.projectID}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: true,
			},
			data: selectedEmployeesArray
		})
			.then((response: any) => {
				setProjectInfo(response.data);
				console.log(response.data)
				response.data.members.map((item: any) => {
					if (item) {
						retrievedMembers[0].children.push(item)
					}
				});
				setAssignedEmployees(retrievedMembers);
			})
			.catch((err: any) => {
				console.log(err);
				showToastWithGravity(err);
			});
	}
	const onSelectionsChange = (selectedEmployees: any) => {
		setSelectedEmployees(selectedEmployees);
	}

	const getMultipleSelect = () => {
		return (<View style={{backgroundColor:'#fff',marginTop:15}}>
			<SectionedMultiSelect
				items={employees}
				IconRenderer={Icon}
				uniqueKey="memberID"
				subKey="children"
				selectText="Choose project members..."
				searchPlaceholderText="Search for a member"
				showDropDowns={true}
				readOnlyHeadings={true}
				onSelectedItemsChange={onSelectionsChange}
				selectedItems={assignedEmployees}
				displayKey="name"
				showRemoveAll={true}
				single={false}
				onConfirm={onConfirm}
				expandDropDowns={true}
			/>

		</View>);
	}

	const getProjectInfoDisplay = () => {
		if (projectInfo) {
			return (<View>
				<View style={{
					height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
					backgroundColor: '#00a3cc'

				}}>
					<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
						{projectInfo.projectTitle}
					</Text>
				</View>

				<View style={{paddingRight: 15, paddingLeft: 15, marginTop: 15}}>
					<View>
						<Pressable
							style={{width: 80, flexDirection: 'row'}}
							onPress={() => {
								navigation.goBack();
							}}
						><Icon name='arrow-back' size={20} color={'#000'}/>
							<Text style={{paddingLeft: 10,fontWeight:'bold'}}
							>Go Back</Text>
						</Pressable>
					</View>
					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 15,
						alignItems: 'center'
					}}>
						<Text>
							<Text style={{fontWeight:'bold'}}>Current Status:</Text> {projectInfo.projectStatus}
						</Text>
						{getNextDisplayedProjectStatusLabel(projectInfo.projectStatus)}
					</View>
					<View style={{marginTop: 15}}>

						<Text>
							<Text style={{fontWeight:'bold'}}>Project Description:</Text> {projectInfo.projectDescription}
						</Text>
					</View>

					<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
						<Text>
							<Text style={{fontWeight:'bold'}}>Start Date:</Text> {projectInfo.startDate}
						</Text>

						<Text>
							<Text style={{fontWeight:'bold'}}>Expected End Date:</Text> {projectInfo.endDate}
						</Text>
					</View>
					<View style={{marginTop: 15}}>

						<Text>
							<Text style={{fontWeight:'bold'}}>Number of project Members:</Text> {assignedEmployees.length}
						</Text>
					</View>

					<View style={{marginTop: 15}}>
						<Text>
							<Text style={{fontWeight:'bold'}}>Number of sprints:</Text> {projectInfo.sprint.length}
						</Text>
						<Text>
							<Text style={{fontWeight:'bold'}}>Current sprint:</Text>
						</Text>
					</View>
					<View style={{marginTop: 15}}>
						<Text style={{fontWeight:'bold'}}>
							Client Details
						</Text>
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

							<Text>
								<Text style={{fontWeight:'bold'}}>Name:</Text> {projectInfo.client.name} {projectInfo.client.lastName}
							</Text>

							<Text>
								<Text style={{fontWeight:'bold'}}>Email:</Text> <Text style={{
								color: '#00a3cc',
								textDecorationLine: 'underline'
							}}>{projectInfo.client.email}</Text>
							</Text>
						</View>
					</View>
					<View>
						<Text style={{marginTop: 15,fontWeight:'bold'}}>Assign Project Members:</Text>

						<View
						>
							{getMultipleSelect()}
						</View>
					</View>

				</View>

			</View>);
		} else {
			return (<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#d81e05"/>
			</View>)
		}
	}

	return getProjectInfoDisplay();
};
export default ViewProjectInformation;

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
		backgroundColor: '#00a3cc',
		padding: 10,
		textAlign: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 14,
		width: 'auto'
	},
	borderButton: {
		borderStyle: 'solid',
		borderLeftColor: '#fff',
		borderWidth: 1,
		borderBottomColor: 'transparent',
		borderTopColor: 'transparent',
		borderRightColor: 'transparent',
	},
	backButton: {
		width: 'auto'
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
