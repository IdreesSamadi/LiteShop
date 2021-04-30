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
import { IOrder } from '../reducers/models/orderModel'

export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST'
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
export const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL'

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST'
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS'
export const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL'

export const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST'
export const ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS'
export const ORDER_PAY_FAIL = 'ORDER_PAY_FAIL'
export const ORDER_PAY_RESET = 'ORDER_PAY_RESET'

export const ORDER_MY_LIST_REQUEST = 'ORDER_MY_LIST_REQUEST'
export const ORDER_MY_LIST_SUCCESS = 'ORDER_MY_LIST_SUCCESS'
export const ORDER_MY_LIST_FAIL = 'ORDER_MY_LIST_FAIL'

export const ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST'
export const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS'
export const ORDER_LIST_FAIL = 'ORDER_LIST_FAIL'

export const ORDER_DELIVER_REQUEST = 'ORDER_DELIVER_REQUEST'
export const ORDER_DELIVER_SUCCESS = 'ORDER_DELIVER_SUCCESS'
export const ORDER_DELIVER_FAIL = 'ORDER_DELIVER_FAIL'
export const ORDER_DELIVER_RESET = 'ORDER_DELIVER_RESET'
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
  payload: IOrder
}

export interface OrderDetailsFailAction {
  type: typeof ORDER_DETAILS_FAIL
  payload: string
}

export interface OrderPayRequestAction {
  type: typeof ORDER_PAY_REQUEST
}

export interface OrderPaySuccessAction {
  type: typeof ORDER_PAY_SUCCESS
}

export interface OrderPayFailAction {
  type: typeof ORDER_PAY_FAIL
  payload: string
}

export interface OrderPayResetAction {
  type: typeof ORDER_PAY_RESET
}

export interface OrderMyListRequestAction {
  type: typeof ORDER_MY_LIST_REQUEST
}

export interface OrderMyListSuccessAction {
  type: typeof ORDER_MY_LIST_SUCCESS
  payload: any // ! change to something else
}

export interface OrderMyListFailAction {
  type: typeof ORDER_MY_LIST_FAIL
  payload: string
}

export interface OrderListRequestAction {
  type: typeof ORDER_LIST_REQUEST
}

export interface OrderListSuccessAction {
  type: typeof ORDER_LIST_SUCCESS
  payload: IOrder[]
}

export interface OrderListFailAction {
  type: typeof ORDER_LIST_FAIL
  payload: string
}

export interface OrderDeliverSuccessAction {
  type: typeof ORDER_DELIVER_SUCCESS
}

export interface OrderDeliverFailAction {
  type: typeof ORDER_DELIVER_FAIL
  payload: string
}

export interface OrderDeliverRequestAction {
  type: typeof ORDER_DELIVER_REQUEST
  payload: string
}

export interface OrderDeliverResetAction {
  type: typeof ORDER_DELIVER_RESET
  payload: string
}

export type OrderActionTypes =
  | OrderCreateFailAction
  | OrderCreateSuccessAction
  | OrderCreateRequestAction
  | OrderDetailsFailAction
  | OrderDetailsSuccessAction
  | OrderDetailsRequestAction
  | OrderPayFailAction
  | OrderPaySuccessAction
  | OrderPayRequestAction
  | OrderPayResetAction
  | OrderMyListFailAction
  | OrderMyListSuccessAction
  | OrderMyListRequestAction
  | OrderListFailAction
  | OrderListSuccessAction
  | OrderListRequestAction
  | OrderDeliverFailAction
  | OrderDeliverSuccessAction
  | OrderDeliverRequestAction
  | OrderDeliverResetAction
