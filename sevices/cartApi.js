import axios from "./axios"
import { setCartQuantity } from "../redux/cartSlice"
import store from "../redux/store"
import { getCookie } from "../utils/cookie";

const ISSERVER = typeof window === "undefined";

const { dispatch } = store


export const getCart = () =>
{
    if ( !ISSERVER && getCookie( 'account' ) && JSON.parse( getCookie( 'account' ) )?.access_token )
    {
        axios.get( 'page/cart/lifetime/get-quantity' ).then( response =>
        {
            dispatch( setCartQuantity( response.data ) )
        } ).catch( error =>
        {
        } )
    }
}


