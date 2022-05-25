import styles from "../../../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../../components/layouts/LayoutBusiness";
import axios from "../../../../sevices/axios";
import { useRouter } from "next/router";
import RowMember from "../../../../components/pages/business/studyPlan/AddMember/RowMember";
import { CSVLink, CSVDownload } from "react-csv";
import papa from 'papaparse';
import Head from 'next/head'

var csvExample = [
	[ 'nguyenvana@gmail.com' ],
	[ 'nguyenvanb@gmail.com' ],
	[ 'nguyenvanc@gmail.com' ],
]

const Index = () =>
{

	const router = useRouter()
	const [ data, setData ] = useState( null )
	const [ pageTableMember, setPageTableMember ] = useState( 1 )
	const [ input, setInput ] = useState( "" )
	const [ file, setFile ] = useState( null )
	const [ csvResult, setCsvResult ] = useState( null )

	const inputFile = useRef( null )

	useEffect( () =>
	{
		axios.get( 'page/business/study-plan/detail/' + router.query.id ).then( response =>
		{
			setData( response.data )
		} ).catch( error => { } )
	}, [ router ] )

	useEffect( () =>
	{
		if ( file )
		{
			papa.parse( file, {
				complete: function ( result )
				{
					var arr = []
					result.data?.forEach( e =>
					{
						if ( e?.length > 0 )
						{
							arr.push( e[ 0 ] )
						}
					} );
					setCsvResult( arr )
				}
			} )
		}
	}, [ file ] )

	useEffect( () =>
	{
		if ( csvResult?.length > 0 )
		{
			axios.post( 'page/business/study-plan/add-member/' + router.query.id, { data: csvResult } ).then( response =>
			{
				setData( response.data?.plan )
				if ( response.data?.notFound.length > 0 )
				{
					var string = ''
					response.data?.notFound.forEach( e =>
					{
						string += e + ', '
					} );
					alert( 'Không tìm thấy email: ' + string )
				} else
				{
					alert( 'Thêm thành công' )
				}
			} ).catch( error =>
			{
				if ( error.response?.data?.message )
				{
					alert( error.response?.data?.message )
				}
			} )
		}
	}, [ csvResult ] )

	const handleSubmit = ( e ) =>
	{
		e.preventDefault()
		var arr = input.split( "," ).map( e =>
		{
			return e.replaceAll( ' ', '' )
		} )

		axios.post( 'page/business/study-plan/add-member/' + router.query.id, { data: arr } ).then( response =>
		{
			setData( response.data?.plan )
			if ( response.data?.overSlot )
			{
				alert( 'Số lượng tài khoản còn lại không đủ. Xin vui lòng mua thêm tài khoản' )
			} else if ( response.data?.notFound.length > 0 )
			{
				var string = ''
				response.data?.notFound.forEach( e =>
				{
					string += e + ', '
				} );
				alert( 'Không tìm thấy email: ' + string )
			} else
			{
				alert( 'Thêm thành công' )
			}
		} ).catch( error =>
		{
			if ( error.response?.data?.message )
			{
				alert( error.response?.data?.message )
			}
		} )
	}


	return (
		<>
			<Head>
				<title>AIM E-learning | Kế hoạch học tập</title>
			</Head>
			<div className={ `${ styles.notify_page } ${ styles.overview_plan }` }>
				<div className={ styles.title_page }>
					<h1>Thêm thành viên</h1>
				</div>

				<div className={ styles.wrapper_add_member }>
					<form className={ styles.box_left_member } onSubmit={ handleSubmit }>
						<h3>Thêm thành viên thủ công</h3>
						<input required type="text" className={ styles.name } value={ input } onChange={ e => setInput( e.target.value ) } />
						<p>
							Nhập email thành viên, mỗi email cách nhau bởi dấu phẩy (,).
						</p>
						<button type="submit" className={ styles.btn_add_id }>
							Thêm
						</button>
					</form>
					<div className={ styles.box_right_member }>
						<h3>
							Bạn có thể tải lên danh sách thành viên theo mẫu file có sẵn
						</h3>

						<div className={ styles.wrapper_btn }>
							<CSVLink filename='example' data={ csvExample }>
								<div className={ styles.download_file }>
									<div className={ styles.img_box }>
										<img src="/images/download.svg" alt="download" />
									</div>
									<button type="submit" className={ styles.btn_add_id }>
										Tải mẫu file
									</button>
								</div>
							</CSVLink>
							<div className={ styles.upload_file } onClick={ () => inputFile.current.click() }>
								<div className={ styles.img_box }>
									<img src="/images/upload.svg" alt="upload" />
								</div>
								<input ref={ inputFile } type="file" hidden onChange={ e => setFile( e.target.files[ 0 ] ) } />
								<button type="submit" className={ styles.btn_add_id }>
									Tải lên danh sách
								</button>
							</div>
						</div>
					</div>
				</div>

				<div
					className={ `${ styles.wrapper_add_lesson } ${ styles.wrapper_add_mem }` }
				>
					<div className={ styles.head }>
						<div className={ styles.text }>
							<span>Họ tên</span>
						</div>
						<div className={ styles.text }>
							<span>Email</span>
						</div>
						<div className={ styles.text }>
							<span>Thao tác</span>
						</div>
					</div>

					<div
						className={ `${ styles.wrapper_content_lesson } ${ styles.wrapper_content_mem }` }
					>
						{
							data?.member?.slice( ( pageTableMember - 1 ) * 10, pageTableMember * 10 )?.map( ( e, i ) => (
								<RowMember styles={ styles } key={ i } data={ e } setData={ setData } id={ router.query.id } />
							) )
						}
					</div>
				</div>

				<div className={ styles.pagination }>
					<div className={ styles.text_pagi }>
						<span>{ ( pageTableMember - 1 ) * 10 + 1 }-{ pageTableMember * 10 } trên tổng số { data?.member?.length }</span>
					</div>
					<div className={ styles.pagi_number }>
						<span>Bạn đang ở trang</span>
						<select value={ pageTableMember } onChange={ e => setPageTableMember( parseInt( e.target.value ) ) }>
							{
								[ ...Array( Math.ceil( data?.member?.length / 10 ) || 0 ).keys() ].map( e => (
									<option key={ e } value={ e + 1 }>{ e + 1 }</option>
								) )
							}
						</select>
						<button className={ styles.btn_prev } onClick={ () => setPageTableMember( prev =>
						{
							if ( prev > 1 )
							{
								return prev - 1
							}
							return prev
						} ) }>
							<div className={ styles.img }>
								<img alt='' src="/images/left.svg" />
							</div>
						</button>
						<button className={ styles.btn_prev } onClick={ () => setPageTableMember( prev =>
						{
							if ( prev < Math.ceil( data?.member?.length / 10 ) )
							{
								return prev + 1
							}
							return prev
						} ) }>
							<div className={ styles.img }>
								<img alt='' src="/images/right.svg" />
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

