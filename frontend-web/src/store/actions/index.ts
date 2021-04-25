import { CartActionTypes } from './cartActionTypes'
import { ProductActionTypes } from './productActionTypes'

export type AppAction = ProductActionTypes | CartActionTypes
