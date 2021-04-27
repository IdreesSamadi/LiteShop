import { IUserLogin } from '../reducers/models/UserLoginModel'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
export const USER_LOGOUT = 'USER_LOGOUT'

export interface userLoginRequestAction {
  type: typeof USER_LOGIN_REQUEST
}

export interface userLoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS
  payload: IUserLogin
}

export interface userLoginFailAction {
  type: typeof USER_LOGIN_FAIL
  payload: string
}

export interface userLogoutAction {
  type: typeof USER_LOGOUT
}

export type UserLoginTypes =
  | userLogoutAction
  | userLoginFailAction
  | userLoginSuccessAction
  | userLoginRequestAction
