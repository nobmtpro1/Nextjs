import axios from './axios'

export const getWishlist = async ( type ) =>
{
    var result = []
    await axios.get( `user/wishlist/${ type }` ).then( response =>
    {
        result = response.data
    } ).catch( error =>
    {

    } )

    return result
}

export const checkWishlist = async ( data ) =>
{
    var result = false
    await axios.post( `user/wishlist/check`, data ).then( response =>
    {
        result = response.data.wishlist
    } ).catch( error =>
    {
        result = false
    } )

    return result
}

export const setWishlistApi = async ( type, data ) =>
{
    var result = false
    await axios.post( `user/wishlist/${ type }/set`, data ).then( response =>
    {
        result = true
    } ).catch( error =>
    {

    } )

    return result
}