import * as React from 'react';
import {Dimensions, FlatList, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import {useNavigation} from "@react-navigation/native";
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

	useEffect(() => {
		_retrieveData('sprintInfo').then((info: any) => {
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				setSprintInfo(parsedInfo);
				getTasks(parsedInfo.sprintID);
			}
		});
	}, [props]);

	const getTasks = (sprintID: number) => {
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
				setTasks(response.data);
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
	const data = [
		{
			name: "Seoul",
			population: 21500000,
			color: "rgba(131, 167, 234, 1)",
			legendFontColor: "#7F7F7F",
			legendFontSize: 15
		},
		{
			name: "Toronto",
			population: 2800000,
			color: "#F00",
			legendFontColor: "#7F7F7F",
			legendFontSize: 15
		},
		{
			name: "Beijing",
			population: 527612,
			color: "red",
			legendFontColor: "#7F7F7F",
			legendFontSize: 15
		},
		{
			name: "New York",
			population: 8538000,
			color: "#ffffff",
			legendFontColor: "#7F7F7F",
			legendFontSize: 15
		},
		{
			name: "Moscow",
			population: 11920000,
			color: "rgb(0, 0, 255)",
			legendFontColor: "#7F7F7F",
			legendFontSize: 15
		}
	];

	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#45b1b1'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Sprint Information</Text>
			</View>
			<View style={{padding: 15}}>
				<View style={{paddingBottom:10}}>
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
				<ScrollView style={{maxHeight:Dimensions.get('window').height-300}}>
					<View>
						<Text style={{marginBottom: 10, marginTop: 10,fontWeight:'bold'}}>Sprint Title:</Text>
						<Text>{sprintInfo.sprintTitle || ''}</Text>
					</View>
					<View>
						<Text style={{marginBottom: 10, marginTop: 10,fontWeight:'bold'}}>Sprint Type:</Text>
						<Text>{sprintInfo.sprintTypes || ''}</Text>
					</View>
					<View>
						<Text style={{marginBottom: 10, marginTop: 10,fontWeight:'bold'}}>Sprint Status:</Text>
						<Text>{sprintInfo.status || ''}</Text>
					</View>

					<View>
						<Text style={{marginBottom: 10, marginTop: 10,fontWeight:'bold'}}>Sprint Start Date:</Text>
						<Text>{new Date(sprintInfo.sprintStartDate).toLocaleDateString() || ''}</Text>
					</View>

					<View>
						<Text style={{marginBottom: 10, marginTop: 10,fontWeight:'bold'}}>Sprint End Date:</Text>
						<Text>{new Date(sprintInfo.sprintEndDate).toLocaleDateString() || ''}</Text>
					</View>

					<View>
						<Text style={{marginBottom: 10, marginTop: 10,fontWeight:'bold'}}>Project:</Text>
						<Text>{sprintInfo.project?.projectTitle || ''}</Text>
					</View>
					<Text style={{marginBottom: 10, marginTop: 10,fontWeight:'bold'}}>Sprint Tasks:</Text>
						<FlatList
							style={{maxHeight: Dimensions.get('screen').height - Dimensions.get('screen').height * 0.7}}
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
										flexDirection:'row',
										justifyContent:'space-between',
										alignItems:'center'
									}}
									onPress={()=>{
										_storeData('taskInfo', JSON.stringify(item));
										// @ts-ignore
										navigation.navigate('viewTask');

									}}
								>
									<Text>{item.project.projectTitle.replace(' ', '_') + '-' + item.taskID} ({item.taskStatus})</Text>
								<IconAnt name={'arrowright'} color={'#262626'} size={25}/>
								</Pressable>
								</View>)}

						/>

					<View>
						<Text style={{marginBottom: 10, marginTop: 10,fontWeight:'bold'}}>Sprint Latest Stats:</Text>
						<PieChart
							data={data}
							width={screenWidth}
							height={200}
							chartConfig={chartConfig}
							accessor={'population'}
							backgroundColor={'transparent'}
							center={[0, 0]}
							hasLegend={true}
							paddingLeft={'15'}
						/>
					</View>
				</ScrollView>
				<View>

				</View>

			</View>
		</SafeAreaView>
	);
};
export default ViewSprint;
