import { updateObject } from '../../shared/utility'
import { CartActionTypes, CART_ADD_ITEM } from '../actions/cartActionTypes'
import { ICart } from './models/cartModel'

const initialState: { cartItems: ICart[] } = {
  cartItems: []
}

export const cartReducer = (state = initialState, action: CartActionTypes) => {
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
        return updateObject(state, { cartItems: [...state.cartItems, item] })
      }
    default:
      return state
  }
}
