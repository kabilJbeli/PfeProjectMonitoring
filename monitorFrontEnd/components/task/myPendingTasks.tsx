import * as React from 'react';

import {SafeAreaView, View,Text} from "react-native";
import MyPendingTasksList from "./myPendingTaskList";
import {useIsFocused} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import ViewTask from "./viewTask";
import {TaskTabStatusNavigator} from "./Task";


const Stack = createStackNavigator();

export const MainPendingTaskStack = (props: any) => {
	return (
		<Stack.Navigator initialRouteName="myPendingTasks"

		>
			<Stack.Screen name="myPendingTasks" component={myPendingTasks}
						  {...props}
						  options={{
							  headerShown: false,
						  }}
			/>
			<Stack.Screen name="viewTask" component={ViewTask}
						  {...props}
						  options={{
							  title: 'Consult Task Information',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>
		</Stack.Navigator>
	);
}

const myPendingTasks = (props:any)=>{
	const isFocused = useIsFocused();

	return(
		<SafeAreaView>
					<View>
				{isFocused ? <MyPendingTasksList   {...props}
				/> : <Text>''</Text>}
			</View>
		</SafeAreaView>
	)
}

export default myPendingTasks;
