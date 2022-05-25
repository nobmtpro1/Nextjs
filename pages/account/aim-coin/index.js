import styles from '../../../styles/account/aim_coin.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../components/layouts/LayoutAccount'
import axios from '../../../sevices/axios'
import moment from 'moment'
import { GAMIFICATION } from '../../../constants/route'
import Link from 'next/link'
import Head from 'next/head'

const Index = () =>
{
    const [ fetchData, setFetchData ] = useState( null )
    const [ data, setData ] = useState( null )
    const [ tab, setTab ] = useState( 0 )

    useEffect( () =>
    {
        axios.get( 'page/account/aim-coin' ).then( response =>
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
                history: cloneData?.history?.filter( x => x?.type == 0 )
            } )
        } else if ( tab == 2 )
        {
            setData( {
                ...cloneData,
                history: cloneData?.history?.filter( x => x?.type == 1 )
            } )
        }
    }, [ tab, fetchData ] )

    return (
        <>
            <Head>
                <title>AIM E-learning | Aim coin</title>
            </Head>
            <div className={ styles.aim_coin_page } >
                <div className={ styles.head_1 } >
                    Tích lũy điểm AIM của bạn
                </div>
                <div className={ styles.coin_1 } >
                    <div className={ styles.top_2 } >
                        <span>{ data?.user?.aim_coin }</span> AIM Coin đang có
                    </div>
                    <div className={ styles.mid_2 } >
                        200 điểm AIM sẽ hết hạn sau 3 tháng từ ngày nhận được. <br />
                        Hãy sử dụng điểm của bạn trước khi hết hạn
                    </div>
                    <div className={ styles.bot_2 } >
                        <Link href={ GAMIFICATION } passHref>
                            <a href='#'>Nhận thêm coin</a>
                        </Link>
                    </div>
                </div>

                <div className={ styles.menu_1 } >
                    <div className={ `${ styles.text_2 } ${ tab == 0 && styles.active }` } onClick={ () => setTab( 0 ) } >
                        Tất cả
                    </div>
                    <div className={ `${ styles.text_2 } ${ tab == 1 && styles.active }` } onClick={ () => setTab( 1 ) }>
                        Đã nhận
                    </div>
                    <div className={ `${ styles.text_2 } ${ tab == 2 && styles.active }` } onClick={ () => setTab( 2 ) }>
                        Đã dùng
                    </div>
                </div>

                <div className={ styles.items_1 } >
                    {
                        data?.history?.map( ( e, i ) => (
                            <div className={ styles.item_2 } key={ i }>
                                <div className={ styles.image_3 } >
                                    <img alt='' src={ e?.category?.image ? process.env.IMG_URL + e?.category?.image : '/images/account-aim-coin-2.png' } />
                                </div>
                                <div className={ styles.text_3 } >
                                    <div className={ styles.title_4 } >
                                        { e?.category?.title }
                                    </div>
                                    <div className={ styles.description_4 } >
                                        { e?.category?.content }
                                    </div>
                                    <div className={ styles.time_4 } >
                                        <div className={ styles.image_5 } >
                                            <img alt='' src='/images/account-aim-coin-3.svg' />
                                        </div>
                                        <div className={ styles.text_6 } >
                                            { moment( e?.created_at ).format( 'DD.MM.YYYY' ) }
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles.coin_3 } >
                                    { e?.type == 0 ? '+' : '-' }{ e?.aim_coin }
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
