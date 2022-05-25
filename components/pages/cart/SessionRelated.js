import Link from 'next/link'
import React from 'react'
import { PRODUCT_SESSION } from '../../../constants/route'
import Product from '../../global/ProductSession'
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    draggable: true,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: true,
              infinite: true,
              speed: 500,
              draggable: true,
              arrows: true,
            },
        }
    ]
};

const SessionRelated = ( { styles, relatedSession } ) =>
{
    return (
        <div className={ styles.related_1 } >
            <div className={ styles.head_2 } >
                <div className={ styles.title_3 } >
                    Bài học liên quan
                </div>
                <Link href={ PRODUCT_SESSION } passHref>
                    <a href='#' className={ styles.more_3 } >
                        xem thêm
                    </a>
                </Link>
            </div>
            <div className={ `${ styles.body_2 }` } id='main-page-products'>
                <Slider { ...settings }>
                    {
                        relatedSession?.map( ( e, i ) => (
                            <div className={ `${ styles.slide_item }` } key={ i }>
                                <Product data={ e } />
                            </div>
                        ) )
                    }
                </Slider>
            </div>
        </div>
    )
}

export default SessionRelated