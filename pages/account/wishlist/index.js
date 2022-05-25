import styles from '../../../styles/account/wishlist.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../components/layouts/LayoutAccount'
import { useRouter } from 'next/router'
import axios from '../../../sevices/axios'
import ProductSessionWishlist from '../../../components/pages/account/ProductSessionWishlist'
import ProductCourseWishlist from '../../../components/pages/account/ProductCourseWishlist'
import Link from 'next/link'
import { ACCOUNT_WISHLIST, DOCUMENT_EBOOK, DOCUMENT_PODCAST, DOCUMENT_PROJECT, DOCUMENT_TEST, DOCUMENT_YOUTUBE } from '../../../constants/route'
import { slug } from '../../../utils/helper'
import Head from 'next/head'

const Index = () =>
{
    const router = useRouter()
    const [ data, setData ] = useState( null )
    const [ type, setType ] = useState( router.query.slug )

    useEffect( () =>
    {
        axios.get( 'page/account/wishlist/' + router.query.slug ).then( response =>
        {
            setData( response.data )
        } ).catch( error => { } )
    }, [ router ] )

    useEffect( () =>
    {
        router.push( ACCOUNT_WISHLIST.replace( 'elearning', type ) )
    }, [ type ] )

    const unwishlist = ( type, id ) =>
    {
        axios.post( 'page/account/wishlist/unwishlist/' + type + '/' + id ).then( response =>
        {
            setData( response.data )
        } ).catch( error => { } )
    }


    return (
        <>
            <Head>
                <title>AIM E-learning | Đã lưu</title>
            </Head>
            <div className={ styles.wishlist_page }>
                <div className={ styles.head }>
                    Đã lưu
                </div>
                <div className={ styles.menu } >
                    <Link href={ ACCOUNT_WISHLIST } passHref>
                        <div className={ `${ styles.text } ${ router.query.slug == 'elearning' && styles.active }` } >
                            Elearning
                        </div>
                    </Link>
                    {/* <Link href={ ACCOUNT_WISHLIST.replace( 'elearning', 'podcast' ) } passHref>
                        <div className={ `${ styles.text } ${ router.query.slug == 'podcast' && styles.active }` } >
                            Podcast
                        </div>
                    </Link> */}
                    <Link href={ ACCOUNT_WISHLIST.replace( 'elearning', 'project' ) } passHref>
                        <div className={ `${ styles.text } ${ router.query.slug == 'project' && styles.active }` } >
                            Đồ án
                            tốt nghiệp
                        </div>
                    </Link>
                    <Link href={ ACCOUNT_WISHLIST.replace( 'elearning', 'test' ) } passHref>
                        <div className={ `${ styles.text } ${ router.query.slug == 'test' && styles.active }` } >
                            Bài test
                            digital
                        </div>
                    </Link>
                    <Link href={ ACCOUNT_WISHLIST.replace( 'elearning', 'ebook' ) } passHref>
                        <div className={ `${ styles.text } ${ router.query.slug == 'ebook' && styles.active }` } >
                            Ebook
                        </div>
                    </Link>
                    <Link href={ ACCOUNT_WISHLIST.replace( 'elearning', 'video' ) } passHref>
                        <div className={ `${ styles.text } ${ router.query.slug == 'video' && styles.active }` } >
                            Video
                        </div>
                    </Link>
                    {/* <Link href={ ACCOUNT_WISHLIST.replace( 'elearning', 'blog' ) } passHref>
                        <div className={ `${ styles.text } ${ router.query.slug == 'blog' && styles.active }` } >
                            Blog
                        </div>
                    </Link> */}

                </div>
                <div className={ styles.menu_mb }>
                    <select value={ type } onChange={ e => setType( e.target.value ) }>
                        <option value="elearning">Elearning</option>
                        <option value="project">Đồ án tốt nghiệp</option>
                        <option value="test">Bài test digital</option>
                        <option value="ebook">Ebook</option>
                        <option value="video">Video</option>
                        {/* <option>Blog</option> */ }
                    </select>
                </div>

                <div className={ styles.template }>
                    {
                        router.query.slug == 'elearning'
                            ?
                            data?.wishlist?.sort( function ( a, b )
                            {
                                return parseFloat( b.created_at ) - parseFloat( a.created_at );
                            } )?.map( ( e, i ) => (
                                <>
                                    {
                                        e?.course_session_id > 0
                                            ?
                                            <ProductSessionWishlist data={ e?.session } styles={ styles } key={ i } unwishlist={ unwishlist } />
                                            :
                                            <ProductCourseWishlist data={ e?.course } styles={ styles } key={ i } unwishlist={ unwishlist } />
                                    }
                                </>
                            ) )
                            : data?.wishlist?.map( ( e, i ) =>
                            {
                                var url = DOCUMENT_EBOOK
                                var data = router.query.slug

                                switch ( router.query.slug )
                                {
                                    case 'podcast':
                                        url = DOCUMENT_PODCAST
                                        break;
                                    case 'project':
                                        url = DOCUMENT_PROJECT
                                        break;
                                    case 'test':
                                        url = DOCUMENT_TEST
                                        break;
                                    case 'video':
                                        url = DOCUMENT_YOUTUBE
                                        data = 'youtube'
                                        break;
                                }

                                return (
                                    <div className={ styles.item } key={ i }>
                                        <div className={ styles.unwishlist } onClick={ () => unwishlist( router.query.slug, e?.[ data ]?.id ) }>
                                            <img alt='' src='/images/unwishlist.svg' />
                                        </div>
                                        <div className={ styles.image }>
                                            <img alt='' src={ process.env.IMG_URL + e?.[ data ]?.image } />
                                        </div>
                                        <div className={ styles.name }>
                                            { e?.[ data ]?.name }
                                        </div>
                                        <div className={ styles.category }>
                                            <div className={ styles.text }>
                                                <span>{ e?.[ data ]?.category?.name }</span>
                                            </div>
                                        </div>
                                        <div className={ `${ styles.description }` }>
                                            { e?.[ data ]?.description }
                                        </div>

                                        <div className={ styles.button }>
                                            <Link passHref href={ url + slug( e?.[ data ]?.name || '' ) + '-' + e?.[ data ]?.id }>
                                                <a href='#'>
                                                    Nhận ngay
                                                </a>
                                            </Link>
                                        </div>

                                    </div>
                                )
                            } )
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
