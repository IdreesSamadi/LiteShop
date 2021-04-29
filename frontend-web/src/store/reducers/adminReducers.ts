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
import { updateObject } from '../../shared/utility'
import {
  AdminActionTypes,
  ADMIN_USERS_LIST_FAIL,
  ADMIN_USERS_LIST_REQUEST,
  ADMIN_USERS_LIST_SUCCESS
} from '../actions/adminActionTypes'

interface IState {
  users: []
  loading: boolean
  success?: boolean
}
const initialState: IState = {
  users: [],
  loading: false
}

export const adminUsersListReducer = (
  state: IState = initialState,
  action: AdminActionTypes
) => {
  switch (action.type) {
    case ADMIN_USERS_LIST_REQUEST:
      return updateObject(state, { loading: true })
    case ADMIN_USERS_LIST_SUCCESS:
      return updateObject(state, {
        users: action.payload,
        success: true,
        loading: false
      })
    case ADMIN_USERS_LIST_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    default:
      return state
  }
}
