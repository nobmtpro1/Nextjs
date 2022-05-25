import styles from "../../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/layouts/LayoutBusiness";
import axios from "../../../sevices/axios";
import Notification from "../../../components/pages/business/notification/Notification";
import Head from 'next/head'
import moment from "moment";

const Index = () =>
{
	const [ resData, setResData ] = useState( null )
	const [ notification, setNotification ] = useState( null )
	const [ page, setPage ] = useState( 1 )
	const [ tab, setTab ] = useState( 1 )

	var totalPage = Math.ceil( notification?.length / 5 )

	useEffect( () =>
	{
		axios.get( 'page/account/notification' ).then( response =>
		{
			setResData( response.data )
		} ).catch( error => { } )
	}, [] )

	useEffect( () =>
	{

		var allNotification = []
		resData?.notification?.forEach( e =>
		{
			allNotification.push( e )
		} )
		resData?.notificationPersonal?.forEach( e =>
		{
			allNotification.push( e )
		} )

		function compare ( a, b )
		{
			var numberA = moment( a.created_at ).unix()
			var numberB = moment( b.created_at ).unix()
			if ( numberA < numberB )
			{
				return 1;
			}
			if ( numberA > numberB )
			{
				return -1;
			}
			return 0;
		}

		allNotification.sort( compare );

		if ( tab == 1 )
		{
			setNotification( allNotification )
		}
		if ( tab == 2 )
		{
			setNotification( allNotification?.filter( x =>
			{
				if ( x?.is_personal > 0 )
				{
					return resData?.readNotificationPersonal?.includes( x?.id )
				} else
				{
					return resData?.readNotification?.includes( x?.id )
				}
			} ) )
		}
		if ( tab == 3 )
		{
			setNotification( allNotification?.filter( x =>
			{
				if ( x?.is_personal > 0 )
				{
					return !resData?.readNotificationPersonal?.includes( x?.id )
				} else
				{
					return !resData?.readNotification?.includes( x?.id )
				}
			} ) )
		}
		setPage( 1 )
	}, [ tab, resData ] )

	useEffect( () =>
	{
		var readNotification = []
		var readNotificationPersonal = []
		notification?.slice( ( page - 1 ) * 5, page * 5 )?.forEach( e =>
		{
			if ( e?.is_personal > 0 )
			{
				readNotificationPersonal.push( e?.id )
			} else
			{
				readNotification.push( e?.id )
			}
		} );

		axios.post( 'page/account/notification/read', { readNotification, readNotificationPersonal } ).then( response =>
		{

		} ).catch( error => { } )
	}, [ page, notification ] )

	const handleNextPage = () =>
	{
		if ( page >= totalPage )
		{
			return false
		}
		setPage( prev => parseInt( prev ) + 1 )
	}

	const handlePrevPage = () =>
	{
		if ( page <= 1 )
		{
			return false
		}
		setPage( prev => parseInt( prev ) - 1 )
	}



	return (
		<>
			<Head>
				<title>AIM E-learning | Thông báo</title>
			</Head>
			<div className={ `${ styles.notify_page } ${ styles.title_notify_page }` }>
				<div className={ styles.title_page }>
					<h1>Thông báo</h1>
					{/* <div className={ styles.select_type }>
						<select>
							<option>Phân loại</option>
							<option>Đã đọc</option>
							<option>Chưa đọc</option>
						</select>
					</div> */}
				</div>
				<div className={ styles.tabs_link }>
					<ul className={ styles.tabs_link_content }>
						<li className={ `${ styles.tabs_link_item } ${ tab == 1 && styles.active }` } onClick={ () => setTab( 1 ) }>
							<button>Tất cả</button>
						</li>
						<li className={ `${ styles.tabs_link_item } ${ tab == 2 && styles.active }` } onClick={ () => setTab( 2 ) }>
							<button>Đã đọc</button>
						</li>
						<li className={ `${ styles.tabs_link_item } ${ tab == 3 && styles.active }` } onClick={ () => setTab( 3 ) }>
							<button>Chưa đọc</button>
						</li>
					</ul>
				</div>
				{
					notification?.slice( ( page - 1 ) * 5, page * 5 )?.map( ( e, i ) => (
						<Notification styles={ styles } key={ i } data={ e } fetchData={ resData } />
					) )
				}


				<div className={ `${ styles.pagination }` }>
					<div className={ styles.text_pagi }>
						<span> { ( page - 1 ) * 5 + 1 }-{ page * 5 } trên tổng số { notification?.length }</span>
					</div>
					<div className={ styles.pagi_number }>
						<span>Bạn đang ở trang</span>
						<select value={ page } onChange={ e => setPage( parseInt( e.target.value ) ) }>
							{
								[ ...Array( totalPage || 0 )?.keys() ].map( ( e, i ) => (
									<option key={ i } value={ i + 1 }>{ i + 1 }</option>
								) )
							}
						</select>
						<button className={ styles.btn_prev } onClick={ handlePrevPage }>
							<div className={ styles.img }>
								<img src="/images/left.svg" alt="left" />
							</div>
						</button>
						<button className={ styles.btn_prev } onClick={ handleNextPage }>
							<div className={ styles.img }>
								<img src="/images/right.svg" alt="left" />
							</div>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;

Index.getLayout = function getLayout ( page )
{
	return (
		<Layout styles={ styles }>
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

