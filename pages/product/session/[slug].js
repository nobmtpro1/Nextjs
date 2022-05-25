import styles from '../../../styles/main/product.module.scss'
import React, { useEffect, useState } from 'react'
import DiscountList from '../../../components/global/DiscountList'
import Layout from '../../../components/layouts/Layout'
import { useRouter } from 'next/router'
import { getCookie, setCookie } from '../../../utils/cookie'
import { useDispatch, useSelector } from 'react-redux'
import { CART, CART_CHECKOUT, HOME, LOGIN, PRODUCT_SESSION } from '../../../constants/route'
import { getWishlist } from '../../../sevices/wishlistApi'
import axios from '../../../sevices/axios'
import HeadTag from '../../../components/global/HeadTag'
import { setCartQuantity } from '../../../redux/cartSlice'
import PopupShare from '../../../components/global/PopupShare';
import BannerMembership from '../../../components/global/BannerMembership';
import Breadcrumb from '../../../components/pages/product/detailPage/Breadcrumb';
import Info from '../../../components/pages/product/detailPage/Info';
import SessionRelated from '../../../components/pages/product/detailPage/SessionRelated';
import BannerMb from '../../../components/pages/product/detailPage/BannerMb';
import Menu from '../../../components/pages/product/detailPage/Menu';
import InfoMb from '../../../components/pages/product/detailPage/InfoMb';
import Tab1 from '../../../components/pages/product/detailPage/Tab1';
import Tab2 from '../../../components/pages/product/detailPage/Tab2';
import Tab3 from '../../../components/pages/product/detailPage/Tab3';
import Tab4 from '../../../components/pages/product/detailPage/Tab4';
import Tab5 from '../../../components/pages/product/detailPage/Tab5';
import Faqs from '../../../components/pages/product/detailPage/Faqs';
import nProgress from 'nprogress'

