import Link from 'next/link'
import React from 'react'
import { PRODUCT_SESSION } from '../../../../constants/route'
import Product from '../../../global/ProductSession'
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

const SessionRelated = ( { styles, data } ) =>
{
    return (
        <div className={ styles.session_related }>
            <div className={ styles.head }>
                <h2 className={ styles.left }>
                    Bài học liên quan
                </h2>
                <Link href={ PRODUCT_SESSION } passHref>
                    <a href='#' className={ styles.right }>
                        xem thêm
                    </a>
                </Link>
            </div>
            <div className={ styles.body } id='main-page-products'>
                <Slider { ...settings }>
                    {
                        data?.map( ( e, i ) => (
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