import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ACCOUNT_MY_ACCOUNT, ACCOUNT_NOTIFICATION, CART, HOME, PRODUCT_SESSION } from '../../../constants/route'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import axios from '../../../sevices/axios'
import { logout } from '../../../redux/accountSlice'
import Link from 'next/link'
import styles from '../../../styles/account/header.module.scss'

const Header = ( {  } ) =>
{
    const router = useRouter()
    const dispatch = useDispatch()
    const timeout = useRef( null )

    const [ keyword, setKeyword ] = useState( '' )
    const [ result, setResult ] = useState( [] )
    const [ notQuantity, setNotQuantity ] = useState( 0 )

    const { data } = useSelector( state => state.account.user )
    const cart = useSelector( state => state.cart )

    useEffect( () =>
    {
        axios.get( 'page/account/common/notification-quantity' ).then( response =>
        {
            setNotQuantity( response.data )
        } ).catch( error =>
        {
        } )
    }, [] )

    useEffect( () =>
    {
        clearTimeout( timeout.current )
        timeout.current = setTimeout( () =>
        {
            if ( keyword != '' )
            {
                axios.post( 'header/search', {
                    keyword
                } ).then( response =>
                {
                    setResult( response.data )
                } ).catch( error =>
                {
                } )
            }
        }, 500 );

    }, [ keyword ] )

    const handleLogout = () =>
    {
        dispatch( logout() )
        window.location.href = HOME
    }

    return (
        <div className={ styles.header } >
            <div className={ styles.left }>
                <div className={ styles.search }>
                    <input className={ styles.input } placeholder='Tìm kiếm' onChange={ e => setKeyword( e.target.value ) } />
                    <div className={ styles.icon }>
                        <img alt='' src="/images/account-header-search.svg" />
                    </div>
                    <div className={ `${ styles.search_result } ${ keyword != '' && styles.active }` }>
                        {
                            result.length > 0
                                ?
                                result?.slice(0,5)?.map( ( e, i ) => (
                                    <Link href={ PRODUCT_SESSION + e?.slug } passHref key={ i }>
                                        <a href='#' className={ styles.text }>{ e.name }</a>
                                    </Link>
                                ) )
                                :
                                <div className={ styles.empty }>Không tìm thấy kết quả</div>
                        }
                    </div>
                </div>
            </div>
            <div className={ styles.right }>
                <div className={ styles.cart } onClick={ () => router.push( CART ) }>
                    <div className={ styles.image }>
                        <img alt='' src="/images/account-header-cart.svg" />
                    </div>
                    <div className={ styles.badge } >
                        <span>{ cart?.quantity }</span>
                    </div>
                </div>
                <div className={ styles.cart } onClick={ () => router.push( ACCOUNT_NOTIFICATION ) }>
                    <div className={ styles.image }>
                        <img alt='' src="/images/account-header-bell.svg" />
                    </div>
                    <div className={ styles.badge } >
                        <span>{ notQuantity }</span>
                    </div>
                </div>
                <div className={ styles.account }>
                    <div className={ styles.image }>
                        <img alt='' src={ data?.avatar?.includes( 'https:/' ) ? data?.avatar : data?.avatar ? process.env.IMG_URL + data.avatar : '/images/avatar-default.png' } />
                    </div>
                    <div className={ styles.name } >
                        { data?.fullname }
                        <div className={ styles.popup }>
                            <div className={ styles.item } onClick={ () => router.push( ACCOUNT_MY_ACCOUNT ) }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-header-person.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Cập nhật tài khoản
                                </div>
                            </div>
                            <div className={ styles.item } onClick={ handleLogout }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-header-logout.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Đăng xuất
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
