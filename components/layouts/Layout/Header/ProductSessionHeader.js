import React, { useEffect, useState } from "react";
import moment from 'moment'
import NextLink from 'next/link'
import { PRODUCT_SESSION } from "../../../../constants/route";
import { formatPrice } from "../../../../utils/helper";

const ProductSessionHeader = ( { styles, data } ) =>
{
    formatPrice()
    const review = data?.avg_review_star[ 0 ]
    const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

    return (
        <NextLink href={ PRODUCT_SESSION + data?.slug } passHref>
            <a className={ styles.item_7 }>
                <div className={ styles.image_8 }>
                    <img alt='' src={ process.env.IMG_URL + data?.image } />
                </div>
                <div className={ styles.name_8 }>
                    { data?.name }
                </div>
                <div className={ styles.category_8 }>
                    <div className={ styles.text_9 }>
                        <span >{ data?.course[ 0 ]?.name }</span>
                    </div>

                    <div className={ styles.text_9 }>
                        <span >{ data?.course[ 0 ]?.course_category?.name }</span>
                    </div>
                </div>
                <div className={ styles.description_8 }>
                    { data?.description }
                </div>
                <div className={ styles.info_8 }>
                    <div className={ styles.date_9 }>
                        <div className={ styles.image_10 }>
                            <img alt='' src='/images/header-explore-product-date.svg' />
                        </div>
                        <div className={ styles.text_10 }>
                            { moment( data?.open_date ).format( "DD.MM.YYYY" ) }
                        </div>
                    </div>
                    <div className={ styles.user_9 }>
                        <div className={ styles.image_10 }>
                            <img alt='' src='/images/header-explore-product-user.svg' />
                        </div>
                        <div className={ styles.text_10 }>
                            { data?.user_learning_progress_count }
                        </div>
                    </div>
                    <div className={ styles.rate_9 }>
                        {
                            [ ...Array( Math.round( star ) ).keys() ].map( e => (
                                <div key={ e } className={ styles.image_10 }>
                                    <img alt='' src='/images/header-explore-product-rate.svg' />
                                </div>
                            ) )
                        }

                        {
                            [ ...Array( 5 - Math.round( star ) ).keys() ].map( e => (
                                <div key={ e } className={ styles.image_10 }>
                                    <img alt='' src='/images/header-explore-product-rate-o.svg' />
                                </div>
                            ) )
                        }
                        <div className={ styles.text_10 }>
                            { star }
                        </div>
                    </div>
                </div>
                <div className={ styles.price_8 }>
                    { ( data?.price * ( 100 - data?.discount ) / 100 ).format( 0, 3, '.' ) } đ
                </div>
            </a>
        </NextLink>
    )
}

export default ProductSessionHeader
