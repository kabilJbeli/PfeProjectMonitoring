import * as React from 'react';
import {
    ActivityIndicator, Alert,
    Button,
    FlatList,
    Modal,
    Pressable,
    SafeAreaView, ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground, RecyclerViewBackedScrollView
} from "react-native";
import {StatusBar} from 'expo-status-bar';
import axiosApiCall from "../services/service";
import {useRef, useState} from "react";

import ProjectsList from "./ProjectLists";
import AddProjectComponent from "./AddProjectComponent";

const ProjectComponent = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const projectListRef = useRef();

    const clickHandler = (value) => {
        setModalVisible(value);
    }

const projectAdded = (event)=>{


}
    return (
        <View>
            <Button
                onPress={() => setModalVisible(true)} title={"Add New Project"}/>
                <AddProjectComponent visible={modalVisible} clickHandler={clickHandler.bind(this)} projectAdded={projectAdded.bind(this)}/>
               <View style={{paddingBottom:100}}>
                <ProjectsList/>
               </View>
        </View>
    );
}
export default ProjectComponent;


