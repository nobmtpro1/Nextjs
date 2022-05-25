import styles from '../../../../styles/account/elearning_detail_course.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Slider from "react-slick";
import dynamic from 'next/dynamic';
import Layout from '../../../../components/layouts/LayoutAccount';
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from '../../../../sevices/axios';
import moment from 'moment';
import Certificate from '../../../../components/pages/account/Certificate';

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    draggable: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    // responsive: [
    //     {
    //         breakpoint: 1024,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1,
    //         },
    //     },
    // ],
};

const Index = ( props ) =>
{
    const router = useRouter()

    const [ data, setData ] = useState( null )
    const [ email, setEmail ] = useState( '' )

    useEffect( () =>
    {
        axios.get( 'page/account/elearning/course/' + router.query.id ).then( response =>
        {
            setData( response.data )
        } ).catch( error =>
        {
        } )
    }, [ router.query.id ] )

    const handleSubmit = () =>
    {
        axios.post( 'page/account/elearning/course/' + router.query.id + '/add-user', { email } ).then( response =>
        {
            alert( 'Thêm thành công' )
            setData( prev => ( {
                ...prev,
                boughtCourse: response.data
            } ) )
        } ).catch( error =>
        {
            alert( error?.response?.data?.message )
        } )
    }

    const handleDelete = ( id ) =>
    {
        if ( !window.confirm( 'Bạn có chắc muốn xoá không' ) )
        {
            return false
        }
        axios.post( 'page/account/elearning/course/' + router.query.id + '/delete-user/' + id ).then( response =>
        {
            alert( 'Xoá thành công' )
            setData( prev => ( {
                ...prev,
                boughtCourse: response.data
            } ) )
        } ).catch( error =>
        {
            alert( error?.response?.data?.message )
        } )
    }

    return (
        <>
            <Head>
                <title>AIM E-learning | Khoá học { data?.course?.name }</title>
            </Head>
            <div className={ styles.elearning_detail_membership_page } >
                <div className={ styles.div1 } >
                    Khoá học { data?.course?.name }
                </div>
                <div className={ styles.session_page_div2 }>
                    <div className={ styles.box_container }>
                        <div className={ styles.box }>
                            <div className={ styles.left }>
                                <div className={ styles.category }>
                                    <div className={ styles.text }>
                                        Gồm { data?.course?.session_count } bài học
                                    </div><br />
                                    <div className={ styles.text }>
                                        { data?.course?.course_category?.name }
                                    </div>
                                </div>
                                <div className={ styles.description }>
                                    { data?.course?.description }
                                </div>
                                <div className={ styles.time }>
                                    Thời gian mua: { moment( data?.boughtCourse?.created_at ).format( 'DD/MM/YYYY' ) }
                                </div>
                                <div className={ styles.number_slot }>
                                    Số tài khoản sử dụng chung:
                                </div>
                                <div className={ `${ styles.user }` }>
                                    {
                                        data?.boughtCourse?.slot?.map( ( e, i ) =>
                                        {
                                            if ( i < 3 )
                                            {
                                                return (
                                                    <div className={ `${ styles.avatar }` } key={ i }>
                                                        <img alt='' src={ e?.user?.avatar?.includes( 'https:/' ) ? e?.user?.avatar : e?.user?.avatar ? process.env.IMG_URL + e?.user.avatar : '/images/avatar-default.png' } />
                                                    </div>
                                                )
                                            }
                                        } )
                                    }
                                    {
                                        data?.boughtCourse?.slot?.length > 3 && <div className={ `${ styles.more }` }>
                                            +{ data?.boughtCourse?.slot?.length - 3 }
                                        </div>
                                    }

                                </div>
                            </div>
                            <div className={ styles.right }>
                                <div className={ styles.percent }>
                                    <div className={ styles.ratio } style={ { '--ratio': ( 1 - ( data?.completeSession?.length / data?.course?.session_count ) ) } }> <span>{ ( data?.completeSession?.length / data?.course?.session_count ).toFixed( 2 ) * 100 }%</span></div>
                                </div>
                                <div className={ styles.note }>
                                    <div className={ styles.text }>
                                        Hoàn thành
                                    </div>
                                    <div className={ styles.text }>
                                        Chưa hoàn thành
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={ styles.box_container }>
                        <div className={ styles.box }>
                            <div className={ styles.heading } >
                                Thêm người học chung
                                với bạn với thông tin sau:
                            </div>
                            <form className={ styles.form } >
                                {/* <div className={ styles.input } >
                                    <input placeholder='Tên gợi nhớ' />
                                </div> */}
                                <div className={ styles.input } >
                                    <input placeholder='Email' value={ email } onChange={ e => setEmail( e.target.value ) } />
                                </div>
                                <div className={ `${ styles.button }` }>
                                    <a style={ { cursor: 'pointer' } } onClick={ handleSubmit }>Lưu</a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={ styles.box_container }>
                        <div className={ styles.box }>
                            <div className={ styles.left }>
                                <div className={ styles.title }>
                                    Chứng nhận hiện có
                                </div>
                                <div className={ styles.description }>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </div>
                            </div>
                            <div className={ styles.right }>
                                { data?.completeSession?.length }/{ data?.course?.session_count }
                            </div>
                            <div className={ `${ styles.cerfiticate_slide } slick-account-page` }>
                                <Slider { ...settings }>
                                    {
                                        data?.completeSession?.map( ( e, i ) => (
                                            <div className={ `${ styles.slide }` } key={ i }>
                                                <div className={ `${ styles.slide_container }` }>
                                                    <div className={ styles.image }>
                                                        <img alt='' src={ process.env.IMG_URL + e?.session?.certificate_image } />
                                                    </div>
                                                    <div className={ styles.name }>
                                                        { e?.session?.name }
                                                    </div>
                                                    <div className={ styles.button }>
                                                        <a href={ e?.session?.certificate_link_file } target="_blank" rel="noreferrer">
                                                            <span className={ styles.button_image }>
                                                                <img alt='' src="/images/account-elearning-detail-membership-7.svg" />
                                                            </span>
                                                            <span>
                                                                Tải về
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ) )
                                    }

                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ styles.div3 } >
                    <table>
                        <thead>
                            <tr className={ styles.thead }>
                                <th>Họ tên</th>
                                <th>Mail</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.boughtCourse?.slot?.map( ( e, i ) => (
                                    <tr key={ i }>
                                        <td>{ e?.user?.fullname }</td>
                                        <td>{ e?.user?.email }</td>
                                        <td>
                                            <a className={ styles.delete } style={ { cursor: 'pointer' } } onClick={ () => handleDelete( e?.id ) }>
                                                <img alt='' src="/images/account-elearning-detail-membership-1.svg" />
                                            </a>
                                        </td>
                                    </tr>
                                ) )
                            }
                            {
                                [ ...Array( ( data?.boughtCourse?.num_of_slot - data?.boughtCourse?.slot?.length ) || 0 ).keys() ]?.map( ( e, i ) => (
                                    <tr key={ i }>
                                        <td>Trống</td>
                                        <td>Trống</td>
                                        <td>
                                            {/* <a className={ styles.add } href='#'>
                                        <img alt='' src="/images/account-elearning-detail-membership-2.svg" />
                                        </a> */}
                                        </td>
                                    </tr>
                                ) )
                            }
                        </tbody>
                    </table>
                </div>
                <Certificate courseCategory={ data?.courseCategory } sessionPassed={ data?.sessionPassed } />
                {/* 
                <div className={ styles.pagination }>
                    <div className={ styles.left }>
                        1-10 trên tổng số 20
                    </div>
                    <div className={ styles.right }>
                        <div className={ styles.text }>
                            Bạn đang ở trang
                        </div>
                        <div className={ styles.select }>
                            <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <a href='#' className={ styles.arrow_left }>
                            <img alt='' src="/images/account-elearning-detail-membership-4.svg" />
                        </a>
                        <a href='#' className={ styles.arrow_right }>
                            <img alt='' src="/images/account-elearning-detail-membership-5.svg" />
                        </a>
                    </div>
                </div> */}
            </div>
        </ >
    )
}

export default Index

Index.getLayout = function getLayout ( page )
{
    return (
        <Layout  header={ page.props.header } styles={ styles }>
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

