import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice( {
    name: 'footer',
    initialState: {
        data:null
    },
    reducers: {
        setFooter: ( state, action ) =>
        {
            state.data = action.payload
        },
    }
} )

// Action creators are generated for each case reducer function
export const { setFooter } = slice.actions

export default slice.reducer