import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { PRODUCT_SESSION } from '../../../constants/route'
import ProductSession from '../../global/ProductSession'
import Slider from "react-slick";
import { getCookie } from '../../../utils/cookie';
import axios from '../../../sevices/axios'


const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                infinite: true,
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
};

const ViewedProduct = ( { styles } ) =>
{

    const [ viewedSessionCookie, setViewedSessionCookie ] = useState()
    const [ viewedSession, setViewedSession ] = useState( null )

    useEffect( () =>
    {
        setViewedSessionCookie( prev => JSON.parse( getCookie( 'viewedSession' ) || '[]' ).reverse() )
    }, [] )

    useEffect( () =>
    {
        axios.post( `page/home/viewedSession`, { session_id: JSON.parse( getCookie( 'viewedSession' ) || '[]' ) } ).then( response =>
        {
            setViewedSession( response.data )
        } ).catch( error =>
        { } )
    }, [] )

    return (
        <>
            {
                viewedSessionCookie?.length > 0 && (
                    <div className={ styles.items_1 } >
                        <div className={ styles.head_2 } >
                            <h2 className={ styles.title_3 } >
                                Bài học đã xem
                            </h2>
                            <Link href={ PRODUCT_SESSION } passHref>
                                <a href='#' className={ styles.more_3 } >
                                    xem thêm
                                </a>
                            </Link>
                        </div>
                        <div className={ `${ styles.body_2 }` } id='main-page-products'>
                            <Slider { ...settings }>
                                {
                                    viewedSessionCookie?.slice( 0, 10 )?.map( e =>
                                    {
                                        var item = viewedSession?.find( x => x.id == e )
                                        if ( item )
                                        {
                                            return <div className={ `${ styles.slide_item }` } key={ item.id }>
                                                <ProductSession data={ item } />
                                            </div>
                                        }
                                    } )
                                }
                            </Slider>
                        </div>
                    </div> )

            }
        </>
    )
}

export default ViewedProduct