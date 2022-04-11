import * as React from 'react';
import {ActivityIndicator, Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import AddCategory from "../category/AddCategory";
import {getFocusedRouteNameFromRoute, useIsFocused} from "@react-navigation/native";
import Category from "../category/CategoryList";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import AddPriority from "./addPriority";
import {useEffect, useState} from "react";
import axios from "axios";
import Environment from "../../Environment";



const PriorityList = (props:any) => {
	const [priorities, setPriorities] = useState<any[]>([]);
const [loading,setLoading] = useState(true);
	const getPriorities = () => {
		setLoading(true);
			// Update the document title using the browser API
				axios({
					method: 'GET',
					url: `${Environment.API_URL}/api/priority/all`,
					headers: {
						'Content-Type': 'application/json',
						useQueryString: false,
					},
					params: {},
				})
					.then(response => {
						console.log(response.data)
						setPriorities(response.data);
						setLoading(false);
					})
					.catch((err: any) => {
						console.error(err);

					});
	};

	useEffect(() => {
		getPriorities();
	}, [props]);

	const removeItem = (priorityID: Number) => {
		axios({
			method: 'DELETE',
			url: `${Environment.API_URL}/api/priority/delete/` + priorityID,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then((response: any) => {
				useEffect(() => {
					getPriorities();
				}, [props]);
			})
			.catch((err: any) => {
			});
	};

	const updateItem = (priorityID: Number) => {
		// navigation.navigate('Home', {id: projectID});
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
	const isFocused = useIsFocused();





	const getLatestPriorities = () => {
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
						style={{height:Dimensions.get('window').height-300}}

						keyExtractor={(item, index) => index.toString()}
						data={priorities}
						ItemSeparatorComponent={FlatListItemSeparator}
						initialNumToRender={priorities.length}
						renderItem={({item}) => (
							<View style={styles.project}>
								<Text style={styles.text}>
									Priority Title : {item.priorityTitle}
								</Text>
								<View style={styles.buttonWrapper}>
									<Pressable
										style={[styles.button, styles.delete]}
										onPress={() => {
											removeItem(item.priorityID);
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
										style={[styles.button, styles.borderButton, styles.update]}
										onPress={() => {
											//updateItem(item.priorityID);
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
return getLatestPriorities();
};
export default PriorityList;

const styles = StyleSheet.create({
	customMargin: {
		marginTop: 15,
		paddingBottom: 0,
		marginBottom: 0,
	},
	loadingContainer: {
		display: 'flex',
		height: Dimensions.get('window').height-300,
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
	}
});
