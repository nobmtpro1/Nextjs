import axios from "./axios"
import { getUserInfoSuccess} from "../redux/accountSlice"
import store from "../redux/store"
import { getCookie } from "../utils/cookie";

const ISSERVER = typeof window === "undefined";

const { dispatch } = store


export const getUserInfoApi = () =>
{
    if ( !ISSERVER && getCookie( 'account' ) && JSON.parse( getCookie( 'account' ) )?.access_token )
    {
        axios.get( 'user/info' ).then( response =>
        {
            dispatch( getUserInfoSuccess( response.data ) )
        } ).catch( error =>
        {
        } )
    }
}


