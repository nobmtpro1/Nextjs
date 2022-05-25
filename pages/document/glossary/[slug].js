import styles from '../../../styles/document/glossary-detail.module.scss'
import React from "react";
import Link from "next/link";
import Layout from '../../../components/layouts/Layout'
import {  DOCUMENT_EBOOK, DOCUMENT_GLOSSARY, DOCUMENT_PODCAST, HOME } from '../../../constants/route';
import { formatTimePast, slug } from '../../../utils/helper';
import { FacebookShareButton } from "react-share";
import { useRouter } from 'next/router';
import { useState } from 'react';
import PopupShare from '../../../components/global/PopupShare';
import HeadTag from '../../../components/global/HeadTag';
import Breadcrumb from '../../../components/pages/document/detailPage/Breadcrumb';
import MoreDocument from '../../../components/pages/document/listPage/MoreDocument';
import Related from '../../../components/pages/document/detailPage/Related';

const Index = ( props ) =>
{
    const [ showShare, setShowShare ] = useState( false )

    const router = useRouter()
    const glossary = props?.data?.glossary
    if ( router.isFallback )
    {
        return <div>Loading...</div>
    }

    return (
        <>
            <HeadTag
                title={ 'AIM E-learning | Glossary | ' + glossary?.name }
                description={ glossary?.description }
                keywords={ glossary?.name }
                image={ props.seoDefault?.image }
            />

            <main id="document-glossary-detail-page" style={ { overflow: 'hidden' } }>

                <PopupShare
                    active={ showShare }
                    setActive={ setShowShare }
                    title="Chia sẻ glossary"
                    content="Chần chờ gì mà không chia sẻ glossary thú vị này đến nhiều người hơn?"
                    url={ process.env.BASE_URL + router.asPath }
                />

                <Breadcrumb styles={ styles } data={ [
                    {
                        name: "Trang chủ",
                        href: HOME
                    },
                    {
                        name: "Glossary",
                        href: DOCUMENT_GLOSSARY
                    },
                    {
                        name: glossary?.name,
                        href: "#"
                    },
                ] } />

                <div className={ `${ styles.main }` }>

                    <h1 className={ `${ styles.title }` }>{ glossary?.name }   </h1>
                    <div className={ `${ styles.time }` }>
                        <div className={ `${ styles.image }` }>
                            <img alt='' src="/images/document-glossary-detail-clock.png" />
                        </div>
                        <span className={ `${ styles.minute }` }>{ formatTimePast( glossary?.created_at ) }</span>
                    </div>
                    <div className={ `${ styles.detail }` }>
                        <div className={ `${ styles.left }` }>
                            <div className={ `${ styles.description }` }>
                                { glossary?.description }
                            </div>
                            <div className={ `${ styles.content }` } dangerouslySetInnerHTML={ { __html: glossary?.content } }>

                            </div>
                            <div className={ `${ styles.share }` }>

                                <a className={ `${ styles.link }` } style={ { cursor: 'pointer' } } onClick={ () => setShowShare( prev => !prev ) } >
                                    <img alt='' src="/images/document-glossary-detail-share.png" />
                                </a>
                                <FacebookShareButton
                                    url={ process.env.BASE_URL + router.asPath }
                                    className={ `${ styles.link }` }
                                >
                                    <a href="#"><img alt='' src="/images/document-glossary-detail-facebook.png" /></a>
                                </FacebookShareButton>
                            </div>
                        </div>
                        <div className={ `${ styles.right }` }>
                            <div className={ `${ styles.box }` }>
                                <h2 className={ `${ styles.title }` }>Thuật ngữ liên quan</h2>
                                <div className={ `${ styles.items }` }>
                                    {
                                        glossary?.related_glossary?.map( ( e, i ) => (
                                            <Link passHref key={ i } href={ DOCUMENT_GLOSSARY + slug( e.name ) + '-' + e.id }>
                                                <a href="#" className={ `${ styles.item }` }>
                                                    { e.name }
                                                </a>
                                            </Link>
                                        ) )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    glossary?.related_ebook?.length > 0 && (
                        <Related styles={ styles } data={ glossary?.related_ebook } name="Ebook" href={ DOCUMENT_EBOOK } />
                    )
                }

                {
                    glossary?.related_podcast?.length > 0 && (
                        <Related styles={ styles } data={ glossary?.related_podcast } name="Podcast" href={ DOCUMENT_PODCAST } />
                    )
                }

                <MoreDocument styles={ styles } except={ DOCUMENT_GLOSSARY } />
            </main>
        </>
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


export async function getServerSideProps ( context )
{
    var data = null;

    await fetch( process.env.API_URL + 'page/document-detail/glossary/' + context.params.slug, {
        method: 'POST',
        body: JSON.stringify( {} )
        ,
        headers: {
            'Content-type': 'application/json',
        }
    } )
        .then( response => response.json() )
        .then( result =>
        {
            data = result
        } )
        .catch( error => { } )

    if ( !data?.glossary )
    {
        return {
            notFound: true
        }
    }

    return {
        props: {
            data
        }, // will be passed to the page component as props
    }
}