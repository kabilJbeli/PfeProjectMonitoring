import * as React from 'react';

import {
	Text, View, Pressable, SafeAreaView
} from 'react-native';
import {useEffect, useState} from "react";
import GenerateReport from "./generateReportComponent";
import axios from "axios";
import Environment from "../../Environment";
// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown-v2';
import {_retrieveData, _storeData} from "../../utils";
import Icon from "react-native-vector-icons/MaterialIcons";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import ReportList from "./reportList";

const reportScreenComponent = (props: any) => {
	const navigation = useNavigation();
	const isFocused = useIsFocused();

	const [projects, setProjects] = useState<any[]>([]);
	const [selectedProject, setSelectedProject] = useState<any>(null);
	const [member, setMember] = useState<any>(null);


	const getUserSpecificProjects = (userInfoParam?: any) => {
		// Update the document title using the broconwser API
		const localProject: any = [];

		axios({
			method: 'POST',
			url: `${Environment.API_URL}/api/project/getProjectsByProjectManager?email=${userInfoParam.email}`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
			data: {}
		})
			.then(response => {
				response.data.map((item: any) => {
					localProject.push({
						label: item.projectTitle, value: item
					});
				});
				setProjects(localProject);
			})
			.catch((err: any) => {
			});
	};

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
				_storeData('connectedMemberInfo', JSON.stringify(response.data));
				setMember(response.data);
			})
			.catch((err: any) => {
			});
	}

	useEffect(() => {
		_retrieveData('userInfo').then((info: any) => {
			getUserSpecificProjects(JSON.parse(info))
			getMember(JSON.parse(info).email);
		});
	}, [props]);

	const conditionalDisplayOfGenerateReport = (): any => {
		if (selectedProject !== null && member !== null) {
			return (<GenerateReport member={member} />);
		} else {
			return (<></>);
		};
	}

	const selectProject = (projectInfo: any) => {
		setSelectedProject(projectInfo);
		_storeData('selectedProject', JSON.stringify(projectInfo));
	}

	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#262626'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Reports Management</Text>
			</View>

			<View style={{padding:15,paddingBottom:0}}>
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
			<View style={{width: '100%', marginBottom: 0, padding: 10}}>
				<Dropdown
					style={{width: '100%'}}
					label={'Choose a project to generate a report'}
					data={projects}
					onChangeText={(value: any) => selectProject(value)}
				/>
			</View>
			{conditionalDisplayOfGenerateReport()}

			<View>
				{isFocused ? <ReportList   {...props}
				/> : <Text>''</Text>}
			</View>
		</SafeAreaView>
	);
}

export default reportScreenComponent;
