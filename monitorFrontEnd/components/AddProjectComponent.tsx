import * as React from 'react';
import {
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Environment from '../Environment';

import {useState} from 'react';
import axios from 'axios';

const AddProjectComponent = (props: any) => {
  const [state, setState] = useState({
    project: {
      projectTitle: '',
      projectDescription: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const getButtonStatus = (): boolean => {
    return (
      state.project.projectTitle === '' ||
      state.project.projectDescription === ''
    );
  };

  const addProject = () => {
    axios
      .post(`${Environment.API_URL}/api/project/add`, state.project)
      .then((res: any) => {
        console.log(res);
        props.projectAdded();
        props.clickHandler(!props.visible);
      });
  };
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.clickHandler(!props.visible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, styles.title]}>
              Add New Project
            </Text>
            <View style={{width: '100%'}}>
              <Text>Project Title</Text>
              <Input
                leftIcon={<Icon name="tag" size={20} color={'#000'} />}
                inputContainerStyle={styles.InputContainerStyle}
                leftIconContainerStyle={styles.LeftIconContainerStyle}
                errorStyle={styles.ErrorStyle}
                onChangeText={text =>
                  setState(prevState => {
                    let project = Object.assign({}, prevState.project);
                    project.projectTitle = text;
                    return {project};
                  })
                }
                autoCompleteType={false}
              />
            </View>

            <View style={{width: '100%'}}>
              <Text>Project Description</Text>
              <Input
                multiline={true}
                numberOfLines={2}
                style={{textAlignVertical: 'top'}}
                leftIcon={<IconM name="description" size={20} color={'#000'} />}
                inputContainerStyle={styles.InputContainerStyle}
                leftIconContainerStyle={styles.LeftIconContainerStyle}
                errorStyle={styles.ErrorStyle}
                onChangeText={text =>
                  setState(prevState => {
                    let project = Object.assign({}, prevState.project);
                    project.projectDescription = text;
                    return {project};
                  })
                }
                autoCompleteType={false}
              />
            </View>
            <View style={styles.columnDisplay}>
              <TouchableOpacity
                style={styles.cancelWrapper}
                onPress={() => {
                  props.clickHandler(!props.visible);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: '500',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={getButtonStatus()}
                style={
                  getButtonStatus() ? styles.disabled : styles.buttonWrapper
                }
                onPress={() => {
                  addProject();
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: '500',
                  }}>
                  Add Project
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default AddProjectComponent;
const styles = StyleSheet.create({
  columnDisplay: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
  },
  buttonWrapper: {
    backgroundColor: 'green',
    padding: 10,
    opacity: 1,
  },
  cancelWrapper: {
    backgroundColor: 'red',
    padding: 10,
    opacity: 1,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: 'green',
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 0,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  InputContainerStyle: {
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    display: 'flex',
    justifyContent: 'center',
  },
  LeftIconContainerStyle: {},
  ErrorStyle: {},
});