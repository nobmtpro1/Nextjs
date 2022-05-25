import axios from 'axios'
import { getCookie, setCookie } from '../utils/cookie';
import store from '../redux/store';
import { loginSuccess, logout } from '../redux/accountSlice';
const ISSERVER = typeof window === "undefined";



axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post[ 'Content-Type' ] = 'application/json';
axios.defaults.headers.common[ 'accept' ] = 'application/json';


axios.interceptors.request.use( function ( config )
{
    // Do something before request is sent
    // config.headers[ "Authorization" ] = !ISSERVER && localStorage.getItem( 'account' ) ? JSON.parse( localStorage.getItem( 'account' ) )?.token_type + ' ' + JSON.parse( localStorage.getItem( 'account' ) )?.access_token : null;

    config.headers[ "Authorization" ] = getCookie( 'account' ) ? 'Bearer ' + JSON.parse( getCookie( 'account' ) )?.access_token : null

    return config;
}, function ( error )
{
    // Do something with request error
    return Promise.reject( error );
} );


let refreshTokenPromise
axios.interceptors.response.use( ( response ) =>
{
    return response
}, function ( error )
{
    const originalRequest = error.config;
    if ( error?.response?.status === 401 && !originalRequest._retry )
    {
        if ( originalRequest.url === 'refresh-token' )
        {
            store.dispatch( logout() )
        }
        originalRequest._retry = true;


        if ( !refreshTokenPromise )
        { // check for an existing in-progress request
            // if nothing is in-progress, start a new refresh token request
            refreshTokenPromise = axios.post( 'refresh-token', {
                'refresh_token': JSON.parse( getCookie( 'account' ) )?.refresh_token,
            } ).then( res =>
            {
                store.dispatch( loginSuccess( res.data ) )
                !ISSERVER && setCookie( 'account', JSON.stringify( res.data ), 365 )
                return res.data
            } ).then( data =>
            {
                refreshTokenPromise = null // clear state
                return data // resolve with the new token
            } )
        }

        return refreshTokenPromise.then( data =>
        {
            axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + data?.access_token
            return axios( originalRequest );
        } )

    }
    return Promise.reject( error )
} )

export default axios