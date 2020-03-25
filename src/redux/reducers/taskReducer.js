import * as types from "../constants";

const initialState = {
  tasks: [],
  task: {},
  fetched_tasks: false
}

export default function(state = initialState,action){
  switch(action.type){
    case types.REMOVE_FETCHED_TASKS:
    return {
      ...state,
      fetched_tasks: false,
      tasks: []
    }
    break;
    case types.GET_PROJECT_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        fetched_tasks: true
      }
    case types.ADD_TASK:
    return {
      ...state,
      tasks: action.payload.tasks,
      task: action.payload.task
    }
{/*
    const new_payload = {
      ...action.payload,
      children: []
    }

      if(action.payload.ancestry != null){
        const parent_count = action.payload.ancestry.split('/').length - 1
        const parent = action.payload.ancestry.split('/')[parent_count]
        const findMyChild = (arr) => {
          arr.map(a => {
            const new_a = {...a}
            if(new_a.id == parent){
              return new_a.children.push(new_payload)
            }
            if(new_a['children']) findMyChild(new_a['children'])

          })
          return arr
        }

        return {
          ...state,
          tasks: {
            ...state.tasks,
            children: findMyChild([...state.tasks.children])

          }
        }
      }else {
        return {
          ...state,
          tasks: {
            ...state.tasks,
            children: [
              ...state.tasks.children,
              new_payload
            ]
          }
        }
      }
      break;
      */}
    break;
    case  types.DELETE_TASK:
      return {
        ...state,
        tasks: action.payload.tasks
      }
    break;

    default:
      return state;
  }
}
