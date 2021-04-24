import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { AppAction } from './actions/index'
import {
  productReducer,
  productDetailsReducer
} from './reducers/productReducers'

const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer
})

const initialState = {}
const middleware = [thunk]

export type AppState = ReturnType<typeof reducer>

const store = createStore<AppState, AppAction, {}, {}>(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
