import * as React from 'react';

import {
	Text, View, Pressable, FlatList, Dimensions, StyleSheet
} from 'react-native';
import {_retrieveData, _storeData} from "../../utils";

import {useEffect, useState} from "react";

const ViewPDF = (props: any) => {

	const [pdfBase64, setPdfBase64] = useState<string>('');

	useEffect(() => {
		_retrieveData('pdfBas64').then(response => {
			setPdfBase64(response);
		})
	}, [props])

	return (<View>

		</View>)

}
export default ViewPDF;
