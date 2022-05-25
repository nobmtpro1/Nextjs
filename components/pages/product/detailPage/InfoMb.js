import React from 'react'
import moment from 'moment'
import { BUSINESS_HOME, LOGIN, PRODUCT_COURSE, PRODUCT_SESSION } from '../../../../constants/route'
import { setWishlistApi } from '../../../../sevices/wishlistApi'
import { formatPrice } from '../../../../utils/helper'
import nProgress from 'nprogress'

const InfoMb = ( { type, styles, data, courseCategory, star, wishlist, footer, login, setWishlist, setShowShare, handleAddToCart, handleBuyNow, setActive } ) =>
{
    formatPrice()
    const handleList = async () =>
    {
        //nprogress.set(0.4)
        if ( login.data )
        {
            var result = null
            if ( type == "session" )
            {
                result = await setWishlistApi( 'session', { session_id: data?.id } )
            } else
            {
                result = await setWishlistApi( 'course', { course_id: data?.id } )
            }

            if ( result )
            {
                setWishlist( prev => !prev )
            }
        } else
        {
            router.push( {
                pathname: LOGIN,
                query: {
                    url: type == 'session' ? PRODUCT_SESSION : PRODUCT_COURSE + '/' + router.query.slug
                }
            } )
        }
        //nprogress.done()
    }


    return (
        <div className={ styles.info_mb }>
            <div className={ styles.left }>
                <div className={ styles.name }>
                    { data?.name }
                </div>
                <div className={ styles.description }>
                    { data?.description }
                </div>
                <div className={ styles.category }>
                    {
                        type == 'session' && data?.course.map( e => (
                            <div className={ styles.text } key={ e.id }>
                                Thuộc khóa { e.name }
                            </div>
                        ) )
                    }

                    {
                        type == 'session' && courseCategory?.map( ( e, i ) => (
                            <div className={ styles.text } key={ i }>
                                { e }
                            </div>
                        ) )
                    }

                    {
                        type != 'session' && <div className={ styles.text }>
                            { data?.course_category?.name }
                        </div>
                    }
                </div>
                <div className={ styles.boxes }>
                    <div className={ styles.box }>
                        Mức độ {
                            data?.level == 0 ? "cơ bản" :
                                data?.level == 1 ? "trung bình" :
                                    data?.level == 2 ? "nâng cao" : ''
                        }
                    </div>
                </div>

                <div className={ styles.rate }>
                    {
                        type == 'session' && <>
                            <div className={ styles.star }>
                                {
                                    [ ...Array( Math.round( star ) ).keys() ].map( e => (
                                        <img alt='' src='/images/main/product-star-mb.svg' key={ e } />
                                    ) )
                                }

                                {
                                    [ ...Array( 5 - Math.round( star ) ).keys() ].map( e => (
                                        <img alt='' src='/images/main/product-star-mb-o.svg' key={ e } />
                                    ) )
                                }
                            </div>
                            <div className={ styles.text }>
                                { star }
                            </div>
                            <div className={ styles.box }>
                                { data?.review_count } người đánh giá
                            </div>
                        </>
                    }

                </div>
                <div className={ styles.row }>
                    <div className={ styles.col }>
                        <img alt='' src='/images/main/product-10.svg' />
                    </div>
                    <div className={ `${ styles.col }` }>
                        Tích luỹ ngay <span>{ data?.aim_coin } AIM coin</span>
                    </div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.col }>
                        <img alt='' src='/images/main/product-11.svg' />
                    </div>
                    <div className={ `${ styles.col }` }>
                        Thời lượng dự kiến { data?.intend_time }ph
                    </div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.col }>
                        <img alt='' src='/images/main/product-12.svg' />
                    </div>
                    <div className={ `${ styles.col }` }>
                        { moment( data?.open_date ).format( "DD/MM/YYYY" ) }
                    </div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.col }>
                        <img alt='' src='/images/main/product-13.svg' />
                    </div>
                    <div className={ `${ styles.col }` }>
                        { data?.user_learning_progress_count } học viên
                    </div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.col }>
                        <img alt='' src='/images/main/product-14.svg' />
                    </div>
                    <div className={ `${ styles.col }` }>
                        Tài liệu đính kèm (podcast, PDF...)
                    </div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.col }>
                        <img alt='' src='/images/main/product-15.svg' />
                    </div>
                    <div className={ `${ styles.col }` }>
                        Máy tính, máy tính bảng, điện thoại
                    </div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.col }>
                        <img alt='' src='/images/main/product-16.svg' />
                    </div>
                    <div className={ `${ styles.col }` }>
                        Nhận chứng chỉ khi hoàn thành
                    </div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.col }>
                        <img alt='' src='/images/main/product-17.svg' />
                    </div>
                    <div className={ `${ styles.col }` }>
                        Chính sách hoàn tiền
                    </div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.col }>
                        <img alt='' src='/images/main/product-18.svg' />
                    </div>
                    <div className={ `${ styles.col }` }>
                        Thanh toán an toàn
                    </div>
                </div>
                <div className={ `${ styles.business }` }>
                    Nếu bạn cần mua nhiều tài khoản cho nhân viên, tham khảo chương trình <a href={ BUSINESS_HOME } target="_blank" rel="noreferrer"  > Dành cho doanh nghiệp.</a>
                </div>
                <div className={ `${ styles.price }` }>
                    { ( data?.price * ( 100 - data?.discount ) / 100 ).format( 0, 3, '.' ) } VNĐ
                </div>

            </div>
            <div className={ styles.right }>

                <div
                    onClick={ () => setShowShare( prev => !prev ) }
                    className={ styles.share }
                    style={ { background: 'transparent', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px #e32068 solid' } }
                >
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/product-share-mb.svg' />
                    </div>
                    <div className={ styles.text }>
                        Share
                    </div>
                </div>
                <a onClick={ handleList } className={ styles.save }>
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/product-save-mb.svg' />
                    </div>
                    <div className={ styles.text }>
                        { wishlist ? "Đã lưu" : "Lưu" }
                    </div>
                </a>
            </div>
        </div>
    )
}

export default InfoMb