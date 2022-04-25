import React, {useEffect, useState} from "react";
import {Dimensions, FlatList, Pressable, ScrollView, Text, View} from "react-native";
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
			})
			.catch((err: any) => {
				console.error(err);
			});
	}

	const getTotalNumberOfTasks = () => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/task/getTotalNumberOfTasks`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setTotalTasks(response.data);
			})
			.catch((err: any) => {
				console.error(err);
			});
	}


	const getSprintStats = (): any => {
		const sprintStats: any[] = [];

		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/sprint/getProjectSprintStats`,
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

					sprintStats.push(statData);

				});
				setPieChartData(sprintStats);
			})
			.catch((err: any) => {
				console.error(err);
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
				console.log(response.data);
				response.data.map((item: any) => {
					localProjectStatusLabel.push(item.description);
					localProjectStatus.push(item.number);
				});
				setProjectStatusLabel(localProjectStatusLabel);
				setProjectStatus(localProjectStatus);
			})
			.catch((err: any) => {
				console.error(err);
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
				console.log(response.data);
				response.data.map((item: any) => {
					localProjectStatusLabel.push(item.description);
					localProjectStatus.push(item.number);
				});
				setProjectStatusLabel(localProjectStatusLabel);
				setProjectStatus(localProjectStatus);
			})
			.catch((err: any) => {
				console.error(err);
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
				console.log(response.data);
				response.data.map((item: any) => {
					localProjectStatusLabel.push(item.description);
					localProjectStatus.push(item.number);
				});
				setProjectStatusLabel(localProjectStatusLabel);
				setProjectStatus(localProjectStatus);
			})
			.catch((err: any) => {
				console.error(err);
			});
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
				console.log(response.data);
				response.data.map((item: any) => {
					localProjectStatusLabel.push(item.description);
					localProjectStatus.push(item.number);
				});
				setProjectStatusLabel(localProjectStatusLabel);
				setProjectStatus(localProjectStatus);
			})
			.catch((err: any) => {
				console.error(err);
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
		getSprintStats();
		getTotalNumberOfTasks();
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
				console.log(response.data)
				setMemberInfo(response.data);
				if (response.data.role === 'ADMINISTRATOR') {
					getAdministratorProjectStatus();
					getAdministratorRiskyTasks('ADMINISTRATOR', email);

				} else if (response.data.role === 'CLIENT') {
					getClientProjectStatus(response.data);
					getAdministratorRiskyTasks('CLIENT', email);

				} else if (response.data.role === 'EMPLOYEE') {
					getEmployeeProjectStatus(response.data);
					getAdministratorRiskyTasks('EMPLOYEE', email);

				} else if (response.data.role === 'MANAGER') {
					getManagerProjectStatus(response.data);
					getAdministratorRiskyTasks('MANAGER', email);

				}
			})
			.catch((err: any) => {
				console.error(err);
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

	const getPercentage = (): number => {
		const percentage = (riskyTasks.length * 100) / totalTasks;
		return Math.round(percentage);
	}

	return (
		<View style={{paddingBottom: 15}}>
			<View>
				<Text style={{paddingBottom: 10}}>Projects by status:</Text>
				<BarChart
					style={{
						borderRadius: 0,
						marginTop: 15
					}}
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
					width={screenWidth - 30}
					height={300}
					yAxisLabel=""
					yAxisSuffix=""
					yAxisInterval={1}
					chartConfig={chartConfig}
				/>
			</View>
			<View>
				<Text>Sprints by status:</Text>
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

				/>
			</View>
			<View>
				<Text style={{paddingBottom: 10}}>Percentage of risky tasks of total tasks:</Text>
				<View style={{
					width: '100%', alignItems: 'center', justifyContent: 'center', minHeight: 150
				}}>
					<Text style={{fontWeight: 'bold', fontSize: 48}}>{getPercentage() || 0}%</Text>
				</View>
			</View>
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
		</View>
	)

}
