import axios from 'axios';

import Config from 'react-native-config';
import {Project} from '../models/Project';

const axiosApiCall = () => {
  let projects: Project[] = [];
  axios
    .get<Project[]>(Config.API_URL + '/api/project/all')
    .then(response => {
      projects = response.data;
    })
    .catch(err => {
      throw new err();
    });
};
export default axiosApiCall;
