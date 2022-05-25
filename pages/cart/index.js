import styles from '../../styles/main/cart_lifetime.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layouts/Layout';
import AuthUser from '../../components/auths/AuthUser';
import axios from '../../sevices/axios';
import CartItemLifetime from '../../components/pages/cart/CartItemLifetime';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../../utils/helper';
import { useRouter } from 'next/router';
import { setCartQuantity } from '../../redux/cartSlice';
import HeadTag from '../../components/global/HeadTag'
import EmptyCart from '../../components/pages/cart/EmptyCart';
import Breadcrumb from '../../components/pages/cart/Breadcrumb';
import DiscountBySession from '../../components/pages/cart/DiscountBySession';
import DiscountBySessionMb from '../../components/pages/cart/DiscountBySessionMb';
import SessionRelated from '../../components/pages/cart/SessionRelated';
import Information from '../../components/pages/cart/Information';
import Voucher from '../../components/pages/cart/Voucher';
import Total from '../../components/pages/cart/Total';
import CheckoutButton from '../../components/pages/cart/CheckoutButton';
import nProgress from 'nprogress';

const Index = ( props ) =>
{
    formatPrice()
    const router = useRouter()
    const dispatch = useDispatch()
    // USE STATE
    const [ data, setData ] = useState( null )
    const [ isUseCoin, setIsUseCoin ] = useState( false )
    const [ voucher, setVoucher ] = useState( router.query.voucher )
    // USE REF
    const timeout = useRef( null )

    useEffect( () =>
    {
        clearTimeout( timeout.current )
        timeout.current = setTimeout( () =>
        {
            axios.post( 'page/cart/lifetime/check-voucher', { isUseCoin, voucher: voucher } ).then( response =>
            {
                if ( response.data.discountByVoucher > 0 )
                {
                    alert( 'Áp dụng thành công' )
                } else
                {
                    if ( voucher )
                    {
                        alert( 'Voucher không tồn tại' )
                    }
                }
                setData( prev => ( {
                    ...prev,
                    cart: response.data
                } ) )
            } ).catch( error => { } )
        }, 500 );

    }, [ voucher ] )


    useEffect( () =>
    {
        axios.post( 'page/cart/lifetime' ).then( response =>
        {
            setData( response.data )
        } ).catch( error => { } )
    }, [ router ] )

    const changeQuantity = ( quantity, id ) =>
    {
        axios.post( 'page/cart/lifetime/change-quantity', { quantity, id, isUseCoin, voucher: voucher } ).then( response =>
        {
            setData( prev => ( {
                ...prev,
                cart: response.data
            } ) )
        } ).catch( error => { } )
    }

    const deleteCartItem = ( id, type ) =>
    {
        // nProgress.set(0.4)
        axios.post( 'page/cart/lifetime/delete-cart-item', { id, isUseCoin, voucher: voucher } ).then( response =>
        {
            setData( prev => ( {
                ...prev,
                cart: response.data
            } ) )
            dispatch( setCartQuantity( response.data?.cartItems?.length ) )
        } ).catch( error => { } )
        setTimeout(() => {
            // nProgress.done()
        }, 1);
    }

    const handleUseCoin = () =>
    {
        if ( !isUseCoin )
        {
            axios.post( 'page/cart/lifetime/use-coin', { isUseCoin: true, voucher: voucher } ).then( response =>
            {
                if ( response.data.discountByAimCoin > 0 )
                {
                    setIsUseCoin( true )
                } else
                {
                    alert( 'Bạn không đủ AIM coin' )
                    setIsUseCoin( false )
                }
                setData( prev => ( {
                    ...prev,
                    cart: response.data
                } ) )
            } ).catch( error => { setIsUseCoin( false ) } )
        } else
        {
            setIsUseCoin( false )
            setData( prev => ( {
                ...prev,
                cart: {
                    ...prev.cart,
                    discountByAimCoin: 0
                }
            } ) )
        }
    }

    if ( data?.cart?.cartItems?.length < 1 )
    {
        return <EmptyCart styles={ styles } />
    } else
    {
        return (
            <div className={ styles.container }>

                <HeadTag title="AIM E-learning | Giỏ hàng" />

                <AuthUser>
                    <div className={ styles.cart_page }>

                        <Breadcrumb styles={ styles } />

                        <DiscountBySession styles={ styles } data={ data } />

                        <div className={ styles.boxes_1 }>
                            <div className={ styles.left_2 }>
                                <div className={ styles.head_3 }>
                                    <div className={ styles.text_4 }>
                                        {/* <input type="checkbox" /> */ }
                                    </div>

                                    <div className={ styles.text_4 }>
                                        Tất cả sản phẩm
                                    </div>
                                    <div className={ styles.text_4 }>
                                        Đơn giá
                                    </div>
                                    <div className={ styles.text_4 }>
                                        Số lượng <br />
                                        tài khoản
                                    </div>
                                    <div className={ styles.text_4 }>
                                        Thành tiền
                                    </div>
                                    <div className={ styles.text_4 }>
                                        Thời hạn
                                    </div>
                                    <div className={ styles.text_4 }>
                                        <img alt='' src='/images/main/cart-delete.svg' />
                                    </div>
                                </div>

                                <div className={ styles.items_3 }>
                                    {
                                        data?.cart?.cartItems?.map( ( e, i ) => (
                                            <CartItemLifetime key={ e.id } data={ e } styles={ styles } deleteCartItem={ deleteCartItem } changeQuantity={ changeQuantity } />
                                        ) )
                                    }
                                </div>

                            </div>
                            <div className={ styles.right_2 }>

                                <Information styles={ styles } data={ data } setData={ setData } />

                                <Voucher styles={ styles } voucher={ voucher } setVoucher={ setVoucher } />

                                <DiscountBySessionMb styles={ styles } data={ data } />

                                <div className={ styles.items_mb_3 }>
                                    {
                                        data?.cart?.cartItems?.map( ( e, i ) => (
                                            <CartItemLifetime key={ e.id } data={ e } styles={ styles } deleteCartItem={ deleteCartItem } changeQuantity={ changeQuantity } mobile={ true } />
                                        ) )
                                    }
                                </div>

                                <Total
                                    styles={ styles }
                                    data={ data }
                                    voucher={ voucher }
                                    isUseCoin={ isUseCoin }
                                    handleUseCoin={ handleUseCoin }
                                    quantity={ data?.cart?.cartItems?.length }
                                    subtotal={ data?.cart?.subtotal.format( 0, 3, '.' ) }
                                    discount={ data?.cart?.discount }
                                    discountVoucher={ ( data?.cart?.discountByVoucher || 0 ).format( 0, 3, '.' ) }
                                    total={ ( data?.cart?.subtotal * ( 100 - data?.cart?.discount || 0 ) / 100 - data?.cart?.discountByAimCoin - data?.cart?.discountByVoucher ).format( 0, 3, '.' ) }
                                />

                                <CheckoutButton data={ data } styles={ styles } isUseCoin={ isUseCoin } voucher={ voucher } quantity={ null } quantityMonth={ null } action={ null } />

                            </div>
                        </div>

                        <SessionRelated styles={ styles } relatedSession={ data?.relatedSession } />
                    </div>
                </AuthUser>
            </div >
        )
    }

}

export default Index

Index.getLayout = function getLayout ( page )
{
    return (
        <Layout header={ page.props.header } footer={ page.props.footer }>
            { page }
        </Layout>
    )
}

export async function getStaticProps ()
{
    return {
        props: {},
    }
}