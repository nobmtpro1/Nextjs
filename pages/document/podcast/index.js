import styles from '../../../styles/document/podcast.module.scss'
import React, { useState } from 'react'
import Layout from '../../../components/layouts/Layout'
import { DOCUMENT_PODCAST, HOME } from '../../../constants/route'
import Pagination from '../../../components/pages/document/listPage/Pagination'
import { useSelector } from 'react-redux'
import PopupLogin from '../../../components/pages/document/detailPage/PopupLogin'
import Breadcrumb from '../../../components/pages/document/listPage/Breadcrumb'
import Banner from '../../../components/pages/document/listPage/Banner'
import Menu from '../../../components/pages/document/listPage/Menu'
import MoreDocument from '../../../components/pages/document/listPage/MoreDocument'
import HeadTag from '../../../components/global/HeadTag'

const Index = ( props ) =>
{
    const { podcast, podcast_mb, seo, category } = props.data
    const [ openPopupLogin, setOpenPopupLogin ] = useState( false )

    const { data } = useSelector( state => state.account.login )

    const handleView = ( link ) =>
    {
        if ( data )
        {
            window.open(
                link,
                '_blank' // <- This is what makes it open in a new window.
            );
        } else
        {
            setOpenPopupLogin( true )
        }
    }

    return (
        <>
          <HeadTag title={ seo?.title } description={ seo?.description } keywords={ seo?.keywords } image={ seo?.image } />

            <PopupLogin open={ openPopupLogin } setOpen={ setOpenPopupLogin } url={ DOCUMENT_PODCAST } />

            <main style={ { overflow: 'hidden' } } id="document-project-page">


                <Breadcrumb styles={ styles } data={ [
                    {
                        name: "Trang chủ",
                        href: HOME
                    },
                    {
                        name: "Kho podcast",
                        href: DOCUMENT_PODCAST
                    },
                ] } />

                <Banner styles={ styles } name="KHO PODCAST" image="/images/document-podcast-banner-person.png" />

                <Menu styles={ styles } category={ category } pathname={ DOCUMENT_PODCAST } />

                <div className={ styles.list }>
                    <div className={ styles.items }>
                        {
                            podcast?.data?.map( ( e, i ) => (
                                <div className={ styles.item } key={ i }>
                                    <div className={ styles.image }>
                                        <img alt='' src={ process.env.IMG_URL + e.image } />
                                    </div>
                                    <h3 className={ styles.name }>{ e.name }</h3>
                                    <div className={ styles.category }>
                                        <span>{ e?.category?.name }</span>
                                    </div>
                                    <p className={ styles.description }>{ e.description }</p>
                                    <div className={ styles.button }><a style={ { cursor: 'pointer' } } onClick={ () => handleView( e.link_spotify ) } >Nghe ngay</a></div>
                                </div>
                            ) )
                        }
                    </div>
                    <div className={ styles.items_mobile }>
                        {
                            podcast_mb?.data?.map( ( e, i ) => (
                                <a style={ { textDecoration: 'none', color: 'inherit' } } onClick={ () => handleView( e.link_spotify ) } className={ styles.item } key={ i }>
                                    <div className={ styles.image }>
                                        <img alt='' src={ process.env.IMG_URL + e.image } />
                                    </div>
                                    <h3 className={ styles.name }>{ e.name }</h3>
                                    <div className={ styles.category }>
                                        <span>{ e?.category?.name }</span>
                                    </div>
                                </a>
                            ) )
                        }
                    </div>
                    <Pagination lastPage={ podcast?.last_page } styles={ styles } />
                </div>

                <MoreDocument styles={ styles } except={ DOCUMENT_PODCAST } />
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

    await fetch( process.env.API_URL + 'page/document/podcast?page=' + context.query.page || 1, {
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
