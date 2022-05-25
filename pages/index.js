import styles from '../styles/main/home.module.scss'
import React from 'react'
import Layout from '../components/layouts/Layout'
import HeadTag from '../components/global/HeadTag'
import Banner from '../components/pages/home/Banner';
import SlideProduct from '../components/pages/home/SlideProduct';
import ViewedProduct from '../components/pages/home/ViewedProduct';
import ProductCategory from '../components/pages/home/ProductCategory';
import Area1 from '../components/pages/home/Area1';
import Area2 from '../components/pages/home/Area2';
import Area3 from '../components/pages/home/Area3';
import Area4 from '../components/pages/home/Area4';
import Area5 from '../components/pages/home/Area5';
import Area6 from '../components/pages/home/Area6';
import Area7 from '../components/pages/home/Area7';
import FooterText from '../components/pages/home/FooterText';

const Index = ( props ) =>
{
    const { courseCategory, newSession, staticContent, seo } = props.data || { courseCategory: null, newSession: null, staticContent: null, seo: null }

    return (
        <div className={ styles.container }>

            <HeadTag title={ seo?.title } description={ seo?.description } keywords={ seo?.keywords } image={ seo?.image } />

            <div className={ styles.home_page } >

                <Banner styles={ styles } staticContent={ staticContent } />

                <SlideProduct data={ newSession } styles={ styles } />

                <ViewedProduct styles={ styles } />

                <ProductCategory styles={ styles } courseCategory={ courseCategory } />

                <Area1 styles={ styles } staticContent={ staticContent } />

                <Area2 styles={ styles } staticContent={ staticContent } />

                <Area3 styles={ styles } staticContent={ staticContent } />

                <Area4 styles={ styles } staticContent={ staticContent } />

                <Area5 styles={ styles } staticContent={ staticContent } />

                <Area6 styles={ styles } staticContent={ staticContent } />

                <Area7 styles={ styles } />

                <FooterText styles={ styles } staticContent={ staticContent } />

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

    await fetch( process.env.API_URL + 'page/home', {
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

    return {
        props: {
            data
        }, // will be passed to the page component as props
        revalidate: 1,
    }
}