import * as React from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {DashboardCharts} from "./dashboardCharts";
import {useIsFocused} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import ViewTask from "../task/viewTask";
import ViewPDF from "../report/viewPDF";
import reportScreenComponent from "../report/reportScreen";



const Stack = createStackNavigator();

export const MainDashboardStack = (props: any) => {
	return (
		<Stack.Navigator initialRouteName="Dashboard"

		>
			<Stack.Screen name="Dashboard" component={Dashboard}
						  {...props}
						  options={{
							  headerShown: false,
						  }}
			/>
			<Stack.Screen name="viewTask" component={ViewTask}
						  {...props}
						  options={{
							  title: 'Create New Sprint',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>
			<Stack.Screen name="generateReport" component={reportScreenComponent}
						  {...props}
						  options={{
							  title: 'Condult/Generate a Report New Sprint',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>

			<Stack.Screen name="viewPDF" component={ViewPDF}
						  {...props}
						  options={{
							  title: 'View PDF Content',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>

		</Stack.Navigator>
	);
}

const Dashboard = (props: any) => {
	const isFocused = useIsFocused();

	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#262626'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Dashboard</Text>
			</View>

			<ScrollView style={[styles.container,{
				height:Dimensions.get('screen').height-250,
			}]}>
				{isFocused ? <DashboardCharts {...props}/> : <></>}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Dashboard;
const styles = StyleSheet.create({
	container: {
		padding: 15,
		paddingBottom: 0,
		backgroundColor: '#fff',
		height: Dimensions.get('screen').height - 240
	},

});