const Index = ( props ) =>
{

    const dispatch = useDispatch()
    const [ showShare, setShowShare ] = useState( false )

    const session = props?.data?.session
    const reviewSession = props?.data?.reviewSession
    const staticContent = props?.data?.staticContent
    const relatedSession = props?.data?.relatedSession
    const discountTable = props?.data?.discountTable
    const router = useRouter()
    // state
    const [ wishlist, setWishlist ] = useState( false )
    const [ active, setActive ] = useState( false )
    const [ tab, setTab ] = useState( 0 )

    // selector
    const { login } = useSelector( state => state.account )
    const footer  = useSelector( state => state.footer )

    // SEO
    const seo = JSON.parse( session?.seo || "{}" )

    // REVIEW
    const review = session?.avg_review_star[ 0 ]
    const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

    // COURSE CATEGORY
    const [ courseCategory, setCourseCategory ] = useState( [] )
    useEffect( () =>
    {
        var arr = []
        session?.course.forEach( e =>
        {
            if ( !arr.includes( e?.course_category?.name ) )
            {
                arr.push( e?.course_category?.name )
            }
        } )
        setCourseCategory( arr )
    }, [ session ] )


    useEffect( () =>
    {
        const fetch = async () =>
        {
            const data = await getWishlist( 'session' )
            setWishlist( data.wishlist?.includes( session?.id ) )
        }
        fetch()
    }, [ session?.id ] )

    useEffect( () =>
    {
        var viewedSession = getCookie( 'viewedSession' ) ? JSON.parse( getCookie( 'viewedSession' ) ) : []
        var checkExist = viewedSession?.findIndex( e => e === session?.id )

        if ( checkExist < 0 )
        {
            viewedSession.push( session?.id )
        } else
        {
            viewedSession.splice( checkExist, 1 );
            viewedSession.push( session?.id )
        }
        setCookie( 'viewedSession', JSON.stringify( viewedSession ), 365 )
    }, [ session ] )

    const handleAddToCart = async ( item_id ) =>
    {
        // nProgress.set( 0.4 )
        if ( login?.data )
        {
            await axios.post( 'page/cart/lifetime/add', { type: 0, item_id } ).then( response =>
            {
                dispatch( setCartQuantity( response.data ) )
            } ).catch( error =>
            {

            } )
            router.push( CART )
        } else
        {
            router.push( {
                pathname: LOGIN,
                query: {
                    url: router.pathname
                }
            } )
        }
    }

    const handleBuyNow = async ( item_id ) =>
    {
        // nProgress.set( 0.4 )
        if ( login?.data )
        {
            await axios.post( 'page/cart/lifetime/add', { type: 0, item_id } ).then( response =>
            {
                dispatch( setCartQuantity( response.data ) )
            } ).catch( error =>
            {

            } )
            router.push( CART_CHECKOUT )
        } else
        {
            router.push( {
                pathname: LOGIN,
                query: {
                    url: router.pathname
                }
            } )
        }
    }

    if ( router.isFallback )
    {
        return <div>Loading...</div>
    }

    return (
        <div className={ styles.container }>

            <HeadTag title={ seo?.title } description={ seo?.description } keywords={ seo?.keywords } image={ session?.image } />

            <PopupShare
                active={ showShare }
                setActive={ setShowShare }
                title="Chia sẻ bài học"
                content="Chần chờ gì mà không chia sẻ bài học thú vị này đến nhiều người hơn?"
                url={ process.env.BASE_URL + router.asPath }
            />

            <DiscountList active={ active } setActive={ setActive } data={ discountTable } />

            <div className={ styles.product_page } >

                <Breadcrumb styles={ styles } data={ [
                    {
                        name: 'Trang chủ',
                        href: HOME
                    },
                    {
                        name: 'Sản phẩm',
                        href: PRODUCT_SESSION
                    },
                    {
                        name: session?.name,
                        href: '#'
                    },
                ] } />

                <Info
                    type={ "session" }
                    styles={ styles }
                    data={ session }
                    courseCategory={ courseCategory }
                    star={ star }
                    wishlist={ wishlist }
                    footer={ footer?.data }
                    login={ login }
                    setWishlist={ setWishlist }
                    setShowShare={ setShowShare }
                    handleAddToCart={ handleAddToCart }
                    handleBuyNow={ handleBuyNow }
                    setActive={ setActive }
                />

                <div className={ styles.content }>

                    <BannerMb styles={ styles } image={ session?.image } />

                    <Menu styles={ styles } tab={ tab } setTab={ setTab } />

                    <InfoMb
                        type={ "session" }
                        styles={ styles }
                        data={ session }
                        courseCategory={ courseCategory }
                        star={ star }
                        wishlist={ wishlist }
                        footer={ footer?.data }
                        login={ login }
                        setWishlist={ setWishlist }
                        setShowShare={ setShowShare }
                        handleAddToCart={ handleAddToCart }
                        handleBuyNow={ handleBuyNow }
                        setActive={ setActive }
                    />

                    <a onClick={ () => handleAddToCart( session?.id ) } className={ `${ styles.button_cart_mb }` }>
                        Thêm vào giỏ hàng
                    </a>

                    <a href='#' className={ `${ styles.button_discount_mb }` } onClick={ () => setActive( true ) }>
                        <span>Học nhiều Discount nhiều</span>
                    </a>

                    <div className={ styles.contact_mb }>
                        <div className={ styles.col }>
                            <img alt='' src='/images/main/product-phone-mb.svg' />
                        </div>
                        <div className={ `${ styles.col }` }>
                            { footer?.data?.find( e => e.key == 'phone' )?.value }
                        </div>
                    </div>

                    <Tab1 styles={ styles } tab={ tab } data={ session } />

                    <Tab2 styles={ styles } tab={ tab } data={ session } />

                    <Tab3 styles={ styles } tab={ tab } data={ session } />

                    <Tab4 styles={ styles } tab={ tab } data={ session } />

                    <Tab5 styles={ styles } tab={ tab } star={ star } review={ review } reviewSession={ reviewSession } />

                    <Faqs styles={ styles } staticContent={ staticContent } />

                </div>

                <SessionRelated styles={ styles } data={ relatedSession } />

                <div className={ styles.banner_membership }>
                    <BannerMembership />
                </div>
            </div>
        </div >
    )
}

export default Index

Index.getLayout = function getLayout ( page )
{
    return (
        <Layout header={ page.props.header } footer={ page.props.footer }>
            { page }
        </Layout>
    )
}

export async function getServerSideProps ( context )
{
    var data = null;

    await fetch( process.env.API_URL + 'page/product/session-detail/' + context.params.slug, {
        method: 'POST',
        body: JSON.stringify( {} )
        ,
        headers: {
            'Content-type': 'application/json'
        }
    } )
        .then( response => response.json() )
        .then( result =>
        {
            data = result
        } )
        .catch( error => { } )

    if ( !data )
    {
        return {
            notFound: true
        }
    }

    return {
        props: {
            data
        }, // will be passed to the page component as props
    }
}


