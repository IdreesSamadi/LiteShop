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

export const ADMIN_USERS_LIST_REQUEST = 'ADMIN_USERS_LIST_REQUEST'
export const ADMIN_USERS_LIST_SUCCESS = 'ADMIN_USERS_LIST_SUCCESS'
export const ADMIN_USERS_LIST_FAIL = 'ADMIN_USERS_LIST_FAIL'

export const ADMIN_DELETE_USER_REQUEST = 'ADMIN_DELETE_USER_REQUEST'
export const ADMIN_DELETE_USER_SUCCESS = 'ADMIN_DELETE_USER_SUCCESS'
export const ADMIN_DELETE_USER_FAIL = 'ADMIN_DELETE_USER_FAIL'
export interface AdminUsersListRequestAction {
  type: typeof ADMIN_USERS_LIST_REQUEST
}

export interface AdminUsersListSuccessAction {
  type: typeof ADMIN_USERS_LIST_SUCCESS
  payload: any
}

export interface AdminUsersListFailAction {
  type: typeof ADMIN_USERS_LIST_FAIL
  payload: string
}

export interface AdminDeleteUserRequestAction {
  type: typeof ADMIN_DELETE_USER_REQUEST
}

export interface AdminDeleteUserSuccessAction {
  type: typeof ADMIN_DELETE_USER_SUCCESS
  payload: any
}

export interface AdminDeleteUserFailAction {
  type: typeof ADMIN_DELETE_USER_FAIL
  payload: string
}

export type AdminActionTypes =
  | AdminUsersListFailAction
  | AdminUsersListSuccessAction
  | AdminUsersListRequestAction
  | AdminDeleteUserFailAction
  | AdminDeleteUserSuccessAction
  | AdminDeleteUserRequestAction
