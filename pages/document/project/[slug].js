import styles from '../../../styles/document/test-detail.module.scss'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../../components/layouts/Layout'
import {  DOCUMENT_PROJECT, HOME, LOGIN } from '../../../constants/route'
import { checkWishlist, setWishlistApi } from '../../../sevices/wishlistApi'
import moment from 'moment'
import axios from '../../../sevices/axios';
import HeadTag from '../../../components/global/HeadTag';
import Breadcrumb from '../../../components/pages/document/detailPage/Breadcrumb';
import MoreDocument from '../../../components/pages/document/listPage/MoreDocument';
import Related from '../../../components/pages/document/detailPage/Related';
import PopupLogin from '../../../components/pages/document/detailPage/PopupLogin';
import PopupSuccess from '../../../components/pages/document/detailPage/PopupSuccess';
import PopupSaved from '../../../components/pages/document/detailPage/PopupSaved';
import RelatedSession from '../../../components/pages/document/detailPage/RelatedSession';
import PopupShare from '../../../components/global/PopupShare';
import nProgress from 'nprogress'

const Index = ( props ) =>
{

    const [ openPopupSaved, setOpenPopupSaved ] = useState( false )
    const [ openPopupLogin, setOpenPopupLogin ] = useState( false )
    const [ openPopupSuccess, setOpenPopupSuccess ] = useState( false )
    const [ showShare, setShowShare ] = useState( false )

    const project = props?.data?.project


    const router = useRouter()

    const [ wishlist, setWishlist ] = useState( false )

    const { data } = useSelector( state => state.account.login )

    useEffect( () =>
    {
        const fun = async () =>
        {
            setWishlist( await checkWishlist( { type: 'project', id: project?.id } ) )
        }

        fun()

    }, [ router, project?.id ] )

    const handleWishlist = async () =>
    {
        // nProgress.set(0.4)
        if ( data )
        {
            const result = await setWishlistApi( 'project', { project_id: project?.id } )
            if ( result )
            {
                setWishlist( prev => !prev )
            }
            if ( wishlist == false )
            {
                setOpenPopupSaved( prev => true )
            }
        } else
        {
            router.push( {
                pathname: LOGIN,
                query: {
                    url: DOCUMENT_PROJECT + router.query.slug
                }
            } )
        }
        // nProgress.done()
    }

    const handleGet = () =>
    {
        if ( data )
        {
            axios.post( 'client/register/project', {
                id: project?.id
            } ).then( response =>
            {
                if ( response.data.exist == false )
                {
                    window.open(
                        project?.link_download,
                        '_blank' // <- This is what makes it open in a new window.
                    );
                    setOpenPopupSuccess( true )
                } else
                {
                    window.open(
                        project?.link_download,
                        '_blank' // <- This is what makes it open in a new window.
                    );
                }
            } ).catch( error =>
            {
                alert( 'X???y ra l???i. Xin vui l??ng th??? l???i' )
            } )
        } else
        {
            setOpenPopupLogin( true )
        }
    }

    if ( router.isFallback )
    {
        return <div>Loading...</div>
    }
    return (
        <>
            <HeadTag title={ 'AIM E-learning | ????? ??n t???t nghi???p | ' + project?.name } description={ project?.description } keywords={ project?.name } image={ project?.image } />

            <PopupSaved open={ openPopupSaved } setOpen={ setOpenPopupSaved } />
            <PopupSuccess open={ openPopupSuccess } setOpen={ setOpenPopupSuccess } aimCoin={ project?.aim_coin } />
            <PopupLogin open={ openPopupLogin } setOpen={ setOpenPopupLogin } url={ DOCUMENT_PROJECT + router.query.slug } />


            <PopupShare
                active={ showShare }
                setActive={ setShowShare }
                title="Chia s??? ????? ??n t???t nghi???p"
                content="Ch???n ch??? g?? m?? kh??ng chia s??? ????? ??n t???t nghi???p th?? v??? n??y ?????n nhi???u ng?????i h??n?"
                url={ process.env.BASE_URL + router.asPath }
            />


            <main id="document-glossary-detail-page" style={ { overflow: 'hidden' } }>

                <Breadcrumb styles={ styles } data={ [
                    {
                        name: "Trang ch???",
                        href: HOME
                    },
                    {
                        name: "????? ??n t???t nghi???p",
                        href: DOCUMENT_PROJECT
                    },
                    {
                        name: project?.name,
                        href: "#"
                    },
                ] } />

                <div className={ `${ styles.main }` }>
                    <div className={ `${ styles.left }` }>
                        <h1 className={ `${ styles.title }` }>
                            { project?.name }
                        </h1>
                        <div className={ `${ styles.info }` }>
                            <div className={ `${ styles.info_left }` }>
                                <div className={ `${ styles.date }` }>
                                    <div className={ `${ styles.image }` }>
                                        <img alt='' src="/images/document-test-detail-date.png" />
                                    </div>
                                    <div className={ `${ styles.text }` }>
                                        { moment( project?.created_at ).format( 'DD/MM/YYYY' ) }
                                    </div>
                                </div>
                                <div className={ `${ styles.date }` }>
                                    <div className={ `${ styles.image }` }>
                                        <img alt='' src="/images/document-test-detail-person.png" />
                                    </div>
                                    <div className={ `${ styles.text }` }>
                                        { project?.register_count } ng?????i xem
                                    </div>
                                </div>
                            </div>
                            <div className={ `${ styles.info_right }` }>
                                <a style={ { cursor: 'pointer' } } onClick={ () => setShowShare( prev => !prev ) } className={ `${ styles.action }` }>
                                    <img alt='' src="/images/document-test-detail-share.png" />
                                </a>

                                <a href="#" className={ `${ styles.action }` } onClick={ handleWishlist }>
                                    {
                                        wishlist ? <img alt='' src="/images/document-test-detail-wishlist.png" /> : <img alt='' src="/images/document-wishlist-o.png" />
                                    }
                                </a>
                            </div>
                        </div>
                        <div className={ `${ styles.image }` }>
                            <img alt='' src={ process.env.IMG_URL + project?.image } />
                        </div>
                        <div className={ `${ styles.content }` } dangerouslySetInnerHTML={ { __html: project?.content } } >
                        </div>
                        <div className={ `${ styles.button }` }>
                            <button onClick={ handleGet }>Nh???n ngay</button>
                        </div>
                    </div>
                    <div className={ `${ styles.right }` }>
                        <div className={ `${ styles.image }` }>
                            <img alt='' src={ process.env.IMG_URL + project?.image } />
                        </div>
                    </div>
                </div>

                {
                    project?.related_project?.length > 0 && (
                        <Related styles={ styles } data={ project?.related_project } name="????? ??n" href={ DOCUMENT_PROJECT } />
                    )
                }


                {
                    project?.related_session?.length > 0 && (
                        <RelatedSession data={ project?.related_session } />
                    )
                }

                <MoreDocument styles={ styles } except={ DOCUMENT_PROJECT} />
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

    await fetch( process.env.API_URL + 'page/document-detail/project/' + context.params.slug, {
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

    if ( !data?.project )
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

