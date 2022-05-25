import styles from "../../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/layouts/LayoutBusiness";
import axios from "../../../sevices/axios";
import { BUSINESS_ADMIN, BUSINESS_HISTORY_TRANSACTION, BUSINESS_PROFILE } from "../../../constants/route";
import Link from 'next/link'
import moment from "moment";
import RowAdmin from "../../../components/pages/business/adminManagement/RowAdmin";
import PopupAddAdmin from "../../../components/pages/business/adminManagement/PopupAddAdmin";
import Head from 'next/head'

const Index = () =>
{
	const [ data, setData ] = useState( null )
	const [ active, setActive ] = useState( false )

	useEffect( () =>
	{
		axios.get( 'page/business/profile/admin' ).then( response =>
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
			<PopupAddAdmin active={ active } setActive={ setActive } setData={ setData } />
			<div
				className={ `${ styles.notify_page } ${ styles.account_page } ${ styles.profile_page }` }
			>

				<div className={ `${ styles.title_page }` }>
					<ul className={ styles.ul1_concern }>
						<li className={ `${ styles.dropdown_concern }` }>
							<div className={ styles.li_content_down }>
								<div className={ styles.text }>Quản lý Admin</div>
								<div className={ styles.imgTitle }>
									<img src="/images/drop.svg" alt="down" />
								</div>
							</div>
							<ul className={ styles.ul2_concern }>
								<Link href={ BUSINESS_HISTORY_TRANSACTION } passHref>
									<li className={ styles.li2_concern }>
										<div className={ styles.text }>Lịch sử giao dịch</div>
									</li>
								</Link>
								<Link href={ BUSINESS_PROFILE } passHref>
									<li className={ styles.li2_concern }>
										<div className={ styles.text }>Thông tin công ty</div>
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
							<li className={ `${ styles.tabs_link_item }` }>
								<button>Lịch sử giao dịch</button>
							</li>
						</Link>
						<Link href={ BUSINESS_ADMIN } passHref>
							<li className={ `${ styles.tabs_link_item } ${ styles.active }` }>
								<button>Quản lý Admin</button>
							</li>
						</Link>
					</ul>
				</div>

				<div style={ { cursor: 'pointer' } } className={ styles.add_admin } onClick={ () => setActive( true ) }>
					<div className={ styles.img_add }>
						<img src="/images/add.svg" alt='' />
					</div>
					<button>Thêm admin</button>
				</div>

				{/* ==================== */ }
				<div className={ styles.wrapper_list_admin }>
					<div className={ styles.head }>
						<div className={ styles.text }>
							<span>Email</span>
						</div>
						{/* <div className={ styles.text }>
							<span>Thời gian</span>
						</div> */}
						<div className={ styles.text }>
							<span>Hành động</span>
						</div>
					</div>

					<div className={ styles.wrapper_content_admin }>
						{
							data?.admin?.map( ( e, i ) => (
								<RowAdmin styles={ styles } key={ i } data={ e } setData={ setData } />
							) )
						}
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

