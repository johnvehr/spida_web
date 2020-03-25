import Auth from '../../auth'
import {currEnv,currApi} from './apiConfig'

const genHeaders = (type,obj) => {
  switch(type){
    case 'GET':
    return {
      method: `${type}`,
      headers: Auth.fetchToken()
    }
    break
    case 'POST':
    return {
      method: `${type}`,
      headers: Auth.fetchToken(),
      body: JSON.stringify(obj)
    }
  }
}

class projectApi {

  static projectEndpoint (resource, param_line, type, obj={}){
    return fetch(`${currEnv}/${currApi}/${resource}/${param_line}`,genHeaders(type,obj))
    .then(response => response.json())
    .catch(error => {
      return error;
    })
  }

  static deleteProject(id){
    return fetch(`http://localhost:3001/api/v1/projects/${id}`, {
      method: 'DELETE',
      headers: Auth.fetchToken()
    }).then(response => {
      return response.json()
    }).catch(error => {
      return error;
    })
  }
}

export default projectApi
