import styles from "../../../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../../components/layouts/LayoutBusiness";
import axios from "../../../../sevices/axios";
import { useRouter } from "next/router";
import RowSession from "../../../../components/pages/business/studyPlan/AddSession/RowSession";
import Head from 'next/head'

const Index = () =>
{
    const router = useRouter()
    const [ data, setData ] = useState( null )
    const [ pageTableSession, setPageTableSession ] = useState( 1 )
    const [ input, setInput ] = useState( "" )

    useEffect( () =>
    {
        axios.get( 'page/business/study-plan/detail/' + router.query.id ).then( response =>
        {
            setData( response.data )
        } ).catch( error => { } )
    }, [ router ] )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        var arr = input.split( "," ).map( e =>
        {
            return e.replaceAll( ' ', '' )
        } )
        axios.post( 'page/business/study-plan/add-session/' + router.query.id, { data: arr } ).then( response =>
        {
            setData( response.data?.plan )
            if ( response.data?.notFound.length > 0 )
            {
                var string = ''
                response.data?.notFound.forEach( e =>
                {
                    string += e + ', '
                } );
                alert( 'Không tìm thấy bài học: ' + string )
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
                    <h1>Thêm bài học vào { data?.name }</h1>
                </div>
                <form className={ styles.box_id_lesson } onSubmit={ handleSubmit }>
                    <h3>Nhập ID bài học</h3>
                    <input required className={ styles.input_id } value={ input } onChange={ e => setInput( e.target.value ) } />
                    <p>
                        ID bài học là chữ và số viết tắt sau tên bài học. Ví dụ: L-WAZ.
                        Nếu nhập từ 2 bài học trở lên, mỗi ID bài học cách nhau bởi dấu
                        phẩy (,).
                    </p>
                    <button className={ styles.btn_add_id }>Thêm</button>
                </form>
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
                        <div className={ styles.text } style={ { flex: 0.3 } }>
                            <span>Thao tác</span>
                        </div>
                    </div>
                    <div className={ styles.wrapper_content_lesson }>
                        {
                            data?.session?.slice( ( pageTableSession - 1 ) * 3, pageTableSession * 3 )?.map( ( e, i ) => (
                                <RowSession styles={ styles } key={ i } data={ e } setData={ setData } id={ router.query.id } />
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
