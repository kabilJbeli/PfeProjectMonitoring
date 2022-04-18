import * as React from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import ViewTask from "../task/viewTask";
import {TaskTabStatusNavigator} from "../task/Task";
import CreateSprint from "./addSprint";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import ProjectsList from "../project/ProjectLists";
import SprintList from "./SprintList";
import axios from "axios";
import Environment from "../../Environment";
import {useState} from "react";
import ViewSprint from "./viewSprint";

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
