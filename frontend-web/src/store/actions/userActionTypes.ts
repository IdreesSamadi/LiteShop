/**
 * Copyright 2021 Idrees Samadi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { IUserLogin } from '../reducers/models/UserLoginModel'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
export const USER_LOGOUT = 'USER_LOGOUT'

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'

export const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST'
export const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS'
export const USER_DETAILS_FAIL = 'USER_DETAILS_FAIL'

export const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST'
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS'
export const USER_UPDATE_PROFILE_FAIL = 'USER_UPDATE_PROFILE_FAIL'
export const USER_UPDATE_PROFILE_REST = 'USER_UPDATE_PROFILE_REST'
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

export interface userRegisterRequestAction {
  type: typeof USER_REGISTER_REQUEST
}

export interface userRegisterSuccessAction {
  type: typeof USER_REGISTER_SUCCESS
  payload: IUserLogin
}

export interface userRegisterFailAction {
  type: typeof USER_REGISTER_FAIL
  payload: string
}

export interface userDetailsRequestAction {
  type: typeof USER_DETAILS_REQUEST
}

export interface userDetailsSuccessAction {
  type: typeof USER_DETAILS_SUCCESS
  payload: IUserLogin
}

export interface userDetailsFailAction {
  type: typeof USER_DETAILS_FAIL
  payload: string
}

export interface userUpdateProfileRequestAction {
  type: typeof USER_UPDATE_PROFILE_REQUEST
}

export interface userUpdateProfileSuccessAction {
  type: typeof USER_UPDATE_PROFILE_SUCCESS
  payload: IUserLogin
}

export interface userUpdateProfileFailAction {
  type: typeof USER_UPDATE_PROFILE_FAIL
  payload: string
}

export interface userUpdateProfileRestAction {
  type: typeof USER_UPDATE_PROFILE_REST
}
export type UserLoginTypes =
  | userLogoutAction
  | userLoginFailAction
  | userLoginSuccessAction
  | userLoginRequestAction
  | userRegisterFailAction
  | userRegisterSuccessAction
  | userRegisterRequestAction
  | userDetailsFailAction
  | userDetailsSuccessAction
  | userDetailsRequestAction
  | userUpdateProfileFailAction
  | userUpdateProfileSuccessAction
  | userUpdateProfileRequestAction
  | userUpdateProfileRestAction
