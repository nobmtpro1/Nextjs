import '../styles/addition.css'
import '../styles/globals.css'
import '../styles/document/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/account/style.css'
import '../styles/main/style.css'
import "react-datepicker/dist/react-datepicker.css";
import SSRProvider from 'react-bootstrap/SSRProvider';
import { Provider } from 'react-redux'
import store from '../redux/store'
import 'nprogress/nprogress.css'
import Router, { useRouter } from 'next/router'
import { getUserInfoApi } from '../sevices/accountApi'
import { useEffect } from 'react'
import Head from 'next/head';
import axios from '../sevices/axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCart } from '../sevices/cartApi'
import PopupUpdateAccount from '../components/global/PopupUpdateAccount'
import nProgress from 'nprogress'

function MyApp ( { Component, pageProps } )
{
	const router = useRouter()
	const getLayout = Component.getLayout || ( ( page ) => page )

	useEffect( () =>
	{
		// nProgress.configure( { showSpinner: false } );
		// Router.events.on( 'routeChangeStart', () => nProgress.set( 0.4 ) )
		// Router.events.on( 'routeChangeError', () => nProgress.done() )
		// Router.events.on( 'routeChangeComplete', () => nProgress.done() )
		// var loader = document.querySelector( '.loader-container' )
		// Router.events.on( 'routeChangeStart', () => loader.classList.remove( 'hide' ) )
		// Router.events.on( 'routeChangeComplete', () =>
		// {
		// 	setTimeout( () =>
		// 	{
		// 		loader.classList.add( 'hide' )
		// 	}, 1 );
		// } )
		// Router.events.on( 'routeChangeError', () =>
		// {
		// 	setTimeout( () =>
		// 	{
		// 		loader.classList.add( 'hide' )
		// 	}, 1 );
		// } )

		getCart()
		getUserInfoApi()

		axios.post( 'page/account/aim-coin/login-every-day' ).catch( error => { } )

		if ( process.env.ENV == 'production' && !window.location.protocol.includes( 'https' ) )
		{
			window.location.href = window.location.href.replace( 'http://', 'https://' )
		}

	}, [] )

	return <>
		<Head>
			<title>AIM E-learning</title>
			<meta property="og:url" content={ process.env.BASE_URL + router.pathname } />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		</Head>

		<SSRProvider>

			<Provider store={ store }>
				<PopupUpdateAccount />
				{ getLayout( <Component { ...pageProps } /> ) }
			</Provider>

		</SSRProvider>
	</>
}

export default MyApp

// MyApp.getInitialProps = async ( ctx ) =>
// {
// 	var data = null;

// 	await axios.get( process.env.API_URL + 'global' ).then( res =>
// 	{
// 		data = res.data
// 	} ).catch( err => { } )

// 	return {
// 		pageProps: {
// 			header: data?.header,
// 			footer: data?.footer,
// 			user: data?.user,
// 		}
// 	}
// }
