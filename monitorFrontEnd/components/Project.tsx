import * as React from 'react';
import {Button, Pressable, StyleSheet, View, Text} from 'react-native';

import {useState} from 'react';

import ProjectsList from './ProjectLists';
import AddProjectComponent from './AddProjectComponent';

const ProjectComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const clickHandler = (value: any) => {
    setModalVisible(value);
  };

  const projectAdded = (event: any) => {
    console.log(event);
  };
  return (
    <View>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Add New Project</Text>
      </Pressable>
      <AddProjectComponent
        visible={modalVisible}
        clickHandler={clickHandler.bind(this)}
        projectAdded={projectAdded.bind(this)}
      />
      <View style={{paddingBottom: 100}}>
        <ProjectsList />
      </View>
    </View>
  );
};
export default ProjectComponent;
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#d81e05',
    borderRadius: 0,
    height: 40,
    marginTop: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
