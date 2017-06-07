import {applyMiddleware, createStore} from 'redux'
import axios from 'axios'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
}

const reducer = (state = initialState, action) => {

  switch (action.type){

    case 'FETCH_USERS_PENDING': {
      return {...state, fetching: true}
    }

    case 'FETCH_USERS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }

    case 'FETCH_USERS_FULFILLED': {
      return {...state,
        fetching: false,
        fetched: true,
        users: action.payload
      }
    }

  }


  return state
}

const middleware = applyMiddleware(promise(), thunk, createLogger())

const store = createStore(reducer, middleware)

store.dispatch({
  type: 'FOO',
  payload: axios.get('http://rest.learncode.academy/api/wstern/users')
})
// store.dispatch((dispatch) => {
//   dispatch({type: 'FETCH_USERS_START'})
//   axios.get('http://rest.learncode.academy/api/wstern/users')
//     .then((res) => {
//       dispatch({type: 'RECEIVE_USERS', payload: res.data})
//     }).catch((err) => {
//     dispatch({type: 'FETCH_USERS_ERROR', payload: err})
//   })
//
// })