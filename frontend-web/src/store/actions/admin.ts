/*
 *   Copyright (c) 2021 Idrees Samadi
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
import axios, { AxiosRequestConfig } from 'axios'
import { Dispatch } from 'redux'

import { AppState } from '../store'
import {
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_USERS_LIST_FAIL,
  ADMIN_USERS_LIST_REQUEST,
  ADMIN_USERS_LIST_SUCCESS
} from './adminActionTypes'
import { USER_DETAILS_SUCCESS } from './userActionTypes'

export const listUsers = () => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch({
      type: ADMIN_USERS_LIST_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`/api/admin/users`, config)
    dispatch({
      type: ADMIN_USERS_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ADMIN_USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteUser = (id: string) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch({
      type: ADMIN_DELETE_USER_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.delete(`/api/admin/${id}`, config)
    dispatch({
      type: ADMIN_DELETE_USER_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateUser = (user: any) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_USER_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config: AxiosRequestConfig = {
      headers: {
        'content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put(`/api/admin/${user._id}`, user, config)

    dispatch({
      type: ADMIN_UPDATE_USER_SUCCESS
    })
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
