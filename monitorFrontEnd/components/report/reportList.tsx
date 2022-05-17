import * as React from 'react';

import {
	Text, View, Pressable, FlatList, Dimensions, StyleSheet, Linking, Alert
} from 'react-native';
import axios from "axios";
import Environment from "../../Environment";
import IconAnt from "react-native-vector-icons/AntDesign";

import {useEffect, useState} from "react";
import {_storeData} from "../../utils";
import {useNavigation} from "@react-navigation/native";
import RNFetchBlob from 'react-native-fetch-blob';

const ReportList = (props: any) => {
	const [reports, setReports] = useState<any[]>([]);
	const navigation = useNavigation();

	const getReports = (email: string) => {
		axios({
			method: 'GET',
			url: `${Environment.API_URL}/api/report/all`,
			headers: {
				'Content-Type': 'application/json',
				useQueryString: false,
			},
			params: {},
		})
			.then(response => {
				setReports(response.data);
			})
			.catch((err: Error) => {
				console.error('/api/reports/all', err.message)
			});
	}

	const FlatListItemSeparator = () => {
		return (
			<View
				style={{
					height: 1,
					width: '100%',
					backgroundColor: 'transparent',
				}}
			/>
		);
	};

	const viewReport = async (reportInformation: any) => {
		await _storeData('pdfBas64',reportInformation.pdfAsBytes);
		// @ts-ignore
		navigation.navigate('viewPDF');
	}

	const gotToDashboard = ()=>{
		// @ts-ignore
		navigation.navigate('Dashboard');
	}


	const downloadReport = async (reportInformation: any) => {
		const date: Date = new Date();
		let filePath = RNFetchBlob.fs.dirs.DownloadDir + '/report-' + date.getTime();

		RNFetchBlob.fs.writeFile(filePath, reportInformation.pdfAsBytes, 'base64')
			.then((response:any) => {
				console.log('Success Log: ', response);
				Alert.alert('Successfully Downloaded', 'Path:' + filePath || '', [
					{text: "OK", onPress: () => gotToDashboard()},
					{text: "Open", onPress: () => viewReport(reportInformation)}
				], {cancelable: true});
			})
			.catch((errors:any) => {
				console.error(" Error Log: ", errors);
			})

	}

	useEffect(() => {
		getReports('');
	}, [props]);
	return (<View>

		<FlatList
			style={{height: Dimensions.get('screen').height - 390}}
			keyExtractor={(item, index) => index.toString()}
			data={reports}
			ItemSeparatorComponent={FlatListItemSeparator}
			initialNumToRender={reports.length}
			renderItem={({item}) => (
				<View style={styles.project}>
					<View style={[
						{
							flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5,
							paddingRight: 15, paddingLeft: 15, alignItems: 'center', height: 'auto'
						}
					]}>
						<Text style={styles.text}>
							{item.reportTtile}
						</Text>

					</View>

					<View style={[
						{
							flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15,
							paddingRight: 15, paddingLeft: 15, alignItems: 'center', height: 'auto'
						}
					]}>
						<Text style={styles.text}>
							{item.creationDate}
						</Text>

					</View>
					<View style={styles.buttonWrapper}>

						<Pressable
							style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button, styles.borderButton, styles.view]}
							onPress={() => {
								viewReport(item);
							}}>
							<Text
								style={{
									textAlign: 'center',
									color: '#fff',
									fontWeight: '500',
									paddingRight: 15
								}}>
								View
							</Text>
							<IconAnt name={'eyeo'} color={'#ffff'} size={18}/>
						</Pressable>
						<Pressable
							style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button, styles.borderButton, styles.update]}
							onPress={() => {
								downloadReport(item);
							}}>
							<Text
								style={{
									textAlign: 'center',
									color: '#fff',
									fontWeight: '500',
									paddingRight: 15
								}}>
								Download
							</Text>
							<IconAnt name={'download'} color={'#ffff'} size={18}/>
						</Pressable>
					</View>
				</View>
			)}
		/>
	</View>);
}
export default ReportList;


const styles = StyleSheet.create({
	customMargin: {
		marginTop: 15,
		paddingBottom: 0,
		marginBottom: 0,
	},
	loadingContainer: {
		display: 'flex',
		height: Dimensions.get('screen').height - 350,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	overlay: {
		backgroundColor: '#fff',
		height: '100%',
		width: '100%',
		position: 'relative',
		top: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 3,
		flex: 1,
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#fff',
		justifyContent: 'space-between',
	},
	project: {
		backgroundColor: '#fff',
		padding: 20,
		paddingBottom: 0,
		paddingRight: 0,
		paddingLeft: 0,
		margin: 15,
		marginTop: 10,
		shadowColor: '#171717',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	text: {
		color: '#000',
		textTransform: 'none',
		width: 'auto',
		paddingTop: 0
	},
	titleWrapper: {
		paddingLeft: 15,
		paddingRight: 15,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',

	},
	title: {
		color: '#000',
		fontSize: 20,
		textTransform: 'none',
		maxWidth: 250,
		overflow: 'hidden',
		height: 30
	},
	footer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15,
		marginBottom: 15,
	},
	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},


	button: {
		backgroundColor: '#fff',
		width: '50%',
		padding: 10,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',

		alignItems: 'center'
	},
	borderButton: {
		borderStyle: 'solid',
		borderLeftColor: '#fff',
		borderWidth: 1,
		borderBottomColor: 'transparent',
		borderTopColor: 'transparent',
		borderRightColor: 'transparent',
	},
	delete: {
		backgroundColor: '#c8003f',
	},
	view: {
		backgroundColor: '#3b436b',
	},
	update: {
		backgroundColor: '#1f9683',
	},
	status: {
		borderRadius: 90,
		//height:15,
		padding: 5,
		paddingLeft: 9,
		paddingRight: 9,
		color: '#fff',
		fontSize: 10,
		textAlign: 'center',
		minWidth: 100
	},
	filterPressable: {
		backgroundColor: '#00a3cc',
		width: 'auto',
		minWidth: 100,
		padding: 10,
		marginRight: 5
	},
	pressableText: {
		color: '#fff',
		textAlign: 'center'
	}
});
