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
  OrderActionTypes,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS
} from '../actions/orderActionTypes'
import { IAddress } from './models/addressModel'
import { IOrder } from './models/orderModel'

interface IOrderCreateState {
  order: IOrder | {}
  loading: boolean
  error?: string
  success?: boolean
}
const initialState: IOrderCreateState = {
  order: {},
  loading: false
}

export const orderCreateReducer = (
  state: IOrderCreateState = initialState,
  action: OrderActionTypes
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return updateObject(state, { loading: true })
    case ORDER_CREATE_SUCCESS:
      return updateObject(state, {
        loading: false,
        success: true,
        order: action.type
      })
    case ORDER_CREATE_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    default:
      return state
  }
}

interface IOrderDetailsState {
  orderItems: IOrder[]
  shippingAddress: IAddress | {}
  loading: boolean
  error?: string
}
const OrderDetailsState: IOrderDetailsState = {
  orderItems: [],
  shippingAddress: {},
  loading: true
}

export const orderDetailsReducer = (
  state: IOrderDetailsState = OrderDetailsState,
  action: OrderActionTypes
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return updateObject(state, { loading: true })
    case ORDER_DETAILS_SUCCESS:
      return updateObject(state, {
        loading: false,
        order: action.type
      })
    case ORDER_DETAILS_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    default:
      return state
  }
}
