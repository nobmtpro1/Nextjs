import React, { useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import HeaderMb from '../../layouts/Layout/Header/index'
import Banner from './Banner'
import MenuMobile from './MenuMobile'
import AuthUser from '../../auths/AuthUser'
import axios from '../../../sevices/axios'
import { useDispatch } from 'react-redux'
import { setFooter } from '../../../redux/footerSlice'

const Layout = ( props ) =>
{
    const dispatch = useDispatch()

    const styles = props.styles

    const [ data, setData ] = useState( null )

    useEffect( () =>
    {
        axios.get( process.env.API_URL + 'global' ).then( res =>
        {
            setData( res.data )
            dispatch( setFooter( res.data?.footer ) )
        } ).catch( err => { } )
    }, [] )

    return <>
        <AuthUser>
            <div className={ styles.container }>
                <Sidebar styles={ styles } />
                <div className={ styles.main } >
                    <Header styles={ styles } />
                    <div className={ styles.content } >
                        <div className={ styles.header_mobile } >
                            <HeaderMb header={ data?.header } />
                        </div>
                        <Banner styles={ styles } />
                        <MenuMobile styles={ styles } />
                        { props.children }
                    </div>
                </div>
            </div>
        </AuthUser>
    </>
}

export default Layout