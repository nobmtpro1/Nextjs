import React, { useEffect, useState, useRef } from 'react'
import styles from '../../../../styles/layout/header.module.scss'

import Link from 'next/link'
import { ACCOUNT_AIM_COIN, ACCOUNT_ELEARNING, ACCOUNT_ELEARNING_MEMBERSHIP, ACCOUNT_LEARN_OFFLINE, ACCOUNT_MY_ACCOUNT, ACCOUNT_MY_PORTFOLIO, ACCOUNT_NOTIFICATION, ACCOUNT_ORDER_LIFETIME, ACCOUNT_SUPPORT, ACCOUNT_VIRTUAL_CLASS, ACCOUNT_VOUCHER, ACCOUNT_WISHLIST, BUSINESS_HOME, CART, CART_MEMBERSHIP, DOCUMENT_BLOG, DOCUMENT_EBOOK, DOCUMENT_GLOSSARY, DOCUMENT_PODCAST, DOCUMENT_PROJECT, DOCUMENT_TEST, DOCUMENT_YOUTUBE, HOME, LOGIN, PRODUCT_COURSE, PRODUCT_SESSION, REGISTER } from "../../../../constants/route";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/accountSlice";
import ProductSessionHeader from './ProductSessionHeader';
import ProductCourseHeader from './ProductCourseHeader';
import axios from '../../../../sevices/axios'
import { useRouter } from 'next/router';
import MenuMb from './MenuMb';


