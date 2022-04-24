import * as React from 'react';
import {
	Dimensions,
	Pressable, ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {_retrieveData, _storeData} from "../../utils";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconAnt from 'react-native-vector-icons/AntDesign';


const SprintList = (props: any) => {
	const navigation = useNavigation();
	const [userInfo, setUserInfo] = useState<any>(null);


	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				setUserInfo(parsedInfo);
			}
		});
	}, [props]);


	const createNewSprint = (): any => {
		let returnedValue: any = (<></>);

		if (userInfo && userInfo.roles && userInfo.roles.includes('MANAGER')) {

			returnedValue = (
				<View style={{width: '100%', padding: 15, height: 90}}>

					<Pressable
						style={({pressed}) => [{opacity: pressed ? 1 : 0.8}, {
							backgroundColor: '#45b1b1',
							padding: 15,
							marginBottom: 5,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center', height: '100%'
						}]}
						onPress={() => {
							// @ts-ignore
							navigation.navigate('addSprint')
						}}>
						<Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold', paddingRight: 15}}>Create
							New Sprint</Text>
						<IconAnt name={'plus'} color={'#fff'} size={25}/>

					</Pressable>
				</View>)
		}
		return returnedValue;
	}
	return (<View style={{
		padding: 15, height: Dimensions.get('screen').height - 350, justifyContent: "center",
	}}>
		<ScrollView contentContainerStyle={{justifyContent: "center", height: "100%"}}>
			{createNewSprint()}
			<View style={{width: '100%', padding: 15, height: 90}}>
				<Pressable
					style={({pressed}) => [{opacity: pressed ? 1 : 0.8}, {
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
						navigation.navigate('currentSprint')
					}}>
					<Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold', paddingRight: 15}}>Consult
						Current Sprints By Project</Text>
					<IconAnt name={'arrowright'} color={'#fff'} size={25}/>

				</Pressable>
			</View>
			<View style={{width: '100%', padding: 15, height: 90}}>
				<Pressable
					style={({pressed}) => [{opacity: pressed ? 1 : 0.8}, {
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
						navigation.navigate('plannedSprint')
					}}>
					<Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold', paddingRight: 15}}>Consult
						Planned Sprints By Project</Text>
					<IconAnt name={'arrowright'} color={'#fff'} size={25}/>
				</Pressable>
			</View>

			<View style={{width: '100%', padding: 15, height: 90}}>
				<Pressable
					style={({pressed}) => [{opacity: pressed ? 1 : 0.8}, {
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
						navigation.navigate('previousSprint')
					}}>
					<Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold', paddingRight: 15}}>Consult
						Previous Sprints By Project</Text>
					<IconAnt name={'arrowright'} color={'#fff'} size={25}/>
				</Pressable>
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
