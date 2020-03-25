import * as types from "../constants";

const initialState = {
  projects: [],
  project: {},
  project_manager: {},
  project_team: [],
  loaded_projects: false,
  project_status: false
}

export default function(state = initialState,action){
  switch(action.type){
    case types.GET_PROJECTS:
    return {
      ...state,
      projects: action.payload,
      project_status: false,
      loaded_projects: action.payload.length > 0 ? true : false
    }
    case types.CREATE_PROJECT:
    //const updated_project = {...action.payload.project,project_team: action.payload.project_team}
    return Object.assign({}, state,
      {
        projects: [
          ...state.projects,
          action.payload
        ],
        loaded_projects: true
      }
    )
    case types.DELETE_PROJECT:
    return {
      ...state,
      projects: state.projects.filter(p => p.id !== action.payload),
      loaded_projects: false
    }
    case types.PROJECT_DETAIL:
    return {
      ...state,
      project: action.payload.project,
      project_manager: action.payload.project_manager,
      project_team_members: action.payload.project_team_members,
      project_status: action.payload.project_status
    }

    default:
      return state;
  }
}
