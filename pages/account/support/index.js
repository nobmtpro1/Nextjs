import styles from '../../../styles/account/faqs.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../components/layouts/LayoutAccount'
import axios from '../../../sevices/axios'
import Head from 'next/head'

const Index = () =>
{

    const [ fetchData, setFetchData ] = useState( null )

    useEffect( () =>
    {
        axios.get( 'page/account/faqs' ).then( response =>
        {
            setFetchData( response.data )
        } ).catch( error => { } )
    }, [] )

    useEffect( () =>
    {
        var moreButton = document.querySelectorAll( `.${ styles.link_4 }` )
        Array.from( moreButton ).forEach( e =>
        {
            e?.addEventListener( 'click', function ()
            {
                e?.parentElement?.classList?.add( styles.active )
                e?.remove()
            } )
        } )
    }, [ fetchData ] )

    return (
        <>
            <Head>
                <title>AIM E-learning | Hỗ trợ</title>
            </Head>
            <div className={ styles.faqs_page } >
                <div className={ styles.head_1 } >
                    Những câu hỏi thường gặp
                </div>
                <div className={ styles.body_1 } >
                    {
                        fetchData?.faqs?.map( ( e, i ) => (
                            <div className={ styles.item_2 } key={ i }>
                                <div className={ styles.head_3 } >
                                    { e?.question }
                                </div>
                                <div className={ styles.body_3 } >
                                    <div className={ styles.text_4 } dangerouslySetInnerHTML={ { __html: e?.answer } }>

                                    </div>
                                    {
                                        e?.answer?.length >= 200 && <a className={ styles.link_4 } >
                                            xem thêm
                                        </a>
                                    }

                                </div>
                            </div>
                        ) )
                    }
                    <div className={ styles.contact_2 }>
                        Mọi thắc mắc vui lòng liên hệ <span>contact@aimacademy.vn</span> để được hỗ trợ.
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