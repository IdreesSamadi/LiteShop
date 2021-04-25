import { updateObject } from '../../shared/utility'
import {
  CartActionTypes,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM
} from '../actions/cartActionTypes'
import { ICart } from './models/cartModel'

interface ICartState {
  cartItems: ICart[]
}
const initialState: ICartState = {
  cartItems: []
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
    default:
      return state
  }
}
