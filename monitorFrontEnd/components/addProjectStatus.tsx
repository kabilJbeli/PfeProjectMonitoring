import {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import * as React from 'react';

const AddProjectStatus = () => {
  const [state, setState] = useState({
    projectStatus: {
      projectStatusTitle: '',
    },
  });

  return (
    <SafeAreaView>
      <Text>Project Status Screen</Text>
    </SafeAreaView>
  );
};
export default AddProjectStatus;
