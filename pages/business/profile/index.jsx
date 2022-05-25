import styles from "../../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/layouts/LayoutBusiness";
import axios from "../../../sevices/axios";
import { BUSINESS_ADMIN, BUSINESS_HISTORY_TRANSACTION, BUSINESS_PROFILE, LINK_PRIVACY_POLICY } from "../../../constants/route";
import Link from 'next/link'
import Head from 'next/head'

const Index = () =>
{
	const [ data, setData ] = useState( {
		tradingAddress: '',
		emailDomain: '',
		company: '',
		taxNumber: '',
		address: '',
		name: '',
		email: '',
		phone: '',
	} )

	useEffect( () =>
	{
		axios.get( 'page/business/profile' ).then( response =>
		{
			setData( {
				tradingAddress: response.data?.profile?.trading_address,
				emailDomain: response.data?.profile?.email_domain,
				company: response.data?.profile?.company,
				taxNumber: response.data?.profile?.tax_number,
				address: response.data?.profile?.address,
				name: response.data?.profile?.name,
				email: response.data?.profile?.email,
				phone: response.data?.profile?.phone,
			} )
		} ).catch( error => { } )
	}, [] )

	const handleSubmit1 = ( e ) =>
	{
		e.preventDefault()
		axios.post( 'page/business/profile/submit1', data ).then( response =>
		{
			alert( 'Sửa thành công' )
		} ).catch( error =>
		{
			if ( error.response?.data?.message )
			{
				alert( error.response?.data?.message )
			}
		} )
	}

	const handleSubmit2 = ( e ) =>
	{
		e.preventDefault()
		axios.post( 'page/business/profile/submit2', data ).then( response =>
		{
			alert( 'Sửa thành công' )
		} ).catch( error =>
		{
			if ( error.response?.data?.message )
			{
				alert( error.response?.data?.message )
			}
		} )
	}

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
								<div className={ styles.text }>Thông tin công ty</div>
								<div className={ styles.imgTitle }>
									<img alt='' src="/images/drop.svg" />
								</div>
							</div>
							<ul className={ styles.ul2_concern }>
								<Link href={ BUSINESS_HISTORY_TRANSACTION } passHref>
									<li className={ styles.li2_concern }>
										<div className={ styles.text }>Lịch sử giao dịch</div>
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
							<li className={ `${ styles.tabs_link_item } ${ styles.active }` }>
								<button>Thông tin chi tiết</button>
							</li>
						</Link>
						<Link href={ BUSINESS_HISTORY_TRANSACTION } passHref>
							<li className={ styles.tabs_link_item }>
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
				<div className={ styles.update_infor }>
					<h3>Thông tin chi tiết giao dịch</h3>
					<form
						className={ styles.form_update_infor }
						onSubmit={ handleSubmit1 }
					>
						<div className={ styles.form_group }>
							<input
								type="text"
								placeholder="Địa chỉ giao dịch*"
								value={ data?.tradingAddress }
								onChange={ e => setData( prev => ( { ...prev, tradingAddress: e.target.value } ) ) }
							/>
						</div>
						<div className={ styles.form_group }>
							<input
								type="text"
								placeholder="Email domain*"
								className={ styles.input_part }
								value={ data?.emailDomain }
								onChange={ e => setData( prev => ( { ...prev, emailDomain: e.target.value } ) ) }
							/>
						</div>
						<h3>Thông tin xuất hóa đơn đỏ</h3>
						<div className={ styles.form_group }>
							<input
								type="text"
								placeholder="Tên công ty*"
								value={ data?.company }
								onChange={ e => setData( prev => ( { ...prev, company: e.target.value } ) ) }
							/>
						</div>
						<div className={ styles.form_group }>
							<input
								type="text"
								placeholder="Mã số thuế*"
								value={ data?.taxNumber }
								onChange={ e => setData( prev => ( { ...prev, taxNumber: e.target.value } ) ) }
							/>
						</div>
						<div className={ styles.form_group }>
							<input
								type="text"
								placeholder="Địa chỉ công ty*"
								className={ styles.input_part }
								value={ data?.address }
								onChange={ e => setData( prev => ( { ...prev, address: e.target.value } ) ) }
							/>
						</div>
						<p className={ styles.pivancy_p }>
							Khi điền và lưu thông tin, bạn đã đọc và chấp thuận{ " " }
							<a rel="noreferrer" target="_blank" href={ LINK_PRIVACY_POLICY }>Chính sách bảo mật.</a>
						</p>
						<button type="submit" className={ styles.btn_save }>
							Lưu
						</button>
					</form>
				</div>

				<div className={ styles.update_infor }>
					<h3>Thông tin người đại diện</h3>
					<form
						className={ styles.form_update_infor }
						onSubmit={ handleSubmit2 }
					>
						<div className={ styles.form_group }>
							<input
								type="text"
								placeholder="Họ tên*"
								value={ data?.name }
								onChange={ e => setData( prev => ( { ...prev, name: e.target.value } ) ) }
							/>
						</div>
						<div className={ styles.form_group }>
							<input
								type="text"
								placeholder="Email*"
								value={ data?.email }
								onChange={ e => setData( prev => ( { ...prev, email: e.target.value } ) ) }
							/>
						</div>
						<div className={ styles.form_group }>
							<input
								type="text"
								placeholder="Số điện thoại*"
								className={ styles.input_part }
								value={ data?.phone }
								onChange={ e => setData( prev => ( { ...prev, phone: e.target.value } ) ) }
							/>
						</div>

						<p className={ styles.pivancy_p }>
							Khi điền và lưu thông tin, bạn đã đọc và chấp thuận{ " " }
							<a rel="noreferrer" target="_blank" href={ LINK_PRIVACY_POLICY }>Chính sách bảo mật.</a>
						</p>
						<button type="submit" className={ styles.btn_save }>
							Lưu
						</button>
					</form>
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

