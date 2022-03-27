import * as React from 'react';
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import axios from 'axios';
import Moment from 'moment';
import Environment from '../Environment';
import {Project} from '../models/Project';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import {Input} from 'react-native-elements';
import {_retrieveData, _storeData, Props} from "../utils";

const ProjectsList = (props: any) => {
	const navigation = useNavigation();
	const [userInfo, setUserInfo] = useState<any>(null);
	const retrieveUserInformation = ():boolean => {
		let returned = false;

		useEffect(() => {
			if(userInfo === null){
				_retrieveData('userInfo').then((info: any) => {
					setUserInfo(JSON.parse(info));
					returned=true;
					if(userInfo.role ==='ADMINISTRATOR'){
						getAllProjects();
					}else{
						getUserSpecificProjects(userInfo);
					}
				});
			}

		}, []);
		return returned;
	}

	const [searchedProject, setSearchedProject] = useState<Project[]>([]);
	const [searchedProjectName, setSearchedProjectName] = useState<String>('');
	const [projects, setProjects] = useState<Project[]>([]);

	const [loading, setLoading] = useState(true);
	const getAllProjects = () => {
		useEffect(() => {
			// Update the document title using the browser API
			if (loading) {
				axios({
					method: 'GET',
					url: `${Environment.API_URL}/api/project/all`,
					headers: {
						'Content-Type': 'application/json',
						useQueryString: false,
					},
					params: {},
				})
					.then(response => {
						setProjects(response.data);
						setSearchedProject(response.data);
					})
					.catch((err: any) => {
					});
				setTimeout(() => setLoading(false), 1000);
			}
		}, [loading]);
	};
	retrieveUserInformation();
	const getUserSpecificProjects = (userInfo?:any) => {
		useEffect(() => {
			// Update the document title using the browser API
			if (loading) {
				axios({
					method: 'POST',
					url: `${Environment.API_URL}/api/project/all`,
					headers: {
						'Content-Type': 'application/json',
						useQueryString: false,
					},
					params: {},
					data:userInfo
				})
					.then(response => {
						setProjects(response.data);
						setSearchedProject(response.data);
					})
					.catch((err: any) => {
					});
				setTimeout(() => setLoading(false), 1000);
			}
		}, [loading]);
	};

	getAllProjects();
	const removeItem = (projectID: Number) => {
		axios({
			method: 'DELETE',
			url: `${Environment.API_URL}/api/project/delete/` + projectID,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then((response: any) => {
				setLoading(true);
				getAllProjects();
			})
			.catch((err: any) => {
			});
	};
	const updateItem = (projectID: Number) => {
		_storeData('updatedProjectId',projectID.toString());
		setTimeout(()=>navigation.navigate('updateProject'),100);
	};

	const getListHeader = () => {
		return (
			<View style={{width: '100%', backgroundColor: '#fff'}}>
				<Input
					leftIcon={<IconM name="search" size={20} color={'#000'}/>}
					placeholder={'Search by project title or description'}
					style={styles.customMargin}
					onChangeText={text => {
						setSearchedProjectName(text);
						if (text.trim() !== '') {
							setProjects(
								searchedProject.filter(
									(item: Project) =>
										item.projectTitle.toLowerCase().includes(text) ||
										item.projectDescription.toLowerCase().includes(text),
								),
							);
						} else {
							setProjects(searchedProject);
						}
					}}
					autoCompleteType={false}
				/>
			</View>
		);
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
	const getCurrentProjectStatus = (project: any): any => {
		const projectStatus: any = project.item.projectStatus;
		let returnedValue: any;
		if (projectStatus) {
			returnedValue = (<View style={styles.status}>
				<Text style={{color: '#fff', textAlign: 'center'}}>{projectStatus.projectStatusTitle}</Text>
			</View>)
		}
		return returnedValue;
	}
	const getLatestProjectInfo = () => {
		if (loading) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#d81e05"/>
				</View>
			);
		} else {
			return (
				<View>
					<FlatList
						keyExtractor={(item, index) => index.toString()}
						data={projects.reverse()}
						ItemSeparatorComponent={FlatListItemSeparator}
						ListHeaderComponent={() => getListHeader()}
						stickyHeaderIndices={[0]}
						initialNumToRender={projects.length}
						renderItem={({item}) => (
							<View style={styles.project}>
								<View style={styles.titleWrapper}>
									<Text style={styles.title}>Project Title: {item.projectTitle}</Text>
									<View>{getCurrentProjectStatus({item})}</View>

								</View>
								<Text style={styles.text}>
									Project Description: {item.projectDescription}
								</Text>

								<Text style={styles.text}>
									Total Members: {item.members.length}
								</Text>

								<View style={styles.footer}>
									<Text style={styles.text}>
										<Icon name="calendar" size={18} color={'#000'}/> Start
										Date: {Moment(item.startDate).format('d-MM-YYYY')}
									</Text>
									<Text style={styles.text}>
										<Icon name="calendar" size={18} color={'#000'}/> End Date:{' '}
										{Moment(item.endDate).format('d-MM-YYYY')}
									</Text>
								</View>
								<View style={styles.buttonWrapper}>
									<Pressable
										style={[styles.button, styles.delete]}
										onPress={() => {
											removeItem(item.projectID);
										}}>
										<Text
											style={{
												textAlign: 'center',
												color: '#fff',
												fontWeight: '500',
											}}>
											Remove
										</Text>
									</Pressable>
									<Pressable
										style={[styles.button, styles.borderButton, styles.view]}
										onPress={() => {
											updateItem(item.projectID);
										}}>
										<Text
											style={{
												textAlign: 'center',
												color: '#fff',
												fontWeight: '500',
											}}>
											View
										</Text>
									</Pressable>
									<Pressable
										style={[styles.button, styles.borderButton, styles.update]}
										onPress={() => {
											updateItem(item.projectID);
										}}>
										<Text
											style={{
												textAlign: 'center',
												color: '#fff',
												fontWeight: '500',
											}}>
											Update
										</Text>
									</Pressable>
								</View>
							</View>
						)}
					/>
				</View>
			);
		}
	};
	return getLatestProjectInfo();
};
export default ProjectsList;

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
		backgroundColor: '#fff',
		width: '33.33%',
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
