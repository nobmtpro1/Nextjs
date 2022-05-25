import styles from '../../../../styles/document/test-detail.module.scss'
import Link from "next/link";
import Slider from "react-slick";
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { PRODUCT_SESSION, CART, CART_CHECKOUT } from '../../../../constants/route'
import moment from 'moment'
import { formatPrice } from "../../../../utils/helper";
import axios from '../../../../sevices/axios';
import { useDispatch } from 'react-redux';
import { setCartQuantity } from '../../../../redux/cartSlice';
import nProgress from 'nprogress';

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    draggable: true,
    arrows: false,
};

const RelatedSession = ( { data } ) =>
{

    const router = useRouter()
    formatPrice()
    const dispatch = useDispatch()

    const [ disable, setDisable ] = useState( false )

    const handleAddToCart = async ( item_id ) =>
    {
        //nprogress.set(0.4)
        setDisable( true )
        await axios.post( 'page/cart/lifetime/add', { type: 0, item_id } ).then( response =>
        {
            dispatch( setCartQuantity( response.data ) )
        } ).catch( error =>
        {

        } )
        router.push( CART )
    }

    const handleBuyNow = async ( item_id ) =>
    {
        //nprogress.set(0.4)
        setDisable( true )
        await axios.post( 'page/cart/lifetime/add', { type: 0, item_id } ).then( response =>
        {
            dispatch( setCartQuantity( response.data ) )
        } ).catch( error =>
        {

        } )
        router.push( CART_CHECKOUT )
    }


    return (
        <div className={ `${ styles.related_session }` }>
            <div className={ `${ styles.top }` }>
                <h1 className={ `${ styles.title }` }>Bài học liên quan</h1>
                <Link href={ PRODUCT_SESSION }><a className={ `${ styles.more }` } href="#">Xem thêm <span className={ `${ styles.image }` }> <img alt='' src="/images/document-glossary-detail-more.png" /> </span></a></Link>
            </div>
            <div className={ styles.items }>
                {
                    data?.map( ( e, i ) =>
                    {
                        const review = e?.avg_review_star[ 0 ]
                        const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

                        return (
                            <div className={ styles.item } key={ i } onClick={ () => router.push( PRODUCT_SESSION + e.slug ) }>
                                <div className={ styles.image }>
                                    <img alt='' src={ process.env.IMG_URL + e.image } />
                                </div>
                                <h1 className={ styles.name }>{ e.name }</h1>
                                <div className={ styles.category }>
                                    <span>Thuộc khóa { e?.course[ 0 ]?.name }</span>
                                </div>

                                <div className={ styles.category }>
                                    <span>{ e?.course[ 0 ]?.course_category?.name }</span>
                                </div>

                                <div className={ styles.description }>
                                    { e.description }
                                </div>
                                <div className={ `${ styles.info }` }>
                                    <div className={ `${ styles.date }` }>
                                        <div className={ `${ styles.image }` }>
                                            <img alt='' src="/images/document-session-related-date.png" />
                                        </div>
                                        <div className={ `${ styles.text }` }>
                                            { moment( e?.open_date ).format( "DD.MM.YYYY" ) }
                                        </div>
                                    </div>
                                    <div className={ `${ styles.date }` }>
                                        <div className={ `${ styles.image }` }>
                                            <img alt='' src="/images/document-session-related-person.png" />
                                        </div>
                                        <div className={ `${ styles.text }` }>
                                            { e?.user_learning_progress_count }
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
                                        <button className={ styles.add_to_cart } onClick={ () => handleAddToCart( e.id ) } disabled={ disable }>
                                            <div className={ styles.image }>
                                                <img alt='' src="/images/document-session-related-cart.png" />
                                            </div>
                                            <div className={ styles.text }>
                                                Thêm giỏ hàng
                                            </div>
                                        </button>
                                        <button className={ styles.buy } onClick={ () => handleBuyNow( e.id ) } disabled={ disable }    >
                                            Mua ngay
                                        </button>
                                    </div>
                                    <div className={ styles.right }>
                                        <div className={ styles.text }>
                                            { e?.price.format( 0, 3, '.' ) } đ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
            <div className={ styles.items_mb }>
                <Slider { ...settings }>
                    {
                        data?.map( ( e, i ) =>
                        {
                            var courseCategory = []
                            e?.course.forEach( x =>
                            {
                                if ( !courseCategory.includes( x.course_category.name ) )
                                {
                                    courseCategory.push( x.course_category.name )
                                }
                            } )

                            const review = e?.avg_review_star[ 0 ]
                            const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

                            return (
                                <div className={ styles.item } key={ i } onClick={ () => router.push( PRODUCT_SESSION + e.slug ) }>
                                    <div className={ styles.image }>
                                        <img alt='' src={ process.env.IMG_URL + e.image } />
                                    </div>
                                    <h1 className={ styles.name }>{ e.name }</h1>

                                    {
                                        e?.course.map( x => (
                                            <div className={ styles.category } key={ x.id }>
                                                <span>Thuộc khóa { x.name }</span>
                                            </div>
                                        ) )
                                    }

                                    {
                                        courseCategory?.map( ( e, i ) => (
                                            <div className={ styles.category } key={ i }>
                                                <span>{ e }</span>
                                            </div>
                                        ) )
                                    }

                                    <div className={ styles.description }>
                                        { e.description }
                                    </div>
                                    <div className={ `${ styles.info }` }>
                                        <div className={ `${ styles.date }` }>
                                            <div className={ `${ styles.image }` }>
                                                <img alt='' src="/images/document-session-related-date.png" />
                                            </div>
                                            <div className={ `${ styles.text }` }>
                                                { moment( e?.open_date ).format( "DD.MM.YYYY" ) }
                                            </div>
                                        </div>
                                        <div className={ `${ styles.date }` }>
                                            <div className={ `${ styles.image }` }>
                                                <img alt='' src="/images/document-session-related-person.png" />
                                            </div>
                                            <div className={ `${ styles.text }` }>
                                                { e?.user_count }
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
                                        <div className={ styles.right }>
                                            <div className={ styles.text }>
                                                { e?.price.format( 0, 3, '.' ) } đ
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } )
                    }
                </ Slider >
            </div>
        </div>
    )
}

export default RelatedSession
