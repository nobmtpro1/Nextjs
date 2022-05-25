import { createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie } from '../utils/cookie';
const ISSERVER = typeof window === "undefined";


export const slice = createSlice( {
    name: 'account',
    initialState: {
        login: {
            data: !ISSERVER && getCookie( 'account' ) ? JSON.parse( getCookie( 'account' ) ) : null
        },

        user: {
            data: null
        },
    },
    reducers: {
        // login
        loginSuccess: ( state, action ) =>
        {
            state.login.data = action.payload
            !ISSERVER && setCookie( 'account', JSON.stringify( action.payload ), 365 )
            // localStorage.setItem( 'account', JSON.stringify( action.payload ) )

        },

        // logout
        logout: state =>
        {
            // localStorage.removeItem( 'account' )
            !ISSERVER && setCookie( 'account', '', 1 / 86400 )
            state.login.data = null
        },

        // get user info
        getUserInfoSuccess: ( state, action ) =>
        {
            state.user.data = action.payload
        },
    }
} )

// Action creators are generated for each case reducer function
export const { loginSuccess, logout, getUserInfoSuccess } = slice.actions

export default slice.reducer