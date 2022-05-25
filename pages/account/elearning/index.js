import styles from '../../../styles/account/elearning.module.scss'
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layouts/LayoutAccount'
import axios from '../../../sevices/axios'
import Head from 'next/head'
import CourseElearning from '../../../components/pages/account/CourseElearning'

const Index = () =>
{
	const [ data, setData ] = useState( null )
	const [ tab, setTab ] = useState( 0 )
	const [ status, setStatus ] = useState( 0 )
	const [ fetchData, setFetchData ] = useState( null )

	useEffect( () =>
	{
		axios.get( 'page/account/elearning' ).then( response =>
		{
			setFetchData( response.data )
		} ).catch( error =>
		{
		} )
	}, [] )

	useEffect( () =>
	{
		setData( fetchData )
	}, [ fetchData ] )

	useEffect( () =>
	{
		function clone ( src )
		{
			return JSON.parse( JSON.stringify( src ) );
		}

		var dt = clone( fetchData )

		if ( status == 0 )
		{
			setData( fetchData )
		} else if ( status == 1 )
		{

			dt?.courseCategory?.forEach( e =>
			{
				e?.course?.forEach( x =>
				{
					x?.session?.forEach( ( y, i ) =>
					{
						if ( fetchData?.learningProgress?.find( p => p.session_id == y?.id ) )
						{
							delete x?.session[ i ]
						}
					} );
				} );
			} );

		} else if ( status == 2 )
		{
			dt?.courseCategory?.forEach( e =>
			{
				e?.course?.forEach( x =>
				{
					x?.session?.forEach( ( y, i ) =>
					{
						var progress = fetchData?.learningProgress?.find( p => p.session_id == y?.id )
						if ( !progress || progress?.progress_percent == 100 )
						{
							delete x?.session[ i ]
						}
					} );
				} );
			} );
		} else if ( status == 3 )
		{
			dt?.courseCategory?.forEach( e =>
			{
				e?.course?.forEach( x =>
				{
					x?.session?.forEach( ( y, i ) =>
					{
						var progress = fetchData?.learningProgress?.find( p => p.session_id == y?.id )
						if ( !progress || progress?.progress_percent < 100 )
						{
							delete x?.session[ i ]
						}
					} );
				} );
			} );
		}

		setData( dt )
	}, [ status, fetchData ] )



	return (
		<>
			<Head>
				<title>AIM E-learning | Elearning</title>
			</Head>
			<div className={ styles.elearning_page }>

				<div className={ styles.popup } >
					<div className={ styles.title } >
						Bạn chưa mở khóa bài học này
					</div>
					<div className={ styles.button } >
						<div className={ styles.left } >
							<a href='#'>Xem thêm</a>
						</div>
						<div className={ styles.right } >
							<a href='#'> <span> Trở lại</span></a>
						</div>
					</div>
				</div>


				<div className={ styles.head }>
					<div className={ styles.title }>
						Elearning
					</div>
					<div className={ styles.status }>
						<select value={ status } onChange={ e => setStatus( e.target.value ) }>
							<option value={ 0 }>Tình trạng</option>
							<option value={ 1 }>Chưa học</option>
							<option value={ 2 }>Đang học</option>
							<option value={ 3 }>Hoàn thành</option>
						</select>
					</div>
				</div>
				<div className={ styles.menu }>
					{
						data?.courseCategory?.map( ( e, i ) => (
							<div className={ `${ styles.text } ${ tab == i && styles.active }` } key={ i } onClick={ () => setTab( i ) }>
								{ e?.name }
							</div>
						) )
					}
				</div>

				<div className={ styles.category_mb }>
					<select value={ tab } onChange={ e => setTab( parseInt( e.target.value ) ) }>
						{
							data?.courseCategory?.map( ( e, i ) => (
								<option value={ i } key={ i }> { e?.name }</option>
							) )
						}
					</select>
				</div>

				{
					data?.courseCategory?.map( ( e, i ) => (
						<div className={ styles.body } key={ i } hidden={ tab !== i }>
							{
								e?.course?.map( ( x, k ) =>
								{
									return (
										<CourseElearning
											styles={ styles }
											data={ x }
											key={ k }
											k={ k }
											category={ e }
											user={ data?.user }
											courseCanLearn={ data?.courseCanLearn }
											sessionCanLearn={ data?.sessionCanLearn }
											otherUserCourse={ data?.otherUserCourse }
											otherUserSession={ data?.otherUserSession }
											isHasMembership={ data?.isHasMembership }
										/>
									)
								} )
							}


							<div className={ `${ styles.certificate }` }>
								<div className={ styles.number }>
									<span><img alt='' src="/images/account-elearning-3.svg" /></span>
								</div>
								<div className={ `${ styles.title }` }>
									<span>Chinh phục</span> <span>chứng chỉ premium </span>
								</div>
								<div className={ `${ styles.description }` }>
									sit amet, consectetur adipiscing elit. Rhoncus praesent quam nunc, sed quis dui nisl tortor tortornc. Rhoncus praesent quam nunc, sed quis dui nisl tortor tortornc.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								</div>
								<div className={ `${ styles.button }` }>
									<a href='#'> <span> Nhận chứng chỉ</span></a>
								</div>
							</div>
						</div>
					) )
				}

			</div >
		</ >
	)
}

export default Index

Index.getLayout = function getLayout ( page )
{
	return (
		<Layout header={ page.props.header } styles={ styles }>
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