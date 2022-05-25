import styles from '../styles/main/register.module.scss'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import Link from "next/link";
import axios from '../sevices/axios'
import { HOME, LOGIN, REGISTER, REGISTER_STEP2 } from '../constants/route'
import router from 'next/router'
import Head from 'next/head'

const Index = ( props ) =>
{

    const [ formData, setFormData ] = useState( null )
    const [ loginGoogleUrl, setlLoginGoogleUrl ] = useState( null )
    const [ loginFacebookUrl, setlLoginFacebookUrl ] = useState( null )
    const [ loginLinkedinUrl, setlLoginLinkedinUrl ] = useState( null )

    useEffect( () =>
    {
        axios.get( 'auth/google/url' ).then( response =>
        {
            setlLoginGoogleUrl( response.data.url )
        } ).catch( error =>
        {
        } )
        axios.get( 'auth/facebook/url' ).then( response =>
        {
            setlLoginFacebookUrl( response.data.url )
        } ).catch( error =>
        {
        } )
        axios.get( 'auth/linkedin/url' ).then( response =>
        {
            setlLoginLinkedinUrl( response.data.url )
        } ).catch( error =>
        {
        } )

        const data = localStorage.getItem( 'register' ) ? JSON.parse( localStorage.getItem( 'register' ) ) : {
            fullname: '',
            phone: '',
            email: '',
            password: '',
        }
        setTimeout( () =>
        {
            setFormData( data )
        }, 1000 );

    }, [] )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        const { fullname, phone, email, password } = formData
        if ( password.length < 10 || password.length > 30 )
        {
            alert( 'Mật khẩu phải chứa từ 10 đến 30 ký tự' )
            return false
        }
        if ( fullname.length > 30 )
        {
            alert( 'Họ và tên chỉ chứa nhiều nhất 30 ký tự' )
            return false
        }
        if ( email.length > 100 )
        {
            alert( 'Email chỉ chứa nhiều nhất 100 ký tự' )
            return false
        }
        if ( phone.length < 10 || phone.length > 15 )
        {
            alert( 'Số điện thoại phải chứa từ 10 đến 15 ký tự' )
            return false
        }

        localStorage.setItem( 'register', JSON.stringify( formData ) )
        router.push( REGISTER_STEP2 )
    }

    // UI
    useEffect( () =>
    {
        const input = document.getElementsByClassName( styles.input )
        Array.from( input ).forEach( e =>
        {
            var ipt = e.querySelector( 'input' )
            var select = e.querySelector( 'select' )

            if ( ipt.value )
            {
                e.getElementsByClassName( styles.placeholder )[ 0 ].classList.add( styles.hide )
            }

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
                <title>AIM E-learning | Đăng ký</title>
            </Head>

            <div className={ styles.register_page }>
                <div className={ styles.breadcrumb_1 }>
                    <Link href={ HOME } passHref>
                        <a href='#' className={ styles.link_2 }>
                            Trang chủ
                        </a>
                    </Link>
                    <Link href={ REGISTER } passHref>
                        <a href='#' className={ styles.link_2 }>
                            Đăng ký
                        </a>
                    </Link>
                </div>
                <div className={ styles.box_container }>
                    <div className={ styles.box_1 }>
                        <div className={ styles.left_2 }>
                            <img src='/images/main/register-1.jpg' alt='' />
                        </div>
                        <div className={ styles.right_2 }>
                            <div className={ styles.menu_3 }>
                                <Link href={ REGISTER } passHref>
                                    <div className={ `${ styles.text_4 } ${ styles.active }` }>
                                        Đăng ký
                                    </div>
                                </Link>
                                <Link href={ LOGIN } passHref>
                                    <div className={ styles.text_4 }>
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
                                    <div className={ `${ styles.placeholder }` }>Họ tên<span>*</span></div>
                                    <input
                                        onChange={ e => setFormData( prev => ( { ...prev, fullname: e.target.value } ) ) }
                                        required
                                        value={ formData?.fullname }
                                    />
                                </div>
                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>Số điện thoại<span>*</span></div>
                                    <input
                                        type="tel"
                                        onChange={ e => setFormData( prev => ( { ...prev, phone: e.target.value } ) ) }
                                        required
                                        value={ formData?.phone }
                                    />
                                </div>
                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>Email<span>*</span></div>
                                    <input
                                        type="email"
                                        onChange={ e => setFormData( prev => ( { ...prev, email: e.target.value } ) ) }
                                        required
                                        value={ formData?.email }
                                    />
                                </div>
                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>Mật khẩu<span>*</span></div>
                                    <input
                                        type="password"
                                        onChange={ e => setFormData( prev => ( { ...prev, password: e.target.value } ) ) }
                                        required
                                        value={ formData?.password }
                                    />
                                </div>
                                <div className={ `${ styles.degree }` }>
                                    <span className={ `${ formData?.password?.length > 10 && styles.active }` }></span>
                                    <span className={ `${ formData?.password?.length > 15 && styles.active }` }></span>
                                    <span className={ `${ formData?.password?.length > 20 && styles.active }` }></span>
                                    <span className={ `${ formData?.password?.length > 25 && styles.active }` }></span>
                                </div>
                                <div className={ `${ styles.button }` }>
                                    <button>Tiếp theo</button>
                                </div>
                            </form>
                            <div className={ `${ styles.or_3 }` }>
                                <span></span>Hoặc<span></span>
                            </div>
                            <div className={ `${ styles.buttons_3 }` }>
                                {
                                    loginGoogleUrl &&
                                    <a href={ loginGoogleUrl } className={ `${ styles.button_4 }` }><span>Tiếp tục với Google</span><span className={ `${ styles.image_5 }` }><img src='/images/main/register-2.svg' alt='' /></span></a>
                                }

                                {
                                    loginFacebookUrl &&
                                    <a href={ loginFacebookUrl } className={ `${ styles.button_4 }` }><span>Tiếp tục với Facebook</span><span className={ `${ styles.image_5 }` }><img src='/images/main/register-3.svg' alt='' /></span></a>
                                }

                                {
                                    loginLinkedinUrl &&
                                    <a href={ loginLinkedinUrl } className={ `${ styles.button_4 }` }><span>Tiếp tục với Linkedln</span><span className={ `${ styles.image_5 }` }><img src='/images/main/register-5.svg' alt='' /></span></a>
                                }
                            </div>
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