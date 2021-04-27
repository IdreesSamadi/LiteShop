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
  CartActionTypes,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS
} from '../actions/cartActionTypes'
import { IAddress } from './models/addressModel'
import { ICart } from './models/cartModel'

interface ICartState {
  cartItems: ICart[]
  shippingAddress: IAddress | {}
}
const initialState: ICartState = {
  cartItems: [],
  shippingAddress: {}
}

export const cartReducer = (
  state: ICartState = initialState,
  action: CartActionTypes
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)
      if (existItem) {
        return updateObject(state, {
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          )
        })
      } else {
        return updateObject(state, {
          cartItems: [...state.cartItems, item]
        })
      }
    case CART_REMOVE_ITEM:
      return updateObject(state, {
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        )
      })
    case CART_SAVE_SHIPPING_ADDRESS:
      return updateObject(state, {
        shippingAddress: action.payload
      })
    default:
      return state
  }
}
