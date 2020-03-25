import * as types from "../constants";
import Auth from "../../auth"

const initialState = {
  user: {},
  account: {},
  account_subscription: {},
  account_owner: false,
  account_users: [],
  accounts: [],
  pending_invites: [],
  pending: false,
  logged_in: !!Auth.isUserAuthenticated()
};


export default function reducer(state = initialState, action) {
  switch (action.type) {

    case types.SIGN_UP_PENDING:
    return {
      ...state,
      pending: true
    }
    break;
    case types.SIGN_UP:
    Auth.processHead(action,action.type)
      return {
        ...state,
        user: action.payload.json.user,
        account: action.payload.json.account,
        pending: false,
        logged_in: !!Auth.isUserAuthenticated()
      }
    break;
    case types.SIGN_UP_ERROR:
    return {
      ...state,
      pending: false,
      error: action.error
    }
    break;
    case types.SIGN_OUT:
    Auth.processHead(action,action.type)
    return {
      user: {},
      account: {},
      logged_in: !!Auth.isUserAuthenticated()
    }
    break;
    case types.SIGN_IN:
    Auth.processHead(action,action.type)
    return{
      ...state,
      user: action.payload.json.user,
      account: action.payload.json.account,
      accounts: action.payload.json.accounts,
      logged_in: !!Auth.isUserAuthenticated()
    }
    break;
    case types.RETRIEVE_USER_ACCOUNT:
      if(action.payload.account_owner){
        return {
          ...state,
          user: action.payload.user,
          account: action.payload.account,
          account_users: action.payload.account_users,
          account_owner: action.payload.account_owner,
          account_subscription: action.payload.account_subscription
        }
      }else {
        return {
          ...state,
          user: action.payload.user,
          account: action.payload.account,
          account_users: action.payload.account_users,
          account_owner: action.payload.account_owner
        }
      }

    break;
    case types.SEND_INVITE:
      return {
        ...state,
        pending_invites: [
          ...state.pending_invites,
          action.payload.pending_invites
        ]
      }
    break;
    case types.TEAM_SIGN_UP:
    Auth.processHead(action,action.type)
      return {
        ...state,
        user: action.payload.json.user,
        accounts: action.payload.json.accounts,
        pending: false,
        logged_in: !!Auth.isUserAuthenticated()
      }
    break;
    default:
      return state;
  }
}
