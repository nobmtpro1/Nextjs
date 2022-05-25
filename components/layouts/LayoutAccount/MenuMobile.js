import styles from '../../../styles/account/menu_mb.module.scss'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { ACCOUNT_AIM_COIN, ACCOUNT_ELEARNING, ACCOUNT_ELEARNING_MEMBERSHIP, ACCOUNT_LEARN_OFFLINE, ACCOUNT_MY_ACCOUNT, ACCOUNT_MY_PORTFOLIO, ACCOUNT_NOTIFICATION, ACCOUNT_ORDER_LIFETIME, ACCOUNT_SUPPORT, ACCOUNT_VIRTUAL_CLASS, ACCOUNT_VOUCHER, ACCOUNT_WISHLIST, HOME } from '../../../constants/route';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/accountSlice';

const MenuMobile = () =>
{

    const dispatch = useDispatch()
    const router = useRouter()
    const pathname = router.pathname

    const handleLogout = () =>
    {
        dispatch( logout() )
        window.location.href = HOME
    }


    useEffect( () =>
    {
        var li1 = document.querySelector( '.' + styles.menu_mb ).getElementsByClassName( styles.li1 )
        Array.from( li1 ).forEach( function ( e )
        {
            e.addEventListener( 'click', function ()
            {
                if ( e.classList.contains( styles.active ) )
                {
                    e.classList.remove( styles.active )
                } else
                {
                    e.classList.add( styles.active )
                }
            } )
        } )
    }, [ styles ] )

    return (
        <div className={ styles.menu_mb }>
            <ul className={ styles.ul1 }>
                <li className={ `${ styles.li1 } ${ ACCOUNT_MY_PORTFOLIO.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_MY_PORTFOLIO ) }>
                    <div className={ styles.image1 }>
                        <img alt='' src="/images/account-menu-mobile-1.svg" />
                    </div>
                    <div className={ styles.text1 }>
                        Hồ sơ
                    </div>
                </li>
                <li className={ `${ styles.li1 } ${ styles.dropdown }  ${ ( pathname.includes( ACCOUNT_ELEARNING ) || ACCOUNT_ELEARNING.includes( pathname ) || ACCOUNT_LEARN_OFFLINE.includes( pathname ) || ACCOUNT_VIRTUAL_CLASS.includes( pathname ) ) && styles.active }` }>
                    <div className={ styles.image1 }>
                        <img alt='' src="/images/account-menu-mobile-2.svg" />
                    </div>
                    <div className={ styles.text1 }>
                        Chương trình học
                        <ul className={ styles.ul2 }>
                            <li className={ `${ styles.li2 } ${ ( ( ACCOUNT_ELEARNING.includes( pathname ) || pathname.includes( ACCOUNT_ELEARNING ) ) && !pathname.includes( ACCOUNT_ELEARNING_MEMBERSHIP ) ) ? styles.active : '' }` } onClick={ () => router.push( ACCOUNT_ELEARNING ) }>
                                <div className={ styles.image2 }>
                                    <img alt='' src="/images/lifetime-color.svg"  />
                                </div>
                                <div className={ `${ styles.text2 } ${ styles.active }` } >
                                    Elearning (Lifetime)
                                </div>
                            </li>
                            <li className={ `${ styles.li2 }  ${ pathname.includes( ACCOUNT_ELEARNING_MEMBERSHIP ) && styles.active }` } onClick={ () => router.push( ACCOUNT_ELEARNING_MEMBERSHIP ) }>
                                <div className={ styles.image2 }>
                                    <img alt='' src="/images/membership-color.svg"/>
                                </div>
                                <div className={ `${ styles.text2 } ${ styles.active }` } >
                                    Elearning (Membership)
                                </div>
                            </li>
                            <li className={ `${ styles.li2 } ${ ACCOUNT_LEARN_OFFLINE.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_LEARN_OFFLINE ) }>
                                <div className={ styles.image2 }>
                                    <img alt='' src="/images/account-menu-mobile-11.svg" />
                                </div>
                                <div className={ styles.text2 }>
                                    Học offline
                                </div>
                            </li>
                            <li className={ `${ styles.li2 } ${ ACCOUNT_VIRTUAL_CLASS.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_VIRTUAL_CLASS ) }>
                                <div className={ styles.image2 }>
                                    <img alt='' src="/images/account-menu-mobile-12.svg" />
                                </div>
                                <div className={ styles.text2 }>
                                    Virtual class
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className={ `${ styles.li1 } ${ styles.dropdown }   ${ ( ACCOUNT_AIM_COIN.includes( pathname ) || ACCOUNT_VOUCHER.includes( pathname ) ) && styles.active }` }>
                    <div className={ styles.image1 }>
                        <img alt='' src="/images/account-menu-mobile-3.svg" />
                    </div>
                    <div className={ styles.text1 }>
                        Ưu đãi của bạn
                        <ul className={ styles.ul2 }>
                            <li className={ `${ styles.li2 } ${ ACCOUNT_AIM_COIN.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_AIM_COIN ) }>
                                <div className={ styles.image2 }>
                                    <img alt='' src="/images/account-menu-mobile-13.svg" />
                                </div>
                                <div className={ styles.text2 }>
                                    AIM coin
                                </div>
                            </li>
                            <li className={ `${ styles.li2 } ${ ACCOUNT_VOUCHER.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_VOUCHER ) }>
                                <div className={ styles.image2 }>
                                    <img alt='' src="/images/account-menu-mobile-14.svg" />
                                </div>
                                <div className={ styles.text2 }>
                                    Voucher
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className={ `${ styles.li1 } ${ ACCOUNT_ORDER_LIFETIME.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_ORDER_LIFETIME ) }>
                    <div className={ styles.image1 }>
                        <img alt='' src="/images/account-menu-mobile-4.svg" />
                    </div>
                    <div className={ styles.text1 }>
                        Đơn hàng
                    </div>
                </li>
                <li className={ `${ styles.li1 } ${ pathname.includes( 'wishlist' ) && styles.active }` } onClick={ () => router.push( ACCOUNT_WISHLIST ) }>
                    <div className={ styles.image1 }>
                        <img alt='' src="/images/account-menu-mobile-5.svg" />
                    </div>
                    <div className={ styles.text1 }>
                        Đã lưu
                    </div>
                </li>
                <li className={ `${ styles.li1 } ${ ACCOUNT_NOTIFICATION.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_NOTIFICATION ) }>
                    <div className={ styles.image1 }>
                        <img alt='' src="/images/account-menu-mobile-6.svg" />
                    </div>
                    <div className={ styles.text1 }>
                        Thông báo
                    </div>
                </li>
                <li className={ `${ styles.li1 } ${ ACCOUNT_MY_ACCOUNT.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_MY_ACCOUNT ) }>
                    <div className={ styles.image1 }>
                        <img alt='' src="/images/account-menu-mobile-7.svg" />
                    </div>
                    <div className={ styles.text1 }>
                        Tài khoản
                    </div>
                </li>
                <li className={ `${ styles.li1 } ${ ACCOUNT_SUPPORT.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_SUPPORT ) }>
                    <div className={ styles.image1 }>
                        <img alt='' src="/images/account-menu-mobile-8.svg" />
                    </div>
                    <div className={ styles.text1 }>
                        Hỗ trợ
                    </div>
                </li>
                <li className={ styles.li1 } onClick={ handleLogout }>
                    <div className={ styles.image1 }>
                        <img alt='' src="/images/account-menu-mobile-9.svg" />
                    </div>
                    <div className={ styles.text1 }>
                        Đăng xuất
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default MenuMobile
