import IProduct from '../../Models/product'

export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

export interface ProductListRequestAction {
  type: typeof PRODUCT_LIST_REQUEST
}

export interface ProductListSuccessAction {
  type: typeof PRODUCT_LIST_SUCCESS
  payload: IProduct[]
}

export interface ProductListFailAction {
  type: typeof PRODUCT_LIST_FAIL
  payload: any
}

export type ProductActionTypes =
  | ProductListRequestAction
  | ProductListSuccessAction
  | ProductListFailAction
