import axios from '../../../sevices/axios'
import React, { useEffect, useState } from 'react'
import router from 'next/router'
import PopupReview from './PopupReview'
import Review from './Review'

const Tab5 = ( { styles, tab, data, setData } ) =>
{
    const [ newReview, setNewReview ] = useState( [] )
    const [ pageReview, setPageReview ] = useState( 2 )
    const [ hideMoreReviewButton, setHideMoreReviewButton ] = useState( false )
    const [ contentReview, setContentReview ] = useState( '' )
    const [ showReview, setShowReview ] = useState( false )

    const session = data?.session

    const review = session?.avg_review_star[ 0 ]
    const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

    useEffect( () =>
    {
        if ( data?.review?.length < 3 )
        {
            setHideMoreReviewButton( true )
        }
    }, [ data?.review ] )


    const handleAddReview = ( starDesign, starContent, starAppli ) =>
    {
        axios.post( 'page/learning/add-review/' + router.query.id, {
            content: contentReview, starDesign, starContent, starAppli
        } ).then( response =>
        {

            setNewReview( prev => ( [
                response.data,
                ...prev,
            ] ) )
            setShowReview( false )
        } ).catch( error =>
        {
            if ( error?.response?.data?.message )
            {
                alert( error?.response?.data?.message )
            }
        } )
    }

    const handleMoreReview = () =>
    {
        axios.get( 'page/learning/more-review/' + router.query.id + '?page=' + pageReview ).then( response =>
        {
            if ( response.data.data.length < 2 )
            {
                setHideMoreReviewButton( true )
            }
            setData( prev => ( {
                ...prev,
                review: [ ...prev.review, ...response.data.data ]
            } ) )
            setPageReview( prev => prev + 1 )
        } ).catch( error => { } )
    }

    return (
        <div className={ `${ styles.content5 } ${ tab == 4 && styles.active }` }>
            <PopupReview styles={ styles } active={ showReview } setActive={ setShowReview } contentReview={ contentReview } setContentReview={ setContentReview } handleAddReview={ handleAddReview } />

            <div className={ styles.review }>
                <div className={ styles.title }>
                    Đánh giá bài học
                </div>
                <div className={ styles.result }>
                    <div className={ styles.left }>
                        <div className={ styles.circle }>
                            <div className={ styles.percent }>
                                <div className={ styles.ratio }><div className={ styles.border } style={ { backgroundImage: `conic-gradient( rgba(249, 0, 59, 0.2) 0 calc(${ 1 - ( star / 5 ) } * 360deg), rgba(245, 0, 59, 1) calc(${ 1 - ( star / 5 ) } * 360deg) 360deg)` } }></div> <span>{ star }</span></div>
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
                                <div className={ styles.reach } style={ { width: ( parseFloat( review?.design_star ).toFixed( 1 ) / 5 ) * 100 + '%' } }>

                                </div>
                            </div>
                            <div className={ styles.average }>
                                { parseFloat( review?.design_star || 0 ).toFixed( 1 ) }/5
                            </div>
                        </div>
                        <div className={ styles.row }>
                            <div className={ styles.name }>
                                Nội dung phù hợp
                            </div>
                            <div className={ styles.progress }>
                                <div className={ styles.reach } style={ { width: ( parseFloat( review?.content_star ).toFixed( 1 ) / 5 ) * 100 + '%' } }>
                                </div>
                            </div>
                            <div className={ styles.average }>
                                { parseFloat( review?.content_star || 0 ).toFixed( 1 ) }/5
                            </div>
                        </div>
                        <div className={ styles.row }>
                            <div className={ styles.name }>
                                Tính ứng dụng
                            </div>
                            <div className={ styles.progress }>
                                <div className={ styles.reach } style={ { width: ( parseFloat( review?.appli_star ).toFixed( 1 ) / 5 ) * 100 + '%' } }>

                                </div>
                            </div>
                            <div className={ styles.average }>
                                { parseFloat( review?.appli_star || 0 ).toFixed( 1 ) }/5
                            </div>
                        </div>
                    </div>
                </div>

                <div className={ styles.add } onClick={ () => setShowReview( true ) }>
                    Thêm đánh giá
                </div>

                <div className={ styles.comments }>
                    <>
                        {
                            newReview?.map( ( e, i ) =>
                            (
                                <Review e={ e } key={ e.id } styles={ styles } />
                            ) )
                        }
                    </>
                    <>
                        {
                            data?.review?.map( ( e, i ) =>
                            (
                                <Review e={ e } key={ e.id } styles={ styles } />
                            ) )
                        }
                    </>

                </div>
                <div className={ styles.button }>
                    {
                        !hideMoreReviewButton && <a style={ { cursor: 'pointer' } } onClick={ handleMoreReview } className={ styles.text }>
                            Xem thêm
                        </a>
                    }
                </div>
            </div>
        </div>
    )
}

export default Tab5