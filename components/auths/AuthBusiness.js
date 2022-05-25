import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { HOME, LOGIN } from '../../constants/route'

const AuthBusiness = ( props ) =>
{
    const router = useRouter()

    const { user, login } = useSelector( state => state.account )

    useEffect( () =>
    {
        if ( !login?.data )
        {
            router.push( {
                pathname: LOGIN,
                query: {
                    url: router.pathname
                }
            } )
        }

        if ( user?.data )
        {
            if ( !user?.data?.is_business && !user?.data?.is_business_admin )
            {
                router.push( HOME )
            }
        }
    }, [ router, user, login ] )

    return <>

        { ( user?.data?.is_business || user?.data?.is_business_admin ) ? props.children : '' }

    </>
}

export default AuthBusiness
