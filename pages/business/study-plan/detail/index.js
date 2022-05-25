import styles from "../../../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../../components/layouts/LayoutBusiness";
import axios from "../../../../sevices/axios";
import { useRouter } from "next/router";
import moment from "moment";
import PopupEditPlan from "../../../../components/pages/business/studyPlan/detail/PopupEditPlan";
import RowSession from "../../../../components/pages/business/studyPlan/detail/RowSession";
import { CSVLink, CSVDownload } from "react-csv";
import Link from 'next/link'
import { BUSINESS_STUDY_PLAN_ADD_MEMBER, BUSINESS_STUDY_PLAN_ADD_SESSION } from "../../../../constants/route";
import RowMember from "../../../../components/pages/business/studyPlan/detail/RowMember";
import Head from 'next/head'

const Index = () =>
{
	const router = useRouter()
	const [ data, setData ] = useState( null )
	const [ csvData, setCsvData ] = useState( [] )
	const [ showPopupEditPlan, setShowPopupEditPlan ] = useState( false )
	const [ pageTableSession, setPageTableSession ] = useState( 1 )
	const [ pageTableMember, setPageTableMember ] = useState( 1 )
	const [ csvMember, setCsvMember ] = useState( [] )
	const [ filterMember, setFilterMember ] = useState( null )

	useEffect( () =>
	{
		axios.get( 'page/business/study-plan/detail/' + router.query.id ).then( response =>
		{
			setData( response.data )

			var arr = [
				[ "Bài học", "Thời lượng bài học", "Tình trạng", "Đánh giá" ],
			]

			response.data?.session?.forEach( e =>
			{
				const review = e?.avg_review_star[ 0 ]
				const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )
				arr.push( [
					e?.name,
					e?.intend_time + ' phút',
					e?.status,
					star + '/5'
				] )
			} );

			setCsvData( arr )

		} ).catch( error => { } )
	}, [ router ] )

	useEffect( () =>
	{
		var arr2 = [
			[ "Họ tên", "Email", "Bài học được phân công", "Tình trạng", "Tiến độ" ],
		]

		data?.member?.forEach( e =>
		{
			arr2.push( [
				e?.fullname,
				e?.email,
				data?.session?.length || 0,
				'active',
				e?.status
			] )
		} );

		setCsvMember( arr2 )
	}, [ data ] )

	useEffect( () =>
	{
		setFilterMember( data?.member )
	}, [ data ] )



	const handleFilterMember = ( value ) =>
	{
		if ( value == "" )
		{
			setFilterMember( data?.member )
		} else
		{
			setFilterMember( data?.member?.filter( x => x.status == value ) )
		}
	}

	return (
		<>
			<Head>
				<title>AIM E-learning | Kế hoạch học tập</title>
			</Head>
			<PopupEditPlan showPopupEditPlan={ showPopupEditPlan } setShowPopupEditPlan={ setShowPopupEditPlan } setData={ setData } data={ data } />
			<div className={ `${ styles.notify_page } ${ styles.overview_plan }` }>
				<div className={ styles.title_page }>
					<h1>Chi tiết kế hoạch</h1>
				</div>

				{/* =========================== */ }
				<div className={ styles.wrapper_detail_plan }>
					<div className={ styles.box_progress }>
						<div className={ styles.bar_chart_top }>
							<div className={ styles.title }>
								<h3>{ data?.name }</h3>
								<div className={ styles.edit } onClick={ () => setShowPopupEditPlan( true ) }>
									<button>
										<img alt='' src="/images/edit.svg" />
									</button>
								</div>
							</div>
							<h5>Thời gian hoàn thành</h5>
							<div className={ styles.box_number }>
								<div className={ styles.num }>
									<span>{ moment( data?.from ).format( 'DD/MM/YYYY' ) }</span>
								</div>
								<div className={ styles.num }>
									<span>{ moment( data?.to ).format( 'DD/MM/YYYY' ) }</span>
								</div>
							</div>
							<div className={ styles.progress }>
								<div className={ styles.bar } style={ { width: ( ( moment().unix() - moment( data?.from ).unix() ) / ( moment( data?.to ).unix() - moment( data?.from ).unix() ) * 100 ) + '%' } }></div>
							</div>
						</div>
						<div className={ styles.bar_chart_bottom }>
							<div className={ styles.title }>
								<h5>Số bài học phân công</h5>
								<p>
									Tổng số bài học không trùng lặp được phân công cho tất cả
									thành viên
								</p>
							</div>
							<div className={ styles.box_mb }>
								<div className={ styles.number }>
									<span>{ data?.session?.length }</span>
								</div>
								<div className={ `${ styles.learn } ${ data?.status == 'Chưa học'
									?
									styles.not_study
									:
									data?.status == 'Đang học'
										?
										styles.studying
										:
										data?.status == 'Hoàn thành'
											?
											styles.finish
											:
											data?.status == 'Chưa đạt'
											&&
											styles.not_reach
									}` }>
									<span>{ data?.status }</span>
								</div>
							</div>
						</div>
					</div>

					<div className={ styles.wrapper_quality_mem }>
						<div className={ styles.heading }>
							<h5>Số lượng học viên</h5>
							<p>
								Số học viên đã được phân công
								bài học / Tổng số học viên
							</p>
						</div>
						<div className={ styles.content }>
							<div className={ styles.progress_cricle }>
								{/* <div className={styles.cricle_bar}>
                      <img alt='' src="/images/cricle.svg" alt="cricle" />
                      <div className={styles.number}>
                        <span>150/200</span>
                      </div>
                    </div> */}
								<div className={ styles.percent }>
									<div className={ styles.ratio } style={ { '--ratio': ( 1 - ( data?.member?.length || 0 ) / ( data?.membership?.number_of_slots ) ) } }>
										{ " " }
										<span>{ data?.member?.length || 0 }/{ data?.membership?.number_of_slots }</span>
									</div>
								</div>
							</div>
							<div className={ styles.infor_cricle }>
								<div className={ styles.item }>
									<h6>{ data?.member?.length || 0 }</h6>
									<div className={ styles.sub }>
										<span>Học viên được phân công</span>
									</div>
								</div>
								<div className={ styles.item }>
									<h6>{ data?.membership?.number_of_slots }</h6>
									<div className={ `${ styles.sub } ${ styles.sub_1 }` }>
										<span>Tổng số học viên</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={ styles.wrapper_quality_mem }>
						<div className={ styles.heading }>
							<h5>Tiến độ học tập</h5>
							<p>
								Tổng số học viên đã hoàn thành bài học / số học viên đã được
								phân công bài học
							</p>
						</div>
						<div className={ styles.content }>
							<div className={ styles.progress_cricle }>
								{/* <div className={styles.cricle_bar}>
                      <img alt='' src="/images/cricle.svg" alt="cricle" />
                      <div className={styles.number}>
                        <span>100/200</span>
                      </div>
                    </div> */}
								<div className={ styles.percent }>
									<div className={ styles.ratio } style={ { '--ratio': ( 1 - ( data?.progress || 0 ) / ( data?.member?.length ) || 1 ) } }>
										{ " " }
										<span>{ data?.progress || 0 }/{ data?.member?.length || 0 }</span>
									</div>
								</div>
							</div>
							<div className={ styles.infor_cricle }>
								<div className={ styles.item }>
									<h6>{ data?.progress || 0 }</h6>
									<div className={ styles.sub }>
										<span>Học viên đã hoàn thành</span>
									</div>
								</div>
								<div className={ styles.item }>
									<h6>{ data?.member?.length || 0 }</h6>
									<div className={ `${ styles.sub } ${ styles.sub_1 }` }>
										<span>Học viên được phân công</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={ `${ styles.title_page } ${ styles.title_page_mb }` }>
					<h1>Quản lý bài học trong kế hoạch</h1>
				</div>

				<div className={ styles.wrapper_btn_plan }>
					<Link href={ BUSINESS_STUDY_PLAN_ADD_SESSION + '?id=' + router.query.id } passHref>
						<div className={ styles.box_btn_plan }>
							<div className={ styles.img }>
								<img alt='' src="/images/plus.svg" />
							</div>
							<button>Thêm bài học</button>
						</div>
					</Link>
					<CSVLink filename='Quản lý bài học trong kế hoạch' data={ csvData }>
						<div className={ styles.box_btn_down }>
							<div className={ styles.img }>
								<img alt='' src="/images/download.svg" />
							</div>
							<button>Tải về</button>
						</div>
					</CSVLink>
				</div>

				<div className={ styles.wrapper_add_lesson }>
					<div className={ styles.head }>
						<div className={ styles.text }>
							<span>Bài học</span>
						</div>
						<div className={ styles.text }>
							<span>Thời lượng bài học</span>
						</div>
						<div className={ styles.text }>
							<span>Tình trạng</span>
						</div>
						<div className={ styles.text }>
							<span>Đánh giá</span>
						</div>
					</div>
					<div className={ styles.wrapper_content_lesson }>
						{
							data?.session?.slice( ( pageTableSession - 1 ) * 3, pageTableSession * 3 )?.map( ( e, i ) => (
								<RowSession styles={ styles } key={ i } data={ e } />
							) )
						}
					</div>
				</div>

				<div className={ styles.pagination }>
					<div className={ styles.text_pagi }>
						<span>{ ( pageTableSession - 1 ) * 3 + 1 }-{ pageTableSession * 3 } trên tổng số { data?.session?.length }</span>
					</div>
					<div className={ styles.pagi_number }>
						<span>Bạn đang ở trang</span>
						<select value={ pageTableSession } onChange={ e => setPageTableSession( parseInt( e.target.value ) ) }>
							{
								[ ...Array( Math.ceil( data?.session?.length / 3 ) || 0 ).keys() ].map( e => (
									<option key={ e } value={ e + 1 }>{ e + 1 }</option>
								) )
							}
						</select>
						<button className={ styles.btn_prev } onClick={ () => setPageTableSession( prev =>
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
						<button className={ styles.btn_prev } onClick={ () => setPageTableSession( prev =>
						{
							if ( prev < Math.ceil( data?.session?.length / 3 ) )
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

				{/* ===================================== */ }

				<div className={ `${ styles.title_page } ${ styles.title_page_mb }` }>
					<h1>Quản lý thành viên</h1>
				</div>

				<div className={ `${ styles.wrapper_btn_plan } ${ styles.btn_manager }` }>
					<div className={ styles.status }>
						<select defaultValue={ "" } onChange={ e => handleFilterMember( e.target.value ) }>
							<option value="">Tình trạng</option>
							<option value="Chưa học">Chưa học</option>
							<option value="Đang học">Đang học</option>
							<option value="Hoàn thành">Hoàn thành</option>
							<option value="Chưa đạt">Chưa đạt</option>
						</select>
					</div>
					<div className={ styles.wrapper_btn }>
						<Link href={ BUSINESS_STUDY_PLAN_ADD_MEMBER + '?id=' + router.query.id } passHref>
							<div className={ styles.box_btn_plan } style={ { cursor: 'pointer' } }>
								<div className={ styles.img }>
									<img alt='' src="/images/plus.svg" />
								</div>
								<button>Thêm thành viên</button>
							</div>
						</Link>
						<CSVLink filename='Quản lý thành viên' data={ csvMember }>
							<div className={ styles.box_btn_down }>
								<div className={ styles.img }>
									<img alt='' src="/images/download.svg" />
								</div>
								<button>Tải về</button>
							</div>
						</CSVLink>
					</div>
				</div>

				<div
					className={ `${ styles.wrapper_add_plan } ${ styles.wrapper_manager_mem }` }
				>
					<div className={ styles.head }>
						<div className={ styles.text } style={{flex:2}}>
							<span>Họ tên</span>
						</div>
						<div className={ styles.text } style={{flex:2}}>
							<span>Email</span>
						</div>
						<div className={ styles.text } style={{flex:1}}>
							<span>Bài học được phân công</span>
						</div>
						<div className={ styles.text } style={{flex:1}}>
							<span>Tình trạng</span>
						</div>
						<div className={ styles.text } style={{flex:2}}>
							<span>Tiến độ</span>
						</div>
					</div>

					<div
						className={ `${ styles.wrapper_content_lesson } ${ styles.wrapper_content_mem }` }
					>

						{
							filterMember?.slice( ( pageTableMember - 1 ) * 10, pageTableMember * 10 )?.map( ( e, i ) => (
								<RowMember styles={ styles } key={ i } data={ e } numberOfSession={ data?.session?.length || 0 } />
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

