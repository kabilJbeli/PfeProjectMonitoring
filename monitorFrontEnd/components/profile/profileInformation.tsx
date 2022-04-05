import * as React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

const ProfileInformation = () => {
	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#2c65c9'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Profile Information</Text>
			</View>
		</SafeAreaView>
	);
};
export default ProfileInformation;
