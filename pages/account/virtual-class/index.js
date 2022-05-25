import styles from '../../../styles/account/offline.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../components/layouts/LayoutAccount'
import Head from 'next/head'
import axios from '../../../sevices/axios'
import Certificate from '../../../components/pages/account/Certificate'

const Index = () =>
{
    const [ data, setData ] = useState( null )

    useEffect( () =>
    {
        axios.get( 'page/account/virtual-class' ).then( response =>
        {
            setData( response.data )
        } ).catch( error =>
        {
        } )
    }, [] )

    useEffect( () =>
    {
        const course = document.getElementsByClassName( styles.course )
        Array.from( course ).forEach( e =>
        {
            e.addEventListener( 'click', function ()
            {
                const courseContent = this.parentElement.querySelector( '.' + styles.course_content )
                if ( courseContent?.classList.contains( styles.active ) )
                {
                    this.classList.remove( styles.active )
                    courseContent.classList.remove( styles.active )
                } else
                {
                    this.classList.add( styles.active )
                    courseContent?.classList.add( styles.active )
                }
            } )
        } )

        const courseContentItem = document.querySelectorAll( '.' + styles.course_content + ' .' + styles.item )
        Array.from( courseContentItem ).forEach( e =>
        {
            e.addEventListener( 'click', function ()
            {
                if ( this?.classList.contains( styles.active ) )
                {
                    this.classList.remove( styles.active )
                } else
                {
                    this.classList.add( styles.active )
                }
            } )
        } )
    }, [] )

    return (
        <>
            <Head>
                <title>AIM E-learning | Virtual class</title>
            </Head>
            <div className={ styles.offline_page } >
                <div className={ styles.head }>
                    <div className={ styles.title }>
                        Vitual class
                    </div>
                    <div className={ styles.status }>
                        <select>
                            <option>Nhóm chủ để</option>
                            <option>Chưa học</option>
                            <option>Đang học</option>
                            <option>Hoàn thành</option>
                        </select>
                    </div>
                </div>

                <div className={ styles.category_mb }>
                    <select>
                        <option> Marketing
                            Management</option>
                        <option> Creative
                            & Content</option>
                        <option>   Digital
                            Marketing</option>
                        <option>        PR, Event
                            & Activation</option>
                        <option>    Account
                            Management</option>
                    </select>
                </div>
                <div className={ styles.menu }>
                    <div className={ `${ styles.text } ${ styles.active }` }>
                        Tất cả
                    </div>
                    <div className={ styles.text }>
                        Chưa học
                    </div>
                    <div className={ styles.text }>
                        Đang học
                    </div>
                    <div className={ styles.text }>
                        Hoàn thành
                    </div>
                </div>


                <div className={ styles.courses }>
                    <div className={ styles.course_container }>
                        <div className={ styles.course }>
                            <div className={ styles.name }>
                                Khoá học Writing for Ideas
                            </div>
                            <div className={ styles.info }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-offline-1.svg" />
                                </div>
                                <div className={ styles.text }>
                                    12 buổi học
                                </div>
                            </div>
                            <div className={ styles.info }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-offline-2.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Thứ 2 - 4 - 6 (19h - 21h30)
                                </div>
                            </div>
                            <div className={ styles.info }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-offline-1.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Ngày khai giảng: 28.10.2021
                                </div>
                            </div>
                            <div className={ styles.info }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-offline-1.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Ngày tốt nghiệp (dự kiến): 28.11.2021
                                </div>
                            </div>
                        </div>
                        <div className={ styles.course_content }>
                            <div className={ `${ styles.item }` }>
                                <div className={ styles.title }>
                                    Buổi 01: Tổng quan về content marketing
                                </div>
                                <div className={ styles.detail }>
                                    <ul>
                                        <li>Tình trạng: Vắng</li>
                                        <li>Giảng viên: Nguyễn Văn A</li>
                                        <li>Phòng học: 502</li>
                                        <li>Tài liệu</li>
                                        <li>Lưu ý học viên:</li>
                                        <li>Tích lũy điểm: +100 coin</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={ styles.item }>
                                <div className={ styles.title }>
                                    Buổi 02: Tổng quan về content marketing
                                </div>
                                <div className={ styles.detail }>
                                    <ul>
                                        <li>Tình trạng: Vắng</li>
                                        <li>Giảng viên: Nguyễn Văn A</li>
                                        <li>Phòng học: 502</li>
                                        <li>Tài liệu</li>
                                        <li>Lưu ý học viên:</li>
                                        <li>Tích lũy điểm: +100 coin</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={ styles.item }>
                                <div className={ styles.title }>
                                    Buổi 03: Tổng quan về content marketing
                                </div>
                                <div className={ styles.detail }>
                                    <ul>
                                        <li>Tình trạng: Vắng</li>
                                        <li>Giảng viên: Nguyễn Văn A</li>
                                        <li>Phòng học: 502</li>
                                        <li>Tài liệu</li>
                                        <li>Lưu ý học viên:</li>
                                        <li>Tích lũy điểm: +100 coin</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={ styles.item }>
                                <div className={ styles.title }>
                                    Buổi 04: Tổng quan về content marketing
                                </div>
                                <div className={ styles.detail }>
                                    <ul>
                                        <li>Tình trạng: Vắng</li>
                                        <li>Giảng viên: Nguyễn Văn A</li>
                                        <li>Phòng học: 502</li>
                                        <li>Tài liệu</li>
                                        <li>Lưu ý học viên:</li>
                                        <li>Tích lũy điểm: +100 coin</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={ styles.course_container }>
                        <div className={ styles.course }>
                            <div className={ styles.name }>
                                Khoá học Writing for Ideas
                            </div>
                            <div className={ styles.info }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-offline-1.svg" />
                                </div>
                                <div className={ styles.text }>
                                    12 buổi học
                                </div>
                            </div>
                            <div className={ styles.info }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-offline-2.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Thứ 2 - 4 - 6 (19h - 21h30)
                                </div>
                            </div>
                            <div className={ styles.info }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-offline-1.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Ngày khai giảng: 28.10.2021
                                </div>
                            </div>
                            <div className={ styles.info }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/account-offline-1.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Ngày tốt nghiệp (dự kiến): 28.11.2021
                                </div>
                            </div>
                        </div>
                        <div className={ styles.course_content }>
                            <div className={ `${ styles.item }` }>
                                <div className={ styles.title }>
                                    Buổi 01: Tổng quan về content marketing
                                </div>
                                <div className={ styles.detail }>
                                    <ul>
                                        <li>Tình trạng: Vắng</li>
                                        <li>Giảng viên: Nguyễn Văn A</li>
                                        <li>Phòng học: 502</li>
                                        <li>Tài liệu</li>
                                        <li>Lưu ý học viên:</li>
                                        <li>Tích lũy điểm: +100 coin</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={ styles.item }>
                                <div className={ styles.title }>
                                    Buổi 02: Tổng quan về content marketing
                                </div>
                                <div className={ styles.detail }>
                                    <ul>
                                        <li>Tình trạng: Vắng</li>
                                        <li>Giảng viên: Nguyễn Văn A</li>
                                        <li>Phòng học: 502</li>
                                        <li>Tài liệu</li>
                                        <li>Lưu ý học viên:</li>
                                        <li>Tích lũy điểm: +100 coin</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={ styles.item }>
                                <div className={ styles.title }>
                                    Buổi 03: Tổng quan về content marketing
                                </div>
                                <div className={ styles.detail }>
                                    <ul>
                                        <li>Tình trạng: Vắng</li>
                                        <li>Giảng viên: Nguyễn Văn A</li>
                                        <li>Phòng học: 502</li>
                                        <li>Tài liệu</li>
                                        <li>Lưu ý học viên:</li>
                                        <li>Tích lũy điểm: +100 coin</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={ styles.item }>
                                <div className={ styles.title }>
                                    Buổi 04: Tổng quan về content marketing
                                </div>
                                <div className={ styles.detail }>
                                    <ul>
                                        <li>Tình trạng: Vắng</li>
                                        <li>Giảng viên: Nguyễn Văn A</li>
                                        <li>Phòng học: 502</li>
                                        <li>Tài liệu</li>
                                        <li>Lưu ý học viên:</li>
                                        <li>Tích lũy điểm: +100 coin</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Certificate courseCategory={ data?.courseCategory } sessionPassed={ data?.sessionPassed } />
            </div>

        </>
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