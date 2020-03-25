import * as types from "../constants";
import taskApi from '../api/taskApi'

/*

reminder our actions go to our client api which comes back and dispatches to the reducer

*/

export function projectTasks(project_id,subdomain){
  return function(dispatch){
    return taskApi.taskEndpoint('tasks',`?project_id=${project_id}&subdomain=${subdomain}`, 'GET').then(tasks => {
      dispatch({
        type: types.GET_PROJECT_TASKS,
        payload: tasks
      })
    }).catch(error => {
      throw(error)
    })
  }
}

export function addTaskToParent(client_task_params,subdomain){
  return function(dispatch){
    taskApi.taskEndpoint('tasks',`?project_id=${client_task_params[0].id}&id=${client_task_params[1]}&type=${client_task_params[2]}&subdomain=${subdomain}`,'POST',client_task_params[3]).then(plan => {
      dispatch({
        type: types.ADD_TASK,
        payload: plan
      })
    }).catch(error => {
      throw(error)
    })
  }
}

export function deleteTaskFromParent(task_id,subdomain){
  return function(dispatch){
    taskApi.taskEndpoint('tasks',`?id=${task_id}`,'DELETE').then(tasks => {
      dispatch({
        type: types.DELETE_TASK,
        payload: tasks
      })
    }).catch(error => {
      throw(error)
    })
  }
}
