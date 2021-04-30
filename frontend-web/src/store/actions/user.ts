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
import axios, { AxiosRequestConfig } from 'axios'
import { Dispatch } from 'redux'

import { IUserLogin } from '../reducers/models/UserLoginModel'
import { AppState } from '../store'
import { PRODUCT_CREATE_REVIEW_RESET } from './productActionTypes'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
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
  USER_UPDATE_PROFILE_SUCCESS
} from './userActionTypes'

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      '/api/users/login',
      {
        email,
        password
      },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT
  })
  dispatch({
    type: USER_DETAILS_RESET
  })
  dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
}

export const register = (
  name: string,
  email: string,
  password: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      '/api/users',
      {
        name,
        email,
        password
      },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getUserDetails = (id: string, admin?: boolean) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    let url = `/api/users/${id}`
    if (admin) {
      url = `/api/admin/${id}`
    }
    const { data } = await axios.get(url, config)
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateUserProfile = (user: IUserLogin) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put(`api/users/profile`, user, config)
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
