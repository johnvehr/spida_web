import * as types from "../constants";

import userApi from '../api/userApi'

export function signUp(usr,subscription_type,callbackRedirect){
  return function(dispatch){
    dispatch({type: types.SIGN_UP_PENDING})
    return userApi.signupUser(usr,subscription_type).then(user => {
      dispatch({
        type: types.SIGN_UP,
        payload: user
      })
    })
    .then(user => callbackRedirect(user))
    .catch(error => {
      dispatch({
        type: types.SIGN_UP_ERROR,
        payload: error
      })
    })
  }
}

export function signOut(){
  return function(dispatch){
    return userApi.signOutUser().then(user => {
      dispatch({
        type: types.SIGN_OUT,
        payload: user
      })
    })
    .catch(error => {
      throw(error)
    })
  }
}

export function signIn(user){
  return function(dispatch){
    return userApi.signInUser(user).then(usr => {
      dispatch({
        type: types.SIGN_IN,
        payload: usr
      })
    })
    .catch(error => {
      throw(error)
    })
  }
}

export function retrieveUserAccount(subdomain){
  return function(dispatch){
    return userApi.retrieveAccount(subdomain).then(user => {
      dispatch({
        type: types.RETRIEVE_USER_ACCOUNT,
        payload: user
      })
    }).catch(error => {
      throw(error)
    })
  }
}

export function sendInvite(invite,subdomain){
  return function(dispatch){
    return userApi.sendInvite(invite,subdomain).then(invt => {
      dispatch({
        type: types.SEND_INVITE,
        payload: invt
      })
    }).catch(error => {
      throw(error)
    })
  }
}

export function teamSignUp(team_user_params,invite,callbackRedirect){
  return function(dispatch){
    return userApi.teamSignUp(team_user_params,invite).then(team => {
      dispatch({
        type: types.TEAM_SIGN_UP,
        payload: team
      })
    })
    .then(team => callbackRedirect(team))
    .catch(error => {
      throw(error)
    })
  }
}
