import * as React from 'react';
import {Dimensions, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {_retrieveData, _storeData} from "../../utils";
import axios from "axios";
import Environment from "../../Environment";

const SprintList = (props: any) => {
	const navigation = useNavigation();
	const [sprints, setSprints] = useState<any>({});
	const [userInfo, setUserInfo] = useState(null);

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
			})
			.catch((err: any) => {
				console.error(err);
			});
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
				getProjectManagersSprint(parsedInfo.email);
			}

		});
	}, [props])

	return (<View style={{padding: 15}}>
		<Pressable
			style={({pressed}) => [{opacity: pressed ? 1 : 0.8}, {
				backgroundColor: '#45b1b1',
				padding: 15,
				marginBottom: 15
			}]}
			onPress={() => {
				// @ts-ignore
				navigation.navigate('addSprint')
			}}>
			<Text style={{color: '#fff', textAlign: 'center'}}>Create New Sprint</Text>
		</Pressable>
		<ScrollView style={{height: Dimensions.get('screen').height - 250}}>
			<View>
				<Text>Current Sprints:</Text>
				<FlatList
					style={{height: Dimensions.get('screen').height - Dimensions.get('screen').height * 0.65}}
					keyExtractor={(item, index) => index.toString()}
					data={sprints?.currentSprints || []}
					ItemSeparatorComponent={FlatListItemSeparator}
					initialNumToRender={sprints?.currentSprints?.length || 0}
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
							<View style={{paddingLeft: 15, paddingRight: 15, marginBottom: 5,
								flexDirection: 'row',
								justifyContent: 'space-between'}}>
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
			</View>

			<View>
				<Text>Previous Sprints:</Text>
				<FlatList
					style={{height: Dimensions.get('screen').height - Dimensions.get('screen').height * 0.65}}
					keyExtractor={(item, index) => index.toString()}
					data={sprints?.previousSprints || []}
					ItemSeparatorComponent={FlatListItemSeparator}
					initialNumToRender={sprints?.previousSprints?.length || 0}
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
									}}>                                {item.sprintTypes}
									</Text>
								</View>
							</View>
							<View style={{paddingLeft: 15, paddingRight: 15, marginBottom: 5}}>
								<Text style={{
									fontWeight: 'bold'
								}}>Summary: {item.status?.sprintStatusTitle}</Text>
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
								}}>Start Date: {new Date(item.sprintStartDate).toLocaleDateString()}</Text>
								<Text style={{
									fontWeight: 'bold'
								}}>End Date: {new Date(item.sprintEndDate).toLocaleDateString()}</Text>
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

			</View>
		</ScrollView>
	</View>);
};
export default SprintList;


const styles = StyleSheet.create({
	customMargin: {
		marginTop: 15,
		paddingBottom: 0,
		marginBottom: 0,
	},
	loadingContainer: {
		display: 'flex',
		height: Dimensions.get('screen').height - 350,
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
		backgroundColor: '#3b436b',
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
