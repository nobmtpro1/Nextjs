import styles from '../styles/main/gamification.module.scss'
import React, { useEffect } from 'react'
import Layout from '../components/layouts/Layout'
import Link from "next/link";
import Head from 'next/head'
import { HOME, LOGIN, PRODUCT_SESSION } from '../constants/route';

const Index = ( props ) =>
{

    const staticContent = props?.data?.staticContent
    const seo = props?.data?.seo

    useEffect( () =>
    {
        const faqMore = document.querySelectorAll( `.${ styles.faqs } .${ styles.items } .${ styles.item } .${ styles.more }` )
        Array.from( faqMore ).forEach( e =>
        {
            var text = e.parentElement.querySelector( `.${ styles.text }` )
            e.addEventListener( 'click', function ()
            {
                if ( text.classList.contains( styles.active ) )
                {
                    e.innerHTML = "xem thêm"
                    text.classList.remove( styles.active )
                } else
                {
                    e.innerHTML = "rút gọn"
                    text.classList.add( styles.active )
                }
            } )
        } )
    }, [] )

    return (
        <div className={ styles.container }>
            <Head>
                <title>{ seo?.title }</title>
                <meta name="description" content={ seo?.description } />
                <meta name="keywords" content={ seo?.keywords } />
                <meta property="og:title" content={ seo?.title } />
                <meta property="og:description" content={ seo?.description } />
                <meta property="og:image" content={ process.env.IMG_URL + seo?.image } />
            </Head>
            <div className={ styles.gamification_page } >
                <div className={ styles.breadcrumb } style={ { zIndex: 1 } }>
                    <Link href={ HOME } passHref>
                        <a href='#' className={ styles.link }>
                            Trang chủ
                        </a>
                    </Link>
                    <a href='#' className={ styles.link }>
                        Gamification
                    </a>
                </div>
                <div className={ styles.banner } >
                    <div className={ styles.background } >
                        <img alt='' src={process.env.IMG_URL + staticContent?.banner?.image} />
                    </div>
                    <div className={ styles.title } >
                        {
                            staticContent?.banner?.text_black
                        }
                    </div>
                    <div className={ styles.description } >
                        {
                            staticContent?.banner?.text_color
                        }
                    </div>
                </div>
                <div className={ styles.boxes } >
                    <div className={ styles.box } >
                        <div className={ styles.left } >
                            <img alt='' src='/images/main/gami-1.svg' />
                        </div>
                        <div className={ styles.right } >
                            {
                                staticContent?.box[ 0 ]
                            }
                        </div>
                    </div>
                    <div className={ styles.box } >
                        <div className={ styles.left } >
                            <img alt='' src='/images/main/gami-2.svg' />
                        </div>
                        <div className={ styles.right } >
                            {
                                staticContent?.box[ 1 ]
                            }
                        </div>
                    </div>
                    <div className={ styles.box } >
                        <div className={ styles.left } >
                            <img alt='' src='/images/main/gami-3.svg' />
                        </div>
                        <div className={ styles.right } >
                            {
                                staticContent?.box[ 2 ]
                            }
                        </div>
                    </div>
                </div>
                <div className={ styles.area1 }>
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/gami-4.png' />
                    </div>
                    <div className={ styles.image_mb }>
                        <img alt='' src='/images/main/gami-6.png' />
                    </div>
                    <div className={ `${ styles.text } ${ styles.right_top }` }>
                        <div className={ styles.image }>
                            <img alt='' src='/images/main/gami-7.png' />
                        </div>
                        <div className={ styles.title }>
                            {
                                staticContent?.main_content[ 0 ]?.title
                            }
                        </div>
                        <div className={ styles.content }>
                            {
                                staticContent?.main_content[ 0 ]?.description
                            }
                        </div>
                    </div>
                    <div className={ `${ styles.text } ${ styles.left }` }>
                        <div className={ styles.image }>
                            <img alt='' src='/images/main/gami-8.png' />
                        </div>
                        <div className={ styles.title }>
                            {
                                staticContent?.main_content[ 1 ]?.title
                            }
                        </div>
                        <div className={ styles.content }>
                            {
                                staticContent?.main_content[ 1 ]?.description
                            }
                        </div>
                    </div>
                    <div className={ `${ styles.text } ${ styles.bot }` }>
                        <div className={ styles.image }>
                            <img alt='' src='/images/main/gami-9.png' />
                        </div>
                        <div className={ styles.title }>
                            {
                                staticContent?.main_content[ 2 ]?.title
                            }
                        </div>
                        <div className={ styles.content }>
                            {
                                staticContent?.main_content[ 2 ]?.description
                            }
                        </div>
                    </div>

                    <div className={ styles.progress }>
                        <div className={ styles.total }>
                            <div className={ styles.reach } style={ { width: '33%' } }>

                            </div>
                            <div className={ `${ styles.circle } ${ styles.active }` } style={ { left: '0%' } }>
                                <span className={ `${ styles.top }` } >Bắt đầu</span>
                            </div>
                            <div className={ `${ styles.circle } ${ styles.active }` } style={ { left: '33%' } }>
                                <span className={ `${ styles.top } ` } >

                                    {
                                        staticContent?.main_content[ 1 ]?.title
                                    }
                                </span>
                            </div>
                            <div className={ `${ styles.circle } ${ styles.active }` } style={ { left: '66%' } }>
                                <span className={ `${ styles.top } ` } >
                                    {
                                        staticContent?.main_content[ 0 ]?.title
                                    }
                                </span>
                            </div>
                            <div className={ `${ styles.circle } ${ styles.active }` } style={ { left: '100%' } }>
                                <span className={ `${ styles.top } ` } >
                                    {
                                        staticContent?.main_content[ 2 ]?.title
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ styles.faqs }>
                    <div className={ styles.title }>
                        Những câu hỏi thường gặp khi làm nhiệm vụ tích điểm
                    </div>
                    <div className={ styles.items }>
                        {
                            staticContent?.question?.map( ( e, i ) => (
                                <div className={ styles.item } key={ i }>
                                    <div className={ styles.title }>
                                        { e?.title }
                                    </div>
                                    <div className={ styles.content }>
                                        <div className={ styles.text } dangerouslySetInnerHTML={ { __html: e?.content } }>

                                        </div>
                                        <div className={ styles.more }>
                                            xem thêm
                                        </div>
                                    </div>
                                </div>
                            ) )
                        }
                    </div>
                </div>
                <div className={ styles.area2 }>
                    <div className={ styles.left }>
                        <img alt='' src='/images/main/gami-5.png' />
                    </div>
                    <div className={ styles.right }>
                        <div className={ styles.text }>
                            Bạn đã sẵn sàng chưa? Đăng nhập hoặc khám phá kho bài học để bắt đầu nhé!
                        </div>
                        <div className={ styles.button }>
                            <Link href={ LOGIN } passHref>
                                <a href='#'>Đăng nhập</a>
                            </Link>
                            <Link href={ PRODUCT_SESSION } passHref>
                                <a href='#'>Khám phá</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
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


export async function getStaticProps ( context )
{
    var data = null;

    await fetch( process.env.API_URL + 'page/gamification', {
        method: 'POST',
        body: {},
        headers: {
            'Content-type': 'application/json'
        }
    } )
        .then( response => response.json() )
        .then( result =>
        {
            data = result
        } )
        .catch( error => { } )

    // if ( !data )
    // {
    //     return {
    //         notFound: true
    //     }
    // }

    return {
        props: {
            data
        }, // will be passed to the page component as props
        revalidate: 1,
    }
}
