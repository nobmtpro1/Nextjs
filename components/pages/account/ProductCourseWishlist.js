
import React, { useEffect, useState } from "react";
import moment from 'moment'
import NextLink from 'next/link'
import { CART, CART_CHECKOUT, LOGIN, PRODUCT_COURSE } from "../../../constants/route";
import { formatPrice } from "../../../utils/helper";
import router from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../sevices/axios';
import { setCartQuantity } from '../../../redux/cartSlice';
import nProgress from "nprogress";

const ProductCourseWishlist = ( { data, styles,unwishlist } ) =>
{

    formatPrice()
    const dispatch = useDispatch()
    const { login } = useSelector( state => state.account )

    const review = data?.avg_review_star[ 0 ]
    const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

    const handleAddToCart = async ( item_id ) =>
    {
        //nprogress.set(0.4)
        if ( login?.data )
        {
            await axios.post( 'page/cart/lifetime/add', { type: 1, item_id } ).then( response =>
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
        //nprogress.set(0.4)
        if ( login?.data )
        {
            await axios.post( 'page/cart/lifetime/add', { type: 1, item_id } ).then( response =>
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


    return (
        <>
            <div className={ styles.item }>
                <div className={ styles.unwishlist } onClick={ () => unwishlist( 'course', data?.id ) }>
                    <img alt='' src='/images/unwishlist.svg' />
                </div>

                <NextLink href={ PRODUCT_COURSE + data?.slug } passHref>
                    <div style={ { cursor: 'pointer' } } className={ styles.image }>
                        <img alt='' src={ process.env.IMG_URL + data?.image } />
                    </div>
                </NextLink>
                <NextLink href={ PRODUCT_COURSE + data?.slug } passHref>
                    <div style={ { cursor: 'pointer' } } className={ styles.name }>
                        { data?.name }
                    </div>
                </NextLink>

                <div className={ styles.category }>
                    <div className={ styles.text }>
                        <span >{ data?.course_category?.name }</span>
                    </div>
                </div>
                <div className={ `${ styles.description } ${ styles.elearning }` }>
                    { data?.description }
                </div>
                <div className={ `${ styles.info }` }>
                    <div className={ `${ styles.date }` }>
                        <div className={ `${ styles.image }` }>
                            <img alt='' src="/images/document-session-related-date.png" />
                        </div>
                        <div className={ `${ styles.text }` }>
                            { moment( data?.open_date ).format( "DD.MM.YYYY" ) }
                        </div>
                    </div>
                    <div className={ `${ styles.user }` }>
                        <div className={ `${ styles.image }` }>
                            <img alt='' src="/images/document-session-related-person.png" />
                        </div>
                        <div className={ `${ styles.text }` }>
                            { data?.user_count }
                        </div>
                    </div>
                    <div className={ `${ styles.rate }` }>
                        <div className={ `${ styles.image }` }>
                            {
                                [ ...Array( Math.round( star ) ).keys() ]?.map( e => (
                                    <img alt='' src="/images/document-session-related-star.png" key={ e } />
                                ) )
                            }

                            {
                                [ ...Array( 5 - Math.round( star ) ).keys() ]?.map( e => (
                                    <img alt='' src="/images/document-session-related-star-o.png" key={ e } />
                                ) )
                            }
                        </div>
                        <div className={ `${ styles.text }` }>
                            { star }
                        </div>
                    </div>
                </div>
                {/* <div className={ styles.button }>
                                    <a href='#'>
                                        Nh???n ngay
                                    </a>
                                </div> */}
                <div className={ styles.elearning_buttons }>
                    <div className={ styles.left }>
                        <a style={ { cursor: 'pointer' } } className={ styles.add_to_cart } onClick={ () => handleAddToCart( data.id ) }>
                            <div className={ styles.image }>
                                <img alt='' src="/images/document-session-related-cart.png" />
                            </div>
                            <div className={ styles.text } >
                                Th??m gi??? h??ng
                            </div>
                        </a>
                        <a style={ { cursor: 'pointer' } } className={ styles.buy_now } onClick={ () => handleBuyNow( data.id ) }>
                            Mua ngay
                        </a>
                    </div>
                    <div className={ styles.right }>
                        {
                            data?.discount > 0 && ( <>
                                <div className={ styles.text_red }>
                                    Gi???m { data?.discount }%
                                </div>
                                <div className={ styles.text_red_line }>
                                    { data?.price.format( 0, 3, '.' ) } ??
                                </div>
                            </> )
                        }
                        <div className={ styles.text }>
                            { ( data?.price * ( 100 - data?.discount ) / 100 ).format( 0, 3, '.' ) } ??
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCourseWishlist
