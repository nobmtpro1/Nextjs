import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './accountSlice'
import cartSlice from './cartSlice'
import footerSlice from './footerSlice'

export default configureStore( {
	reducer: {
		account: accountSlice,
		cart: cartSlice,
		footer: footerSlice,
	}
} )