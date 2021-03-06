import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {BarChart, LineChart, PieChart} from "react-native-chart-kit";
import axios from "axios";
import Environment from "../../Environment";
import {_retrieveData, _storeData} from "../../utils";
import IconAnt from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";

const chartConfig = {
	backgroundGradientFrom: '#fff',
	backgroundGradientFromOpacity: 0,
	backgroundGradientTo: '#fff',
	backgroundGradientToOpacity: 0.5,
	decimal: 0,
	color: (opacity = 1) => `rgba(0, 163, 204, ${opacity})`,
	labelColor: (opacity = 1) => `rgba(39, 40, 34, ${opacity})`,
	strokeWidth: 2,
	useShadowColorFromDataset: false,
};

const screenWidth = Dimensions.get('window').width;

export const DashboardCharts = (props: any) => {
	const [projectStatus, setProjectStatus] = useState<any[]>([]);
	const [projectStatusLabel, setProjectStatusLabel] = useState<any[]>([]);
	const [userInfo, setUserInfo] = useState<any>({});
	const [memberInfo, setMemberInfo] = useState<any>({});
	const [totalTasks, setTotalTasks] = useState<number>(0);
	const [loadingProject, setLoadingProject] = useState<boolean>(true);
	const [loadingSprint, setLoadingSprint] = useState<boolean>(true);
	const [loadingRiskyTasks, setLoadingRiskyTasks] = useState<boolean>(true);
	const [loadingPercentage, setLoadingPercentage] = useState<boolean>(true);


	const [riskyTasks, setRiskyTasks] = useState<any[]>([]);
	const navigation = useNavigation();
	const [pieChartData, setPieChartData] = useState<any[]>([]);

	const getAdministratorRiskyTasks = (role: string, email: string) => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/dashbord/getRiskyTask?role=${role}&email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setRiskyTasks(response.data);
				setLoadingRiskyTasks(false);
			})
			.catch((err: any) => {
				console.error('/api/dashbord/getRiskyTask?role', err);
			});
	}

	const getTotalNumberOfTasks = (role: string, email: string) => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/task/getTotalNumberOfTasks?role=${role}&email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setTotalTasks(response.data);
				setLoadingPercentage(false);
			})
			.catch((err: any) => {
				console.error('api/task/getTotalNumberOfTasks', err);
			});
	}


	const getSprintStats = (role: string, email: string): any => {
		const sprintStats: any[] = [];

		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/sprint/getProjectSprintStats?role=${role}&email=${email}`,
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
						case 'Created': {
							statData.name = 'Created';
							statData.color = '#00a3cc';
							statData.legendFontColor = '#00a3cc';
							break;
						}
						case 'Done': {
							statData.name = 'Done';
							statData.color = '#59981a';
							statData.legendFontColor = '#59981a';
							break;
						}
					}
					setLoadingSprint(false);
					sprintStats.push(statData);

				});
				setPieChartData(sprintStats);
			})
			.catch((err: any) => {
				console.error('api/sprint/getProjectSprintStats', err);
			});
	}

	const getAdministratorProjectStatus = () => {
		const localProjectStatus: any[] = [];
		const localProjectStatusLabel: any[] = [];
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/dashbord/projectStatutsstats`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				response.data.map((item: any) => {
					localProjectStatusLabel.push(getLabel(item.description));
					localProjectStatus.push(item.number);
				});

				setLoadingProject(false);
				setProjectStatusLabel(localProjectStatusLabel);
				setProjectStatus(localProjectStatus);
			})
			.catch((err: any) => {
				console.error('api/dashbord/projectStatutsstats', err);
			});
	}

	const getManagerProjectStatus = (manager: any) => {
		const localProjectStatus: any[] = [];
		const localProjectStatusLabel: any[] = [];
		axios({
			method: 'POST',
			url: `${Environment.API_URL}/api/dashbord/projectStatutsstatsperManager`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
			data: manager
		})
			.then(response => {
				response.data.map((item: any) => {
					localProjectStatusLabel.push(getLabel(item.description));
					localProjectStatus.push(item.number);
				});
				setLoadingProject(false);

				setProjectStatusLabel(localProjectStatusLabel);
				setProjectStatus(localProjectStatus);
			})
			.catch((err: any) => {
				console.error('api/dashbord/projectStatutsstatsperManager', err);
			});
	}

	const getEmployeeProjectStatus = (employee: any) => {
		const localProjectStatus: any[] = [];
		const localProjectStatusLabel: any[] = [];
		axios({
			method: 'POST',
			url: `${Environment.API_URL}/api/dashbord/projectStatutsstatsperEmployee`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
			data: employee
		})
			.then(response => {
				response.data.map((item: any) => {
					localProjectStatusLabel.push(getLabel(item.description));
					localProjectStatus.push(item.number);
				});
				setLoadingProject(false);

				setProjectStatusLabel(localProjectStatusLabel);
				setProjectStatus(localProjectStatus);
			})
			.catch((err: any) => {
				console.error('api/dashbord/projectStatutsstatsperEmployee', err);
			});
	}
	const getLabel = (label: string): string => {
		let transferedLabel: string = '';
		switch (label) {
			case 'InMaintenance': {
				transferedLabel = 'In Maintenance';
				break;
			}
			case 'InProgress': {
				transferedLabel = 'In Progress';
				break;
			}
			default: {
				transferedLabel = label;
				break;
			}
		}
		return transferedLabel;
	}
	const getClientProjectStatus = (client: any) => {
		const localProjectStatus: any[] = [];
		const localProjectStatusLabel: any[] = [];
		axios({
			method: 'POST',
			url: `${Environment.API_URL}/api/dashbord/projectStatutsstatsperCustomer`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
			data: client
		})
			.then(response => {
				response.data.map((item: any) => {
					localProjectStatusLabel.push(getLabel(item.description));
					localProjectStatus.push(item.number);
				});
				setLoadingProject(false);
				setProjectStatusLabel(localProjectStatusLabel);
				setProjectStatus(localProjectStatus);
			})
			.catch((err: any) => {
				console.error('api/dashbord/projectStatutsstatsperCustomer', err);
			});
	}


	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				setUserInfo(parsedInfo);
				getMember(parsedInfo.email);
			}
		});
	}, [props]);


	const getMember = (email: string) => {
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
				_storeData('connectedMemberInfo', JSON.stringify(response.data));

				setMemberInfo(response.data);
				if (response.data.role === 'ADMINISTRATOR') {
					getAdministratorProjectStatus();
					getAdministratorRiskyTasks('ADMINISTRATOR', email);
					getTotalNumberOfTasks('ADMINISTRATOR', email);
					getSprintStats('ADMINISTRATOR', email);
				} else if (response.data.role === 'CLIENT') {
					getClientProjectStatus(response.data);
					getAdministratorRiskyTasks('CLIENT', email);
					getTotalNumberOfTasks('CLIENT', email);
					getSprintStats('CLIENT', email);
				} else if (response.data.role === 'EMPLOYEE') {
					getEmployeeProjectStatus(response.data);
					getAdministratorRiskyTasks('EMPLOYEE', email);
					getTotalNumberOfTasks('EMPLOYEE', email);
					getSprintStats('EMPLOYEE', email);
				} else if (response.data.role === 'MANAGER') {
					getManagerProjectStatus(response.data);
					getAdministratorRiskyTasks('MANAGER', email);
					getTotalNumberOfTasks('MANAGER', email);
					getSprintStats('MANAGER', email);
				}
			})
			.catch((err: any) => {
				console.error('api/member/getMemberByEmail', err);
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

	const getPercentage = (): string => {
		let returnedValue: any;

		if (loadingPercentage) {
			returnedValue = (<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#d81e05"/>
			</View>);
		} else {
			const percentage = (riskyTasks.length * 100) / totalTasks;
			if (totalTasks && totalTasks !== null && riskyTasks.length !== null && percentage !== null) {
				returnedValue = Math.round(percentage) + '%';
			} else {
				returnedValue = '0%';
			}
		}
		return returnedValue;
	}

	const getProjectByStatus = (): any => {
		let returnedValue: any;
		if (loadingProject) {
			returnedValue = (<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#d81e05"/>
			</View>);
		} else {
			returnedValue = (<BarChart
				fromZero={true}
				data={{
					labels: projectStatusLabel,
					datasets: [
						{
							data: projectStatus,
							strokeWidth: 0
						}
					]
				}}
				width={screenWidth}
				height={300}
				yAxisLabel=""
				yAxisSuffix=""
				yAxisInterval={1}
				chartConfig={chartConfig}
				showValuesOnTopOfBars={true}
				withHorizontalLabels={true}
				style={{paddingRight: 0, paddingLeft: 0}}
			/>)
		}

		return returnedValue
	}


	const getRiskyTasks = ():any=>{

		let returnedValue: any;
		if (loadingRiskyTasks && memberInfo.role !=="ADMINISTRATOR") {
			returnedValue = (
				<View>
					<Text style={{paddingBottom: 10}}>Risky tasks:</Text>
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#d81e05"/>
					</View>
				</View>
				);
		} else if(memberInfo.role !=="ADMINISTRATOR") {
			returnedValue = (
				<View>
					<Text style={{paddingBottom: 10}}>Risky tasks:</Text>
				<FlatList
					keyExtractor={(item, index) => index.toString()}
					data={riskyTasks || []}
					ItemSeparatorComponent={FlatListItemSeparator}
					initialNumToRender={riskyTasks?.length || 0}
					renderItem={({item}) => (
						<View style={{
							padding: 5,
							marginBottom: 15,
							borderBottomColor: '#00a3cc',
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
							<Text style={{
								color: '#00a3cc',
								fontWeight: 'bold'
							}}>{item.project.projectTitle.replace(' ', '_') + '-' + item.taskID} ({item.taskStatus})</Text>
							<IconAnt name={'arrowright'} color={'#00a3cc'} size={25}/>
						</Pressable>
						</View>

					)}

				/>
				</View>
				)
		}else if(memberInfo.role ==="ADMINISTRATOR") {
			returnedValue = (
				<View>

			</View>);
		}

		return returnedValue
	}


	const getSprintByStatus = (): any => {
		let returnedValue: any;
		if (loadingSprint) {
			returnedValue = (<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#d81e05"/>
			</View>);
		} else {
			returnedValue = (
				<PieChart
					data={pieChartData}
					width={screenWidth}
					height={200}
					chartConfig={chartConfig}
					accessor={'value'}
					backgroundColor={'transparent'}
					center={[0, 0]}
					hasLegend={true}
					paddingLeft={'15'}

				/>)
		}

		return returnedValue
	}
	return (
		<View style={{paddingBottom: 30}}>
			<View style={{width: '100%',marginBottom:15, height: 50}}>
				<Pressable
					style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, {
						backgroundColor: '#45b1b1',
						padding: 15,
						marginBottom: 5,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%'
					}]}
					onPress={() => {
						// @ts-ignore
						navigation.navigate('generateReport')
					}}>
					<Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold', paddingRight: 15}}>
						Consult/Generate Reports</Text>
					<IconAnt name={'arrowright'} color={'#fff'} size={25}/>
				</Pressable>
			</View>
			<View>
				<Text style={{paddingBottom: 10}}>Projects by status:</Text>
				{getProjectByStatus()}
			</View>
			<View>
				<Text>Sprints by status:</Text>
				{getSprintByStatus()}
			</View>
			<View>
				<Text style={{paddingBottom: 10}}>Percentage of risky tasks of total tasks:</Text>
				<View style={{
					width: '100%', alignItems: 'center', justifyContent: 'center', minHeight: 150
				}}>
					<Text style={{fontWeight: 'bold', fontSize: 48}}>{ getPercentage()}</Text>
				</View>
			</View>
			<View>

				{getRiskyTasks()}
			</View>
		</View>
	);
}

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
});
