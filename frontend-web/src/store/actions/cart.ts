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
import axios from 'axios'
import { Dispatch } from 'redux'

import { IAddress } from '../reducers/models/addressModel'
import { AppState } from '../store'
import {
  CartActionTypes,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from './cartActionTypes'

export const addToCart = (id: string, qty: number) => async (
  dispatch: Dispatch<CartActionTypes>,
  getState: () => AppState
) => {
  const { data } = await axios.get(`/api/products/${id}`)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id: string) => (
  dispatch: Dispatch<CartActionTypes>,
  getState: () => AppState
) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data: IAddress) => (
  dispatch: Dispatch<CartActionTypes>
) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (method: string) => (
  dispatch: Dispatch<CartActionTypes>
) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: method
  })
  localStorage.setItem('paymentMethod', JSON.stringify(method))
}
