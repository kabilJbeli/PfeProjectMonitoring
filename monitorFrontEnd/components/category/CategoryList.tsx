import * as React from 'react';
import {ActivityIndicator, Dimensions, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import axios from "axios";
import Environment from "../../Environment";
import {Modal} from "../modal/modal";
import {ModalButton} from "../modal/Button";
import {_storeData} from "../../utils";

const CategoryList = () => {
    const navigation = useNavigation();

    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [message,setMessage]= useState<string>('');
    const [isModalVisible,setModalVisible]  = useState(false);
    const [titleMessage,setTitleMessage]= useState<string>('');
    const [isRemoveModalVisible, setModalRemoveVisible] = useState(false);
    const [categoryId, setCategoryId] = useState<any>('');

    const handleModal = (isVisible:boolean) =>{
        setModalVisible(isVisible);
    }
    const handleRemoveModal = (isVisible: boolean) => {
        setModalRemoveVisible(isVisible);
    }
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
                        console.error('/api/category/all',err);

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
                handleModal(true);
                setTitleMessage("Success");
                setMessage("Category removed with success");
            })
            .catch((err: any) => {
                handleModal(true);
                setTitleMessage("Warning");
                setMessage("Can't remove this category as it's attached to other tasks");
                console.error('/api/category/delete/',err);
            });
    };

    const updateItem = (categoryID: Number) => {
        _storeData('categoryID', JSON.stringify(categoryID));

        // @ts-ignore
        navigation.navigate('updateCategory', {id: categoryID});
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

    const RemoveProjectHandler = () => {
        handleRemoveModal(false);

        setTimeout(() => {
            removeItem(categoryId);
        }, 500);
    }

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
                    <Modal isVisible={isModalVisible}>
                    <Modal.Container>
                        <Modal.Header title={titleMessage} />
                        <Modal.Body>
                            <Text style={styles.textModal}>{message}</Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <ModalButton title="I understand" onPress={()=>handleModal(false)} />
                        </Modal.Footer>
                    </Modal.Container>
                </Modal>

                    <Modal isVisible={isRemoveModalVisible}>
                        <Modal.Container>
                            <Modal.Header title={"Warning"}/>
                            <Modal.Body>
                                <Text style={styles.textModal}>Are you sure you want to remove this category?</Text>
                            </Modal.Body>
                            <Modal.Footer>
                                <View style={{width: '50%',alignItems:"center"}}>
                                    <ModalButton title="Cancel"  onPress={() => handleRemoveModal(false)}/>
                                </View>
                                <View style={{width: '50%',alignItems:"center"}}>
                                    <ModalButton title="Yes" color="#1f9683" onPress={() => RemoveProjectHandler()}/>
                                </View>
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>
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
                                            setCategoryId(item.categoryID);
                                            handleRemoveModal(true);
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
                                           updateItem(item.categoryID);
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
    },
    textModal:{
        textAlign:"center",
        fontSize:18
    }
});
