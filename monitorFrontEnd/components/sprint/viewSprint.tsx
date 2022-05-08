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
import Icon from "react-native-vector-icons/MaterialIcons";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import axios from "axios";
import Environment from "../../Environment";
import {_retrieveData, _storeData} from "../../utils";
import IconAnt from 'react-native-vector-icons/AntDesign';
import {PieChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
	backgroundGradientFrom: '#1E2923',
	backgroundGradientFromOpacity: 0,
	backgroundGradientTo: '#08130D',
	backgroundGradientToOpacity: 0.5,
	color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
	strokeWidth: 2,
	useShadowColorFromDataset: false,
};

const ViewSprint = (props: any) => {
	const navigation = useNavigation();
	const [tasks, setTasks] = useState<any[]>([]);
	const [sprintInfo, setSprintInfo] = useState<any>({});
	const [pieChartData, setPieChartData] = useState<any[]>([]);
	const [pieChartDataLoading, setPieChartDataLoading] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(true);
	const [userInfo, setUserInfo] = useState<any>({});
	const [myTasks, setMyTasks] = useState<any[]>([]);
	const isFocused = useIsFocused();

	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				setUserInfo(parsedInfo);
				_retrieveData('sprintInfo').then((info: any) => {
					let sprintInfo = JSON.parse(info)
					if (sprintInfo !== undefined) {
						setSprintInfo(sprintInfo);
						getTasks(sprintInfo.sprintID,parsedInfo);
						getSprintStats(sprintInfo.sprintID);
					}
				});
			}
		});

	}, [props]);

	const getTasks = (sprintID: number,info:any) => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/sprint/getTasksBySprintId?sprintID=${sprintID}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				const employeeTasks: any[] = [];
				setTasks(response.data);
				response.data.map((item: any) => {
					if (info && item.assignee.email === info.email) {
						employeeTasks.push(item);
					}
				});
				setMyTasks(employeeTasks);
				setTimeout(() => {
					setLoading(false)
				}, 100);
			})
			.catch((err: any) => {
				console.error('api/sprint/getTasksBySprintId',err);
			});
	}


	const getSprintStats = (sprintID: number): any => {
		const sprintStats: any[] = [];

		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/sprint/getCurrentSprintStats?sprintID=${sprintID}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				response.data.map((item: any) => {
					let statData: any = {
						name: item.label,
						value: item.value,
						legendFontSize: 15,
					}

					switch (item.label) {
						case 'InProgress': {
							statData.name = 'In Progress';
							statData.color = '#3b436b';
							statData.legendFontColor = '#3b436b';
							break;
						}
						case 'ToDo': {
							statData.name = 'To Do';
							statData.color = '#ef7c8e';
							statData.legendFontColor = '#ef7c8e';
							break;
						}
						case 'Done': {
							statData.name = 'Done';
							statData.color = '#59981a';
							statData.legendFontColor = '#59981a';
							break;
						}
						case 'ReadyForRelease': {
							statData.name = 'Ready For Release';
							statData.color = '#bca88e';
							statData.legendFontColor = '#bca88e';
							break;
						}

						case 'Released': {
							statData.name = 'Released';
							statData.color = '#9da993';
							statData.legendFontColor = '#9da993';
							break;
						}
						case 'Testing': {
							statData.name = 'Testing';
							statData.color = '#d3bbdd';
							statData.legendFontColor = '#d3bbdd';
							break;
						}
						case 'Validating': {
							statData.name = 'Validating';
							statData.color = '#f41f4e';
							statData.legendFontColor = '#f41f4e';
							break;
						}
					}

					sprintStats.push(statData);
					setPieChartDataLoading(false);

				});
				setPieChartData(sprintStats);
			})
			.catch((err: any) => {
				console.error('api/sprint/getCurrentSprintStats',err);
			});
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


	const getTaskInfo = (): any => {
		let retrievedValue = (<View style={styles.loadingContainer}>
			<ActivityIndicator size="large" color="#d81e05"/>
		</View>);

		if (!loading) {
			retrievedValue = (
				<FlatList

					keyExtractor={(item, index) => index.toString()}
					data={tasks || []}
					ItemSeparatorComponent={FlatListItemSeparator}
					initialNumToRender={tasks?.length || 0}
					renderItem={({item}) => (
						<View style={{
							padding: 5,
							marginBottom: 10,
							borderBottomColor: '#262626',
							borderBottomWidth: 1,
							backgroundColor: '#fff',
						}}><Pressable
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
							onPress={() => {
								_storeData('taskInfo', JSON.stringify(item));
								// @ts-ignore
								navigation.navigate('viewTask');
							}}
						>
							<Text>{item.project.projectTitle.replace(' ', '_') + '-' + item.taskID} ({item.taskStatus})</Text>
							<IconAnt name={'arrowright'} color={'#262626'} size={25}/>
						</Pressable>
						</View>

					)}

				/>
			)
		}
		return retrievedValue;

	}

	const getPieChart = (): any => {
		let retrievedValue = (<View style={styles.loadingContainer}>
			<ActivityIndicator size="large" color="#d81e05"/>
		</View>);

		if (!pieChartDataLoading) {
			retrievedValue = (<PieChart
				data={pieChartData}
				width={screenWidth}
				height={200}
				chartConfig={chartConfig}
				accessor={'value'}
				backgroundColor={'transparent'}
				center={[0, 0]}
				hasLegend={true}
				paddingLeft={'15'}

			/>);
		}
		return retrievedValue;
	}


	const getEmployeeTaskInfo = (): any => {
		let retrievedValue = (<></>);

		if (!loading && userInfo && userInfo.roles.includes('EMPLOYEE')) {
			retrievedValue = (<View>
				<Text style={{marginBottom: 10, marginTop: 10, fontWeight: 'bold'}}>My Sprint Tasks:</Text>
				<FlatList
					style={{
						minHeight: Dimensions.get('screen').height - Dimensions.get('screen').height * 0.85,
						maxHeight: Dimensions.get('screen').height - Dimensions.get('screen').height * 0.7
					}}
					keyExtractor={(item, index) => index.toString()}
					data={myTasks || []}
					ItemSeparatorComponent={FlatListItemSeparator}
					initialNumToRender={myTasks?.length || 0}
					renderItem={({item}) => (
						<View style={{
							padding: 5,
							marginBottom: 10,
							borderBottomColor: '#262626',
							borderBottomWidth: 1,
							backgroundColor: '#fff',
						}}><Pressable
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
							onPress={() => {
								_storeData('taskInfo', JSON.stringify(item));
								// @ts-ignore
								navigation.navigate('viewTask');
							}}
						>
							<Text>{item.project.projectTitle.replace(' ', '_') + '-' + item.taskID} ({item.taskStatus})</Text>
							<IconAnt name={'arrowright'} color={'#262626'} size={25}/>
						</Pressable>
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
					Sprint Information</Text>
			</View>
			<View style={{padding: 15, paddingRight: 0}}>
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
				<ScrollView
					style={{maxHeight: Dimensions.get('screen').height - 320, paddingBottom: 15, paddingRight: 15}}>
					<View>
						<Text style={{marginBottom: 10, marginTop: 10, fontWeight: 'bold'}}>Sprint Title:</Text>
						<Text>{sprintInfo.sprintTitle || ''}</Text>
					</View>
					<View>
						<Text style={{marginBottom: 10, marginTop: 10, fontWeight: 'bold'}}>Sprint Type:</Text>
						<Text>{sprintInfo.sprintTypes || ''}</Text>
					</View>
					<View>
						<Text style={{marginBottom: 10, marginTop: 10, fontWeight: 'bold'}}>Sprint Status:</Text>
						<Text>{sprintInfo.status || ''}</Text>
					</View>

					<View>
						<Text style={{marginBottom: 10, marginTop: 10, fontWeight: 'bold'}}>Sprint Start Date:</Text>
						<Text>{new Date(sprintInfo.sprintStartDate).toLocaleDateString() || ''}</Text>
					</View>

					<View>
						<Text style={{marginBottom: 10, marginTop: 10, fontWeight: 'bold'}}>Sprint End Date:</Text>
						<Text>{new Date(sprintInfo.sprintEndDate).toLocaleDateString() || ''}</Text>
					</View>

					<View>
						<Text style={{marginBottom: 10, marginTop: 10, fontWeight: 'bold'}}>Project:</Text>
						<Text>{sprintInfo.project?.projectTitle || ''}</Text>
					</View>
					<Text style={{marginBottom: 10, marginTop: 10, fontWeight: 'bold'}}>Sprint Backlog:</Text>

					{getTaskInfo()}


					{getEmployeeTaskInfo()}

					<View>
						<Text style={{marginBottom: 10, marginTop: 10, fontWeight: 'bold'}}>Sprint Latest Stats:</Text>

						{getPieChart()}
					</View>
				</ScrollView>
				<View>

				</View>

			</View>
		</SafeAreaView>
	);
};
export default ViewSprint;


const styles = StyleSheet.create({
	customMargin: {
		marginTop: 15,
		paddingBottom: 0,
		marginBottom: 0,
	},
	loadingContainer: {
		display: 'flex',
		height: 200,
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
		padding: 15,
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
		width: '50%',
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
		backgroundColor: '#6e6e6e',
	},
	update: {
		backgroundColor: '#1f9683',
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
	},
	textModal: {
		textAlign: "center",
		fontSize: 18
	}
});
