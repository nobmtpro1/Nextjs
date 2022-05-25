import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LOGIN } from '../../constants/route'

const AuthUser = ( props ) =>
{
    const router = useRouter()

    const { login } = useSelector( state => state.account )

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
    }, [ router, login.data ] )

    return <div style={ { minHeight: '100vh' } }>

        { login?.data ? props.children : '' }

    </div>
}

export default AuthUser
