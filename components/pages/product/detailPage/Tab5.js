import axios from '../../../../sevices/axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { formatTimePast } from '../../../../utils/helper'

const Tab5 = ( { styles, tab, star, review, reviewSession } ) =>
{
    const router = useRouter()
    const [ currentPageReview, setCurrentPageReview ] = useState( 1 )
    const [ reviewData, setReviewData ] = useState( reviewSession?.data || [] )
    const [ isOutOfReview, setIsOutOfReview ] = useState( false )

    const handleMoreReview = async () =>
    {
        await axios.get( `page/product/session-detail/${ router.query.slug }/review?page=${ currentPageReview + 1 }` ).then( response =>
        {
            setReviewData( prev => ( [ ...prev, ...response.data.data ] ) )
            setCurrentPageReview( prev => prev + 1 )
            if ( response.data.data.length < 3 )
            {
                setIsOutOfReview( true )
            }
        } ).catch( error =>
        {

        } )
    }

    // UI
    useEffect( () =>
    {
        const moreButton = document.querySelectorAll( `.${ styles.comments } .${ styles.comment } .${ styles.body } .${ styles.more }` )
        Array.from( moreButton ).forEach( e =>
        {
            var text = e.parentElement.querySelector( `.${ styles.content }` )
            e.addEventListener( 'click', function ()
            {
                if ( text.classList.contains( styles.active ) )
                {
                    e.innerHTML = "xem thêm"
                    text.classList.remove( styles.active )
                } else
                {
                    e.innerHTML = "rút gọn"
                    text.classList.add( styles.active )
                }
            } )
        } )
    }, [ reviewData ] )

    return (
        <div className={ styles.review } hidden={ tab == 4 ? false : true }>
            <h2 className={ styles.title }>
                Đánh giá khóa học
            </h2>
            <div className={ styles.result }>
                <div className={ styles.left }>
                    <div className={ styles.circle }>
                        <div className={ styles.percent }>
                            <div className={ styles.ratio }><div className={ styles.border } style={ { '--ratio': ( 1 - star / 5 ) } }></div> <span>{ star }</span></div>
                        </div>
                    </div>
                    <div className={ styles.star }>
                        {
                            [ ...Array( Math.round( star ) ).keys() ].map( e => (
                                <img alt='' src='/images/main/product-review-star.svg' key={ e } />
                            ) )
                        }

                        {
                            [ ...Array( 5 - Math.round( star ) ).keys() ].map( e => (
                                <img alt='' src='/images/main/product-review-star-o.svg' key={ e } />
                            ) )
                        }
                    </div>
                </div>
                <div className={ styles.right }>
                    <div className={ styles.row }>
                        <div className={ styles.name }>
                            Thiết kế trực quan
                        </div>
                        <div className={ styles.progress }>
                            <div className={ styles.reach } style={ { width: ( parseFloat( review?.design_star || 0 ).toFixed( 1 ) / 5 ) * 100 + '%' } }>

                            </div>
                        </div>
                        <div className={ styles.average }>
                            { review?.design_star ? parseFloat( review?.design_star ).toFixed( 1 ) : 0 }/5
                        </div>
                    </div>
                    <div className={ styles.row }>
                        <div className={ styles.name }>
                            Nội dung phù hợp
                        </div>
                        <div className={ styles.progress }>
                            <div className={ styles.reach } style={ { width: ( parseFloat( review?.content_star || 0 ).toFixed( 1 ) / 5 ) * 100 + '%' } }>

                            </div>
                        </div>
                        <div className={ styles.average }>
                            { review?.content_star ? parseFloat( review?.content_star ).toFixed( 1 ) : 0 }/5
                        </div>
                    </div>
                    <div className={ styles.row }>
                        <div className={ styles.name }>
                            Tính ứng dụng
                        </div>
                        <div className={ styles.progress }>
                            <div className={ styles.reach } style={ { width: ( parseFloat( review?.appli_star || 0 ).toFixed( 1 ) / 5 ) * 100 + '%' } }>

                            </div>
                        </div>
                        <div className={ styles.average }>
                            { review?.appli_star ? parseFloat( review?.appli_star ).toFixed( 1 ) : 0 }/5
                        </div>
                    </div>
                </div>
            </div>

            <div className={ styles.comments }>
                {
                    reviewData?.map( ( e, i ) =>
                    {
                        const star = ( ( parseFloat( e?.design_star ) + parseFloat( e?.content_star ) + parseFloat( e?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

                        return (
                            <div className={ styles.comment } key={ i }>
                                <div className={ styles.head }>
                                    <div className={ styles.avatar }>
                                        <img alt='' src={ e?.user?.avatar?.includes( 'https:/' ) ? e?.user?.avatar : e?.user?.avatar ? process.env.IMG_URL + e?.user?.avatar : '/images/avatar-default.png' } />
                                    </div>
                                    <div className={ styles.info }>
                                        <div className={ styles.name }>
                                            { e?.user?.fullname }
                                        </div>
                                        <div className={ styles.bot }>
                                            <div className={ styles.star }>
                                                {
                                                    [ ...Array( Math.round( star ) ).keys() ].map( e => (
                                                        <img alt='' src='/images/main/product-review-star.svg' key={ e } />
                                                    ) )
                                                }

                                                {
                                                    [ ...Array( 5 - Math.round( star ) ).keys() ].map( e => (
                                                        <img alt='' src='/images/main/product-review-star-o.svg' key={ e } />
                                                    ) )
                                                }
                                            </div>
                                            <div className={ styles.time }>
                                                <div className={ styles.image }>
                                                    <img alt='' src='/images/main/product-27.svg' />
                                                </div>
                                                <div className={ styles.text }>
                                                    { formatTimePast( e?.created_at ) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={ styles.dot }>
                                        {/* <a className={ styles.button }>
                                        <img alt='' src='/images/main/product-28.svg' />
                                    </a> */}
                                    </div>
                                </div>
                                <div className={ styles.body }>
                                    <div className={ styles.content }>
                                        { e?.comment }
                                    </div>
                                    {
                                        e?.comment?.length > 332 && <div className={ styles.more }>
                                            xem thêm
                                        </div>
                                    }

                                </div>
                                <div className={ styles.foot }>
                                    {/* <a href='#' className={ styles.button }>
                                    <img alt='' src='/images/main/product-29.svg' />
                                </a>
                                <a href='#' className={ styles.button }>
                                    <img alt='' src='/images/main/product-30.svg' />
                                </a> */}
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
            <div className={ styles.button } onClick={ handleMoreReview } hidden={ isOutOfReview }>
                <a style={ { cursor: 'pointer' } } className={ styles.text }>
                    Xem thêm
                </a>
            </div>
        </div>
    )
}

export default Tab5