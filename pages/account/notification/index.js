import styles from '../../../styles/account/notification.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../components/layouts/LayoutAccount'
import axios from '../../../sevices/axios'
import { formatTimePast } from '../../../utils/helper'
import Head from 'next/head'
import moment from 'moment'

const Index = () =>
{
    const [ resData, setResData ] = useState( null )
    const [ notification, setNotification ] = useState( null )
    const [ page, setPage ] = useState( 1 )
    const [ tab, setTab ] = useState( 1 )

    var totalPage = Math.ceil( notification?.length / 5 )

    useEffect( () =>
    {
        axios.get( 'page/account/notification' ).then( response =>
        {
            setResData( response.data )
        } ).catch( error => { } )
    }, [] )

    useEffect( () =>
    {

        var allNotification = []
        resData?.notification?.forEach( e =>
        {
            allNotification.push( e )
        } )
        resData?.notificationPersonal?.forEach( e =>
        {
            allNotification.push( e )
        } )

        function compare ( a, b )
        {
            var numberA = moment( a.created_at ).unix()
            var numberB = moment( b.created_at ).unix()
            if ( numberA < numberB )
            {
                return 1;
            }
            if ( numberA > numberB )
            {
                return -1;
            }
            return 0;
        }

        allNotification.sort( compare );

        if ( tab == 1 )
        {
            setNotification( allNotification )
        }
        if ( tab == 2 )
        {
            setNotification( allNotification?.filter( x =>
            {
                if ( x?.is_personal > 0 )
                {
                    return resData?.readNotificationPersonal?.includes( x?.id )
                } else
                {
                    return resData?.readNotification?.includes( x?.id )
                }
            } ) )
        }
        if ( tab == 3 )
        {
            setNotification( allNotification?.filter( x =>
            {
                if ( x?.is_personal > 0 )
                {
                    return !resData?.readNotificationPersonal?.includes( x?.id )
                } else
                {
                    return !resData?.readNotification?.includes( x?.id )
                }
            } ) )
        }
        setPage( 1 )
    }, [ tab, resData ] )

    useEffect( () =>
    {
        var readNotification = []
        var readNotificationPersonal = []
        notification?.slice( ( page - 1 ) * 5, page * 5 )?.forEach( e =>
        {
            if ( e?.is_personal > 0 )
            {
                readNotificationPersonal.push( e?.id )
            } else
            {
                readNotification.push( e?.id )
            }
        } );

        axios.post( 'page/account/notification/read', { readNotification, readNotificationPersonal } ).then( response =>
        {

        } ).catch( error => { } )
    }, [ page, notification ] )

    const handleNextPage = () =>
    {

        if ( page >= totalPage )
        {
            return false
        }
        setPage( prev => prev + 1 )
    }

    const handlePrevPage = () =>
    {
        if ( page <= 1 )
        {
            return false
        }
        setPage( prev => prev - 1 )
    }

    return (
        <>
            <Head>
                <title>AIM E-learning | Thông báo</title>
            </Head>
            <div className={ styles.notification_page } >
                <div className={ styles.head } >
                    <div className={ styles.left } >
                        Thông báo
                    </div>
                </div>
                <div className={ styles.menu } >
                    <div className={ `${ styles.text } ${ tab == 1 && styles.active }` } onClick={ () => setTab( 1 ) }>
                        Tất cả
                    </div>
                    <div className={ `${ styles.text } ${ tab == 2 && styles.active }` } onClick={ () => setTab( 2 ) } >
                        Đã đọc
                    </div>
                    <div className={ `${ styles.text } ${ tab == 3 && styles.active }` } onClick={ () => setTab( 3 ) } >
                        Chưa đọc
                    </div>
                </div>
                <div className={ styles.boxes } >
                    {
                        notification?.slice( ( page - 1 ) * 5, page * 5 )?.map( ( e, i ) => (
                            <div className={ styles.box } key={ i }>
                                <div className={ styles.top } >
                                    <div className={ styles.left } >
                                        { e?.title }
                                    </div>
                                    <div className={ styles.right } >
                                        <div className={ styles.image } >
                                            <img alt='' src='/images/account-notification-1.svg' />
                                        </div>
                                        <div className={ styles.text } >
                                            { formatTimePast( e?.created_at ) }
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles.bot } >
                                    <div className={ styles.image } >
                                        <img alt='' src={ process.env.IMG_URL + e?.image } />
                                    </div>
                                    <div className={ styles.text } dangerouslySetInnerHTML={ { __html: e?.content } }>
                                    </div>
                                    <div className={ `${ styles.read } ${ ( e?.is_personal > 0 ? !resData?.readNotificationPersonal?.includes( e?.id ) : !resData?.readNotification?.includes( e?.id ) ) && styles.active }` } >
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        ) )
                    }
                </div>
                <div className={ styles.pagination }>
                    <div className={ styles.left }>
                        { ( page - 1 ) * 5 + 1 }-{ page * 5 } trên tổng số { notification?.length }
                    </div>
                    <div className={ styles.right }>
                        <div className={ styles.text }>
                            Bạn đang ở trang
                        </div>
                        <div className={ styles.select }>
                            <select value={ page } onChange={ e => setPage( parseInt( e.target.value ) ) }>
                                {
                                    [ ...Array( totalPage || 0 )?.keys() ].map( ( e, i ) => (
                                        <option key={ i } value={ i + 1 }>{ i + 1 }</option>
                                    ) )
                                }
                            </select>
                        </div>
                        <a style={ { cursor: 'pointer' } } className={ styles.arrow_left } onClick={ handlePrevPage }>
                            <img alt='' src="/images/account-elearning-detail-membership-4.svg" />
                        </a>
                        <a style={ { cursor: 'pointer' } } className={ styles.arrow_right } onClick={ handleNextPage }>
                            <img alt='' src="/images/account-elearning-detail-membership-5.svg" />
                        </a>
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