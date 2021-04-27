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
import { updateObject } from '../../shared/utility'
import {
  UserLoginTypes,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_REST,
  USER_UPDATE_PROFILE_SUCCESS
} from '../actions/userActionTypes'
import { IUserLogin } from './models/UserLoginModel'

interface IUserState {
  loading: boolean
  userInfo: IUserLogin | null
  error?: string
}
const initialState: IUserState = {
  loading: false,
  userInfo: null
}

interface IDetailsState {
  loading: boolean
  user: IUserLogin | {}
  error?: string
  success?: boolean
}
const initialDetailsState: IDetailsState = {
  loading: false,
  user: {}
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
      return updateObject(state, { loading: false, userInfo: null })
    default:
      return state
  }
}

export const userRegisterReducer = (
  state: IUserState = initialState,
  action: UserLoginTypes
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return updateObject(state, { loading: true })
    case USER_REGISTER_SUCCESS:
      return updateObject(state, {
        userInfo: action.payload,
        error: '',
        loading: false
      })
    case USER_REGISTER_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    default:
      return state
  }
}

export const userDetailsReducer = (
  state: IDetailsState = initialDetailsState,
  action: UserLoginTypes
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return updateObject(state, { loading: true })
    case USER_DETAILS_SUCCESS:
      return updateObject(state, {
        user: action.payload,
        loading: false
      })
    case USER_DETAILS_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    default:
      return state
  }
}

export const userUpdateProfileReducer = (
  state: IDetailsState = initialDetailsState,
  action: UserLoginTypes
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return updateObject(state, { loading: true })
    case USER_UPDATE_PROFILE_SUCCESS:
      return updateObject(state, {
        user: action.payload,
        loading: false,
        success: true
      })
    case USER_UPDATE_PROFILE_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    case USER_UPDATE_PROFILE_REST:
      return updateObject(state, { loading: false, user: {} })
    default:
      return state
  }
}
