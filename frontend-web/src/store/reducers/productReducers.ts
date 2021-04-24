import IProduct from '../../Models/product'
import { updateObject } from '../../shared/utility'
import {
  ProductActionTypes,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from '../actions/productActionTypes'

interface IState {
  loading: boolean
  products: IProduct[]
  error?: any
}

const initialState: IState = {
  products: [],
  loading: false
}

export const productReducer = (
  state: IState = initialState,
  action: ProductActionTypes
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return updateObject(state, { loading: true, products: [] })
    case PRODUCT_LIST_SUCCESS:
      return updateObject(state, { loading: false, products: action.payload })
    case PRODUCT_LIST_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    default:
      return state
  }
}
