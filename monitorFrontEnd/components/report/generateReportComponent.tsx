import * as React from 'react';

import {
	Dimensions,
	PermissionsAndroid,
	StyleSheet, Text, View,
	TouchableHighlight,
	Alert
} from 'react-native';
import {btoa, atob} from 'react-native-quick-base64';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import axios from "axios";
import Environment from "../../Environment";
import {_retrieveData, _storeData, showToastWithGravity} from "../../utils";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";


const GenerateReport = (props: any) => {
	const navigation = useNavigation();

	const [project, setProject] = useState<any>({});
	useEffect(() => {
		_retrieveData('selectedProject').then((reponse: any) => {
			setProject(JSON.parse(reponse));
		});

	}, [props]);

	const requestStoragePermission = async () => {
		try {
			await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
			]).then((result) => {

				if (result['android.permission.READ_EXTERNAL_STORAGE']
					&& result['android.permission.WRITE_EXTERNAL_STORAGE']
				) {

					createPDF(JSON.parse(project));
					setProject(JSON.parse(project));
					console.log("You can use the storage service");
				} else {
					console.log("storage service permission denied");
				}

			});

		} catch (err) {
			console.warn(err);
		}
	};


	const savePDF = (base64: any, project: any, member: any, reportTtile: string) => {
		const report: any = {
			project,
			member,
			reportTtile,
			base64StringReport: base64
		}
		axios
			.post(`${Environment.API_URL}/api/report/add`, report)
			.then((res: any) => {
				showToastWithGravity('Report Successfully generated');

			}).catch((error: Error) => {
			showToastWithGravity('An Error Has Occurred!!!');
			console.error('/api/report/add', error.message);
		});
	}


	const createPDF = async (projectInfo: any) => {
		const date: Date = new Date();
		const dateOptions: any = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

		const timeOptions: any = {timeZone: "UTC", timeZoneName: "short"};
		let employeeTable = '';
		for (let employee of projectInfo.members) {
			employeeTable = employeeTable + `
      <tr>
       <td>${employee.name}</td>
       <td>${employee.lastName}</td>
       <td>${employee.telephone}</td>
       <td>${employee.email}</td>
       <td>${employee.role}</td>
      </tr>`
		}

		const html = `
		  <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
   <head>
      <style>
         table {
         font-family: arial, sans-serif;
         border-collapse: collapse;
         width: 100%;,
         }
         td, th {
         border: 1px solid #dddddd;
         text-align: left;
         padding: 8px;
         }
         tr:nth-child(even) {
         background-color: #dddddd;
         }
         .pdfHeader{
         display: flex;
         justify-content: space-between;
         align-items: center;
         color:grey;
         }
         .projectHeaderInformation{
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         }
         .pdfSection{
         display: block;
         margin-top: 30px;
         }
      </style>
   </head>
   <body>
      <header class="pdfHeader">
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Vermeg_logo.svg/480px-Vermeg_logo.svg.png"
            width="150px"
            />
         <div class="projectHeaderInformation">
            <span>Project Report: <b>${projectInfo.projectTitle}</b></span>
            <span>Report Creation Date: <b>${date.toLocaleDateString('en-TN', dateOptions)} 
            ${date.toLocaleTimeString('en-TN', timeOptions)}</b>
            </span>
         </div>
      </header>
      <section>
         <br/>
         <br/>
      </section>
      <section style="pdfSection">
         <h1>Project Name: ${projectInfo.projectTitle}</h1>
         <p>Project Description: ${projectInfo.projectDescription}</p>
         <p>Project Status: ${projectInfo.projectStatus}</p>
      </section>
      <section style="pdfSection">
         <table>
            <tr>
               <th>Project Manager Information</th>
               <th></th>
            </tr>
            <tr>
               <td>Full Name</td>
               <td>${projectInfo.projectManager.name + ' ' + projectInfo.projectManager.lastName}</td>
            </tr>
            <tr>
               <td>Email</td>
               <td>${projectInfo.projectManager.email}</td>
            </tr>
            <tr>
               <td>Mobile Number</td>
               <td>${projectInfo.projectManager.telephone}</td>
            </tr>
         </table>
      </section>
      <section>
         <br/>
         <br/>
      </section>
      <section style="pdfSection">
         <table>
            <tr>
               <th>Client Representative Information</th>
               <th></th>
            </tr>
            <tr>
               <td>Full Name</td>
               <td>${projectInfo.client.name + ' ' + projectInfo.client.lastName}</td>
            </tr>
            <tr>
               <td>Email</td>
               <td>${projectInfo.client.email}</td>
            </tr>
            <tr>
               <td>Mobile Number</td>
               <td>${projectInfo.client.telephone}</td>
            </tr>
         </table>
      </section>
      <section>
         <br/>
         <br/>
      </section>
      <section style="pdfSection">
         <table>
            <tr>
               <th>Member Name</th>
               <th>Member LastName</th>
               <th>Member Telephone</th>
               <th>Member Email</th>
               <th>Member Role</th>
            </tr>
            ${employeeTable}
         </table>
      </section>
   </body>
</html>`;


		let options = {
			html: html,
			fileName: 'report-' + date.getTime(),
			directory: 'Download',
			base64: true
		};

		const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
		const openFile = (base64: any) => {
			_storeData('pdfBas64', btoa(base64));
			// @ts-ignore
			navigation.navigate('viewPDF')
		}
		
		const gotToDashboard = () => {
			// @ts-ignore
			navigation.navigate('Dashboard')
			console.log("OK Pressed")
		}

		if (granted) {
			let file = await RNHTMLtoPDF.convert(options);
			savePDF(file.base64, projectInfo, props.member, projectInfo.projectTitle + ' Report');

			Alert.alert('Successfully Exported', 'Path:' + file.filePath || '', [
				{text: "OK", onPress: () => gotToDashboard()},
				{text: "Open", onPress: () => openFile(file.base64)}
			], {cancelable: true});


		} else {
			await requestStoragePermission();
			console.log("WRITE_EXTERNAL_STORAGE permission denied")
		}

	}


	return (
		<View style={{padding: 15}}>
			<TouchableHighlight style={styles.buttonCreate} onPress={() => createPDF(project)}>
				<Text style={styles.textStyle}>Generate a pdf report</Text>
			</TouchableHighlight>
		</View>
	);

}
export default GenerateReport;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 25,
	},
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4'
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
	},
	buttonCreate: {
		borderRadius: 0,
		padding: 10,
		elevation: 2,
		backgroundColor: '#1f9683',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
