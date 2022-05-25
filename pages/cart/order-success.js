import styles from '../../styles/main/cart_thanks.module.scss'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts/Layout';
import HeadTag from '../../components/global/HeadTag'
import AuthUser from '../../components/auths/AuthUser';
import Link from 'next/link'
import { CART, HOME } from '../../constants/route';
import { useRouter } from 'next/router';
import axios from '../../sevices/axios';
import SessionRelated from '../../components/pages/cart/SessionRelated';

const Index = ( props ) =>
{
    const router = useRouter()

    const [ data, setData ] = useState( null )
    useEffect( () =>
    {
        axios.post( 'page/cart/order-success' ).then( response =>
        {
            setData( response.data )
        } ).catch( error => { } )
    }, [ router ] )

    return (
        <div className={ styles.container }>

            <HeadTag title="AIM E-learning | Giỏ hàng" />

            <AuthUser>
                <div className={ styles.cart_page }>
                    <div className={ styles.breadcrumb_1 }>
                        <Link href={ HOME } passHref>
                            <a href='#' className={ styles.link_2 }>
                                Trang chủ
                            </a>
                        </Link>
                        <Link href={ CART } passHref>
                            <a href='#' className={ `${ styles.link_2 } ${ styles.active }` }>
                                Giỏ hàng
                            </a>
                        </Link>
                    </div>
                    <div className={ styles.cart_page }>
                        <div className={ styles.box_1 }>
                            <div className={ styles.row1_2 }>
                                Cảm ơn bạn đã mua sản phẩm
                            </div>
                            <div className={ styles.row2_2 }>
                                Hãy trải nghiệm những nội dung và kiến thức thú vị trong từng bài học nhé.
                            </div>
                            <div className={ styles.row3_2 }>
                                À, bạn đã tích lũy thêm 50 coin x số sản phẩm đã mua, kiểm tra ngay trong ví ưu đãi.
                            </div>
                            <form className={ `${ styles.form_2 }` }>
                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>{ router.query.fullname }</div>
                                    <input disabled />
                                </div>
                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>{ router.query.phone }</div>
                                    <input disabled />
                                </div>
                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>{ router.query.email }</div>
                                    <input disabled />
                                </div>
                            </form>
                        </div>

                        <SessionRelated styles={ styles } relatedSession={ data?.relatedSession } />
                    </div>
                </div>
            </AuthUser>
        </div>
    )
}


Index.getLayout = function getLayout ( page )
{
    return (
        <Layout header={ page.props.header } footer={ page.props.footer }>
            { page }
        </Layout>
    )
}

export default Index

export async function getStaticProps ()
{
    return {
        props: {},
    }
}