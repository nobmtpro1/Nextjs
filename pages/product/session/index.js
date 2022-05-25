import styles from '../../../styles/main/products.module.scss'
import React from 'react'
import Product from '../../../components/global/ProductSession'
import { HOME, PRODUCT_SESSION } from '../../../constants/route'
import HeadTag from '../../../components/global/HeadTag'
import Layout from '../../../components/layouts/Layout'
import Pagination from '../../../components/global/Pagination'
import BannerMembership from '../../../components/global/BannerMembership'
import Breadcrumb from '../../../components/pages/product/listPage/Breadcrumb'
import Banner from '../../../components/pages/product/listPage/Banner'
import Filter from '../../../components/pages/product/listPage/Filter'
import Menu from '../../../components/pages/product/listPage/Menu'
import FooterText from '../../../components/pages/product/listPage/FooterText'
import Selection from '../../../components/pages/product/listPage/Selection'

const Index = ( props ) =>
{

    const { session, courseCategory, staticContent, seo } = props.data

    return (
        <div className={ styles.container }>

            <HeadTag title={ seo?.title } description={ seo?.description } keywords={ seo?.keywords } image={ seo?.image } />

            <div className={ styles.products_page } >
                <Breadcrumb styles={ styles } data={ [
                    {
                        name: 'Trang chủ',
                        href: HOME
                    },
                    {
                        name: 'Sản phẩm',
                        href: PRODUCT_SESSION
                    }
                ] } />

                <Banner staticContent={ staticContent } styles={ styles } />

                <span style={ { opacity: 0 } } id="list-product" ></span>

                <Filter styles={ styles } courseCategory={ courseCategory } />

                <Menu styles={ styles } active={ 1 } />

                <div className={ styles.products }>
                    {
                        session?.data?.map( ( e, i ) => (
                            <Product data={ e } key={ i } />
                        ) )
                    }
                </div>

                <Pagination lastPage={ session?.last_page } styles={ styles } />

                <div className={ styles.banner_membership }>
                    <BannerMembership />
                </div>

                <Selection styles={ styles } staticContent={ staticContent } />

                <FooterText styles={ styles } staticContent={ staticContent } />

            </div>
        </div >
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

    await fetch( process.env.API_URL + 'page/product/session?page=' + context.query.page || 1, {
        method: 'POST',
        body: JSON.stringify( {
            // page: context.query.page,
            course_category_id: context.query.category == '' ? null : context.query.category,
            price: context.query.price == '' ? null : context.query.price,
            level: context.query.level == '' ? null : context.query.level,
            certificate_type: context.query.certificateType == '' ? null : context.query.certificateType,
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