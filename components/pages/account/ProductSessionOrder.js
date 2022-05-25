import React, { useEffect, useState } from "react";
import moment from 'moment'
import NextLink from 'next/link'
import { formatPrice } from "../../../utils/helper";
import { PRODUCT_SESSION } from "../../../constants/route";

const ProductSessionOrder = ( { data, styles } ) =>
{
    formatPrice()
    const review = data?.avg_review_star[ 0 ]
    const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

    return (
        <NextLink href={ PRODUCT_SESSION + data?.slug } passHref>
            <div className={ styles.item_5 } style={ { cursor: 'pointer' } }>
                <div className={ styles.image }>
                    <img alt='' src={ process.env.IMG_URL + data?.image } />
                </div>
                <div className={ styles.name }>
                    { data?.name }
                </div>
                <div className={ styles.category }>
                    <div className={ styles.category }>
                        <div className={ styles.text }>
                            <span >{ data?.course[ 0 ]?.name }</span>
                        </div>

                        <div className={ styles.text }>
                            <span >{ data?.course[ 0 ]?.course_category?.name }</span>
                        </div>
                    </div>
                </div>
                <div className={ styles.description }>
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
                            { data?.user_learning_progress_count }
                        </div>
                    </div>
                    <div className={ styles.rate_11 }>
                        {
                            [ ...Array( Math.round( star ) ).keys() ]?.map( e => (
                                <div className={ styles.image_12 } key={ e }>
                                    <img alt='' src='/images/header-explore-product-rate.svg' />
                                </div>
                            ) )
                        }

                        {
                            [ ...Array( 5 - Math.round( star ) ).keys() ]?.map( e => (
                                <div className={ styles.image_12 } key={ e }>
                                    <img alt='' src='/images/header-explore-product-rate-o.svg' />
                                </div>
                            ) )
                        }
                        <div className={ styles.text_12 }>
                            { star }
                        </div>
                    </div>
                </div>

            </div>
        </NextLink>
    )
}

export default ProductSessionOrder
