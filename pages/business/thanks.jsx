import styles from "../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layouts/Layout'
import Head from 'next/head'
import Link from "next/link";
import { useRouter } from "next/router";
import { BUSINESS_HOME, HOME } from '../../constants/route'

const Index = () =>
{

	const router = useRouter()

	const [ data, setData ] = useState( {
		name: '',
		phone: '',
		email: ''
	} )

	useEffect( () =>
	{
		setData( { name: router.query.name, phone: router.query.phone, email: router.query.email } )
	}, [ router ] )

	return (
		<div className={ styles.container_homepage }>
			<Head>
				<title>AIM E-learning | Thank you</title>
			</Head>
			{/* <Header /> */ }
			<div className={ styles.thanks_page }>
				<div className={ styles.breadcrumb }>
					<Link href={ HOME } passHref>
						<a href="#" className={ styles.link }>
							Trang chủ
						</a>
					</Link>
					<Link href={ BUSINESS_HOME } passHref>
						<a href="#" className={ styles.link }>
							Doanh nghiệp
						</a>
					</Link>
				</div>
				<div className={ styles.box }>
					<div className={ styles.row1 }>Thank you</div>
					<div className={ styles.row2 }>Bạn đã gửi đăng ký thành công.</div>
					<div className={ `${ styles.row2 } ${ styles.row2_2 }` }>
						AIM Academy sẽ liên hệ với bạn qua thông tin dưới đây trong thời
						gian sớm nhất.
					</div>
					<form className={ `${ styles.form }` }>
						<div className={ `${ styles.input }` }>
							<div className={ `${ styles.placeholder }` }>{ data?.name }</div>
							<input disabled />
						</div>
						<div className={ `${ styles.input }` }>
							<div className={ `${ styles.placeholder }` }>{ data?.phone }</div>
							<input disabled />
						</div>
						<div className={ `${ styles.input }` }>
							<div className={ `${ styles.placeholder }` }>
								{ data?.email }
							</div>
							<input disabled />
						</div>
					</form>
				</div>
			</div>
			{/* <Footer /> */ }
		</div>
	);
};

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
