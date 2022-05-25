import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PRODUCT_COURSE, PRODUCT_SESSION } from '../../../constants/route'
import { formatPrice } from '../../../utils/helper'
import axios from '../../../sevices/axios'

const CartItemLifetime = ( { data, styles, deleteCartItem, changeQuantity, mobile } ) =>
{
    formatPrice()
    const [ openDeletePopup, setOpenDeletePopup ] = useState( false )
    const [ price, setPrice ] = useState( data?.data?.price * ( 100 - data?.data?.discount ) / 100 )
    const [ quantity, setQuantity ] = useState( data?.quantity )
    const timeout = useRef( null )

    useEffect( () =>
    {
        clearTimeout( timeout.current )
        timeout.current = setTimeout( () =>
        {
            changeQuantity( quantity, data?.id )
        }, 300 );
    }, [ quantity ] )

    const handleChangeQuantity = ( value ) =>
    {
        setQuantity( value < 1 || value == "" ? 1 : value )
    }

    const minusQuantity = () =>
    {
        if ( quantity == 1 )
        {
            return false
        }
        setQuantity( prev => prev - 1 )
    }

    const plusQuantity = () =>
    {
        setQuantity( prev => prev + 1 )
    }

    if ( !mobile )
    {
        return (
            <div className={ styles.item_4 }>
                <div className={ styles.col_5 }>
                    {/* <input type="checkbox" /> */ }
                </div>
                <Link href={ ( data?.type == 0 ? PRODUCT_SESSION : PRODUCT_COURSE ) + data?.data?.slug } passHref>
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
                </Link>
                <div className={ styles.col_5 }>
                    { price.format( 0, 3, '.' ) } đ
                </div>
                <div className={ styles.col_5 }>
                    <div className={ styles.quantity_6 }>
                        <button onClick={ minusQuantity }>-</button>
                        <input type="number" value={ quantity } onChange={ e => handleChangeQuantity( e.target.value ) } />
                        <button onClick={ plusQuantity }>+</button>
                    </div>
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
                    <a onClick={ () => deleteCartItem( data?.id ) } style={ { cursor: 'pointer' } } className={ styles.delete_6 }> <img alt='' src='/images/main/cart-delete.svg' /></a>
                </div>
            </div>
        )
    } else
    {
        return (
            <div className={ styles.item_4 }>
                <div className={ styles.row1_5 }>
                    <span className={ styles.button_6 } onClick={ () => setOpenDeletePopup( prev => !prev ) }>
                        <img alt='' src='/images/main/cart-lifetime-3dot.svg' />
                    </span>
                    <div className={ `${ styles.popup_6 } ${ openDeletePopup && styles.active }` }><a onClick={ () => deleteCartItem( data?.id ) } className={ styles.delete_7 }>Xoá</a></div>
                </div>
                <div className={ styles.row2_5 } onClick={ () => setOpenDeletePopup( prev => false ) }>
                    <div className={ styles.col1_6 }>
                        <Link href={ ( data?.type == 0 ? PRODUCT_SESSION : PRODUCT_COURSE ) + data?.data?.slug } passHref>
                            <img alt='' src={ process.env.IMG_URL + data?.data?.image } />
                        </Link>
                    </div>
                    <div className={ styles.col2_6 }>
                        <Link href={ ( data?.type == 0 ? PRODUCT_SESSION : PRODUCT_COURSE ) + data?.data?.slug } passHref>
                            <div className={ styles.row1_7 }>
                                { data?.data?.name } ({ data?.data?.code })
                            </div>
                        </Link>
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
                            <div className={ styles.quantity_8 }>
                                <button onClick={ minusQuantity }>-</button>
                                <input type="number" value={ quantity } onChange={ e => handleChangeQuantity( e.target.value ) } />
                                <button onClick={ plusQuantity }>+</button>
                            </div>
                        </div>
                        <div className={ styles.row6_7 }>
                            <div className={ styles.row1_8 } style={ { textAlign: 'right' } }>
                                { ( quantity * price ).format( 0, 3, '.' ) }VNĐ
                            </div>
                            <div className={ styles.row2_8 }>
                                { data?.discount_by_slot && <>(-{ data?.discount_by_slot }%) </> } { ( quantity * price * ( 100 - ( data?.discount_by_slot || 0 ) ) / 100 ).format( 0, 3, '.' ) } VNĐ

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default CartItemLifetime
