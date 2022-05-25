import styles from '../../../../styles/main/components/session.module.scss'

import React, { useEffect, useState } from "react";
import moment from 'moment'
import NextLink from 'next/link'
import { CART, CART_CHECKOUT, LOGIN, PRODUCT_SESSION } from "../../../../constants/route";
import { formatPrice } from "../../../../utils/helper";
import router from "next/router";
import { useSelector } from 'react-redux';

const Session = ( { data, course } ) =>
{
    formatPrice()
    const review = data?.avg_review_star[ 0 ]
    const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

    return (
        <NextLink href={ PRODUCT_SESSION + data?.slug } passHref>
            <div style={ { cursor: 'pointer' } } className={ `${ styles.product }` }>
                <div className={ `${ styles.image }` }>
                    <img alt='' src="/images/main/product.png" />
                </div>
                <div className={ `${ styles.name }` }>
                    { data?.name }
                </div>
                <div className={ styles.category }>

                    <div className={ styles.text }>
                        <span>Thuộc khóa { course?.name }</span>
                    </div>

                    <div className={ styles.text }>
                        <span>{ course?.course_category?.name }</span>
                    </div>
                </div>
                <div className={ styles.description }>
                    { data?.description }
                </div>
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
            </div>
        </NextLink>
    )
}

export default Session
