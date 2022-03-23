import * as React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
} from "react-native-chart-kit";

const Dashboard = () => {
	const data = {
		labels: ["January", "February", "March", "April", "May"],
		datasets: [
			{
				data: [20, 45, 28, 80, 99]
			}
		]
	};
	return (
		<View style={styles.container}>
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
					width={Dimensions.get("window").width - 30} // from react-native
					height={220}
					yAxisLabel="$"
					yAxisSuffix="k"
					yAxisInterval={1} // optional, defaults to 1
					chartConfig={{
						backgroundColor: "#262626",
						backgroundGradientFrom: "#262626",
						backgroundGradientTo: "#3c3a3a",
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 0,
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
						borderRadius: 0,
					}}
				/>
			</View>
			<View>
				<Text>Bar Chart</Text>

				<BarChart
					style={{
						borderRadius: 0,
					}}

					fromZero={true}
					data={data}
					width={Dimensions.get("window").width - 30}
					height={280}
					yAxisLabel="$"
					yAxisSuffix="k"
					yAxisInterval={1}
					chartConfig={{
						backgroundColor: "#262626",
						backgroundGradientFrom: "#262626",
						backgroundGradientTo: "#3c3a3a",
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 0,
						},
						propsForDots: {
							r: "6",
							strokeWidth: "2",
							stroke: "#fff"
						}
					}}
					verticalLabelRotation={30}
				/>
			</View>
		</View>
	);
};
export default Dashboard;
const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
});
