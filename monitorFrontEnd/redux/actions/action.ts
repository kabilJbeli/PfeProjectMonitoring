import {useEffect} from 'react';
import axios from 'axios';
import Environment from '../../Environment';

const getWsProjects = () => {
  return (dispatch: any) => {
    // Update the document title using the browser API
    axios({
      method: 'GET',
      url: `${Environment.API_URL}/api/project/all`,
      headers: {
        'Content-Type': 'application/json',
        useQueryString: false,
      },
      params: {},
    })
      .then(response => {
        dispatch({type: 'PROJECTS_LIST', payload: response});
      })
      .catch(err => {});
  };
};
export default getWsProjects;
