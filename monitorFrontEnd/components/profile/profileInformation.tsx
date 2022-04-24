import * as React from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import {_retrieveData} from "../../utils";
import axios from "axios";
import Environment from "../../Environment";
import {createStackNavigator} from "@react-navigation/stack";
import CreateSprint from "../sprint/addSprint";
import ViewSprint from "../sprint/viewSprint";
import ViewTask from "../task/viewTask";
import Sprint from "../sprint/Sprint";
import ChangePasswordComponent from "./changePassword";
import {useNavigation} from "@react-navigation/native";



const Stack = createStackNavigator();

export const MainProfileStack = (props: any) => {
	return (
		<Stack.Navigator initialRouteName="profile"

		>
			<Stack.Screen name="profile" component={ProfileInformation}
						  {...props}
						  options={{
							  headerShown: false,
						  }}
			/>
			<Stack.Screen name="changePassword" component={ChangePasswordComponent}
						  {...props}
						  options={{
							  title: 'Change Password',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>
		</Stack.Navigator>
	);
}


const ProfileInformation = (props: any) => {
	const [userInfo, setUserInfo] = useState<any>({});
	const [member, setMember] = useState<any>({});
	const navigation = useNavigation();

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
				console.log(response.data)
				setMember(response.data);
			})
			.catch((err: any) => {
				console.error(err);
			});
	}

	const getUserName = (): string => {
		return userInfo.name || '';
	}
	const getEmail = (): string => {
		return userInfo.email || '';
	}

	const getRole = (): string => {
		let role = '';

		if (userInfo !== null && userInfo.roles && userInfo.roles.includes('MANAGER')) {
			role = 'Manager'
		} else if (userInfo !== null && userInfo.roles && userInfo.roles.includes('ADMINISTRATOR')) {
			role = 'Administrator'
		} else if (userInfo !== null && userInfo.roles && userInfo.roles.includes('CLIENT')) {
			role = 'Client'
		} else if (userInfo !== null && userInfo.roles && userInfo.roles.includes('EMPLOYEE')) {
			role = 'Employee'
		}

		return role;

	}
	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#2c65c9'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					{getUserName()}</Text>
				<Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
					{getEmail()}</Text>
			</View>
			<View>
				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>First Name:</Text>
					<Text>{userInfo?.firstName || ''}</Text>
				</View>

				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>Last Name:</Text>
					<Text>{userInfo?.lastName || ''}</Text>
				</View>

				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>Email:</Text>
					<Text>{userInfo?.email || ''}</Text>
				</View>

				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>Current Role:</Text>
					<Text>{member?.role || ''}</Text>
				</View>

				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>Mobile Number:</Text>
					<Text>{member?.telephone || ''}</Text>
				</View>

				<View style={{paddingHorizontal: 15, padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={{fontWeight: 'bold', paddingRight: 5}}>Address:</Text>
					<Text>{member?.address || ''}</Text>
				</View>
				<View style={{paddingHorizontal: 15, padding: 10}}>
					<Pressable
						style={({pressed}) => [{opacity: pressed ? 1 : 0.8}, {
							backgroundColor: '#2c65c9',
							padding: 15,
							marginBottom: 10
						}]}
						onPress={() => {
							// @ts-ignore
							navigation.navigate('changePassword')
						}}>
						<Text style={{color: '#fff', textAlign: 'center'}}>Change Password</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
};
export default ProfileInformation;
