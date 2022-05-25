import styles from '../styles/main/thanks.module.scss'
import Head from "next/head"
import Layout from "../components/layouts/Layout"
import Link from 'next/link'
import { HOME } from '../constants/route'

export default function Custom404 ( props )
{
    return (
        <div className={ styles.container }>
            <Head>
                <title>AIM E-learning |  404 - Không tìm thấy trang</title>
            </Head>

            <div className={ styles.thanks_page } >
                <div className={ styles.breadcrumb }>
                    <Link href={ HOME } passHref>
                        <a href='#' className={ styles.link }>
                            Trang chủ
                        </a>
                    </Link>
                    <a href='#' className={ styles.link }>
                        404 - Không tìm thấy trang
                    </a>
                </div>
                <div className={ styles.box } style={ { background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                    <div className={ styles.row1 }>
                        404 - Không tìm thấy trang
                    </div>
                </div>
            </div>

        </div>
    )
}

Custom404.getLayout = function getLayout ( page )
{
    return (
        <Layout header={ page.props.header } footer={ page.props.footer }>
            { page }
        </Layout>
    )
}