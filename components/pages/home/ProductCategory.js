import Link from 'next/link'
import React, { useState } from 'react'
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

const settings2 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true,
    arrows: true,
};

const ProductCategory = ( { styles, courseCategory } ) =>
{

    const [ tab, setTab ] = useState( 0 )
    const [ tabMb, setTabMb ] = useState( 100 )

    return (
        <>
            <div className={ `${ styles.menu }` } id='main-page-category'>
                <Slider { ...settings2 }>
                    {
                        courseCategory?.map( ( e, i ) => (
                            <div className={ `${ styles.slide_item }` } onClick={ () => setTab( i ) } key={ i }>
                                <div className={ `${ styles.text } ${ tab == i && styles.active }` }>{ e?.name }</div>
                            </div>
                        ) )
                    }
                </Slider>
            </div>

            {
                courseCategory?.map( ( e, i ) => (
                    <div className={ `${ styles.items_1 }  ${ styles.items_category } ${ tab == i && styles.active }` } key={ i }>
                        <div className={ styles.head_2 } >
                            <div className={ styles.title_3 } >

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
                                    e?.session?.map( ( x, k ) => (
                                        <div className={ `${ styles.slide_item }` } key={ k }>
                                            <ProductSession data={ x } />
                                        </div>
                                    ) )
                                }
                            </Slider>
                        </div>
                    </div>
                ) )
            }

            <div className={ `${ styles.items_category_mb } ` } >
                {
                    courseCategory?.map( ( e, i ) => (
                        <div className={ `${ styles.box } ${ tabMb == i && styles.active }` } key={ i }>
                            <div className={ `${ styles.box_title }` } onClick={ () => setTabMb( i ) }>
                                { e?.name }
                            </div>
                            <div className={ styles.items_1 } >
                                <div className={ `${ styles.body_2 }` } id='main-page-products'>
                                    <Slider { ...settings }>
                                        {
                                            e?.session?.map( ( x, k ) => (
                                                <div className={ `${ styles.slide_item }` } key={ k }>
                                                    <ProductSession data={ x } />
                                                </div>
                                            ) )
                                        }
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    ) )
                }

            </div>
        </>
    )
}

export default ProductCategory