import styles from '../../../styles/document/test-detail.module.scss'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../../components/layouts/Layout'
import { DOCUMENT_TEST, HOME, LOGIN } from '../../../constants/route'
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

    const test = props?.data?.test

    const router = useRouter()

    const [ wishlist, setWishlist ] = useState( false )

    const { data } = useSelector( state => state.account.login )

    useEffect( () =>
    {
        const fun = async () =>
        {
            setWishlist( await checkWishlist( { type: 'test', id: test?.id } ) )
        }

        fun()
    }, [ router, test?.id ] )

    const handleWishlist = async () =>
    {
        // nProgress.set( 0.4 )
        if ( data )
        {
            const result = await setWishlistApi( 'test', { test_id: test?.id } )
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
                    url: DOCUMENT_TEST + router.query.slug
                }
            } )
        }
        // nProgress.done()
    }

    const handleGet = () =>
    {
        if ( data )
        {
            axios.post( 'client/register/test', {
                id: test?.id
            } ).then( response =>
            {
                if ( response.data.exist == false )
                {
                    window.open(
                        test?.link_download,
                        '_blank' // <- This is what makes it open in a new window.
                    );
                    setOpenPopupSuccess( true )
                } else
                {
                    window.open(
                        test?.link_download,
                        '_blank' // <- This is what makes it open in a new window.
                    );
                }
            } ).catch( error =>
            {
                alert( 'Xảy ra lỗi. Xin vui lòng thử lại' )
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
            <HeadTag title={ 'AIM E-learning | Bài test digital | ' + test?.name } description={ test?.description } keywords={ test?.name } image={ test?.image } />

            <PopupSaved open={ openPopupSaved } setOpen={ setOpenPopupSaved } />
            <PopupSuccess open={ openPopupSuccess } setOpen={ setOpenPopupSuccess } aimCoin={ test?.aim_coin } />
            <PopupLogin open={ openPopupLogin } setOpen={ setOpenPopupLogin } url={ DOCUMENT_TEST + router.query.slug } />

            <PopupShare
                active={ showShare }
                setActive={ setShowShare }
                title="Chia sẻ bài test"
                content="Chần chờ gì mà không chia sẻ bài test thú vị này đến nhiều người hơn?"
                url={ process.env.BASE_URL + router.asPath }
            />

            <main id="document-glossary-detail-page" style={ { overflow: 'hidden' } }>

                <Breadcrumb styles={ styles } data={ [
                    {
                        name: "Trang chủ",
                        href: HOME
                    },
                    {
                        name: "Bài test digital",
                        href: DOCUMENT_TEST
                    },
                    {
                        name: test?.name,
                        href: "#"
                    },
                ] } />

                <div className={ `${ styles.main }` }>
                    <div className={ `${ styles.left }` }>
                        <h1 className={ `${ styles.title }` }>
                            { test?.name }
                        </h1>
                        <div className={ `${ styles.info }` }>
                            <div className={ `${ styles.info_left }` }>
                                <div className={ `${ styles.date }` }>
                                    <div className={ `${ styles.image }` }>
                                        <img alt='' src="/images/document-test-detail-date.png" />
                                    </div>
                                    <div className={ `${ styles.text }` }>
                                        { moment( test?.created_at ).format( 'DD/MM/YYYY' ) }
                                    </div>
                                </div>
                                <div className={ `${ styles.date }` }>
                                    <div className={ `${ styles.image }` }>
                                        <img alt='' src="/images/document-test-detail-person.png" />
                                    </div>
                                    <div className={ `${ styles.text }` }>
                                        { test?.register_count } người xem
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
                            <img alt='' src={ process.env.IMG_URL + test?.image } />
                        </div>
                        <div className={ `${ styles.content }` } dangerouslySetInnerHTML={ { __html: test?.content } } >
                        </div>
                        <div className={ `${ styles.button }` }>
                            <button onClick={ handleGet }>Nhận ngay</button>
                        </div>
                    </div>
                    <div className={ `${ styles.right }` }>
                        <div className={ `${ styles.image }` }>
                            <img alt='' src={ process.env.IMG_URL + test?.image } />
                        </div>
                    </div>
                </div>

                {
                    test?.related_test?.length > 0 && (
                        <Related styles={ styles } data={ test?.related_test } name="Bài test" href={ DOCUMENT_TEST } />
                    )
                }


                {
                    test?.related_session?.length > 0 && (
                        <RelatedSession data={ test?.related_session } />
                    )
                }

                <MoreDocument styles={ styles } except={ DOCUMENT_TEST } />
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

    await fetch( process.env.API_URL + 'page/document-detail/test/' + context.params.slug, {
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

    if ( !data?.test )
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