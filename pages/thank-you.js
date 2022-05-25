import styles from '../styles/main/thanks.module.scss'
import React, { useEffect, useState } from 'react'
import { HOME } from '../constants/route'
import Layout from '../components/layouts/Layout'
import Head from 'next/head'
import Link from "next/link";
import { useRouter } from "next/router";

const Index = ( props ) =>
{

    const router = useRouter()

    const [ data, setData ] = useState( {
        name: '',
        email: ''
    } )

    useEffect( () =>
    {
        setData( { name: router.query.name, email: router.query.email } )

    }, [ router ] )


    return (
        <div className={ styles.container }>
            <Head>
                <title>AIM E-learning | Thank you</title>
            </Head>

            <div className={ styles.thanks_page } >
                <div className={ styles.breadcrumb }>
                    <Link href={ HOME } passHref>
                        <a href='#' className={ styles.link }>
                            Trang chủ
                        </a>
                    </Link>
                    <a href='#' className={ styles.link }>
                        Thank you
                    </a>
                </div>
                <div className={ styles.box }>
                    <div className={ styles.row1 }>
                        Thank you
                    </div>
                    <div className={ styles.row2 }>
                        Bạn đã gửi đăng ký thành công.
                        AIM Academy sẽ gửi đến bạn những thông tin mới nhất hàng tuần.
                    </div>
                    <form className={ `${ styles.form }` }>
                        <div className={ `${ styles.input }` }>
                            <input value={ data?.name } disabled />
                        </div>
                        <div className={ `${ styles.input }` }>
                            <input value={ data?.email } disabled />
                        </div>
                    </form>
                </div>
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

export async function getStaticProps ()
{
    return {
        props: {},
    }
}