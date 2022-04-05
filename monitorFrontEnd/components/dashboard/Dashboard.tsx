import * as React from 'react';
import {Dimensions, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
} from "react-native-chart-kit";
import Images from '../../assets/Images';

const Dashboard = () => {
	const data = {
		labels: ["January", "February", "March", "April", "May"],
		datasets: [
			{
				data: [20, 45, 28, 80, 99],
				strokeWidth: 2
			}
		]
	};
	return (
		<SafeAreaView>
			<View style={{
				height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
				backgroundColor: '#262626'

			}}>
				<Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
					Dashboard</Text>

			</View>
			<ScrollView style={styles.container}>
				<View>
					<Text>Bezier Line Chart</Text>
					<LineChart
						data={{
							labels: ["January", "February", "March", "April", "May", "June"],
							datasets: [
								{
									data: [
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100
									]
								}
							]
						}}
						fromZero={true}

						width={Dimensions.get("screen").width - 30} // from react-native
						height={300}
						yAxisLabel="$"
						yAxisSuffix="k"
						yAxisInterval={1} // optional, defaults to 1
						chartConfig={{

							backgroundGradientFrom: "#3a436c",
							backgroundGradientTo: "#3a436c",
							decimalPlaces: 0, // optional, defaults to 2dp
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							style: {
							},
							propsForDots: {
								r: "6",
								strokeWidth: "2",
								stroke: "#fff"
							}
						}}
						bezier
						style={{
							marginVertical: 8,
							borderRadius: 15,
							marginTop: 15
						}}
					/>
				</View>
				<View>
					<Text>Bar Chart</Text>

					<BarChart
						style={{
							borderRadius: 15,
							marginTop: 15
						}}
						fromZero={true}
						data={data}
						width={Dimensions.get("screen").width - 30}
						height={300}
						yAxisLabel="$"
						yAxisSuffix="k"
						yAxisInterval={1}
						chartConfig={{
							backgroundGradientFrom: "#3a436c",
							backgroundGradientTo: "#3a436c",
							decimalPlaces: 0, // optional, defaults to 2dp
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							style: {
							},
							propsForDots: {
								r: "6",
								strokeWidth: "2",
								stroke: "#fff"
							}
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
export default Dashboard;
const styles = StyleSheet.create({
	container: {
		padding: 15,
		paddingBottom: 0,
		height: Dimensions.get('screen').height - 290
	},

});
