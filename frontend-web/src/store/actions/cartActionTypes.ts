import { ICart } from '../reducers/models/cartModel'

export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'

export interface CartAddItemAction {
  type: typeof CART_ADD_ITEM
  payload: ICart
}

export interface CartRemoveItemAction {
  type: typeof CART_REMOVE_ITEM
  payload: string
}

export type CartActionTypes = CartRemoveItemAction | CartAddItemAction
