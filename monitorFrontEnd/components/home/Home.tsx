import * as React from 'react';
import {Text, Image, SafeAreaView, StyleSheet, View, Pressable, ScrollView, Dimensions} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Images from "../../assets/Images";
import {useEffect, useState} from "react";
import {_retrieveData, _storeData} from "../../utils";
import axios from "axios";
import Environment from "../../Environment";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather'
import {useKeycloak} from "@react-keycloak/native";


const Home = (props: any) => {
	const [userInfo, setUserInfo] = useState<any>(null);
	const [member, setMember] = useState<any>({});
	const {keycloak, initialized} = useKeycloak();

	const navigation = useNavigation();

	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			console.log('userInfo Called')
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				setUserInfo(parsedInfo);
				getMemberInformation(parsedInfo.email);
			}

		});
	}, [props]);


	const getMemberInformation = (email: string) => {
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
				setMember(response.data);

			})
			.catch((err: any) => {
				console.error(err);
			});

	}

	const gotTo = (page: string) => {
		console.log(page);
// @ts-ignore
		navigation.navigate(page);
	}

	const getRole = (): string => {
		if (member) {
			return member.role
		} else {
			return ''
		}
	}

	const getUserName = (): string => {
		if (userInfo) {
			return userInfo.name
		} else {
			return ''
		}
	}
	const logout = () => {
		keycloak?.logout().then(response => {
		}).catch(err => {
			console.error('Logout Error: ', err)
		})
	}

	const getSprintAndTaskConditionalRendering = (): any => {
		let returnedValue: any = (<></>);
		if (userInfo && (userInfo.roles.includes('EMPLOYEE') || userInfo.roles.includes('CLIENT') || userInfo.roles.includes('MANAGER'))) {
			returnedValue = (<>
				<View style={styles.box}>
					<Pressable
						onPress={() => {
							gotTo('Sprint');
						}}
						style={({pressed}) => [{opacity: pressed ? 1 : 0.85}, styles.btn]}
					>
						<View style={styles.iconWrapper}
						>
							<Icon name="view-module" size={25} color={'#fff'}/>
						</View>

						<Text style={styles.boxText}>Sprints Screen</Text>
					</Pressable>
				</View>
				<View style={styles.box}>
					<Pressable
						onPress={() => {
							gotTo('Task');
						}}
						style={({pressed}) => [{opacity: pressed ? 1 : 0.85}, styles.btn]}
					>
						<View style={styles.iconWrapper}>

							<Icon name="animation" size={25} color={'#fff'}/>
						</View>

						<Text style={styles.boxText}>Tasks Screen</Text>
					</Pressable>
				</View>
			</>);
		}

		return returnedValue;
	}

