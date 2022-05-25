import styles from '../../styles/main/components/product.module.scss'

import React, { useEffect, useState } from "react";
import moment from 'moment'
import NextLink from 'next/link'
import { CART, CART_CHECKOUT, LOGIN, PRODUCT_COURSE } from "../../constants/route";
import { formatPrice } from "../../utils/helper";
import router from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../sevices/axios';
import { setCartQuantity } from '../../redux/cartSlice';
import nProgress from 'nprogress';

const ProductCourse = ( { data } ) =>
{

    formatPrice()
    const dispatch = useDispatch()
    const { login } = useSelector( state => state.account )

    const [ disable, setDisable ] = useState( false )

    const review = data?.avg_review_star[ 0 ]
    const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

    const handleAddToCart = async ( item_id ) =>
    {
        //nprogress.set(0.4)
        setDisable( true )
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
        setDisable( true )

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

        <div className={ `${ styles.product }` }>
            <NextLink href={ PRODUCT_COURSE + data?.slug } passHref>
                <div style={ { cursor: 'pointer' } } className={ `${ styles.image }` }>
                    <img alt='' src={ process.env.IMG_URL + data?.image } />
                </div>
            </NextLink>

            <NextLink href={ PRODUCT_COURSE + data?.slug } passHref>
                <h3 style={ { cursor: 'pointer' } } className={ `${ styles.name }` }>
                    { data?.name }
                </h3>
            </NextLink>

            <div className={ styles.category }>
                <div className={ styles.text }>
                    <span >{ data?.course_category?.name }</span>
                </div>
            </div>
            <p className={ styles.description }>
                { data?.description }
            </p>
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
                    {
                        [ ...Array( Math.round( star ) ).keys() ].map( e => (
                            <div className={ `${ styles.image }` } key={ e }>
                                <img alt='' src="/images/document-session-related-star.png" />
                            </div>
                        ) )
                    }

                    {
                        [ ...Array( 5 - Math.round( star ) ).keys() ].map( e => (
                            <div className={ `${ styles.image }` } key={ e }>
                                <img alt='' src="/images/document-session-related-star-o.png" />
                            </div>
                        ) )
                    }
                    <div className={ `${ styles.text }` }>
                        { star }
                    </div>
                </div>
            </div>
            <div className={ styles.bot }>
                <div className={ styles.left }>
                    <a style={ { cursor: 'pointer' } } className={ styles.add_to_cart } disabled={ disable } onClick={ () => handleAddToCart( data.id ) }>
                        <div className={ styles.image }>
                            <img alt='' src="/images/document-session-related-cart.png" />
                        </div>
                        <div className={ styles.text } >
                            Thêm giỏ hàng
                        </div>
                    </a>
                    <a style={ { cursor: 'pointer' } } className={ styles.buy } disabled={ disable } onClick={ () => handleBuyNow( data.id ) }>
                        Mua ngay
                    </a>
                </div>
                <div className={ styles.right }>
                    {
                        data?.discount > 0 && ( <>
                            <div className={ styles.text_red }>
                                Giảm { data?.discount }%
                            </div>
                            <div className={ styles.text_red_line }>
                                { data?.price.format( 0, 3, '.' ) } đ
                            </div>
                        </> )
                    }
                    <div className={ styles.text }>
                        { ( data?.price * ( 100 - data?.discount ) / 100 ).format( 0, 3, '.' ) } đ
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCourse
