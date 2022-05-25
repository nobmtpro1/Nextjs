import styles from '../styles/main/register.module.scss'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from '../sevices/axios'
import { ACCOUNT_MY_PORTFOLIO, FORGOT_PASSWORD, HOME, LOGIN, REGISTER } from "../constants/route";
import { loginSuccess } from "../redux/accountSlice";
import Spinner from "react-bootstrap/Spinner";
import Head from 'next/head'

const Index = ( props ) =>
{

    const dispatch = useDispatch()
    const router = useRouter()
    const [ loading, setLoading ] = useState( false )
    const [ email, setEmail ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ loginGoogleUrl, setlLoginGoogleUrl ] = useState( null )
    const [ loginFacebookUrl, setlLoginFacebookUrl ] = useState( null )
    const [ loginLinkedinUrl, setlLoginLinkedinUrl ] = useState( null )

    const { data, success, error } = useSelector( state => state.account.login )


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

    }, [] )

    useEffect( () =>
    {
        if ( data || success )
        {
            router.push( ( router.query.url ? router.query.url : HOME ) )
        }
    }, [ router, data, success ] )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        setLoading( true )
        axios.post( 'login', { username: email, password } ).then( response =>
        {
            setLoading( false )
            dispatch( loginSuccess( response.data ) )

            if ( router.query.url )
            {
                window.location.href = router.query.url
            } else
            {
                window.location.href = ACCOUNT_MY_PORTFOLIO
            }

        } ).catch( error =>
        {
            setLoading( false )
            alert( 'Tài khoản hoặc mật khẩu không chính xác.' )
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

    if ( data || success )
    {
        return ( <></> )
    }
    return (
        <div className={ styles.container }>
            <Head>
                <title>AIM E-learning | Đăng nhập</title>
            </Head>


            <div className={ styles.register_page }>
                <div className={ styles.breadcrumb_1 }>
                    <Link href={ HOME } passHref>
                        <a href='#' className={ styles.link_2 }>
                            Trang chủ
                        </a>
                    </Link>
                    <Link href={ LOGIN } passHref>
                        <a href='#' className={ styles.link_2 }>
                            Đăng nhập
                        </a>
                    </Link>
                </div>
                <div className={ styles.box_container }>
                    <div className={ styles.box_1 }>
                        <div className={ styles.left_2 }>
                            <img src='/images/main/login-2.jpg' alt='' />
                        </div>
                        <div className={ styles.right_2 }>
                            <div className={ styles.menu_3 }>
                                <Link href={ REGISTER } passHref>
                                    <a className={ `${ styles.text_4 }` }>
                                        Đăng ký
                                    </a>
                                </Link>
                                <Link href={ LOGIN } passHref>
                                    <a className={ `${ styles.text_4 } ${ styles.active }` }>
                                        Đăng nhập
                                    </a>
                                </Link>
                            </div>
                            <form className={ `${ styles.form_3 }` } onSubmit={ handleSubmit }>
                                <div style={ { opacity: '0', height: 0 } }>
                                    <input name='email' />
                                    <input type="password" name='password' />
                                </div>
                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>Email<span>*</span></div>
                                    <input value={ email } onChange={ e => setEmail( prev => e.target.value ) } />
                                </div>
                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>Mật khẩu<span>*</span></div>
                                    <input value={ password } type="password" onChange={ e => setPassword( prev => e.target.value ) } />
                                </div>

                                <div className={ `${ styles.button }` }>
                                    <button disabled={ loading }>
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
                                        Đăng nhập
                                    </button>
                                    <Link href={ FORGOT_PASSWORD } passHref><a href='#'>Quên mật khẩu</a></Link>
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
