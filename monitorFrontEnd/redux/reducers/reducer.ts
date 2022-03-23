const projectReducer = (state = {}, action: any) => {
  switch (action.payload) {
    case 'PROJECTS_LIST': {
      return {
        ...state,
        projects: action.payload,
      };
      break;
    }
    default: {
      return state;
    }
  }
};
export default projectReducer;