const Header = ( props ) =>
{
    const router = useRouter()
    const dispatch = useDispatch()
    const timeout = useRef( null )

    const [ openHeaderMb, setOpenHeaderMb ] = useState( false )
    const [ openMenuUser, setOpenMenuUser ] = useState( false )
    const [ showDropdownCart, setShowDropdownCart ] = useState( false )
    const [ keyword, setKeyword ] = useState( '' )
    const [ result, setResult ] = useState( [] )

    const user = useSelector( state => state.account.user )
    const cart = useSelector( state => state.cart )

    const { data } = user

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

    useEffect( () =>
    {
        const exploreDropdown = document.querySelector( '.' + styles.explore_1 + ' .' + styles.dropdown_2 )
        const documentDropdown = document.querySelector( '.' + styles.document_1 + ' .' + styles.dropdown_2 )
        const cartDropdown = document.querySelector( '.' + styles.cart_1 + ' .' + styles.dropdown )

        router.events.on( 'routeChangeStart', () =>
        {
            exploreDropdown.classList.add( styles.hide )
            documentDropdown.classList.add( styles.hide )
            cartDropdown.classList.add( styles.hide )
            setShowDropdownCart( false )
            setOpenMenuUser( false )
        } )
        router.events.on( 'routeChangeComplete', () =>
        {
            exploreDropdown.classList.remove( styles.hide )
            documentDropdown.classList.remove( styles.hide )
            cartDropdown.classList.remove( styles.hide )
        } )
        router.events.on( 'routeChangeError', () =>
        {
            exploreDropdown.classList.remove( styles.hide )
            documentDropdown.classList.remove( styles.hide )
            cartDropdown.classList.remove( styles.hide )
        } )
    }, [ router ] )

    const handleLogout = () =>
    {
        dispatch( logout() )
        window.location.href = HOME
    }



    // UI
    useEffect( () =>
    {
        const exploreLi = document.querySelectorAll( '.' + styles.explore_1 + ' .' + styles.dropdown_2 + ' li' )
        const exploreContent = document.querySelectorAll( '.' + styles.explore_1 + ' .' + styles.dropdown_2 + ' .' + styles.content_4 )

        Array.from( exploreLi ).forEach( e =>
        {
            var target = document.getElementById( e.getAttribute( "target" ) )

            e.addEventListener( 'mouseover', function ()
            {
                Array.from( exploreContent ).forEach( x =>
                {
                    x.classList.remove( styles.active )
                } )
                target?.classList.add( styles.active )
            } )
        } )

    }, [ props ] )

    useEffect( () =>
    {
        var li1 = document.querySelectorAll( '.' + styles.header + ' .' + styles.li1 )
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
    }, [ user ] )

    useEffect( () =>
    {
        setOpenHeaderMb( false )
    }, [ router ] )

    return (
        <div className={ `${ styles.header_container } ${ props.headerFixed ? styles.fixed : '' }` }>
            <ul className={ `${ styles.header } ${ styles.logged }` }>
                <li className={ styles.burger_1 } onClick={ () => setOpenHeaderMb( prev => !prev ) }>
                    <img alt='' src='/images/header-burger.svg' />
                </li>
                <li className={ styles.logo_mb_1 }>
                    <Link href={ HOME } passHref>
                        <a href='#' className={ styles.image_2 }><img alt='' src='/images/header-logo-mb.svg' /></a>
                    </Link>
                </li>
                <li className={ styles.logo_1 }>
                    <Link href={ HOME } passHref>
                        <a href='#' className={ styles.image_2 }><img alt='' src='/images/header-logo.svg' /></a>
                    </Link>
                </li>
                <li className={ styles.explore_1 }>
                    <div className={ styles.text_2 }>Khám phá</div>
                    <div className={ `${ styles.dropdown_2 } ${ styles.active }` }>
                        <div className={ styles.left_3 }>
                            <ul>
                                {
                                    props?.header?.category?.map( ( e, i ) => (
                                        <li target={ "explore-content-" + i } key={ i }>
                                            <Link href={ PRODUCT_SESSION.slice( 0, -1 ) + '?category=' + e.id } passHref>
                                                <a href='#'>{ e?.name } </a>
                                            </Link>
                                        </li>
                                    ) )
                                }
                            </ul>
                            <div className={ styles.all_4 }>
                                <Link href={ PRODUCT_SESSION } passHref>
                                    <a href='#'>Xem tất cả</a>
                                </Link>
                            </div>
                        </div>
                        <div className={ styles.right_3 }>
                            {
                                props?.header?.category?.map( ( e, i ) => (
                                    <div id={ "explore-content-" + i } className={ `${ styles.content_4 }` } key={ i }>
                                        <div className={ styles.left_5 }>
                                            <div className={ styles.title_6 }>
                                                Bài học
                                            </div>
                                            <div className={ styles.items_6 }>
                                                {
                                                    e?.session?.map( ( x, k ) => (
                                                        <ProductSessionHeader styles={ styles } key={ k } data={ x } />
                                                    ) )
                                                }
                                            </div>
                                            <div className={ styles.all_6 }>
                                                <Link href={ PRODUCT_SESSION.slice( 0, -1 ) + '?category=' + e.id } passHref>
                                                    <a href='#'>Xem tất cả</a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className={ styles.right_5 }>
                                            <div className={ styles.title_6 }>
                                                Khoá học
                                            </div>
                                            <div className={ styles.items_6 }>
                                                {
                                                    e?.course?.map( ( x, k ) => (
                                                        <ProductCourseHeader styles={ styles } key={ k } data={ x } />
                                                    ) )
                                                }
                                            </div>
                                            <div className={ styles.all_6 }>
                                                <Link href={ PRODUCT_COURSE.slice( 0, -1 ) + '?category=' + e.id } passHref>
                                                    <a href='#'>Xem tất cả</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ) )
                            }
                        </div>
                    </div>
                </li>
                <li className={ styles.search_1 }>
                    <input className={ styles.input_2 } placeholder="Tìm kiếm bài học" onChange={ e => setKeyword( e.target.value ) } />
                    <div className={ styles.image_2 } ><img alt='' src='/images/header-search.svg' /></div>
                    <div className={ `${ styles.result_2 } ${ keyword != '' && styles.active }` }>
                        {
                            result.length > 0
                                ?
                                result?.slice( 0, 5 )?.map( ( e, i ) => (
                                    <a key={ i } href={ PRODUCT_SESSION + e?.slug } className={ styles.text_3 }>{ e.name }</a>
                                ) )
                                :
                                <div className={ styles.empty }>Không tìm thấy kết quả</div>
                        }
                    </div>
                </li>
                <li className={ styles.business_1 }>
                    <Link href={ BUSINESS_HOME } passHref>
                        <a href='#' className={ styles.link_2 }>Doanh nghiệp</a>
                    </Link>
                </li>
                <li className={ styles.document_1 }>
                    <div className={ styles.text_2 }>Tài liệu</div>
                    <div className={ styles.dropdown_2 }>
                        <ul>
                            <li>
                                <Link href={ DOCUMENT_GLOSSARY } passHref>
                                    <a href='#'>Glossary</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={ DOCUMENT_EBOOK } passHref>
                                    <a href='#'>Ebook</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={ DOCUMENT_PROJECT } passHref>
                                    <a href='#'>Đồ án tốt nghiệp</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={ DOCUMENT_TEST } passHref>
                                    <a href='#'>Bài test digital</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={ DOCUMENT_YOUTUBE } passHref>
                                    <a href='#'>Video</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={ DOCUMENT_PODCAST } passHref>
                                    <a href='#'>Podcast</a>
                                </Link>
                            </li>
                            <li>
                                <a target="_blank" rel="noreferrer" href={ DOCUMENT_BLOG }>Blog</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className={ styles.cart_1 }>
                    <a className={ styles.image_2 } onClick={ () => setShowDropdownCart( prev => !prev ) }><img alt='' src='/images/header-cart.svg' /></a>
                    {
                        cart?.quantity ? <div className={ styles.badge_2 }><span>{ cart?.quantity }</span></div> : ''
                    }
                    <div className={ `${ styles.dropdown } ${ showDropdownCart ? styles.show : '' }` }>
                        <ul>
                            <li>
                                <Link href={ CART } passHref>
                                    <a href='#'>Lifetime</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={ CART_MEMBERSHIP } passHref>
                                    <a href='#'>Membership</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                {
                    !data
                        ?
                        <>
                            <li className={ styles.register_1 }>
                                <Link href={ REGISTER } passHref>
                                    <a href='#' className={ styles.button_2 }>Đăng ký</a>
                                </Link>
                            </li>
                            <li className={ styles.login_1 }>
                                <Link href={ LOGIN } passHref>
                                    <a href='#' className={ styles.button_2 }>Đăng nhập</a>
                                </Link>
                            </li>
                        </>
                        :
                        <li className={ `${ styles.logged_1 } ${ openMenuUser ? styles.active : '' }` }>
                            <div className={ styles.avatar_2 } onClick={ () => setOpenMenuUser( prev => !prev ) }>
                                <img alt='' src={ data?.avatar?.includes( 'https:/' ) ? data?.avatar : data?.avatar ? process.env.IMG_URL + data.avatar : '/images/avatar-default.png' } />
                            </div>
                            <div className={ styles.text_2 }>
                                <div className={ styles.name_3 }>
                                    { data.fullname }
                                </div>
                                <div className={ styles.email_3 }>
                                    { data.email }
                                </div>
                            </div>
                            <div className={ styles.menu_2 }>
                                <div className={ styles.top_3 }>
                                    <div className={ styles.avatar_4 }>
                                        <img alt='' src={ data?.avatar?.includes( 'https:/' ) ? data?.avatar : data?.avatar ? process.env.IMG_URL + data.avatar : '/images/avatar-default.png' } />
                                    </div>
                                    <div className={ styles.text_4 }>
                                        <div className={ styles.name_5 }>
                                            Hi, { data.fullname }
                                        </div>
                                        <div className={ styles.welcome_5 }>
                                            Mừng bạn trở lại
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles.body_3 }>
                                    <ul className={ styles.ul1 }>
                                        <li className={ `${ styles.li1 }` }>
                                            <div className={ styles.image1 }>
                                                <img alt='' src="/images/account-menu-mobile-1.svg" />
                                            </div>
                                            <Link href={ ACCOUNT_MY_PORTFOLIO } passHref>
                                                <a className={ styles.text1 }>
                                                    Hồ sơ
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={ `${ styles.li1 } ${ styles.dropdown }` }>
                                            <div className={ styles.image1 }>
                                                <img alt='' src="/images/account-menu-mobile-2.svg" />
                                            </div>
                                            <div className={ styles.text1 }>
                                                Chương trình học
                                                <ul className={ styles.ul2 }>
                                                    <li className={ styles.li2 }>
                                                        <div className={ styles.image2 }>
                                                            <img alt='' src="/images/lifetime-dark.svg" />
                                                        </div>
                                                        <Link href={ ACCOUNT_ELEARNING } passHref>
                                                            <a className={ styles.text1 } style={ { transform: 'translateY(-10%)' } }>
                                                                Elearning <br /> (Lifetime)
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li className={ styles.li2 }>
                                                        <div className={ styles.image2 }>
                                                            <img alt='' src="/images/membership-dark.svg" />
                                                        </div>
                                                        <Link href={ ACCOUNT_ELEARNING_MEMBERSHIP } passHref>
                                                            <a className={ styles.text1 } style={ { transform: 'translateY(-10%)' } }>
                                                                Elearning <br /> (Membership)
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li className={ styles.li2 }>
                                                        <div className={ styles.image2 }>
                                                            <img alt='' src="/images/account-menu-mobile-11.svg" />
                                                        </div>
                                                        <Link href={ ACCOUNT_LEARN_OFFLINE } passHref>
                                                            <a className={ styles.text1 }>
                                                                Học offline
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li className={ styles.li2 }>
                                                        <div className={ styles.image2 }>
                                                            <img alt='' src="/images/account-menu-mobile-12.svg" />
                                                        </div>
                                                        <Link href={ ACCOUNT_VIRTUAL_CLASS } passHref>
                                                            <a className={ styles.text1 }>
                                                                Virtual class
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className={ `${ styles.li1 } ${ styles.dropdown }` }>
                                            <div className={ styles.image1 }>
                                                <img alt='' src="/images/account-menu-mobile-3.svg" />
                                            </div>
                                            <div className={ styles.text1 }>
                                                Ưu đãi của bạn
                                                <ul className={ styles.ul2 }>
                                                    <li className={ styles.li2 }>
                                                        <div className={ styles.image2 }>
                                                            <img alt='' src="/images/account-menu-mobile-13.svg" />
                                                        </div>
                                                        <Link href={ ACCOUNT_AIM_COIN } passHref>
                                                            <a className={ styles.text1 }>
                                                                AIM coin
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li className={ styles.li2 }>
                                                        <div className={ styles.image2 }>
                                                            <img alt='' src="/images/account-menu-mobile-14.svg" />
                                                        </div>
                                                        <Link href={ ACCOUNT_VOUCHER } passHref>
                                                            <a className={ styles.text1 }>
                                                                Voucher
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className={ styles.li1 }>
                                            <div className={ styles.image1 }>
                                                <img alt='' src="/images/account-menu-mobile-4.svg" />
                                            </div>
                                            <Link href={ ACCOUNT_ORDER_LIFETIME } passHref>
                                                <a className={ styles.text1 }>
                                                    Đơn hàng
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={ styles.li1 }>
                                            <div className={ styles.image1 }>
                                                <img alt='' src="/images/account-menu-mobile-5.svg" />
                                            </div>
                                            <Link href={ ACCOUNT_WISHLIST } passHref>
                                                <a className={ styles.text1 }>
                                                    Đã lưu
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={ styles.li1 }>
                                            <div className={ styles.image1 }>
                                                <img alt='' src="/images/account-menu-mobile-6.svg" />
                                            </div>
                                            <Link href={ ACCOUNT_NOTIFICATION } passHref>
                                                <a className={ styles.text1 }>
                                                    Thông báo
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={ styles.li1 }>
                                            <div className={ styles.image1 }>
                                                <img alt='' src="/images/account-menu-mobile-7.svg" />
                                            </div>
                                            <Link href={ ACCOUNT_MY_ACCOUNT } passHref>
                                                <a className={ styles.text1 }>
                                                    Tài khoản
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={ styles.li1 }>
                                            <div className={ styles.image1 }>
                                                <img alt='' src="/images/account-menu-mobile-8.svg" />
                                            </div>
                                            <Link href={ ACCOUNT_SUPPORT } passHref>
                                                <a className={ styles.text1 }>
                                                    Hỗ trợ
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={ styles.li1 }>
                                            <div className={ styles.image1 }>
                                                <img alt='' src="/images/account-menu-mobile-9.svg" />
                                            </div>
                                            <div className={ styles.text1 } onClick={ handleLogout }>
                                                Đăng xuất
                                            </div>
                                        </li>
                                    </ul>
                                    <Link href={ BUSINESS_HOME } passHref>
                                        <a href='#' className={ styles.business }>
                                            <div className={ styles.text_bold }>Dành cho doanh nghiệp</div>
                                            <div className={ styles.text_normal }>Giải pháp học tập toàn diện</div>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </li>
                }

            </ul>
            <MenuMb styles={ styles } props={ props } data={ data } openHeaderMb={ openHeaderMb } />
        </div>
    )
}

export default Header
