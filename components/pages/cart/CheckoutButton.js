import { useRouter } from 'next/router'
import React from 'react'
import { CART_CHECKOUT, CART_MEMBERSHIP_CHECKOUT } from '../../../constants/route'

const CheckoutButton = ( {data, styles, isUseCoin, voucher, quantity, quantityMonth, action } ) =>
{

    const router = useRouter()

    const handleCheckout = () =>
    {
        if ( !data?.user?.cart_phone?.length && !data?.user?.phone?.length )
        {
            alert( 'Bạn chưa nhập số điện thoại' )
            return false
        }

        if ( data?.quantityMonth )
        {
            router.push( {
                pathname: CART_MEMBERSHIP_CHECKOUT,
                query: {
                    isUseCoin, voucher, quantity, quantityMonth, action
                }
            } )
        } else
        {
            router.push( {
                pathname: CART_CHECKOUT,
                query: {
                    isUseCoin, voucher
                }
            } )
        }
    }

    return (
        <div className={ styles.button_3 }>
            <button onClick={ handleCheckout }>Thanh toán</button>
        </div>
    )
}

export default CheckoutButton