import IProduct from '../../Models/product'
import { updateObject } from '../../shared/utility'
import {
  ProductActionTypes,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from '../actions/productActionTypes'

interface IListState {
  loading: boolean
  products: IProduct[]
  error?: string
}

interface IDetailsState {
  loading: boolean
  product: IProduct | {}
  error?: string
}

const initialDetailsState: IDetailsState = {
  product: {},
  loading: false
}

const initialListState: IListState = {
  products: [],
  loading: false
}

export const productReducer = (
  state: IListState = initialListState,
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

export const productDetailsReducer = (
  state: IDetailsState = initialDetailsState,
  action: ProductActionTypes
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return updateObject(state, { loading: true })
    case PRODUCT_DETAILS_SUCCESS:
      return updateObject(state, { loading: false, product: action.payload })
    case PRODUCT_DETAILS_FAIL:
      return updateObject(state, { loading: false, error: action.payload })
    default:
      return state
  }
}
