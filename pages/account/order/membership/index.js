import styles from '../../../../styles/account/order_membership.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../../components/layouts/LayoutAccount'
import DatePicker from "react-datepicker";
import axios from '../../../../sevices/axios'
import { formatPrice } from '../../../../utils/helper';
import moment from 'moment';
import Head from 'next/head'
import { ACCOUNT_ORDER_LIFETIME, CART_MEMBERSHIP } from '../../../../constants/route';
import Link from 'next/link'

const Index = () =>
{
    formatPrice()
    const [ fromDate, setFromDate ] = useState( null );
    const [ toDate, setToDate ] = useState( null );
    const [ data, setData ] = useState( null );
    const [ fetchData, setFetchData ] = useState( null );

    useEffect( () =>
    {
        const input = document.getElementsByClassName( styles.date )
        Array.from( input ).forEach( e =>
        {
            e.addEventListener( 'click', function ()
            {
                e.querySelector( 'input' ).click()
            } )
        } )
    }, [] )

    useEffect( () =>
    {
        axios.get( 'page/account/order/membership' ).then( response =>
        {
            setFetchData( response.data )
        } ).catch( error => { } )
    }, [] )

    useEffect( () =>
    {
        if ( fromDate == null && toDate == null )
        {
            setData( fetchData )
        } else
        {
            setData( {
                ...fetchData,
                order: fetchData?.order?.filter( x => moment( x?.created_at ) >= moment( fromDate ) && moment( x?.created_at ) <= moment( toDate ) )
            } )
        }

    }, [ fromDate, toDate, fetchData ] )

    return (
        <>
            <Head>
                <title>AIM E-learning | Đơn hàng</title>
            </Head>
            <div className={ styles.order_lifetime_page } >
                <div className={ styles.head } >
                    <div className={ styles.left } >
                        Đơn hàng của bạn
                    </div>
                    <div className={ styles.right } >
                        <div className={ styles.date } >
                            <span className={ styles.image }><img alt='' src='/images/account-order-1.svg' /></span>
                            <span className={ styles.placeholder }>{ fromDate ? moment( fromDate ).format( 'DD/MM/YYYY' ) : <span>Từ</span> }</span>
                            {/* <input type="date" /> */ }
                            <div className={ styles.input }><DatePicker selected={ fromDate } onChange={ ( date ) => setFromDate( date ) } /></div>
                        </div>
                        <div className={ styles.date } >
                            <span className={ styles.image }><img alt='' src='/images/account-order-1.svg' /></span>
                            <span className={ styles.placeholder }>{ toDate ? moment( toDate ).format( 'DD/MM/YYYY' ) : <span>Đến</span> }</span>
                            <div className={ styles.input }><DatePicker selected={ toDate } onChange={ ( date ) => setToDate( date ) } /></div>
                        </div>
                    </div>
                </div>
                <div className={ styles.menu } >
                    <Link href={ ACCOUNT_ORDER_LIFETIME } passHref>
                        <div className={ `${ styles.text }` } >
                            Lifetime
                        </div>
                    </Link>
                    <div className={ `${ styles.text } ${ styles.active }` } >
                        Membership
                    </div>
                </div>
                <div className={ styles.body_1 } >
                    <div className={ styles.head_2 } >
                        <div className={ styles.text_3 } >
                            Tất cả sản phẩm
                        </div>
                        <div className={ styles.text_3 } >
                            Giá tiền
                        </div>
                        <div className={ styles.text_3 } >
                            Số lượng tài khoản
                        </div>
                        <div className={ styles.text_3 } >
                            Thời hạn
                        </div>
                        <div className={ styles.text_3 } >
                            Phương thức
                        </div>
                    </div>
                    {
                        data?.order?.map( ( e, i ) => (
                            <div className={ styles.body_membership_2 } key={ i }>
                                <div className={ styles.col_3 } >
                                    <div className={ styles.image_4 } >
                                        <img alt='' src='/images/account-ordermembership-1.png' />
                                    </div>
                                    <div className={ styles.name_4 } >
                                        Membership
                                    </div>
                                </div>
                                <div className={ styles.col_3 } >
                                    { e?.total.format( 0, 3, '.' ) } đ
                                </div>
                                <div className={ styles.col_3 } >
                                    { e?.quantity } tài khoản
                                </div>
                                <div className={ styles.col_3 } >
                                    { e?.quantity_month } tháng
                                </div>
                                <div className={ styles.col_3 } >
                                    { e?.payment?.name }
                                </div>
                            </div>
                        ) )
                    }
                    <div className={ styles.ads_2 } >
                        <div className={ styles.title_3 } >
                            Gia hạn gói Membership chỉ từ 299.000 VNĐ
                        </div>
                        <div className={ styles.description_3 } >
                            Quá nhiều bài học, khóa học hấp dẫn, và bạn cần nhiều thời gian hơn? <br /> Thong thả học cả năm với gói Membership 12 tháng.
                        </div>
                        <div className={ styles.price_3 } >
                            <div className={ styles.new_4 } >
                                Chỉ từ 299.000đ/tháng
                            </div>
                            <div className={ styles.old_4 } >
                                399.000đ/tháng
                            </div>
                        </div>
                        <div className={ styles.save_3 } >
                            Tiết kiệm ngay 25%
                        </div>
                        <div className={ styles.button_3 } >
                            <Link href={ CART_MEMBERSHIP } passHref>
                                <a href='#'>Nâng cấp ngay</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Index

Index.getLayout = function getLayout ( page )
{
    return (
        <Layout header={ page.props.header } styles={ styles }>
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
