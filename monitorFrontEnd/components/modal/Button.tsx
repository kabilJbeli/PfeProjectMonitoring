import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export type ButtonProps = {
	title: string;
	onPress: () => void;
	color?:string;
};
export const ModalButton = ({ title, onPress, color }: ButtonProps) => {
	return (
		<TouchableOpacity style={[styles.button,{backgroundColor: color ? color :"#c8003f"} ]} onPress={onPress}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	button: {
		marginBottom: 15,
		paddingVertical: 15,
		borderRadius: 0,
		width: "80%",
		alignItems: "center",
	},
	text: {
		color: "white",
		fontWeight: "700",
		fontSize: 18,
	},
});
