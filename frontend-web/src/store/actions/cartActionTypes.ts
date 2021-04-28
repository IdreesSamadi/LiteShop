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
import { IAddress } from '../reducers/models/addressModel'
import { ICart } from '../reducers/models/cartModel'

export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
export const CART_SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS'
export const CART_SAVE_PAYMENT_METHOD = 'CART_SAVE_PAYMENT_METHOD'

export interface CartAddItemAction {
  type: typeof CART_ADD_ITEM
  payload: ICart
}

export interface CartRemoveItemAction {
  type: typeof CART_REMOVE_ITEM
  payload: string
}

export interface CartSaveShippingAddressAction {
  type: typeof CART_SAVE_SHIPPING_ADDRESS
  payload: IAddress
}

export interface CartSavePaymentMethodAction {
  type: typeof CART_SAVE_PAYMENT_METHOD
  payload: string
}

export type CartActionTypes =
  | CartRemoveItemAction
  | CartAddItemAction
  | CartSaveShippingAddressAction
  | CartSavePaymentMethodAction
