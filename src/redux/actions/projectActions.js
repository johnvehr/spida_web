import * as types from "../constants";
import projectApi from '../api/projectApi'

/*
resource, param_line, type, obj={}
*/

export function projects(subdomain){
  return function(dispatch){
    return projectApi.projectEndpoint('projects',`?subdomain=${subdomain}`, 'GET')
    .then(project =>{
      dispatch({
        type: types.REMOVE_FETCHED_TASKS,
        payload: 'remove'
      })
      dispatch({
        type: types.GET_PROJECTS,
        payload: project
      })
    })
    .catch(error => {
      throw(error)
    })
  /*  .catch(error => {dispatch({
      type: types.GET_PROJECTS_FAIL,
      payload: error
    })})*/
  }
}

export function createProject(project,subdomain){
  return function(dispatch){
    return projectApi.projectEndpoint('projects',`?subdomain=${subdomain}`, 'POST', project).then(responseProject => {
      dispatch({
        type: types.CREATE_PROJECT,
        payload: responseProject
      })
    }).catch(error => {
      throw(error)
    })
  }
}

export function retrieveProject(id,subdomain){
  return function(dispatch){
    return projectApi.projectEndpoint('projects',`${id.id}?subdomain=${subdomain}`,'GET').then(responseProject => {
      dispatch({
        type: types.PROJECT_DETAIL,
        payload: responseProject
      })
    })
    .catch(error => {
      throw(error)
    })
  }
}

export function deleteProject(project){
  return function(dispatch){
    return projectApi.deleteProject(project).then(responseProject => {
      dispatch({
        type: types.DELETE_PROJECT,
        payload: responseProject
      })
    }).catch(error => {
      throw(error)
    })
  }
}
