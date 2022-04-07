import * as React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import {_retrieveData} from "../../utils";

const ProfileInformation = (props: any) => {
	const [userInfo, setUserInfo] = useState<any>({});

	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			let parsedInfo = JSON.parse(info)
			if (parsedInfo !== undefined) {
				setUserInfo(parsedInfo);
			}
		});
	}, [props]);

	const getUserName = (): string => {
		return userInfo.name || '';
	}
	const getEmail = (): string => {
		return userInfo.email || '';
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
		</SafeAreaView>
	);
};
export default ProfileInformation;
