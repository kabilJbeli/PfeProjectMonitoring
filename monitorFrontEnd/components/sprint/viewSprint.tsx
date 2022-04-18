import * as React from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import {useNavigation} from "@react-navigation/native";

const ViewSprint = () => {
	const navigation = useNavigation();


	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#45b1b1'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Sprint Information</Text>
			</View>
			<View style={{padding:15}}>
				<View>
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
<View>

</View>

			</View>
		</SafeAreaView>
	);
};
export default ViewSprint;