const getClientTaskScreen = ():any=>{
	let returnedValue=(<></>);
	if (userInfo &&  userInfo.roles.includes('MANAGER')) {

		returnedValue = (<View style={styles.box}>
			<Pressable
				onPress={() => {
					gotTo('ClientTask');
				}}
				style={({pressed}) => [{opacity: pressed ? 1 : 0.85}, styles.btn]}
			>
				<View style={styles.iconWrapper}>
					<Icon name="ticket-outline" size={25} color={'#fff'}/>
				</View>

				<Text style={styles.boxText}>Client Tasks Screen</Text>
			</Pressable>
		</View>);
	}
	return returnedValue;
}
	const getAddUserConditionalRendering = (): any => {
		let returnedValue: any = (<></>);
		if (userInfo && userInfo.roles.includes("ADMINISTRATOR")) {
			returnedValue = (
				<>
					<View style={styles.box}>
						<Pressable
							onPress={() => {
								gotTo('Category');
							}}
							style={({pressed}) => [{opacity: pressed ? 1 : 0.85}, styles.btn]}
						>
							<View style={styles.iconWrapper}>
								<Icon name="animation" size={25} color={'#fff'}/>
							</View>
							<Text style={styles.boxText}>Category Screen</Text>
						</Pressable>
					</View>
					<View style={styles.box}>
						<Pressable
							onPress={() => {
								gotTo('Priority');
							}}
							style={({pressed}) => [{opacity: pressed ? 1 : 0.85}, styles.btn]}
						>
							<View style={styles.iconWrapper}>
								<Icon name="animation" size={25} color={'#fff'}/>
							</View>
							<Text style={styles.boxText}>Priorities Screen</Text>
						</Pressable>
					</View>
					<View style={styles.box}>
						<Pressable
							onPress={() => {
								gotTo('User');
							}}
							style={({pressed}) => [{opacity: pressed ? 1 : 0.85}, styles.btn]}
						>
							<View style={styles.iconWrapper}>
								<IconFeather name="user-plus" size={25} color={'#fff'}/>
							</View>
							<Text style={styles.boxText}>Users Screen</Text>
						</Pressable>
					</View>
				</>
			);
		}
		return returnedValue;
	}

	const getConditionalProjectRendering = (): any => {
		let returnedValue: any = (<></>);
		if (userInfo && !userInfo.roles.includes('EMPLOYEE')) {
			returnedValue = (<View style={styles.box}>
				<Pressable
					onPress={() => {
						gotTo('Project');
					}}
					style={({pressed}) => [{opacity: pressed ? 1 : 0.85}, styles.btn]}
				>
					<View style={styles.iconWrapper}>

						<Icon name="view-list" size={25} color={'#fff'}/>
					</View>

					<Text style={styles.boxText}>Projects Screen</Text>
				</Pressable>
			</View>);
		}

		return returnedValue;
	}


	const getConditionalDisplay = (): any => {
		return (<ScrollView style={styles.scrollView}>
			<View style={styles.boxWrapper}>
				<View style={styles.box}>
					<Pressable
						onPress={() => {
							gotTo('Dashboard');
						}}
						style={({pressed}) => [{opacity: pressed ? 1 : 0.85}, styles.btn]}
					>
						<View style={styles.iconWrapper}>
							<Icon name="view-dashboard" size={25} color={'#fff'}/>
						</View>
						<Text style={styles.boxText}>Dashboard Screen</Text>
					</Pressable>
				</View>
				{getConditionalProjectRendering()}
				{getAddUserConditionalRendering()}
				{getSprintAndTaskConditionalRendering()}
				{getClientTaskScreen()}
				<View style={styles.box}>
					<Pressable
						onPress={() => {
							gotTo('Profile');
						}}
						style={({pressed}) => [{opacity: pressed ? 1 : 0.85}, styles.btn]}

					>
						<View style={styles.iconWrapper}>

							<Icon name="account" size={26} color={'#fff'}/>
						</View>

						<Text style={styles.boxText}>Profile Screen</Text>
					</Pressable>
				</View>
			</View>
			{/*
					<View style={styles.boxWrapper}>
				<View style={styles.logoutBox}>
					<Pressable
						onPress={() => {
							logout();
						}}
						style={({pressed}) => [{opacity: pressed ? 1 : 0.85}, styles.logoutBtn]}

					>
						<Text style={styles.logoutText}>Logout</Text>

					</Pressable>
				</View>
			</View>
 */}
		</ScrollView>)

	}

	return (
		<SafeAreaView>
			<View style={styles.logoContainer}>
				<Image
					source={Images.logoBlack}
					resizeMode={'contain'}
					style={{
						width: '70%',
						height: 100,
					}}
				/>
			</View>
			<View>
				<Text style={styles.welcomeText}>Welcome <Text
					style={{fontWeight: 'bold', fontSize: 17}}>{getUserName()}</Text> To Your <Text
					style={{fontWeight: 'bold', fontSize: 17}}>{getRole()}</Text> Portal!</Text>
			</View>
			{getConditionalDisplay()}
		</SafeAreaView>
	);
};
export default Home;
const styles = StyleSheet.create({
	logoContainer: {
		width: '100%',
		justifyContent: "center",
		alignItems: "center",
		height: 'auto'
	},
	welcomeText: {
		width: '100%',
		textAlign: 'center',
		fontSize: 16
	},
	boxWrapper: {
		flexDirection: 'row',
		justifyContent: "space-between",
		marginTop: 15,
		flexWrap: 'wrap',
		width: '100%'
	},
	box: {
		width: '50%',
		padding: 15,
		display: 'flex',
		flexDirection: 'column',

	},
	logoutBox: {
		width: '100%',
		padding: 15,
	},
	btn: {
		backgroundColor: '#262626',
		width: '100%',
		padding: 15,
		justifyContent: 'center',
		height: 'auto',
	},
	boxText: {
		color: '#fff',
		textAlign: 'center',
		padding: 5,
		fontSize: 14
	},
	logoutBtn: {
		backgroundColor: '#d81e05',
		width: '100%',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logoutText: {
		color: '#fff',
		fontSize: 18
	},
	iconWrapper: {
		flexDirection: 'row',
		alignItems: "center",
		justifyContent: 'center'
	},
	scrollView: {
		height: Dimensions.get('screen').height - 200
	}
});
