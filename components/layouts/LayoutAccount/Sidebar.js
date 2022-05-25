import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ACCOUNT_AIM_COIN, ACCOUNT_ELEARNING, ACCOUNT_ELEARNING_MEMBERSHIP, ACCOUNT_LEARN_OFFLINE, ACCOUNT_MY_ACCOUNT, ACCOUNT_MY_PORTFOLIO, ACCOUNT_NOTIFICATION, ACCOUNT_ORDER_LIFETIME, ACCOUNT_SUPPORT, ACCOUNT_VIRTUAL_CLASS, ACCOUNT_VOUCHER, ACCOUNT_WISHLIST, HOME } from '../../../constants/route';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/accountSlice';
import styles from '../../../styles/account/sidebar.module.scss'


const Sidebar = () =>
{
    const dispatch = useDispatch()
    const router = useRouter()
    const pathname = router.asPath

    const handleLogout = () =>
    {
        dispatch( logout() )
        window.location.href = HOME
    }

    useEffect( () =>
    {
        var li1 = document.querySelectorAll( `.${ styles.li_content }` )

        Array.from( li1 ).forEach( function ( e )
        {
            e.addEventListener( 'click', function ()
            {
                if ( e.parentElement.classList.contains( styles.drop ) )
                {
                    e.parentElement.classList.remove( styles.drop )
                } else
                {
                    e.parentElement.classList.add( styles.drop )
                }
            } )
        } )
    }, [] )


    return (
        <div className={ styles.sidebar } >
            <a href="#" className={ styles.logo } onClick={ () => router.push( HOME ) }>
                <img alt='' src="/images/account-logo.svg" />
            </a>
            <div className={ styles.menu }>
                <ul className={ styles.ul1 }>
                    <li className={ `${ styles.li1 } ${ ACCOUNT_MY_PORTFOLIO.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_MY_PORTFOLIO ) }>
                        <div className={ styles.li_content }>
                            <div className={ styles.image }>
                                <img alt='' src="/images/account-sidebar-icon-1.svg" />
                            </div>
                            <div className={ styles.text }>
                                Hồ sơ
                            </div>
                        </div>
                    </li>


                    <li className={ `${ styles.li1 } ${ styles.dropdown }  ${ ( ACCOUNT_ELEARNING.includes( pathname ) || pathname.includes( ACCOUNT_ELEARNING ) || ( ACCOUNT_LEARN_OFFLINE.includes( pathname ) || pathname.includes( ACCOUNT_LEARN_OFFLINE ) ) || ( ACCOUNT_VIRTUAL_CLASS.includes( pathname ) || pathname.includes( ACCOUNT_VIRTUAL_CLASS ) ) ) && styles.drop }` }>
                        <div className={ styles.li_content }>
                            <div className={ styles.image }>
                                <img alt='' src="/images/account-sidebar-icon-2.svg" />
                            </div>
                            <div className={ styles.text } >
                                Chương trình học
                            </div>
                        </div>

                        <ul className={ `${ styles.ul2 } ` }>
                            <li className={ `${ styles.li2 } ${ styles.two_line } ${ ( ( ACCOUNT_ELEARNING.includes( pathname ) || pathname.includes( ACCOUNT_ELEARNING ) ) && !pathname.includes( ACCOUNT_ELEARNING_MEMBERSHIP ) ) ? styles.active : '' }` } onClick={ () => router.push( ACCOUNT_ELEARNING ) }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/lifetime.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Elearning<span>(Lifetime)</span>
                                </div>
                            </li>
                            <li className={ `${ styles.li2 } ${ styles.two_line } ${ pathname.includes( ACCOUNT_ELEARNING_MEMBERSHIP ) && styles.active }` } onClick={ () => router.push( ACCOUNT_ELEARNING_MEMBERSHIP ) }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/membership.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Elearning<span>(Membership)</span>
                                </div>
                            </li>
                            <li className={ `${ styles.li2 } ${ ( ACCOUNT_LEARN_OFFLINE.includes( pathname ) || pathname.includes( ACCOUNT_LEARN_OFFLINE ) ) && styles.active }` } onClick={ () => router.push( ACCOUNT_LEARN_OFFLINE ) }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-sidebar-icon-10.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Học offline
                                </div>
                            </li>
                            <li className={ `${ styles.li2 } ${ ( ACCOUNT_VIRTUAL_CLASS.includes( pathname ) || pathname.includes( ACCOUNT_VIRTUAL_CLASS ) ) && styles.active }` } onClick={ () => router.push( ACCOUNT_VIRTUAL_CLASS ) }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-sidebar-icon-11.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Virtual class
                                </div>
                            </li>
                        </ul>
                    </li>



                    <li className={ `${ styles.li1 }  ${ styles.dropdown }  ${ ( pathname.includes( ACCOUNT_AIM_COIN ) || ACCOUNT_AIM_COIN.includes( pathname ) || ACCOUNT_VOUCHER.includes( pathname ) || ACCOUNT_VOUCHER.includes( pathname ) ) && styles.drop }` } >
                        <div className={ styles.li_content }>
                            <div className={ styles.image }>
                                <img alt='' src="/images/account-sidebar-icon-3.svg" />
                            </div>
                            <div className={ styles.text }>
                                Ưu đãi của bạn
                            </div>
                        </div>
                        <ul className={ styles.ul2 }>
                            <li className={ `${ styles.li2 } ${ ACCOUNT_AIM_COIN.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_AIM_COIN ) }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-sidebar-icon-12.svg" />
                                </div>
                                <div className={ styles.text }>
                                    AIM coin
                                </div>
                            </li>
                            <li className={ `${ styles.li2 } ${ ACCOUNT_VOUCHER.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_VOUCHER ) }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-sidebar-icon-13.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Voucher
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className={ `${ styles.li1 } ${ ACCOUNT_ORDER_LIFETIME.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_ORDER_LIFETIME ) }>
                        <div className={ styles.li_content }>
                            <div className={ styles.image }>
                                <img alt='' src="/images/account-order.svg" />
                            </div>
                            <div className={ styles.text }>
                                Đơn hàng
                            </div>
                        </div>
                    </li>
                    <li className={ `${ styles.li1 } ${ ( pathname.includes( 'wishlist' ) ) && styles.active }` } onClick={ () => router.push( ACCOUNT_WISHLIST ) }>
                        <div className={ styles.li_content }>
                            <div className={ styles.image }>
                                <img alt='' src="/images/account-sidebar-icon-4.svg" />
                            </div>
                            <div className={ styles.text }>
                                Đã lưu
                            </div>
                        </div>
                    </li>
                    <li className={ `${ styles.li1 } ${ ACCOUNT_NOTIFICATION.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_NOTIFICATION ) }>
                        <div className={ styles.li_content }>
                            <div className={ styles.image }>
                                <img alt='' src="/images/account-sidebar-icon-5.svg" />
                            </div>
                            <div className={ styles.text }>
                                Thông báo
                            </div>
                        </div>
                    </li>
                    <li className={ `${ styles.li1 } ${ ACCOUNT_MY_ACCOUNT.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_MY_ACCOUNT ) }>
                        <div className={ styles.li_content }>
                            <div className={ styles.image }>
                                <img alt='' src="/images/account-sidebar-icon-6.svg" />
                            </div>
                            <div className={ styles.text }>
                                Tài khoản
                            </div>
                        </div>
                    </li>
                    <li className={ `${ styles.li1 } ${ ACCOUNT_SUPPORT.includes( pathname ) && styles.active }` } onClick={ () => router.push( ACCOUNT_SUPPORT ) }>
                        <div className={ styles.li_content }>
                            <div className={ styles.image }>
                                <img alt='' src="/images/account-sidebar-icon-7.svg" />
                            </div>
                            <div className={ styles.text }>
                                Hỗ trợ
                            </div>
                        </div>
                    </li>
                    <li className={ `${ styles.li1 }` } onClick={ handleLogout }>
                        <div className={ styles.li_content }>
                            <div className={ styles.image }>
                                <img alt='' src="/images/account-sidebar-icon-8.svg" />
                            </div>
                            <div className={ styles.text }>
                                Đăng xuất
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
