import React, { useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import HeaderMb from '../../layouts/Layout/Header/index'
import Banner from './Banner'
import MenuMobile from './MenuMobile'
import AuthBusiness from '../../auths/AuthBusiness'
import axios from '../../../sevices/axios'
import { useDispatch } from 'react-redux'
import { setFooter } from '../../../redux/footerSlice'

const Layout = ( props ) =>
{
    const dispatch = useDispatch()
    const styles = props.styles
    const [ isOwner, setIsOwner ] = useState( false )

    const [ data, setData ] = useState( null )

    useEffect( () =>
    {
        axios.get( process.env.API_URL + 'global' ).then( res =>
        {
            setData( res.data )
            dispatch( setFooter( res.data?.footer ) )
        } ).catch( err => { } )
    }, [] )

    useEffect( () =>
    {
        axios.get( 'page/business/check-permission' ).then( response =>
        {
            setIsOwner( response.data || false )
        } ).catch( error => { } )
    }, [] )

    return <>
        <AuthBusiness>
            <div className={ styles.container }>
                <Sidebar styles={ styles } isOwner={ isOwner } />
                <div className={ styles.main }>
                    <Header styles={ styles } />
                    <div className={ styles.content }>
                        <div className={ styles.hd_mb }>
                            <HeaderMb styles={ styles } header={ data?.header } />
                        </div>
                        <Banner styles={ styles } />
                        <MenuMobile styles={ styles } isOwner={ isOwner } />
                        { props.children }
                    </div>
                </div>
            </div>
        </AuthBusiness>
    </>
}

export default Layout