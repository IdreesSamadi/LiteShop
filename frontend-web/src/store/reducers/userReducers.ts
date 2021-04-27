import { updateObject } from '../../shared/utility'
import {
  UserLoginTypes,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '../actions/userActionTypes'
import { IUserLogin } from './models/UserLoginModel'

interface IUserState {
  loading: boolean
  userInfo: IUserLogin | {}
  error?: string
}
const initialState: IUserState = {
  loading: false,
  userInfo: {}
}

export const userLoginReducer = (
  state: IUserState = initialState,
  action: UserLoginTypes
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return updateObject(state, { loading: true })
    case USER_LOGIN_SUCCESS:
      return updateObject(state, {
        userInfo: action.payload,
        error: '',
        loading: false
      })
    case USER_LOGIN_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    case USER_LOGOUT:
      return updateObject(state, { loading: false })
    default:
      return state
  }
}
