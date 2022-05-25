import styles from "../../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/layouts/LayoutBusiness";
import axios from "../../../sevices/axios";
import Question from "../../../components/pages/business/faqs/Question";
import Head from 'next/head'
import { useSelector } from "react-redux";

const Index = ( props ) =>
{

	const [ data, setData ] = useState( null )
	const footer = useSelector( state => state.footer )
	var email = footer?.data?.find( x => x.key == 'email' )?.value
	
	useEffect( () =>
	{
		axios.get( 'page/business/faqs' ).then( response =>
		{
			setData( response.data )
		} ).catch( error => { } )
	}, [] )

	return (
		<>
			<Head>
				<title>AIM E-learning | Hỗ trợ</title>
			</Head>
			<div className={ styles.support_page }>
				<h1>Những câu hỏi thường gặp</h1>
				{
					data?.map( ( e, i ) => (
						<Question styles={ styles } data={ e } key={ i } />
					) )
				}
				<p className={ styles.note_p }>
					Mọi thắc mắc vui lòng liên hệ{ " " }
					<a href={ `mailto:${ email }` }>{ email }</a>{ " " }
					để được hỗ trợ.
				</p>
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

