import * as React from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import axios, {AxiosPromise} from 'axios'
import Moment from 'moment';

import Config from "react-native-config";
import {Project} from "../models/Project";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ProjectsList = forwardRef((props, ref) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const getProjects = () => {
        useEffect(() => {
            // Update the document title using the browser API
            if (loading) {
                axios({
                    "method": "GET",
                    "url": "http://c1ef-197-23-190-218.ngrok.io/api/project/all",
                    "headers": {
                        'Content-Type': 'application/json',
                        "useQueryString": false
                    }, "params": {}
                }).then(response => {
                    setProjects(response.data);
                }).catch(err => {
                });
                setLoading(false);
            }
        }, [loading]);
    }
    useImperativeHandle(ref, () => ({
        getProject() {
            getProjects();
        }
    }));
    getProjects();
    const removeItem = (projectID: Number) => {
        axios({
            "method": "DELETE",
            "url": "http://192.168.100.114:8083/api/project/delete/" + projectID,
            "headers": {
                'Content-Type': 'application/json',
                "useQueryString": false
            }, "params": {}
        }).then(response => {
            setLoading(true);
            getProjects();
        }).catch(err => {
        });
    }
    const updateItem = (projectID: Number) => {

    }
    return (
        <FlatList keyExtractor={(item, index) => index.toString()} data={projects} renderItem={({item}) => (
            <View style={styles.project}>
                <Text style={styles.title}>
                    Project Title: {item.projectTitle}
                </Text>
                <Text style={styles.text}>
                    Project Description: {item.projectDescription}
                </Text>
                <Text style={styles.text}>
                    Total Members: {item.members.length}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.text}>
                        <Icon
                            name="calendar"
                            size={18}
                            color={'#000'}
                        /> Start Date: {Moment(item.startDate).format('d-MM-YYYY')}
                    </Text>
                    <Text style={styles.text}>
                        <Icon
                            name="calendar"
                            size={18}
                            color={'#000'}
                        /> End Date: {Moment(item.endDate).format('d-MM-YYYY')}
                    </Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <Pressable style={[styles.button, styles.delete]} onPress={() => {
                        removeItem(item.projectID);

                    }}>
                        <Text style={{textAlign: "center", color: '#fff', fontWeight: '500'}}>Remove</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.borderButton, styles.view]} onPress={() => {
                        updateItem(item.projectID)
                    }}>
                        <Text style={{textAlign: "center", color: '#fff', fontWeight: '500'}}>View</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.borderButton, styles.update]} onPress={() => {
                        updateItem(item.projectID)
                    }}>
                        <Text style={{textAlign: "center", color: '#fff', fontWeight: '500'}}>Update</Text>
                    </Pressable>
                </View>
            </View>
        )}/>
    )

})
export default ProjectsList;

const styles = StyleSheet.create({

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
        flex: 1
    },
    container: {
        display: "flex",
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    project: {
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 0,
        paddingRight: 0,
        paddingLeft: 0,
        margin: 15,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    text: {
        color: '#000',
        textTransform: 'none',
        width: 'auto',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10
    },
    title: {
        color: '#000',
        fontSize: 20,
        textTransform: 'none',
        paddingLeft: 15,
        paddingRight: 15
    },
    footer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15
    },
    buttonWrapper: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#fff',
        width: '33.33%',
        padding: 10,
        textAlign: 'center',
    },
    borderButton: {
        borderStyle: "solid",
        borderLeftColor: '#fff',
        borderWidth: 1,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent'


    },
    delete: {
        backgroundColor: '#b5483a'
    },
    view: {
        backgroundColor: '#6e6e6e'

    },
    update: {
        backgroundColor: '#3ab56b'

    }
});
