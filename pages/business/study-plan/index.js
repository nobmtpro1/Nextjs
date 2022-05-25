import styles from "../../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/layouts/LayoutBusiness";
import axios from "../../../sevices/axios";
import PopupAddPlan from "../../../components/pages/business/studyPlan/PopupAddPlan";
import RowPlan from "../../../components/pages/business/studyPlan/RowPlan";
import { CSVLink, CSVDownload } from "react-csv";
import moment from "moment";
import Chart from 'chart.js';
import Head from 'next/head'

const Index = () =>
{
    const [ data, setData ] = useState( null )
    const [ showPopupAddPlan, setShowPopupAddPlan ] = useState( false )
    const [ csvData, setCsvData ] = useState( [] )
    const [ progressMember, setProgressMember ] = useState( {
        finish: 0,
        notStudy: 0,
        studying: 0,
        notReach: 0,
    } )
    const [ pageTablePlan, setPageTablePlan ] = useState( 1 )
    useEffect( () =>
    {
        axios.get( 'page/business/study-plan' ).then( response =>
        {
            setData( response.data )
            var arr = [
                [ "Kế hoạch học tập", "Thời gian", "Số bài học phân công", "Số học viên", "Tiến độ", "Tình trạng" ],
            ]

            response.data?.plan?.forEach( e =>
            {
                arr.push( [
                    e?.name,
                    moment( e?.from ).format( 'DD/MM/YYYY' ) + ' - ' + moment( e?.to ).format( 'DD/MM/YYYY' ),
                    e?.session?.length || 0,
                    ( e?.member?.length || 0 ) + '/' + ( e?.membership?.number_of_slots ) + '.',
                    ( e?.progress || 0 ) + '/' + ( e?.member?.length || 0 ) + '.',
                    e?.status
                ] )
            } );

            setCsvData( arr )

        } ).catch( error => { } )
    }, [] )

    useEffect( () =>
    {
        var countFinish = 0
        var countNotStudy = 0
        var countStudying = 0
        var countNotReach = 0

        data?.plan?.forEach( e =>
        {
            e?.member?.forEach( x =>
            {
                if ( x.status == 'Đang học' )
                {
                    countStudying++
                }

                if ( x.status == 'Chưa học' )
                {
                    countNotStudy++
                }

                if ( x.status == 'Chưa đạt' )
                {
                    countNotReach++
                }

                if ( x.status == 'Hoàn thành' )
                {
                    countFinish++
                }
            } );
        } );

        setProgressMember( {
            finish: countFinish,
            notStudy: countNotStudy,
            studying: countStudying,
            notReach: countNotReach,
        } )

        const ctx = document.getElementById( 'myChart' );

        var dataChart = {
            datasets: [ {
                data: [ countFinish, countStudying, countNotStudy, countNotReach ],
                backgroundColor: [
                    'rgba(49, 68, 202, 1)',
                    'rgba(255, 126, 7, 1)',
                    `rgba(15, 180, 82, 1)`,
                    'rgba(227, 32, 104, 1)',
                ],
            } ]
        };

        if ( countFinish == 0 && countStudying == 0 && countNotStudy == 0 && countNotReach == 0 )
        {
            dataChart = {
                datasets: [ {
                    data: [ 1 ],
                    backgroundColor: [
                        'rgba(49, 68, 202, 1);',
                    ],
                } ]
            };
        }

        const myChart = new Chart( ctx, {
            type: 'doughnut',
            data: dataChart,
            options: {
                cutoutPercentage: 80,
                tooltips: { enabled: false },
                hover: { mode: null },
            }
        } );
    }, [ data ] )

    return (
        <>
            <Head>
                <title>AIM E-learning | Kế hoạch học tập</title>
            </Head>
            <PopupAddPlan showPopupAddPlan={ showPopupAddPlan } setShowPopupAddPlan={ setShowPopupAddPlan } setData={ setData } />
            <div className={ `${ styles.notify_page } ${ styles.overview_plan }` }>
                <div className={ styles.title_page }>
                    <h1>Kế hoạch học tập</h1>
                </div>
                <div className={ styles.box_study_progress }>
                    <h3>Tiến độ học tập</h3>
                    <div className={ styles.chart_progress }>
                        <div className={ styles.img_chart }>
                            {/* <img alt='' src="/images/map.svg" /> */ }
                            <canvas id="myChart" width="150" height="150"></canvas>
                        </div>
                        <div className={ styles.content_chart }>
                            <div className={ styles.box_chart }>
                                <div className={ styles.item }>
                                    <h4>{ progressMember?.notReach }</h4>
                                    <div className={ styles.sub_desc }>
                                        <span>Học viên chưa đạt</span>
                                    </div>
                                </div>
                                <div className={ styles.item }>
                                    <h4>{ progressMember?.finish }</h4>
                                    <div
                                        className={ `${ styles.sub_desc } ${ styles.sub_desc_1 }` }
                                    >
                                        <span>Học viên hoàn thành</span>
                                    </div>
                                </div>
                            </div>
                            <div className={ styles.box_chart }>
                                <div className={ styles.item }>
                                    <h4>{ progressMember?.notStudy }</h4>
                                    <div className={ `${ styles.sub_desc } ${ styles.sub_desc_3 }` }>
                                        <span>Học viên chưa vào học </span>
                                    </div>
                                </div>
                                <div className={ styles.item }>
                                    <h4>{ progressMember?.studying }</h4>
                                    <div
                                        className={ `${ styles.sub_desc } ${ styles.sub_desc_2 }` }
                                    >
                                        <span>Học viên đang học</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={ styles.wrapper_btn_plan }>

                    <div className={ styles.box_btn_plan } style={ { cursor: 'pointer' } } onClick={ () => setShowPopupAddPlan( true ) }>
                        <div className={ styles.img }>
                            <img alt='' src="/images/plus.svg" />
                        </div>
                        <button>Thêm kế hoạch</button>
                    </div>
                    <CSVLink filename='Kế hoạch học tập' data={ csvData }>
                        <div className={ styles.box_btn_down }>
                            <div className={ styles.img }>
                                <img alt='' src="/images/download.svg" />
                            </div>
                            <button>Tải về</button>
                        </div>
                    </CSVLink>

                </div>

                {/* ===================================== */ }

                <div className={ `${ styles.wrapper_add_plan }` }>
                    <div className={ styles.head }>
                        <div className={ styles.text } style={ { flex: 2 } }>
                            <span>Kế hoạch học tập</span>
                            <div className={ styles.img_down }>
                                <img alt='' src="/images/downn.svg" />
                            </div>
                        </div>
                        <div className={ styles.text } style={ { flex: 3 } }>
                            <span>Thời gian</span>
                            <div className={ styles.img_down }>
                                <img alt='' src="/images/downn.svg" />
                            </div>
                        </div>
                        <div className={ styles.text }  style={ { flex: 1 } }>
                            <span>Số bài học phân công</span>
                            <div className={ styles.img_down }>
                                <img alt='' src="/images/downn.svg" />
                            </div>
                        </div>
                        <div className={ styles.text } style={ { flex: 1 } }>
                            <span>Số học viên</span>
                            <div className={ styles.img_down }>
                                <img alt='' src="/images/downn.svg" />
                            </div>
                        </div>
                        <div className={ styles.text } style={ { flex: 1 } }>
                            <span>Tiến độ</span>
                            <div className={ styles.img_down }>
                                <img alt='' src="/images/downn.svg" />
                            </div>
                        </div>
                        <div className={ styles.text } style={ { flex: 1 } }>
                            <span>Tình trạng</span>
                        </div>
                        <div className={ styles.text } style={ { flex: 1 } }>
                            <span></span>
                        </div>
                    </div>

                    <div
                        className={ `${ styles.wrapper_content_lesson } ${ styles.wrapper_content_mem }` }
                    >
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

