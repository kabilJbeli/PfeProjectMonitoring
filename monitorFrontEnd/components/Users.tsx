import * as React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import Environment from '../Environment';
import {useState} from 'react';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import validator from 'validator';

const User = () => {
  const [state, setState] = useState({
    user: {
      role: 'ADMINISTRATOR',
      name: '',
      lastName: '',
      email: '',
      Telephone: '',
      Address: '',
      password: '',
    },
  });
  const [emailValid, setEmailValid] = useState(false);
  const checkEmail = (email: string) => {
    setEmailValid(validator.isEmail(state.user.email));
  };
  const addUser = () => {
    axios
      .post(`${Environment.API_URL}/api/member/add`, state.user)
      .then((res: any) => {
        console.log(res);
      });
  };

  const getButtonStatus = (): boolean => {
    return (
      state.user.name === '' ||
      state.user.lastName === '' ||
      state.user.email === '' ||
      !validator.isEmail(state.user.email) ||
      state.user.password === '' ||
      state.user.Telephone === '' ||
      state.user.Address === ''
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.modalText, styles.title]}>Add New User</Text>
      <View style={{width: '100%'}}>
        <Text>User Name</Text>
        <Input
          leftIcon={<Icon name="tag" size={20} color={'#000'} />}
          inputContainerStyle={styles.InputContainerStyle}
          leftIconContainerStyle={styles.LeftIconContainerStyle}
          errorStyle={styles.ErrorStyle}
          onChangeText={text =>
            setState(prevState => {
              let user = Object.assign({}, prevState.user);
              user.name = text;
              return {user};
            })
          }
          autoCompleteType={false}
        />
      </View>

      <View style={{width: '100%'}}>
        <Text>User Last Name</Text>
        <Input
          leftIcon={<Icon name="tag" size={20} color={'#000'} />}
          inputContainerStyle={styles.InputContainerStyle}
          leftIconContainerStyle={styles.LeftIconContainerStyle}
          errorStyle={styles.ErrorStyle}
          onChangeText={text =>
            setState(prevState => {
              let user = Object.assign({}, prevState.user);
              user.lastName = text;
              return {user};
            })
          }
          autoCompleteType={false}
        />
      </View>

      <View style={{width: '100%'}}>
        <Text>User Email</Text>
        <Input
          leftIcon={<Icon name="tag" size={20} color={'#000'} />}
          inputContainerStyle={styles.InputContainerStyle}
          leftIconContainerStyle={styles.LeftIconContainerStyle}
          renderErrorMessage={!emailValid}
          errorMessage="Enter a valid email"
          errorStyle={styles.ErrorStyle}
          onChangeText={text =>
            setState(prevState => {
              let user = Object.assign({}, prevState.user);
              user.email = text;
              checkEmail(text);
              return {user};
            })
          }
          autoCompleteType={false}
        />
      </View>

      <View style={{width: '100%'}}>
        <Text>User Password</Text>
        <Input
          leftIcon={<Icon name="tag" size={20} color={'#000'} />}
          inputContainerStyle={styles.InputContainerStyle}
          leftIconContainerStyle={styles.LeftIconContainerStyle}
          errorStyle={styles.ErrorStyle}
          onChangeText={text =>
            setState(prevState => {
              let user = Object.assign({}, prevState.user);
              user.password = text;
              return {user};
            })
          }
          secureTextEntry={true}
          autoCompleteType={false}
        />
      </View>

      <View style={styles.columnDisplay}>
        <TouchableOpacity style={styles.cancelWrapper} onPress={() => {}}>
          <Text style={{textAlign: 'center', color: '#fff', fontWeight: '500'}}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={getButtonStatus()}
          style={getButtonStatus() ? styles.disabled : styles.buttonWrapper}
          onPress={() => {
            addUser();
          }}>
          <Text style={{textAlign: 'center', color: '#fff', fontWeight: '500'}}>
            Add Project
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default User;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
  },
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
