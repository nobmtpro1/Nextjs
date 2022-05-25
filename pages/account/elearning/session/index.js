import styles from '../../../../styles/account/elearning_detail_course.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../../components/layouts/LayoutAccount';
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from '../../../../sevices/axios';
import moment from 'moment';
import Certificate from '../../../../components/pages/account/Certificate';

const Index = ( props ) =>
{
    const router = useRouter()

    const [ data, setData ] = useState( null )
    const [ email, setEmail ] = useState( '' )

    useEffect( () =>
    {
        axios.get( 'page/account/elearning/session/' + router.query.id + '?courseId=' + router.query?.course ).then( response =>
        {
            if ( !response.data?.session?.name )
            {
                router.back()
            }
            setData( response.data )

        } ).catch( error =>
        {
        } )
    }, [ router ] )

    const handleSubmit = () =>
    {
        axios.post( 'page/account/elearning/session/' + router.query.id + '/add-user', { email } ).then( response =>
        {
            alert( 'Thêm thành công' )
            setData( prev => ( {
                ...prev,
                boughtSession: response.data
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
        axios.post( 'page/account/elearning/session/' + router.query.id + '/delete-user/' + id ).then( response =>
        {
            alert( 'Xoá thành công' )
            setData( prev => ( {
                ...prev,
                boughtSession: response.data
            } ) )
        } ).catch( error =>
        {
            alert( error?.response?.data?.message )
        } )
    }

    return (
        <>
            <Head>
                <title>AIM E-learning | Bài học { data?.session?.name }</title>
            </Head>
            <div className={ styles.elearning_detail_membership_page } >
                <div className={ styles.div1 } >
                    Bài học { data?.session?.name }
                </div>
                <div className={ styles.session_page_div2 }>
                    <div className={ styles.box_container }>
                        <div className={ styles.box }>
                            <div className={ styles.left }>
                                <div className={ styles.category }>
                                    <div className={ styles.text }>
                                        Thuộc khoá { data?.course?.name }
                                    </div><br />
                                    <div className={ styles.text }>
                                        { data?.course?.course_category?.name }
                                    </div>
                                </div>
                                <div className={ styles.description }>
                                    { data?.session?.description }
                                </div>
                                <div className={ styles.time }>
                                    Thời gian mua: { moment( data?.boughtSession?.created_at ).format( 'DD/MM/YYYY' ) }
                                </div>
                                <div className={ styles.number_slot }>
                                    Số tài khoản sử dụng chung:
                                </div>
                                <div className={ `${ styles.user }` }>
                                    {
                                        data?.boughtSession?.slot?.map( ( e, i ) =>
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
                                        data?.boughtSession?.slot?.length > 3 && <div className={ `${ styles.more }` }>
                                            +{ data?.boughtSession?.slot?.length - 3 }
                                        </div>
                                    }

                                </div>
                            </div>
                            <div className={ styles.right }>
                                <div className={ styles.percent }>
                                    <div className={ styles.ratio } style={ { '--ratio': ( ( 100 - data?.progress?.progress_percent ) / 100 ) || 1 } }> <span>{ data?.progress?.progress_percent || 0 }%</span></div>
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
                                { data?.progress?.is_passed == 1 ? 1 : 0 }/1
                            </div>
                            <div className={ `${ styles.cerfiticate_slide } slick-account-page` }>
                                {
                                    data?.progress?.is_passed == 1 && <div className={ `${ styles.slide }` }>
                                        <div className={ `${ styles.slide_container }` }>
                                            <div className={ styles.image }>
                                                <img alt='' src={ process.env.IMG_URL + data?.session?.certificate_image } />
                                            </div>
                                            <div className={ styles.name }>
                                                { data?.session?.name }
                                            </div>
                                            <div className={ styles.button }>
                                                <a href={ data?.session?.certificate_link_file } target="_blank" rel="noreferrer">
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
                                }
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
                                data?.boughtSession?.slot?.map( ( e, i ) => (
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
                                [ ...Array( ( data?.boughtSession?.num_of_slot - data?.boughtSession?.slot?.length ) || 0 ).keys() ]?.map( ( e, i ) => (
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
            </div>
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