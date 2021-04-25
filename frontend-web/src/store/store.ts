import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { AppAction } from './actions/index'
import { cartReducer } from './reducers/cartReducers'
import {
  productReducer,
  productDetailsReducer
} from './reducers/productReducers'

const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems')!)
  : []

const initialState = { cart: cartItemsFromStorage }
const middleware = [thunk]

export type AppState = ReturnType<typeof reducer>

const store = createStore<AppState, AppAction, {}, {}>(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
