import styles from '../../../styles/document/project.module.scss'
import React from 'react'
import Layout from '../../../components/layouts/Layout'
import Link from 'next/link'
import { DOCUMENT_PROJECT, HOME } from '../../../constants/route'
import Pagination from '../../../components/pages/document/listPage/Pagination'
import slugify from 'slugify'
import Breadcrumb from '../../../components/pages/document/listPage/Breadcrumb'
import Menu from '../../../components/pages/document/listPage/Menu'
import MoreDocument from '../../../components/pages/document/listPage/MoreDocument'
import Banner from '../../../components/pages/document/listPage/Banner'
import HeadTag from '../../../components/global/HeadTag'

const Index = ( props ) =>
{
    const { project, project_mb, seo, category } = props.data

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
                        name: "Đồ án tốt nghiệp",
                        href: DOCUMENT_PROJECT
                    },
                ] } />

                <Banner styles={ styles } name="ĐỒ ÁN <br/> TỐT NGHIỆP" image="/images/document-project-banner-person.png" />

                <Menu styles={ styles } category={ category } pathname={ DOCUMENT_PROJECT } />

                <div className={ styles.list }>
                    <div className={ styles.items }>
                        {
                            project?.data?.map( ( e, i ) => (
                                <div className={ styles.item } key={ i }>
                                    <div className={ styles.image }>
                                        <img alt='' src={ process.env.IMG_URL + e.image } />
                                    </div>
                                    <h3 className={ styles.name }>{ e.name }</h3>
                                    <div className={ styles.category }>
                                        <span>{ e?.category?.name }</span>
                                    </div>
                                    <p className={ styles.description }>{ e.description }</p>
                                    <Link passHref href={ DOCUMENT_PROJECT + slugify( e.name ) + '-' + e.id }><div className={ styles.button }><a href="#">Xem ngay</a></div></Link>
                                </div>
                            ) )
                        }
                    </div>
                    <div className={ styles.items_mobile }>
                        {
                            project_mb?.data?.map( ( e, i ) => (
                                <Link passHref href={ DOCUMENT_PROJECT + slugify( e.name ) + '-' + e.id } key={ i }>
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
                    <Pagination lastPage={ project?.last_page } styles={ styles } />
                </div>

                <MoreDocument styles={ styles } except={ DOCUMENT_PROJECT } />
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

    await fetch( process.env.API_URL + 'page/document/project?page=' + context.query.page || 1, {
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
