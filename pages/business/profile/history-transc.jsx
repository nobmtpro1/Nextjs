import styles from "../../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/layouts/LayoutBusiness";
import axios from "../../../sevices/axios";
import { BUSINESS_ADMIN, BUSINESS_HISTORY_TRANSACTION, BUSINESS_PROFILE } from "../../../constants/route";
import Link from 'next/link'
import moment from "moment";
import { formatPrice } from "../../../utils/helper";
import Head from 'next/head'

const Index = () =>
{
	formatPrice()
	const [ data, setData ] = useState( null )

	useEffect( () =>
	{
		axios.get( 'page/business/profile/history-transc' ).then( response =>
		{
			setData( response.data )
		} ).catch( error => { } )
	}, [] )

	useEffect( () =>
	{
		var down_concern = document.getElementsByClassName( styles.li_content_down );
		Array.from( down_concern ).forEach( function ( e )
		{
			e.addEventListener( "click", function ()
			{
				if ( e.parentElement.classList.contains( styles.active ) )
				{
					e.parentElement.classList.remove( styles.active );
				} else
				{
					e.parentElement.classList.add( styles.active );
				}
			} );
		} );
	}, [] );

	return (
		<>
			<Head>
				<title>AIM E-learning | Hồ sơ</title>
			</Head>
			<div
				className={ `${ styles.notify_page } ${ styles.account_page } ${ styles.profile_page }` }
			>
				<div className={ `${ styles.title_page }` }>
					<ul className={ styles.ul1_concern }>
						<li className={ `${ styles.dropdown_concern }` }>
							<div className={ styles.li_content_down }>
								<div className={ styles.text }>Lịch sử giao dịch</div>
								<div className={ styles.imgTitle }>
									<img alt='' src="/images/drop.svg" />
								</div>
							</div>
							<ul className={ styles.ul2_concern }>
								<Link href={ BUSINESS_PROFILE } passHref>
									<li className={ styles.li2_concern }>
										<div className={ styles.text }>Thông tin công ty</div>
									</li>
								</Link>
								<Link href={ BUSINESS_ADMIN } passHref>
									<li className={ styles.li2_concern }>
										<div className={ styles.text }>Quản lý Admin</div>
									</li>
								</Link>
							</ul>
						</li>
					</ul>
				</div>

				<div className={ styles.tabs_link }>
					<ul className={ styles.tabs_link_content }>
						<Link href={ BUSINESS_PROFILE } passHref>
							<li className={ `${ styles.tabs_link_item } ` }>
								<button>Thông tin chi tiết</button>
							</li>
						</Link>
						<Link href={ BUSINESS_HISTORY_TRANSACTION } passHref>
							<li className={ `${ styles.tabs_link_item } ${ styles.active }` }>
								<button>Lịch sử giao dịch</button>
							</li>
						</Link>
						<Link href={ BUSINESS_ADMIN } passHref>
							<li className={ styles.tabs_link_item }>
								<button>Quản lý Admin</button>
							</li>
						</Link>
					</ul>
				</div>
				<div className={ styles.wrapper_history_transc }>
					<div className={ styles.head }>
						<div className={ styles.text } style={ { flex: 1 } }>
							<span>Mã đơn hàng</span>
						</div>
						<div className={ styles.text } style={ { flex: 1 } }>
							<span>Thời gian kích hoạt</span>
						</div>
						<div className={ styles.text } style={ { flex: 1 } }>
							<span>Thời gian hết hạn</span>
						</div>
						<div className={ styles.text } style={ { flex: 1 } }>
							<span>Tình trạng</span>
						</div>
						<div className={ styles.text } style={ { flex: 1 } }>
							<span>Số tiền</span>
						</div>
						<div className={ styles.text } style={ { flex: 1 } }>
							<span>Người giao dịch</span>
						</div>
					</div>
					{
						data?.history?.map( ( e, i ) => (
							<div className={ styles.content_history } key={ i }>
								<div className={ styles.text_2 } style={ { flex: 1 } }>
									<span>{ e?.id }</span>
								</div>
								<div className={ styles.text_2 } style={ { flex: 1 } }>
									<span>{ moment( e?.from ).format( 'DD/MM/YYYY' ) }</span>
								</div>
								<div className={ styles.text_2 } style={ { flex: 1 } }>
									<span>{ moment( e?.to ).format( 'DD/MM/YYYY' ) }</span>
								</div>
								<div className={ styles.text_2 } style={ { flex: 1 } }>
									<span>Active</span>
								</div>
								<div className={ styles.text_2 } style={ { flex: 1 } }>
									<span>{ e?.total?.format( 0, 3, '.' ) } VNĐ</span>
								</div>
								<div className={ styles.text_2 } style={ { flex: 1 } }>
									<span>{ e?.name }</span>
								</div>
							</div>
						) )
					}
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
