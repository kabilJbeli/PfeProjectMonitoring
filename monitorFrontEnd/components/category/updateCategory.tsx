import {Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import Environment from "../../Environment";
import {_retrieveData, showToastWithGravity} from "../../utils";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import IconM from "react-native-vector-icons/MaterialIcons";

export const updateCategoryComponent = (props: any) => {
	const defaultState = {
		category: {
			categoryID:null,
			categoryTitle: '',
		},
	};
	const [state, setState] = useState(defaultState);
	const navigation = useNavigation();

	const getButtonStatus = (): boolean => {
		return (
			state.category.categoryTitle === ''
		);
	};


	const updateCategory = () => {
		axios
			.put(`${Environment.API_URL}/api/category/update/${state.category?.categoryID}`, state.category)
			.then((res: any) => {
				showToastWithGravity('Task Category Successfully Updated');
				setState(defaultState);

				// @ts-ignore
				navigation.navigate('Category');
			}).catch((error: any) => {
			showToastWithGravity('An Error Has Occurred!!!');
			console.error(error);
		});
	};



	useEffect(()=>{
		_retrieveData('categoryID').then((categoryID: any) => {
			console.log(categoryID);
			getCategoryInfo(categoryID);
		});
	},[props]);

const	getCategoryInfo = (categoryID:any)=>{
	axios
		.get(`${Environment.API_URL}/api/category/${categoryID}`)
		.then((res: any) => {
			console.log(res.data)
			showToastWithGravity('Category Information Successfully Retrieved');

			setState((prevState: any) => {
				let category = Object.assign({}, prevState.category);
				category = res.data;
				return {category};
			})

		}).catch((error: any) => {
		showToastWithGravity('An Error Has Occurred!!!');
		console.error(error);
	});
	}
	return (
		<View>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#3a436c'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Update Category</Text>
			</View>
			<View style={styles.modalView}>
				<View style={{paddingBottom: 15}}>
					<View>
						<Pressable
							style={{width: 80, flexDirection: 'row'}}
							onPress={() => {
								navigation.goBack();
							}}
						><IconM name='arrow-back' size={20} color={'#000'}/>
							<Text style={{paddingLeft: 10, fontWeight: 'bold'}}
							>Go Back</Text>
						</Pressable>
					</View>
				</View>
				<View style={{width: '100%'}}>
					<Text>Task Category Title</Text>
					<Input
						leftIcon={<Icon name="tag" size={20} color={'#000'}/>}
						inputContainerStyle={styles.InputContainerStyle}
						leftIconContainerStyle={styles.LeftIconContainerStyle}
						errorStyle={styles.ErrorStyle}
						onChangeText={(text: string) =>
							setState((prevState: any) => {
								let category = Object.assign({}, prevState.category);
								category.categoryTitle = text;
								return {category};
							})
						}
						value={state.category.categoryTitle}
						autoCompleteType={false}
					/>
				</View>

				<View style={styles.columnDisplay}>
					<TouchableOpacity
						disabled={getButtonStatus()}
						style={getButtonStatus() ? styles.disabled : styles.buttonWrapper}
						onPress={() => {
							updateCategory();
						}}>
						<Text
							style={{
								textAlign: 'center',
								color: '#fff',
								fontWeight: '500',
							}}>
							Update Task Category
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.cancelWrapper}
						onPress={() => {
							// @ts-ignore
							navigation.navigate('Category');
						}}>
						<Text
							style={{
								textAlign: 'center',
								color: '#fff',
								fontWeight: '500',
							}}>
							Cancel
						</Text>
					</TouchableOpacity>

				</View>
			</View>

		</View>
	);;
};


const styles = StyleSheet.create({
	columnDisplay: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		width: '100%',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 22,
	},
	buttonWrapper: {
		backgroundColor: '#1f9683',
		padding: 10,
		opacity: 1,
		width:'100%',

	},
	cancelWrapper: {
		backgroundColor: '#c8003f',
		padding: 10,
		opacity: 1,
		marginTop:15,
		width:'100%',

	},
	disabled: {
		opacity: 0.5,
		backgroundColor: '#1f9683',
		padding: 10,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 0,
		height: '100%',
		padding: 0,
		backgroundColor: '#fff',
	},
	modalView: {
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 0,
		//alignItems: 'center',
		shadowColor: '#fff',
		borderColor: '#fff',
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 5,
		width: '100%',
		height: '100%',
	},
	button: {
		borderRadius: 0,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
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
});

