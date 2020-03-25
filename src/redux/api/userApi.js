//import SeedApi from './seedapi'
import Auth from "../../auth"
class userApi {

  /*static callUserApi(){
    return fetch(url, {
      method,
      headers
    }
  }*/

  static signupUser(user,sub_type){
    //app.lvh.me:
    return fetch(`http://localhost:3001/api/v1/users?sub_type=${sub_type}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user: user})
    }).then(res => res.json().then(json => ({
      headers: res.headers,
      status: res.status,
      json
    })))
    .then(json => {
      return json
    })
    .catch(error => {
      return error;
    })
  }

  static signInUser(user){
    return fetch('http://localhost:3001/api/v1/users/sign_in',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user: user})
    }).then(res => res.json().then(json => ({
      headers: res.headers,
      status: res.status,
      json
    })))
    .then(json => {
      return json
    })
    .catch(error => {
      return error;
    })
  }

  static retrieveAccount(subdomain){
    return fetch(`http://localhost:3001/api/v1/user/profile?subdomain=${subdomain}`,{
      method: "GET",
      headers: Auth.fetchToken()
    })
    .then(response => response.json())
    .catch(error => {
      return error;
    })
  }

  static sendInvite(new_invite_emails,subdomain){
    return fetch(`http://localhost:3001/api/v1/invitations/?subdomain=${subdomain}`,{
      method: "POST",
      headers: Auth.fetchToken(),
      body: JSON.stringify({invite_emails: new_invite_emails})
    })
    .then(res => res.json())
    .catch(error => {
      return error;
    })
  }

  static signOutUser(){
    return fetch('http://localhost:3001/api/v1/users/sign_out',{
      method: "DELETE",
      headers: Auth.fetchToken()
    })
    .then(response => response.json())
    .catch(error => {
      return error;
    })
  }

  static signInUser(user){
    return fetch('http://localhost:3001/api/v1/users/sign_in',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user: user})
    }).then(res => res.json().then(json => ({
      headers: res.headers,
      status: res.status,
      json
    })))
    .then(json => {
      return json
    })
    .catch(error => {
      return error;
    })
  }

  static teamSignUp(team_user_params,invit){
    return fetch(`http://localhost:3001/api/v1/users?token=${invit}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: team_user_params
      })
    })
    .then(res => res.json().then(json => ({
      headers: res.headers,
      status: res.status,
      json
    })))
    .then(json => {
      return json
    })
    .catch(error => {
      return error;
    })
  }

}

export default userApi
