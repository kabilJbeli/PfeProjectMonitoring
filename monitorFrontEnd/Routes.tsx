import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import User from './components/Users';

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="updateProject" component={User} title="Update Project" />
    </Scene>
  </Router>
);
export default Routes;
