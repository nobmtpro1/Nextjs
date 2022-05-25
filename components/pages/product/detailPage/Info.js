import React from 'react'
import moment from 'moment'
import { BUSINESS_HOME, LOGIN, PRODUCT_SESSION } from '../../../../constants/route'
import { setWishlistApi } from '../../../../sevices/wishlistApi'
import { formatPrice } from '../../../../utils/helper'
import nProgress from 'nprogress'


const Info = ( { type, styles, data, courseCategory, star, wishlist, footer, login, setWishlist, setShowShare, handleAddToCart, handleBuyNow, setActive } ) =>
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
                    url: PRODUCT_SESSION + '/' + router.query.slug
                }
            } )
        }
        //nprogress.done()
    }

    return (
        <div className={ styles.info } style={ {
            background: data?.banner && `url(${ process.env.IMG_URL + data?.banner })`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        } }>
            <h1 className={ styles.name }>
                { data?.name }
            </h1>
            <p className={ styles.description }>
                { data?.description }
            </p>
            <div className={ styles.category }>
                {
                    type == 'session' && data?.course.map( e => (
                        <div className={ styles.text } key={ e.id }>
                            <span>Thuộc khóa { e.name }</span>
                        </div>
                    ) )
                }

                {
                    type == 'session' && courseCategory?.map( ( e, i ) => (
                        <div className={ styles.text } key={ i }>
                            <span >{ e }</span>
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
            <div className={ styles.row }>
                <div className={ styles.col }>
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/product-1.svg' />
                    </div>
                    <div className={ styles.text }>
                        { moment( data?.open_date ).format( "DD.MM.YYYY" ) }
                    </div>
                </div>
                <div className={ styles.col }>
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/product-2.svg' />
                    </div>
                    <div className={ styles.text }>
                        { type == 'session' ? data?.user_learning_progress_count : data?.user_count } học viên đang học
                    </div>
                </div>
                <div className={ styles.col }>
                    {
                        type == 'session' && <>
                            <div className={ styles.image }>
                                {
                                    [ ...Array( Math.round( star ) ).keys() ].map( e => (
                                        <img alt='' src='/images/main/product-3.svg' key={ e } />
                                    ) )
                                }

                                {
                                    [ ...Array( 5 - Math.round( star ) ).keys() ].map( e => (
                                        <img alt='' src='/images/main/product-4.svg' key={ e } />
                                    ) )
                                }
                            </div>
                            <div className={ styles.text }>
                                { star }/5 ({ data?.review_count })
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className={ styles.buttons }>
                <div
                    onClick={ () => setShowShare( prev => !prev ) }
                    className={ styles.share }
                    style={ { background: 'white', color: 'black', display: 'flex', alignItems: 'center', cursor: 'pointer' } }
                >
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/product-5.svg' />
                    </div>
                    <div className={ styles.text }>
                        Chia sẻ
                    </div>
                </div>

                <a style={ { cursor: 'pointer' } } className={ styles.save } onClick={ handleList }>
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/product-6.svg' />
                    </div>
                    <div className={ styles.text }>
                        { wishlist ? "Đã lưu" : "Lưu" }
                    </div>
                </a>
            </div>

            <div className={ styles.detail }>

                <a href={ data?.video_trailer } target="_blank" rel="noreferrer" className={ styles.image }>
                    <img alt='' src={ process.env.IMG_URL + data?.image } />
                    <img alt='' src='/images/main/product-6.png' />
                </a>
                { data?.discount > 0 && <div className={ styles.percent }>
                    - { data?.discount }%
                </div>
                }

                { data?.discount > 0 ? <div className={ styles.old_price }>
                    <span> { data?.price.format( 0, 3, '.' ) } VNĐ</span>
                </div> : <br />
                }
                <div className={ styles.new_price }>
                    { ( data?.price * ( 100 - data?.discount ) / 100 ).format( 0, 3, '.' ) } VNĐ
                </div>
                <div className={ styles.buttons }>
                    <a style={ { cursor: 'pointer' } } className={ styles.cart } onClick={ () => handleAddToCart( data?.id ) }>
                        <div className={ styles.image }>
                            <img alt='' src='/images/main/product-cart.svg' />
                        </div>
                        <div className={ styles.text }>
                            Thêm giỏ hàng
                        </div>
                    </a>
                    <a style={ { cursor: 'pointer' } } className={ styles.buy } onClick={ () => handleBuyNow( data?.id ) }>
                        <div className={ styles.text }>
                            Mua ngay
                        </div>
                    </a>
                    <a href='#' className={ styles.table_price } onClick={ () => setActive( true ) }>
                        Học nhiều, ưu đãi nhiều
                    </a>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.col }>
                        <img alt='' src='/images/main/product-9.svg' />
                    </div>
                    <div className={ `${ styles.col } ${ styles.bold }` }>
                        { footer?.find( e => e.key == 'phone' )?.value }
                    </div>
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
                <div className={ `${ styles.description }` }>
                    Nếu bạn cần mua nhiều tài khoản cho nhân viên, tham khảo chương trình <a href={ BUSINESS_HOME } target="_blank" rel="noreferrer"  > Dành cho doanh nghiệp.</a>
                </div>
            </div>
        </div>
    )
}

export default Info