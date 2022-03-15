import * as React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Environment from '../Environment';
import {Dropdown} from 'react-native-material-dropdown-v2';
import {useState} from 'react';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';

const ProjectStatusData = [
  {
    label: 'Started',
    value: 'started',
  },
  {
    label: 'Closed',
    value: 'closed',
  },
];

const AddProjectComponent = (props: any) => {
  const [date, setDate] = useState(new Date());
  const [expectedEndDate, setExpectedEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

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
      .then((res: any) => {});
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
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

        <View style={{width: '100%', marginBottom: 15}}>
          <Dropdown
            style={{width: '100%'}}
            label={'Project Status'}
            data={ProjectStatusData}
            onChangeText={text => {}}
          />
        </View>
        <View
          style={{
            width: '100%',
            marginBottom: 20,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text>Start Date: {Moment(date).format('DD-MM-YYYY')} </Text>
            <Button title="Change" onPress={() => setOpen(true)} />
          </View>
          <DatePicker
            modal
            mode={'date'}
            open={open}
            date={date}
            onConfirm={(startDate: any) => {
              setOpen(false);
              setDate(startDate);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            onDateChange={chosenDate =>
              setState(prevState => {
                let project = Object.assign({}, prevState.project);
                project.startDate = chosenDate;
                return {project};
              })
            }
          />
        </View>

        <View style={{width: '100%', marginBottom: 20}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text>
              Expected End Date: {Moment(expectedEndDate).format('DD-MM-YYYY')}
            </Text>
            <Button title="Change" onPress={() => setOpenEndDate(true)} />
          </View>
          <DatePicker
            modal
            mode={'date'}
            open={openEndDate}
            date={expectedEndDate}
            onConfirm={(endDate: any) => {
              setOpenEndDate(false);
              setExpectedEndDate(endDate);
            }}
            onCancel={() => {
              setOpenEndDate(false);
            }}
            onDateChange={chosenEndDate =>
              setState(prevState => {
                let project = Object.assign({}, prevState.project);
                project.endDate = chosenEndDate;
                return {project};
              })
            }
          />
        </View>

        <View style={{width: '100%', marginBottom: 15}}>
          <Dropdown
            style={{width: '100%'}}
            label={'Project Manager'}
            data={[
              {label: 'testing manager 1', value: 'testing manager 1'},
              {label: 'testing manager 2', value: 'testing manager 2'},
              {label: 'testing manager 3', value: 'testing manager 3'},
            ]}
            onChangeText={text => {}}
          />
        </View>
        <View style={styles.columnDisplay}>
          <TouchableOpacity
            style={styles.cancelWrapper}
            onPress={() => {
              //props.clickHandler(!props.visible);
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
            style={getButtonStatus() ? styles.disabled : styles.buttonWrapper}
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
  );
};
export default AddProjectComponent;
const styles = StyleSheet.create({
  columnDisplay: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
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
    padding: 15,
    backgroundColor: '#fff',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 0,
    alignItems: 'center',
    shadowColor: '#fff',
    borderColor: '#fff',
    shadowOpacity: 0,
    shadowRadius: 0,
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
