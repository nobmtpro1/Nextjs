import styles from '../../../styles/account/voucher.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../components/layouts/LayoutAccount'
import axios from '../../../sevices/axios'
import moment from 'moment'
import Link from 'next/link'
import { CART } from '../../../constants/route'
import Head from 'next/head'

const Index = () =>
{

    const [ fetchData, setFetchData ] = useState( null )
    const [ data, setData ] = useState( null )
    const [ tab, setTab ] = useState( 0 )

    useEffect( () =>
    {
        axios.get( 'page/account/voucher' ).then( response =>
        {
            setFetchData( response.data )
        } ).catch( error => { } )
    }, [] )

    useEffect( () =>
    {
        var cloneData = JSON.parse( JSON.stringify( fetchData ) )
        if ( tab == 0 )
        {
            setData( fetchData )
        } else if ( tab == 1 )
        {
            setData( {
                ...cloneData,
                voucher: cloneData?.voucher?.filter( x => moment() > moment( x?.to_date ).subtract( 3, "days" ) )
            } )
        }
    }, [ tab, fetchData ] )

    return (
        <>
            <Head>
                <title>AIM E-learning | Voucher</title>
            </Head>
            <div className={ styles.aim_coin_page } >
                <div className={ styles.head_1 } >
                    Mã giảm giá của bạn
                </div>

                <div className={ styles.menu_1 } >
                    <div className={ `${ styles.text_2 } ${ tab == 0 && styles.active }` } onClick={ () => setTab( 0 ) }>
                        Tất cả lịch sử
                    </div>
                    <div className={ `${ styles.text_2 } ${ tab == 1 && styles.active }` } onClick={ () => setTab( 1 ) } >
                        Sắp hết hạn
                    </div>
                </div>

                <div className={ styles.items_1 } >
                    {
                        data?.voucher?.map( ( e, i ) => (
                            <div className={ styles.item_2 } key={ i }>
                                <div className={ styles.image_3 } >
                                    <img alt='' src={ e?.image ? process.env.IMG_URL + e?.image : '/images/account-aim-coin-2.png' } />
                                </div>
                                <div className={ styles.text_3 } >
                                    <div className={ styles.title_4 } >
                                        { e?.name }
                                    </div>

                                    <div className={ styles.time_4 } >
                                        <div className={ styles.image_5 } >
                                            <img alt='' src='/images/account-aim-coin-3.svg' />
                                        </div>
                                        <div className={ styles.text_6 } >
                                            Thời hạn:   { moment( e?.to_date ).format( 'DD.MM.YYYY' ) }
                                        </div>
                                    </div>
                                    <div className={ styles.button_4 } >
                                        <Link href={ CART + '?voucher=' + e?.code[ 0 ]?.code } passHref>
                                            <a href='#'>Dùng ngay</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) )
                    }
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