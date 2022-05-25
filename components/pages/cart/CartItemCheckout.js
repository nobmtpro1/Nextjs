import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PRODUCT_COURSE, PRODUCT_SESSION } from '../../../constants/route'
import { formatPrice } from '../../../utils/helper'

const CartItemCheckout = ( { data, styles, mobile } ) =>
{
    formatPrice()
    const [ price, setPrice ] = useState( data?.data?.price * ( 100 - data?.data?.discount ) / 100 )
    const [ quantity, setQuantity ] = useState( data?.quantity )

    if ( !mobile )
    {
        return (
            <div className={ styles.item_4 }>
                <div className={ styles.col_5 }>
                    {/* <input type="checkbox" /> */ }
                </div>
                <div className={ styles.col_5 } style={ { cursor: 'pointer' } }>
                    <div className={ styles.col1_6 }>
                        <img alt='' src={ process.env.IMG_URL + data?.data?.image } />
                    </div>
                    <div className={ styles.col2_6 }>
                        <div className={ styles.row1_7 }>
                            { data?.data?.name } ({ data?.data?.code })
                        </div>
                        <div className={ styles.row2_7 }>
                            <div className={ styles.row1_8 }>
                                <span>{ data?.type == 0 ? 'Bài học' : 'Khoá học' }</span>
                            </div> &nbsp;
                            {
                                data?.type == 1 &&
                                <div className={ styles.row1_8 }>
                                    <span>{ data?.data?.session_count } bài học</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={ styles.col_5 }>
                    { price.format( 0, 3, '.' ) } đ
                </div>
                <div className={ styles.col_5 }>
                    { quantity }
                </div>
                <div className={ styles.col_5 }>
                    { ( quantity * price * ( 100 - ( data?.discount_by_slot || 0 ) ) / 100 ).format( 0, 3, '.' ) } đ
                    <br />
                    {
                        data?.discount_by_slot && <>
                            <div className={ styles.discount_6 }>
                                { ( quantity * price ).format( 0, 3, '.' ) } đ<span> </span>
                            </div> <br />
                            <div className={ styles.discount_6 }>
                                Disc { data?.discount_by_slot }%
                            </div>
                        </>
                    }
                </div>
                <div className={ styles.col_5 }>
                    Vĩnh viễn
                </div>
                <div className={ styles.col_5 }>
                </div>
            </div>
        )
    } else
    {
        return (
            <div className={ styles.item_4 }>
                <div className={ styles.row1_5 }>
                    <span className={ styles.button_6 }>
                        <img alt='' src='/images/main/cart-lifetime-3dot.svg' />
                    </span>
                    <div className={ `${ styles.popup_6 }` }><a className={ styles.delete_7 }>Xoá</a></div>
                </div>
                <div className={ styles.row2_5 }>
                    <div className={ styles.col1_6 }>
                        <img alt='' src={ process.env.IMG_URL + data?.data?.image } />
                    </div>
                    <div className={ styles.col2_6 }>
                        <div className={ styles.row1_7 }>
                            { data?.data?.name } ({ data?.data?.code })
                        </div>
                        <div className={ styles.row2_7 }>
                            <div className={ styles.text_8 }>
                                <span>{ data?.type == 0 ? 'Bài học' : 'Khoá học' }</span>
                            </div>
                            {
                                data?.type == 1 &&
                                <div className={ styles.text_8 }>
                                    <span>{ data?.data?.session_count } bài học</span>
                                </div>
                            }
                        </div>
                        <div className={ styles.row3_7 }>
                            Thời hạn: Vĩnh viễn
                        </div>
                        <div className={ styles.row4_7 }>
                            Đơn giá: { price.format( 0, 3, '.' ) } VNĐ
                        </div>
                        <div className={ styles.row5_7 }>
                            Tài khoản: { quantity }
                        </div>
                        <div className={ styles.row6_7 }>
                            <div className={ styles.row1_8 } style={ { textAlign: 'right' } }>
                                { ( quantity * price ).format( 0, 3, '.' ) }VNĐ
                            </div>
                            <div className={ styles.row2_8 }>
                                {
                                    data?.discount_by_slot && <>
                                        (-{ data?.discount_by_slot }%)
                                    </>
                                } { ( quantity * price * ( 100 - ( data?.discount_by_slot || 0 ) ) / 100 ).format( 0, 3, '.' ) } VNĐ
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default CartItemCheckout
