import Link from 'next/link'
import React from 'react'
import { PRODUCT_SESSION } from '../../../constants/route'
import ProductSession from '../../global/ProductSession'
import Slider from "react-slick";

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


const SlideProduct = ( { styles, data } ) =>
{
    return (
        <div className={ styles.items_1 } >
            <div className={ styles.head_2 } >
                <h2 className={ styles.title_3 } >
                    Bài học mới nhất
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
                        data?.map( e => (
                            <div className={ `${ styles.slide_item }` } key={ e.id }>
                                <ProductSession data={ e } />
                            </div>
                        ) )
                    }
                </Slider>
            </div>
        </div>
    )
}

export default SlideProduct