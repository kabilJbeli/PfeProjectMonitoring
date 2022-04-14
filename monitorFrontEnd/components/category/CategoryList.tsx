import * as React from 'react';
import {ActivityIndicator, Dimensions, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useIsFocused} from "@react-navigation/native";
import {useEffect, useState} from "react";
import axios from "axios";
import Environment from "../../Environment";

const CategoryList = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getCategories = () => {
        useEffect(() => {
            // Update the document title using the browser API
            if (loading) {
                axios({
                    method: 'GET',
                    url: `${Environment.API_URL}/api/category/all`,
                    headers: {
                        'Content-Type': 'application/json',
                        useQueryString: false,
                    },
                    params: {},
                })
                    .then(response => {
                        setCategories(response.data);
                        setLoading(false);
                    })
                    .catch((err: any) => {
                        console.error(err);

                    });
                setTimeout(() => setLoading(false), 1000);
            }
        }, [loading]);
    };

    const removeItem = (categoryID: Number) => {
        axios({
            method: 'DELETE',
            url: `${Environment.API_URL}/api/category/delete/` + categoryID,
            headers: {
                'Content-Type': 'application/json',
                useQueryString: false,
            },
            params: {},
        })
            .then((response: any) => {
                setLoading(true);
                getCategories();
            })
            .catch((err: any) => {
            });
    };
    const updateItem = (projectID: Number) => {
        // navigation.navigate('Home', {id: projectID});
    };
    getCategories();

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
    const isFocused = useIsFocused();


    const getLatestCategories = () => {
        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#d81e05"/>
                </View>
            );
        } else {
            return (
                <View>
                    <FlatList
                        style={{height:Dimensions.get('screen').height-300}}

                        keyExtractor={(item, index) => index.toString()}
                        data={categories}
                        ItemSeparatorComponent={FlatListItemSeparator}
                        initialNumToRender={categories.length}
                        renderItem={({item}) => (
                            <View style={styles.project}>
                                <Text style={styles.text}>
                                    Task Category : {item.categoryTitle}
                                </Text>
                                <View style={styles.buttonWrapper}>
                                    <Pressable
                                        style={({pressed}) => [{opacity: pressed ? 1 : 0.85},styles.button, styles.delete]}
                                        onPress={() => {
                                            removeItem(item.categoryID);
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                color: '#fff',
                                                fontWeight: '500',
                                            }}>
                                            Remove
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        style={({pressed}) => [{opacity: pressed ? 1 : 0.85},styles.button, styles.borderButton, styles.update]}
                                        onPress={() => {
                                            //updateItem(item.projectID);
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                color: '#fff',
                                                fontWeight: '500',
                                            }}>
                                            Update
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    />
                </View>
            );
        }
    };


    return getLatestCategories();
};
export default CategoryList;

const styles = StyleSheet.create({
    customMargin: {
        marginTop: 15,
        paddingBottom: 0,
        marginBottom: 0,
    },
    loadingContainer: {
        display: 'flex',
        height: Dimensions.get('screen').height-300,
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
        padding: 15,
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
        backgroundColor: '#6e6e6e',
    },
    update: {
        backgroundColor: '#1f9683',
    },
    status: {
        backgroundColor: '#6e6e6e',
        borderRadius: 90,
        //height:15,
        padding: 5,
        paddingLeft: 9,
        paddingRight: 9,
        color: '#fff',
        fontSize: 10,
        textAlign: 'center'
    }
});
