import styles from '../../../styles/document/glossary.module.scss'
import React, { useState } from 'react'
import Layout from '../../../components/layouts/Layout'
import { slug } from '../../../utils/helper'
import Link from 'next/link'
import { DOCUMENT_GLOSSARY, HOME } from '../../../constants/route'
import MoreDocument from '../../../components/pages/document/listPage/MoreDocument'
import Banner from '../../../components/pages/document/listPage/Banner'
import Breadcrumb from '../../../components/pages/document/listPage/Breadcrumb'
import HeadTag from '../../../components/global/HeadTag'


const Index = ( props ) =>
{
    const { glossary, seo } = props.data

    const [ glossaryData, setGlossaryData ] = useState( glossary )
    const [ active, setActive ] = useState( '' )

    const scrollTo = ( e ) =>
    {
        var element = document.getElementById( e.target.getAttribute( 'target' ) )
        if ( element )
        {
            setActive( e.target.getAttribute( 'target' ) )
            element.scrollIntoView()
        }
    }

    return (
        <>
           <HeadTag title={ seo?.title } description={ seo?.description } keywords={ seo?.keywords } image={ seo?.image } />

            <main style={ { overflow: 'hidden' } }>

                <Breadcrumb styles={ styles } data={ [
                    {
                        name: "Trang chủ",
                        href: HOME
                    },
                    {
                        name: "Glossary",
                        href: DOCUMENT_GLOSSARY
                    },
                ] } />

                <Banner styles={ styles } name="THUẬT NGỮ MARKETING" image="/images/document-glossary-banner-person.png" />

                <div className={ `${ styles.container }` }>
                    <div className={ `${ styles.list } ` }>
                        <div className={ styles.left }>
                            <span className={ styles.text }>A-Z LIST</span>
                        </div>
                        <div className={ styles.right }>
                            {
                                '#abcdefghijklmnopqrstuvwxyz'.split( '' ).map( ( e, i ) => (
                                    <span className={ `${ styles.text }  ${ active == e ? styles.active : '' }` } key={ i } target={ e } onClick={ e => scrollTo( e ) }>{ e.toUpperCase() }</span>
                                ) )
                            }
                        </div>
                    </div>
                </div>

                <div className={ `${ styles.container }` }>
                    <div className={ `${ styles.items }` }>

                        {
                            Object.keys( glossaryData )?.map( e => (
                                <div className={ `${ styles.item }` } key={ e } id={ e }>
                                    <div className={ `${ styles.left }` }>
                                        <span className={ `${ styles.text }  ${ active == e ? styles.active : '' }` }>{ e.toUpperCase() }</span>
                                    </div>
                                    <div className={ `${ styles.right }` }>
                                        {
                                            glossaryData[ e ].map( x => (
                                                <div className={ `${ styles.glossary }` } key={ x.id }>
                                                    <Link passHref href={ DOCUMENT_GLOSSARY + slug( x.name ) + '-' + x.id }><a>{ x.name }</a></Link>
                                                </div>
                                            ) )
                                        }
                                    </div>
                                </div>
                            ) )
                        }
                    </div>
                </div>

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

    await fetch( process.env.API_URL + 'page/document/glossary', {
        method: 'POST',
        body: JSON.stringify( {} ),
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

