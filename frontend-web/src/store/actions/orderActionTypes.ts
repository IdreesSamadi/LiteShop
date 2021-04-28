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

export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST'
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
export const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL'

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST'
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS'
export const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL'

export interface OrderCreateRequestAction {
  type: typeof ORDER_CREATE_REQUEST
}

export interface OrderCreateSuccessAction {
  type: typeof ORDER_CREATE_SUCCESS
  payload: any
}

export interface OrderCreateFailAction {
  type: typeof ORDER_CREATE_FAIL
  payload: string
}

export interface OrderDetailsRequestAction {
  type: typeof ORDER_DETAILS_REQUEST
}

export interface OrderDetailsSuccessAction {
  type: typeof ORDER_DETAILS_SUCCESS
  payload: any
}

export interface OrderDetailsFailAction {
  type: typeof ORDER_DETAILS_FAIL
  payload: string
}

export type OrderActionTypes =
  | OrderCreateFailAction
  | OrderCreateSuccessAction
  | OrderCreateRequestAction
  | OrderDetailsFailAction
  | OrderDetailsSuccessAction
  | OrderDetailsRequestAction
