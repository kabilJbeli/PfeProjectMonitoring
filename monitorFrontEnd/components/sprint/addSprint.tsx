import * as React from 'react';
import {Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

const CreateSprint = (props: any) => {
	const navigation = useNavigation();
	const defaultState = {
		sprint: {
			project: null,
			task: [],
			sprintTypes: '',
			sprintTitle: '',
			sprintStartDate: null,
			sprintEndDate: null,
			status: 'Created'
		}
	};
	const getButtonStatus = (): boolean => {
		return (
			sprint.sprint.sprintTitle === '' ||
			sprint.sprint.sprintTypes === '' ||
			sprint.sprint.project === null ||
			sprint.sprint.task.length === 0 ||
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
			<View style={{padding: 15}}>
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
							minimumDate={new Date()}
							modal
							mode={'date'}
							open={open}
							date={date}
							onConfirm={(startDate: any) => {
								setOpen(false);
								setDate(startDate);
							}}
							onCancel={() => {
								setOpen(false);
							}}
							onDateChange={(chosenDate: Date) =>
								setSprint((prevState: any) => {
									let sprint = Object.assign({}, prevState.sprint);
									sprint.sprintStartDate = chosenDate;
									return {sprint};
								})
							}

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
							minimumDate={new Date()}
							modal
							mode={'date'}
							open={openEndDate}
							date={expectedEndDate}
							onConfirm={(endDate: any) => {
								setOpenEndDate(false);
								setExpectedEndDate(endDate);
							}}
							onCancel={() => {
								setOpenEndDate(false);
							}}
							onDateChange={(chosenEndDate: Date) =>
								setSprint((prevState: any) => {
									let sprint = Object.assign({}, prevState.sprint);
									sprint.sprintEndDate = chosenEndDate;
									return {sprint};
								})
							}
						/>
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

							}}>
							<Text
								style={{
									textAlign: 'center',
									color: '#fff',
									fontWeight: '500',
								}}>
								Reset
							</Text>
						</TouchableOpacity>

					</View>
				</View>

			</View>
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
