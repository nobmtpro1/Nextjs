import styles from '../../../styles/document/ebook.module.scss'
import React from 'react'
import Layout from '../../../components/layouts/Layout'
import { slug } from '../../../utils/helper'
import Link from 'next/link'
import { DOCUMENT_EBOOK, HOME } from '../../../constants/route'
import Pagination from '../../../components/pages/document/listPage/Pagination'
import HeadTag from '../../../components/global/HeadTag'
import Breadcrumb from '../../../components/pages/document/listPage/Breadcrumb'
import Banner from '../../../components/pages/document/listPage/Banner'
import Menu from '../../../components/pages/document/listPage/Menu'
import MoreDocument from '../../../components/pages/document/listPage/MoreDocument'

const Index = ( props ) =>
{
    const { ebook, ebook_mb, seo, category } = props.data

    return (
        <>
            <HeadTag title={ seo?.title } description={ seo?.description } keywords={ seo?.keywords } image={ seo?.image } />

            <main style={ { overflow: 'hidden' } } id="document-project-page">

                <Breadcrumb styles={ styles } data={ [
                    {
                        name: "Trang chủ",
                        href: HOME
                    },
                    {
                        name: "Kho ebook",
                        href: DOCUMENT_EBOOK
                    },
                ] } />

                <Banner styles={ styles } name="KHO EBOOK" image="/images/document-ebook-banner-person.png" />

                <Menu styles={ styles } category={ category } pathname={ DOCUMENT_EBOOK } />

                <div className={ styles.list }>
                    <div className={ styles.items }>
                        {
                            ebook?.data?.map( ( e, i ) => (
                                <div className={ styles.item } key={ i }>
                                    <div className={ styles.image }>
                                        <img alt='' src={ process.env.IMG_URL + e.image } />
                                    </div>
                                    <h3 className={ styles.name }>{ e.name }</h3>
                                    <div className={ styles.category }>
                                        <span>{ e?.category?.name }</span>
                                    </div>
                                    <p className={ styles.description }>{ e.description }</p>
                                    <Link passHref href={ DOCUMENT_EBOOK + slug( e.name ) + '-' + e.id }><div className={ styles.button }><a href="#">Tải ngay</a></div></Link>
                                </div>
                            ) )
                        }
                    </div>
                    <div className={ styles.items_mobile }>
                        {
                            ebook_mb?.data?.map( ( e, i ) => (
                                <Link passHref href={ DOCUMENT_EBOOK + slug( e.name ) + '-' + e.id } key={ i }>
                                    <div className={ styles.item } >
                                        <div className={ styles.image }>
                                            <img alt='' src={ process.env.IMG_URL + e.image } />
                                        </div>
                                        <h3 className={ styles.name }>{ e.name }</h3>
                                        <div className={ styles.category }>
                                            <span>{ e?.category?.name }</span>
                                        </div>
                                    </div>
                                </Link>
                            ) )
                        }
                    </div>
                    <Pagination lastPage={ ebook?.last_page } styles={ styles } />
                </div>

                <MoreDocument styles={ styles } except={ DOCUMENT_EBOOK } />
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

    await fetch( process.env.API_URL + 'page/document/ebook?page=' + context.query.page || 1, {
        method: 'POST',
        body: JSON.stringify( {
            category_id: context.query.category || null,
        } ),
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

    if ( !data )
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
