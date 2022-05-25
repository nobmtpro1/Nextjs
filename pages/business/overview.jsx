import styles from "../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/LayoutBusiness";
import axios from "../../sevices/axios";
import moment from "moment";
import RowPlan from "../../components/pages/business/overview/RowPlan";
import Head from 'next/head'

const Index = () =>
{
	const [ data, setData ] = useState( null )
	const [ pageTablePlan, setPageTablePlan ] = useState( 1 )

	useEffect( () =>
	{
		axios.get( 'page/business/overview' ).then( response =>
		{
			setData( response.data )
		} ).catch( error => { } )
	}, [] )

	return (
		<>
			<Head>
				<title>AIM E-learning | Tổng quan</title>
			</Head>
			<div
				className={ `${ styles.overview_page } ${ styles.overview_plan } ${ styles.notify_page }` }
			>
				<div className={ styles.title_page }>
					<h1>Tổng quan</h1>
				</div>

				<div className={ styles.wrapper_detail_plan }>
					<div className={ styles.box_progress }>
						<div className={ styles.bar_chart_top }>
							<div className={ styles.title }>
								<h3>Gói Membership</h3>
								<div className={ styles.infor_over }>
									<span>{ data?.countSlot || 0 }/{ data?.membership?.number_of_slots || 0 }</span>
								</div>
							</div>
							{
								data?.membership && <>
									<div className={ styles.box_number }>
										<div className={ styles.num }>
											<span>{ moment( data?.membership?.from ).format( 'DD/MM/YYYY' ) }</span>
										</div>
										<div className={ styles.num }>
											<span>{ moment( data?.membership?.to ).format( 'DD/MM/YYYY' ) }</span>
										</div>
									</div>
									<div className={ styles.wrapper_progress }>
										<div className={ styles.progress }>
											<div className={ styles.bar } style={ { width: ( ( moment().unix() - moment( data?.membership?.from ).unix() ) / ( moment( data?.membership?.to ).unix() - moment( data?.membership?.from ).unix() ) * 100 ) + '%' } }></div>
										</div>
										<div className={ styles.box_note }>
											<div className={ styles.note }>
												<span>Thời gian đã học</span>
											</div>
											<div className={ `${ styles.note } ${ styles.note_1 }` }>
												<span>Tổng thời gian</span>
											</div>
										</div>
									</div>
									<div className={ styles.note_mb }>
										<div className={ styles.infor_over }>
											<span>180/365</span>
										</div>
										<div className={ styles.box_note }>
											<div className={ styles.note }>
												<span>Thời gian đã học</span>
											</div>
											<div className={ `${ styles.note } ${ styles.note_1 }` }>
												<span>Tổng thời gian</span>
											</div>
										</div>
									</div>
								</>
							}

						</div>
						<div className={ styles.bar_chart_bottom }>
							<div className={ styles.title }>
								<h5>Số bài học phân công</h5>
								<p>
									Tổng số bài học không trùng lặp được phân công cho tất cả
									các team
								</p>
							</div>
							<div className={ styles.box_mb }>
								<div className={ styles.number }>
									<span>{ data?.countSession || 0 }</span>
								</div>
								{/* <div className={ styles.tags_growth }>
								<span>+2.3%</span>
								<div className={ styles.img_growth }>
									<img alt='' src="/images/up.svg" />
								</div>
							</div> */}
							</div>
						</div>
					</div>

					<div className={ styles.wrapper_quality_mem }>
						<div className={ styles.heading }>
							<h5>Số học viên</h5>
							<p>
								Tổng số học viên đã vào học / số học viên đã được phân công
								bài học
							</p>
						</div>
						<div className={ styles.content }>
							<div className={ styles.progress_cricle }>
								{/* <div className={styles.cricle_bar}>
                      <img alt='' src="/images/cricle.svg" alt="cricle" />
                      <div className={styles.number}>
                        <span>900/1200</span>
                      </div>
                    </div> */}
								<div className={ styles.percent }>
									<div className={ styles.ratio } style={ { '--ratio': 1 - ( data?.countLearnedMember / data?.countSlot || 0 ) } }>
										{ " " }
										<span>{ data?.countLearnedMember }/{ data?.countSlot }</span>
									</div>
								</div>
							</div>
							<div className={ styles.infor_cricle }>
								<div className={ styles.item }>
									<h6>{ data?.countLearnedMember }</h6>
									<div className={ styles.sub }>
										<span>Học viên đã vào học</span>
									</div>
								</div>
								<div className={ styles.item }>
									<h6>{ data?.countSlot }</h6>
									<div className={ `${ styles.sub } ${ styles.sub_1 }` }>
										<span>Học viên được phân công</span>
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
                        <span>600/1200</span>
                      </div>
                    </div> */}
								<div className={ styles.percent }>
									<div className={ styles.ratio } style={ { '--ratio': 1 - ( data?.countFinishedMember / data?.countSlot || 0 ) } }>
										{ " " }
										<span>{ data?.countFinishedMember }/{ data?.countSlot }</span>
									</div>
								</div>
							</div>
							<div className={ styles.infor_cricle }>
								<div className={ styles.item }>
									<h6>{ data?.countFinishedMember }</h6>
									<div className={ styles.sub }>
										<span>Học viên đã hoàn thành</span>
									</div>
								</div>
								<div className={ styles.item }>
									<h6>{ data?.countSlot }</h6>
									<div className={ `${ styles.sub } ${ styles.sub_1 }` }>
										<span>Học viên được phân công</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={ `${ styles.wrapper_add_plan }` }>
					<div className={ styles.head }>
						<div className={ styles.text } style={ { flex: '2' } }>
							<span>Kế hoạch học tập</span>
							<div className={ styles.img_down }>
								<img alt='' src="/images/downn.svg" />
							</div>
						</div>
						<div className={ styles.text } style={ { flex: '2' } }>
							<span>Thời gian</span>
							<div className={ styles.img_down }>
								<img alt='' src="/images/downn.svg" />
							</div>
						</div>
						<div className={ styles.text }>
							<span>Số bài học phân công</span>
							<div className={ styles.img_down }>
								<img alt='' src="/images/downn.svg" />
							</div>
						</div>
						<div className={ styles.text }>
							<span>Số học viên</span>
							<div className={ styles.img_down }>
								<img alt='' src="/images/downn.svg" />
							</div>
						</div>
						<div className={ styles.text }>
							<span>Tiến độ</span>
							<div className={ styles.img_down }>
								<img alt='' src="/images/downn.svg" />
							</div>
						</div>
						<div className={ styles.text }>
							<span>Tình trạng</span>
							<div className={ styles.img_down }>
								<img alt='' src="/images/downn.svg" />
							</div>
						</div>
					</div>

					<div className={ `${ styles.wrapper_content_lesson } ${ styles.wrapper_content_mem }` }>

						{
							data?.plan?.slice( ( pageTablePlan - 1 ) * 10, pageTablePlan * 10 )?.map( ( e, i ) => (
								<RowPlan styles={ styles } data={ e } key={ i } />
							) )
						}

					</div>
				</div>
				
				<div className={ styles.pagination }>
					<div className={ styles.text_pagi }>
						<span>{ ( pageTablePlan - 1 ) * 10 + 1 }-{ pageTablePlan * 10 } trên tổng số { data?.plan?.length }</span>
					</div>
					<div className={ styles.pagi_number }>
						<span>Bạn đang ở trang</span>
						<select value={ pageTablePlan } onChange={ e => setPageTablePlan( parseInt( e.target.value ) ) }>
							{
								[ ...Array( Math.ceil( data?.plan?.length / 10 ) || 0 ).keys() ].map( e => (
									<option key={ e } value={ e + 1 }>{ e + 1 }</option>
								) )
							}
						</select>
						<button className={ styles.btn_prev } onClick={ () => setPageTablePlan( prev =>
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
						<button className={ styles.btn_prev } onClick={ () => setPageTablePlan( prev =>
						{
							if ( prev < Math.ceil( data?.plan?.length / 10 ) )
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
