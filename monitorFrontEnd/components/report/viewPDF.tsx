import * as React from 'react';

import {
	View, Dimensions, StyleSheet, Text, SafeAreaView, Pressable
} from 'react-native';
import {_retrieveData} from "../../utils";

import {useEffect, useState} from "react";
import Pdf from 'react-native-pdf';
import {decode as atob, encode as btoa} from 'base-64'
import Icon from "react-native-vector-icons/MaterialIcons";
import {useNavigation} from "@react-navigation/native";

const ViewPDF = (props: any) => {
	const navigation = useNavigation();

	const [pdfBase64, setPdfBase64] = useState<string>('');
	const [source, setSource] = useState<any>(null)
	useEffect(() => {
		_retrieveData('pdfBas64').then(response => {
			setPdfBase64(response);
			setSource({uri: "data:application/pdf;base64," + atob(response)})
			console.log(atob(response))
		})
	}, [props])

	const getPdf = (): any => {

		if (source === null) {
			return (<></>)
		} else {
			return (

				<View style={styles.container}>
					<View style={{
						height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
						backgroundColor: '#262626'

					}}>
						<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
							Consult Report</Text>
						<View style={{padding: 15,paddingBottom: 0,display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>
							<Pressable
								style={{width: 80, flexDirection: 'row'}}
								onPress={() => {
									navigation.goBack();
								}}
							><Icon name='arrow-back' size={20} color={'#fff'}/>
								<Text style={{paddingLeft: 10, fontWeight: 'bold',color:'#fff'}}
								>Go Back</Text>
							</Pressable>
						</View>
					</View>

					<Pdf
						source={source}
						onLoadComplete={(numberOfPages, filePath) => {
							console.log(`Number of pages: ${numberOfPages}`);
						}}
						onPageChanged={(page, numberOfPages) => {
							console.log(`Current page: ${page}`);
						}}
						onError={(error) => {
							console.error(error);
						}}
						onPressLink={(uri) => {
							console.log(`Link pressed: ${uri}`);
						}}
						style={styles.pdf}/>
				</View>
			)
		}
	}
	return getPdf();

}
export default ViewPDF;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width - 30,
		height: Dimensions.get('window').height,
	}
});
