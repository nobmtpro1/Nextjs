import styles from '../styles/main/register.module.scss'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import Link from "next/link";
import axios from '../sevices/axios'
import { FORGOT_PASSWORD, HOME, LOGIN } from '../constants/route'
import {  useRouter } from 'next/router'
import Spinner from "react-bootstrap/Spinner";
import Head from 'next/head'

const Index = ( props ) =>
{
    const [ loading, setLoading ] = useState( false )
    const router = useRouter()
    const [ formData, setFormData ] = useState( {
        password: '',
        confirm_password: ''
    } )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        if ( formData.password.length < 10 || formData.password.length > 30 )
        {
            alert( 'Mật khẩu phải chứa từ 10 đến 30 ký tự' )
            return false
        }
        if ( formData.password != formData.confirm_password )
        {
            alert( 'Mật khẩu nhập lại không đúng' )
            return false
        }
        setLoading( true )
        axios.post( 'forgot-password/verify', { password: formData.password, confirm_forgot_password_code: router.query.code } ).then( response =>
        {
            setLoading( false )
            router.push( LOGIN )
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
                <title>AIM E-learning | Đặt lại mật khẩu</title>
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
                            <img src='/images/main/forgot-1.jpg' alt='' />
                        </div>
                        <div className={ styles.right_2 }>
                            <div className={ styles.menu_3 }>
                                <Link href={ LOGIN } passHref>
                                    <div className={ `${ styles.text_4 } ${ styles.active }` }>
                                        Đăng nhập
                                    </div>
                                </Link>
                            </div>
                            <form className={ `${ styles.form_3 }` } onSubmit={ handleSubmit }>
                                <div style={ { opacity: '0', height: 0 } }>
                                    <input name='email' />
                                    <input type="password" name='password' />
                                </div>
                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>Nhập mật khẩu mới<span>*</span></div>
                                    <input
                                        type="password"
                                        onChange={ e => setFormData( prev => ( { ...prev, password: e.target.value } ) ) }
                                        required
                                    />
                                </div>
                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>Nhập lại mật khẩu<span>*</span></div>
                                    <input
                                        type="password"
                                        onChange={ e => setFormData( prev => ( { ...prev, confirm_password: e.target.value } ) ) }
                                        required
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
                                            /> <span>&nbsp;&nbsp;&nbsp;</span></> : ''
                                        }
                                        Xác nhận
                                    </button>
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