import styles from '../../../styles/document/video.module.scss'
import React from 'react'
import Layout from '../../../components/layouts/Layout'
import { slug } from '../../../utils/helper'
import Link from 'next/link'
import { DOCUMENT_YOUTUBE, HOME } from '../../../constants/route'
import Pagination from '../../../components/pages/document/listPage/Pagination'
import Breadcrumb from '../../../components/pages/document/listPage/Breadcrumb'
import Banner from '../../../components/pages/document/listPage/Banner'
import Menu from '../../../components/pages/document/listPage/Menu'
import MoreDocument from '../../../components/pages/document/listPage/MoreDocument'
import HeadTag from '../../../components/global/HeadTag'

const Index = ( props ) =>
{
    const { youtube, youtube_mb, seo, category } = props.data

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
                        name: "Kho video",
                        href: DOCUMENT_YOUTUBE
                    },
                ] } />

                <Banner styles={ styles } name="KHO VIDEO" image="/images/document-video-banner-person.png" />

                <Menu styles={ styles } category={ category } pathname={ DOCUMENT_YOUTUBE } />

                <div className={ styles.list }>
                    <div className={ styles.items }>
                        {
                            youtube?.data?.map( ( e, i ) => (
                                <div className={ styles.item } key={ i }>
                                    <div className={ styles.image }>
                                        <img alt='' src={ process.env.IMG_URL + e.image } />
                                    </div>
                                    <h3 className={ styles.name }>{ e.name }</h3>
                                    <div className={ styles.category }>
                                        <span>{ e?.category?.name }</span>
                                    </div>
                                    <p className={ styles.description }>{ e.description }</p>
                                    <Link passHref href={ DOCUMENT_YOUTUBE + slug( e.name ) + '-' + e.id }><div className={ styles.button }><a href="#">Xem ngay</a></div></Link>
                                </div>
                            ) )
                        }
                    </div>
                    <div className={ styles.items_mobile }>
                        {
                            youtube_mb?.data?.map( ( e, i ) => (
                                <Link passHref href={ DOCUMENT_YOUTUBE + slug( e.name ) + '-' + e.id } key={ i }>
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
                    <Pagination lastPage={ youtube?.last_page } styles={ styles } />
                </div>

                <MoreDocument styles={ styles } except={ DOCUMENT_YOUTUBE } />
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

    await fetch( process.env.API_URL + 'page/document/youtube?page=' + context.query.page || 1, {
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
