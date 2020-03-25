import Auth from '../../auth'
import {currEnv,currApi} from './apiConfig'

const genHeaders = (type,obj={}) => {
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
    break
    case 'DELETE':
    return {
      method: `${type}`,
      headers: Auth.fetchToken()
    }
    break
  }
}

class taskApi {

  static taskEndpoint(resource,param_line,type,obj={}){
    return fetch(`${currEnv}/${currApi}/${resource}/${param_line}`,genHeaders(type,obj))
    .then(response => response.json())
    .catch(error => {
      return error;
    })
  }
}

export default taskApi
