const projectReducer =(state={},action)=>{
switch (action.payload) {
    case 'PROJECTS_LIST':{
return {
    ...state,
    projects:action.payload
}
        break
    }
    default :{
        return state;
    }
}
};
export default projectReducer;
