import axios from '../../../sevices/axios'
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { setFooter } from '../../../redux/footerSlice'
import { useDispatch } from 'react-redux'

const Layout = ( props ) =>
{
    const dispatch = useDispatch()
    const [ data, setData ] = useState( null )

    useEffect( () =>
    {
        axios.get( process.env.API_URL + 'global' ).then( res =>
        {
            setData( res.data )
            dispatch( setFooter( res.data?.footer ) )
        } ).catch( err => { } )
    }, [dispatch] )

    return <>

        <Header header={ data?.header } headerFixed={ props?.headerFixed } />
        { props.children }
        <Footer footer={ data?.footer } />

    </>

}

export default Layout