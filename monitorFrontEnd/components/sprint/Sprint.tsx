import * as React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import ViewTask from "../task/viewTask";
import CreateSprint from "./addSprint";
import {useIsFocused} from "@react-navigation/native";
import SprintList from "./SprintList";
import ViewSprint from "./viewSprint";
import CurrentSprintList from "./currentSprints";
import PreviousSprintList from "./previousSprints";

const Stack = createStackNavigator();

export const MainSprintStack = (props: any) => {
	return (
		<Stack.Navigator initialRouteName="sprint"

		>
			<Stack.Screen name="sprint" component={Sprint}
						  {...props}
						  options={{
							  headerShown: false,
						  }}
			/>
			<Stack.Screen name="addSprint" component={CreateSprint}
						  {...props}
						  options={{
							  title: 'Create New Sprint',
							  presentation: 'card',
							  headerShown: false
						  }}

			/>
			<Stack.Screen name="viewSprint" component={ViewSprint}
						  {...props}
						  options={{
							  title: 'Sprint Information',
							  presentation: 'card',
							  headerShown: false
						  }}
			/>
			<Stack.Screen name="viewTask" component={ViewTask}
						  {...props}
						  options={{
							  title: 'Task Information',
							  presentation: 'card',
							  headerShown: false
						  }}
			/>
			<Stack.Screen name="currentSprint" component={CurrentSprintList}
						  {...props}
						  options={{
							  title: 'Sprint Information',
							  presentation: 'card',
							  headerShown: false
						  }}
			/>
			<Stack.Screen name="previousSprint" component={PreviousSprintList}
						  {...props}
						  options={{
							  title: 'Sprint Information',
							  presentation: 'card',
							  headerShown: false
						  }}
			/>
		</Stack.Navigator>
	);
}

const Sprint = (props: any) => {
	const isFocused = useIsFocused();

	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#45b1b1'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Sprints</Text>
			</View>
			<View>
				{isFocused ? <SprintList   {...props}
				/> : <Text>''</Text>}
			</View>
		</SafeAreaView>
	);
};
export default Sprint;
