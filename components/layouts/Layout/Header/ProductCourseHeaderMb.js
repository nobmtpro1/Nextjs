import React, { useEffect, useState } from "react";
import moment from 'moment'
import NextLink from 'next/link'
import { PRODUCT_COURSE, PRODUCT_SESSION } from "../../../../constants/route";
import { formatPrice } from "../../../../utils/helper";

const ProductCourseHeaderMb = ( { styles, data } ) =>
{
    formatPrice()

    const review = data?.avg_review_star[ 0 ]
    const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

    return (
        <NextLink href={ PRODUCT_COURSE + data?.slug } passHref>
            <a className={ styles.box_9 } style={ { display: 'block' } }>
                <div className={ styles.image_10 }>
                    <img alt='' src={ process.env.IMG_URL + data?.image } />
                </div>
                <div className={ styles.name_10 }>
                    { data?.name }
                </div>
                <div className={ styles.category_10 }>
                    <div className={ styles.text_11 }>
                        <span>{ data?.course_category?.name }</span>
                    </div>
                </div>
                <div className={ styles.description_10 }>
                    { data?.description }
                </div>
                <div className={ styles.info_10 }>
                    <div className={ styles.date_11 }>
                        <div className={ styles.image_12 }>
                            <img alt='' src='/images/header-explore-product-date.svg' />
                        </div>
                        <div className={ styles.text_12 }>
                            { moment( data?.open_date ).format( "DD.MM.YYYY" ) }
                        </div>
                    </div>
                    <div className={ styles.user_11 }>
                        <div className={ styles.image_12 }>
                            <img alt='' src='/images/header-explore-product-user.svg' />
                        </div>
                        <div className={ styles.text_12 }>
                            { data?.user_count }
                        </div>
                    </div>
                    <div className={ styles.rate_11 }>
                        {
                            [ ...Array( Math.round( star ) ).keys() ].map( e => (
                                <div key={ e } className={ styles.image_12 }>
                                    <img alt='' src='/images/header-explore-product-rate.svg' />
                                </div>
                            ) )
                        }

                        {
                            [ ...Array( 5 - Math.round( star ) ).keys() ].map( e => (
                                <div key={ e } className={ styles.image_12 }>
                                    <img alt='' src='/images/header-explore-product-rate-o.svg' />
                                </div>
                            ) )
                        }
                        <div className={ styles.text_12 }>
                            { star }
                        </div>
                    </div>
                </div>
                <div className={ styles.price_10 }>
                { ( data?.price * ( 100 - data?.discount ) / 100 ).format( 0, 3, '.' ) } đ
                </div>
            </a>
        </NextLink>
    )
}

export default ProductCourseHeaderMb
