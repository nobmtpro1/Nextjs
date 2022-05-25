import styles from '../styles/main/register.module.scss'
import React, { useEffect, useState } from 'react'
import { FORGOT_PASSWORD, HOME, LOGIN } from '../constants/route'
import Link from "next/link";
import axios from '../sevices/axios'
import Spinner from "react-bootstrap/Spinner";
import Layout from '../components/layouts/Layout';
import Head from 'next/head'

const Index = ( props ) =>
{

    const [ loading, setLoading ] = useState( false )
    const [ email, setEmail ] = useState( '' )

    const handleSubmitEmail = ( e ) =>
    {
        e.preventDefault()
        setLoading( true )
        axios.post( 'forgot-password', { email } ).then( response =>
        {
            setLoading( false )
            alert( 'Chúng tôi sẽ gửi mã xác minh đến địa chỉ email bạn. Vui lòng kiểm tra email để đặt lại mật khẩu.' )
        } ).catch( error =>
        {
            setLoading( false )
            var msg = error.message
            var obj = null
            if ( obj = error?.response?.data?.message )
            {
                msg = obj[ Object.keys( obj )[ 0 ] ][ 0 ]
            }
            alert( msg )
        } )
    }

    // UI
    useEffect( () =>
    {
        const input = document.getElementsByClassName( styles.input )
        Array.from( input ).forEach( e =>
        {
            var ipt = e.querySelector( 'input' )
            var select = e.querySelector( 'select' )

            ipt?.addEventListener( 'focus', function ()
            {
                e.getElementsByClassName( styles.placeholder )[ 0 ].classList.add( styles.hide )
            } )

            ipt?.addEventListener( 'blur', function ()
            {
                if ( ipt.value == '' )
                {
                    e.getElementsByClassName( styles.placeholder )[ 0 ].classList.remove( styles.hide )
                }
            } )
        } )
    } )

    return (
        <div className={ styles.container }>
            <Head>
                <title>AIM E-learning | Quên mật khẩu</title>
            </Head>

            <div className={ styles.register_page }>
                <div className={ styles.breadcrumb_1 }>
                    <Link href={ HOME } passHref>
                        <a href='#' className={ styles.link_2 }>
                            Trang chủ
                        </a>
                    </Link>
                    <Link href={ FORGOT_PASSWORD } passHref>
                        <a href='#' className={ styles.link_2 }>
                            Quên mật khẩu
                        </a>
                    </Link>
                </div>
                <div className={ styles.box_container }>
                    <div className={ styles.box_1 }>
                        <div className={ styles.left_2 }>
                            <img alt='' src='/images/main/forgot-1.jpg' />
                        </div>
                        <div className={ styles.right_2 }>
                            <div className={ styles.menu_3 }>
                                <Link href={ LOGIN } passHref>
                                    <div className={ `${ styles.text_4 } ${ styles.active }` }>
                                        Đăng nhập
                                    </div>
                                </Link>
                            </div>
                            <form className={ `${ styles.form_3 }` } onSubmit={ handleSubmitEmail }>
                                <div className={ `${ styles.description }` }>
                                    <div>Đặt lại mật khẩu.</div>
                                    <div> Vui lòng nhập địa chỉ email của bạn tại ô bên dưới, AIM Academy sẽ gửi cho bạn hướng dẫn đặt lại mật khẩu qua email.</div>
                                </div>
                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>Email<span>*</span></div>
                                    <input
                                        onChange={ e => setEmail( prev => e.target.value ) }
                                        required
                                        type="email"
                                    />
                                </div>

                                <div className={ `${ styles.button }` }>
                                    <button
                                        type="submit"
                                        className={ `${ styles.forgot }` }
                                        disabled={ loading }
                                    >
                                        {
                                            loading ? <><Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                disabled={ !loading }
                                            /> <span>&nbsp;&nbsp;&nbsp;</span></> : ''
                                        }
                                        Gửi
                                    </button>
                                </div>
                                <div className={ `${ styles.policy }` }>
                                    Mọi thắc mắc vui lòng liên hệ <a href='#'>contact@aimacademy.vn</a> để được hỗ trợ.
                                </div>
                            </form>
                        </div>
                    </div>
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