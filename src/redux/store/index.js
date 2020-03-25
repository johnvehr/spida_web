import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import user from '../reducers/authReducer'
import sidebar from '../reducers/sidebarReducers'
import task from '../reducers/taskReducer'
import project from '../reducers/projectReducer'
import layout from '../reducers/layoutReducer'
import appReducer from '../reducers/index'; // the value from combineReducers
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {SIGN_OUT} from '../constants';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['user','sidebar','layout','task','project']
  // Whitelist (Save Specific Reducers)
};
// Middleware: Redux Persist Persisted Reducer

const rootReducer = ( state, action ) => {
  if ( action.type === SIGN_OUT ) {
    storage.removeItem('persist:root')
   state = undefined;
  }

  return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(thunk,logger)
  )

);
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export {
  store,
  persistor,
};
