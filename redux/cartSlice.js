import { createSlice } from '@reduxjs/toolkit'
const ISSERVER = typeof window === "undefined";

export const slice = createSlice( {
    name: 'cart',
    initialState: {
        quantity: 0
    },
    reducers: {
        // get cart
        setCartQuantity: ( state, action ) =>
        {
            state.quantity = action.payload
        },
    }
} )

// Action creators are generated for each case reducer function
export const { setCartQuantity } = slice.actions

export default slice.reducer