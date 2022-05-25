import styles from '../../styles/main/cart_membership.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layouts/Layout';
import AuthUser from '../../components/auths/AuthUser';
import axios from '../../sevices/axios';
import { formatPrice } from '../../utils/helper';
import { useRouter } from 'next/router';
import HeadTag from '../../components/global/HeadTag'
import Breadcrumb from '../../components/pages/cart/Breadcrumb';
import Information from '../../components/pages/cart/Information';
import Voucher from '../../components/pages/cart/Voucher';
import Total from '../../components/pages/cart/Total';
import CheckoutButton from '../../components/pages/cart/CheckoutButton';
import BannerMembership from '../../components/pages/cart/BannerMembership';
import TableMembership1 from '../../components/pages/cart/TableMembership1';
import TableMembership2 from '../../components/pages/cart/TableMembership2';
import TableMembership3 from '../../components/pages/cart/TableMembership3';
import moment from 'moment';

const Index = () =>
{
    formatPrice()
    const router = useRouter()

    // USE STATE
    const [ action, setAction ] = useState( 0 )

    const [ quantity, setQuantity ] = useState( 1 )
    const [ quantityMonth, setQuantityMonth ] = useState( 1 )
    const [ data, setData ] = useState( null )
    const [ isUseCoin, setIsUseCoin ] = useState( false )
    const [ voucher, setVoucher ] = useState( router.query.voucher )
    // USE REF
    const debounce = useRef( null )

    useEffect( () =>
    {
        axios.post( 'page/cart/membership', {
            quantity: 1,
            quantityMonth: 1,
            action
        } ).then( response =>
        {
            setData( response.data )
        } ).catch( error => { } )
    }, [] )

    useEffect( () =>
    {
        if ( data?.quantity != quantity )
        {
            setQuantity( data?.quantity )
        }
        if ( data?.quantityMonth != quantityMonth )
        {
            setQuantityMonth( data?.quantityMonth )
        }
    }, [ data ] )

    useEffect( () =>
    {
        clearTimeout( debounce.current )
        debounce.current = setTimeout( () =>
        {
            axios.post( `page/cart/membership`, {
                quantity, quantityMonth, voucher, isUseCoin, action
            } ).then( response =>
            {
                if ( response.data?.discountVoucher > 0 )
                {
                    alert( 'Áp dụng voucher thành công' )
                }
                if ( response.data?.discountVoucher == 0 )
                {
                    if ( voucher )
                    {
                        alert( 'Voucher không tồn tại' )
                    }
                }
                setData( response.data )
            } ).catch( error => { } )
        }, 500 );
    }, [ voucher ] )

    useEffect( () =>
    {
        axios.post( `page/cart/membership`, {
            quantity, quantityMonth, voucher, isUseCoin, action
        } ).then( response =>
        {
            if ( response.data?.discountAimCoin == 0 && isUseCoin == true )
            {
                alert( 'Bạn không đủ AIM coin' )
                setIsUseCoin( false )
            }
            setData( response.data )
        } ).catch( error => { } )
    }, [ isUseCoin ] )

    useEffect( () =>
    {
        clearTimeout( debounce.current )
        debounce.current = setTimeout( () =>
        {
            axios.post( `page/cart/membership`, {
                quantity, quantityMonth, voucher, isUseCoin, action
            } ).then( response =>
            {
                setData( response.data )
            } ).catch( error => { } )
        }, 500 );
    }, [ quantity, quantityMonth, action ] )


    useEffect( () =>
    {
        if ( action == 0 )
        {
            setQuantity( data?.membership?.number_of_slots )
        } else
        {
            setQuantity( 1 )
            setQuantityMonth( 1 )
        }
    }, [ action ] )



    const minusQuantity = () =>
    {
        if ( quantity <= 1 )
        {
            return false
        }
        setQuantity( prev => prev - 1 )
    }

    const plusQuantity = () =>
    {
        setQuantity( prev => prev + 1 )
    }

    const minusMonth = () =>
    {
        if ( quantityMonth <= 1 )
        {
            return false
        }
        setQuantityMonth( prev => prev - 1 )
    }

    const plusMonth = () =>
    {
        setQuantityMonth( prev => prev + 1 )
    }

    const handleChangeQuantity = ( qty ) =>
    {
        if ( qty < 1 )
        {
            return false
        }

        setQuantity( qty )
    }

    const handleUseCoin = () =>
    {
        var isUseCoinData = true
        if ( isUseCoin )
        {
            isUseCoinData = false
        }
        axios.post( `page/cart/membership`, {
            quantity, quantityMonth, voucher, isUseCoin: isUseCoinData, action
        } ).then( response =>
        {
            if ( response.data.discountAimCoin > 0 )
            {
                setIsUseCoin( true )
            } else
            {
                if ( isUseCoinData )
                {
                    alert( 'Bạn không đủ AIM coin' )

                }
                setIsUseCoin( false )
            }
            setData( response.data )
        } ).catch( error => { } )
    }

    const handleChangeAction = ( value ) =>
    {
        if ( value == 1 )
        {

            if ( moment( data?.membership?.to ).diff( moment(), 'months', true ) < 1 )
            {
                alert( 'Gói Membership của bạn đã hết hạn hoặc sắp hết hạn ' )
                return false
            } else
            {
                setAction( 1 )
            }
        } else
        {
            setQuantityMonth( 1 )
            setAction( 0 )
        }
    }

    return (
        <div className={ styles.container }>

            <HeadTag title="AIM E-learning | Giỏ hàng" />

            <AuthUser>
                <div className={ styles.cart_page }>

                    <Breadcrumb styles={ styles } />

                    <div className={ styles.boxes_1 }>
                        <div className={ styles.left_2 }>
                            <div className={ styles.head_3 }>
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
                            </div>
                            {
                                !data?.membership ? (
                                    <TableMembership1
                                        styles={ styles }
                                        data={ data }
                                        minusQuantity={ minusQuantity }
                                        plusQuantity={ plusQuantity }
                                        quantity={ quantity }
                                        handleChangeQuantity={ handleChangeQuantity }
                                        minusMonth={ minusMonth }
                                        plusMonth={ plusMonth }
                                        quantityMonth={ quantityMonth }
                                    />
                                ) : ( data?.membership && action == 0 ) ? (
                                    <TableMembership2
                                        styles={ styles }
                                        data={ data }
                                        minusMonth={ minusMonth }
                                        plusMonth={ plusMonth }
                                        quantityMonth={ quantityMonth }
                                        action={ action }
                                        handleChangeAction={ handleChangeAction }
                                    />
                                ) : ( data?.membership && action == 1 ) ? (
                                    <TableMembership3
                                        styles={ styles }
                                        data={ data }
                                        minusQuantity={ minusQuantity }
                                        plusQuantity={ plusQuantity }
                                        quantity={ quantity }
                                        handleChangeQuantity={ handleChangeQuantity }
                                        quantityMonth={ quantityMonth }
                                        action={ action }
                                        handleChangeAction={ handleChangeAction }
                                    />
                                ) : ''
                            }
                            <BannerMembership styles={ styles } mobile={ false } />
                        </div>
                        <div className={ styles.right_2 }>

                            <Information styles={ styles } data={ data } setData={ setData } />

                            <Voucher styles={ styles } voucher={ voucher } setVoucher={ setVoucher } />

                            {
                                !data?.membership ? (
                                    <TableMembership1
                                        mobile={ true }
                                        styles={ styles }
                                        data={ data }
                                        minusQuantity={ minusQuantity }
                                        plusQuantity={ plusQuantity }
                                        quantity={ quantity }
                                        handleChangeQuantity={ handleChangeQuantity }
                                        minusMonth={ minusMonth }
                                        plusMonth={ plusMonth }
                                        quantityMonth={ quantityMonth }
                                    />
                                ) : ( data?.membership && action == 0 ) ? (
                                    <TableMembership2
                                        mobile={ true }
                                        styles={ styles }
                                        data={ data }
                                        minusMonth={ minusMonth }
                                        plusMonth={ plusMonth }
                                        quantityMonth={ quantityMonth }
                                        action={ action }
                                        setAction={ setAction }
                                    />
                                ) : ( data?.membership && action == 1 ) ? (
                                    <TableMembership3
                                        mobile={ true }
                                        styles={ styles }
                                        data={ data }
                                        minusQuantity={ minusQuantity }
                                        plusQuantity={ plusQuantity }
                                        quantity={ quantity }
                                        handleChangeQuantity={ handleChangeQuantity }
                                        quantityMonth={ quantityMonth }
                                        action={ action }
                                        setAction={ setAction }
                                    />
                                ) : ''
                            }


                            <BannerMembership styles={ styles } mobile={ true } />

                            <Total
                                styles={ styles }
                                data={ data }
                                voucher={ voucher }
                                isUseCoin={ isUseCoin }
                                handleUseCoin={ handleUseCoin }
                                quantity={ 1 }
                                subtotal={ data?.subtotal?.format( 0, 3, '.' ) }
                                discount={ data?.discountValue }
                                discountVoucher={ ( data?.discountVoucher || 0 ).format( 0, 3, '.' ) }
                                total={ data?.total?.format( 0, 3, '.' ) }
                            />

                            <CheckoutButton data={ data } styles={ styles } isUseCoin={ isUseCoin } voucher={ voucher } quantity={ quantity } quantityMonth={ quantityMonth } action={ action } />

                        </div>
                    </div>
                </div>
            </AuthUser>
        </div>
    )
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
