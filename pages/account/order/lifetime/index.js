import styles from '../../../../styles/account/order_lifetime.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../../components/layouts/LayoutAccount'
import DatePicker from "react-datepicker";
import axios from '../../../../sevices/axios'
import { formatPrice } from '../../../../utils/helper';
import moment from 'moment';
import ProductSessionOrder from '../../../../components/pages/account/ProductSessionOrder';
import ProductCourseOrder from '../../../../components/pages/account/ProductCourseOrder';
import Head from 'next/head'
import { ACCOUNT_ORDER_MEMBERSHIP } from '../../../../constants/route';
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
        axios.get( 'page/account/order/lifetime' ).then( response =>
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

    // UI
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

        const item = document.querySelectorAll( `.${ styles.body_1 } .${ styles.body_2 } .${ styles.head_4 }` )
        Array.from( item ).forEach( e =>
        {
            e.addEventListener( 'click', function ()
            {
                if ( e.parentElement.classList.contains( styles.active ) )
                {
                    e.parentElement.classList.remove( styles.active )
                } else
                {
                    e.parentElement.classList.add( styles.active )
                }
            } )
        } )
    }, [ data ] )

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
                    <div className={ `${ styles.text } ${ styles.active }` } >
                        Lifetime
                    </div>
                    <Link href={ ACCOUNT_ORDER_MEMBERSHIP } passHref>
                        <div className={ styles.text } >
                            Membership
                        </div>
                    </Link>
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
                            Thời gian
                        </div>
                        <div className={ styles.text_3 } >
                            Phương thức
                        </div>
                    </div>
                    <div className={ styles.body_2 } >
                        {
                            data?.order?.map( ( e, i ) => (
                                <React.Fragment key={ i }>
                                    {
                                        e?.detail?.map( ( x, k ) =>
                                        {
                                            var detailData = JSON.parse( x?.data || null )
                                            return (
                                                <div className={ styles.item_3 } key={ k }>
                                                    <div className={ styles.head_4 } >
                                                        <div className={ styles.text_5 } >
                                                            { detailData?.code }
                                                        </div>
                                                        <div className={ styles.text_5 } >
                                                            { ( detailData?.price * ( 100 - detailData?.discount ) / 100 * x?.quantity ).format( 0, 3, '.' ) } đ
                                                        </div>
                                                        <div className={ styles.text_5 } >
                                                            { x?.quantity } tài khoản
                                                        </div>
                                                        <div className={ styles.text_5 } >
                                                            Vĩnh viễn
                                                        </div>
                                                        <div className={ styles.text_5 } >
                                                            { moment( x?.created_at ).format( 'DD/MM/YYYY' ) }
                                                        </div>
                                                        <div className={ styles.text_5 } >
                                                            { e?.payment?.name }
                                                        </div>
                                                    </div>
                                                    <div className={ styles.body_4 } >
                                                        {
                                                            x?.type == 0 ? <ProductSessionOrder data={ detailData } styles={ styles } /> : <ProductCourseOrder data={ detailData } styles={ styles } />
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        } )
                                    }
                                </React.Fragment>
                            ) )
                        }
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
        <Layout  header={ page.props.header } styles={ styles }>
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