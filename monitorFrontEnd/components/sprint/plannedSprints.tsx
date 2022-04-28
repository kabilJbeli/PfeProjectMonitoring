import * as React from 'react';
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {_retrieveData, _storeData} from "../../utils";
import axios from "axios";
import Environment from "../../Environment";
import Icon from "react-native-vector-icons/MaterialIcons";
// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';

const PlannedSprintList = (props: any) => {
	const navigation = useNavigation();
	const [sprints, setSprints] = useState<any>({});
	const [mainSprints, setMainSprints] = useState<any>([]);
	const [userInfo, setUserInfo] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [projects, setProjects] = useState<any[]>([]);

	const getProjectManagersSprint = (email: string) => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/sprint/getSprintByStatus?email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setSprints(response.data);
				setMainSprints(response.data);
				setLoading(false);
			})
			.catch((err: any) => {
				console.error('api/sprint/getSprintByStatus',err);
			});
	};


	const getClientSprint = (email: string) => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/sprint/getClientSprintByStatus?email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setSprints(response.data);
				setMainSprints(response.data);

				setLoading(false);
			})
			.catch((err: any) => {
				console.error('api/sprint/getClientSprintByStatus',err);
			});
	};


	const getEmployeeSprint = (email: string) => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/sprint/getEmployeeSprintByStatus?email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setSprints(response.data);
				setMainSprints(response.data);

				setLoading(false);
			})
			.catch((err: any) => {
				console.error('api/sprint/getEmployeeSprintByStatus',err);
			});
	};


	const getClientProjects = (userInfoParam?: any) => {
		// Update the document title using the broconwser API
		const localProject: any = [{
			label: 'ALL', value: {
				projectTitle:'ALL'
			}
		}];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/project/getProjectsByClient?email=${userInfoParam.email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
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
				console.error('api/project/getProjectsByClient',err);
			});
	};



	const getEmployeeProjects = (userInfoParam?: any) => {
		// Update the document title using the broconwser API
		const localProject: any = [{
			label: 'ALL', value: {
				projectTitle:'ALL'
			}
		}];
		if (loading) {
			axios({
				method: 'GET',
				url: `${Environment.API_URL}/api/project/findByMember?email=${userInfoParam.email}`,
				headers: {
					'Content-Type': 'application/json',
					useQueryString: false,
				},
				params: {},
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
					console.error('api/project/findByMember',err);
				});
			setTimeout(() => setLoading(false), 1000);
		}
	};

	const getManagerProjects = (userInfoParam?: any) => {
		// Update the document title using the broconwser API
		const localProject: any = [{
			label: 'ALL', value: {
				projectTitle:'ALL'
			}
		}];
		if (loading) {
			axios({
				method: 'POST',
				url: `${Environment.API_URL}/api/project/getProjectsByProjectManager?email=${userInfoParam.email}`,
				headers: {
					'Content-Type': 'application/json',
					useQueryString: false,
				},
				params: {},
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
					console.error('api/project/getProjectsByProjectManager',err);
				});
			setTimeout(() => setLoading(false), 1000);
		}
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

	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				setUserInfo(parsedInfo);
				if(parsedInfo.roles.includes('MANAGER')){
					getProjectManagersSprint(parsedInfo.email);
					getManagerProjects(parsedInfo);
				}else if (parsedInfo.roles.includes('CLIENT')){
					getClientSprint(parsedInfo.email);
					getClientProjects(parsedInfo);
				}else if(parsedInfo.roles.includes('EMPLOYEE')){
					getEmployeeSprint(parsedInfo.email);
					getEmployeeProjects(parsedInfo);
				}

			}

		});
	}, [props]);

	const filterSprint = (projectTitle: string) => {
		if(projectTitle === 'ALL'){
			setSprints(mainSprints);
		}else {
			const filteredSprints = mainSprints.plannedSprints.filter((item:any) => item.project.projectTitle == projectTitle);

			const constructedSprint ={
				currentSprints:mainSprints.currentSprints,
				previousSprints:mainSprints.previousSprints,
				plannedSprints:filteredSprints
			}

			setSprints(constructedSprint);
		}
	}

	const getPreviousSprints = ():any=>{

		let retrievedValue = (<View style={styles.loadingContainer}>
			<ActivityIndicator size="large" color="#d81e05"/>
		</View>);
		if (!loading) {
			retrievedValue = (<View>
				<View style={{width: '100%', marginBottom: 10}}>
					<Dropdown
						style={{width: '100%'}}
						label={'Filter by project'}
						data={projects}
						onChangeText={(value: any) =>{
							filterSprint(value.projectTitle)

						}}
					/>
				</View>
				<FlatList
					style={{maxHeight: Dimensions.get('screen').height - 400,minHeight:200}}
					keyExtractor={(item, index) => index.toString()}
					data={sprints?.plannedSprints || []}
					ItemSeparatorComponent={FlatListItemSeparator}
					initialNumToRender={sprints?.plannedSprints?.length || 0}
					renderItem={({item}) => (
						<View style={styles.project}>
							<View style={[
								{
									flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5,
									paddingRight: 15, paddingLeft: 15, alignItems: 'center', height: 'auto'
								}
							]}>
								<Text style={styles.text}>
									{item.sprintTitle}
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
									}}>{item.sprintTypes}</Text>
								</View>
							</View>
							<View style={{
								paddingLeft: 15, paddingRight: 15, marginBottom: 5,
								flexDirection: 'row',
								justifyContent: 'space-between'
							}}>
								<Text style={{
									fontWeight: 'bold'
								}}>Status: {item.status}</Text>

								<Text style={{
									fontWeight: 'bold'
								}}>Project: {item.project.projectTitle}</Text>
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
								}}>Sprint Start Date: {new Date(item.sprintStartDate).toLocaleDateString()}</Text>
								<Text style={{
									fontWeight: 'bold'
								}}>Sprint End Date: {new Date(item.sprintEndDate).toLocaleDateString()}</Text>
							</View>
							<View style={styles.buttonWrapper}>
								<Pressable
									style={({pressed}) => [{opacity: pressed ? 1 : 0.8}, styles.button, styles.borderButton, styles.view]}
									onPress={() => {
										_storeData('sprintInfo', JSON.stringify(item));
										// @ts-ignore
										navigation.navigate('viewSprint');
									}}>
									<Text
										style={{
											textAlign: 'center',
											color: '#fff',
											fontWeight: '500',
										}}>
										View Sprint Information
									</Text>
								</Pressable>
							</View>
						</View>
					)}
				/>
			</View>);

		}
		return retrievedValue;
	}

	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#45b1b1'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Planned Sprints</Text>
			</View>
			<View style={{padding: 15}}>
				<View style={{paddingBottom: 10}}>
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
				<View style={{marginTop: 10}}>
					{getPreviousSprints()}
				</View>
			</View>
		</SafeAreaView>);
};
export default PlannedSprintList;


const styles = StyleSheet.create({
	customMargin: {
		marginTop: 15,
		paddingBottom: 0,
		marginBottom: 0,
	},
	loadingContainer: {
		display: 'flex',
		height: Dimensions.get('screen').height - 200,
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
		margin: 0,
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
		backgroundColor: '#3ca7a7',
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
