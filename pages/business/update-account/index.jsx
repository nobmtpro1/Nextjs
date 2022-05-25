import styles from "../../../styles/concern_dashboard/concern.module.scss";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/layouts/LayoutBusiness";
import axios from "../../../sevices/axios";
import {  LINK_PRIVACY_POLICY } from "../../../constants/route";
import Head from 'next/head'

const Index = () =>
{

    const [ data, setData ] = useState( {
        email: '',
        fullname: '',
        phone: '',
        businessDepartment: '',
        password: '',
        confirmPassword: '',
    } )

    useEffect( () =>
    {
        axios.get( 'page/business/update-account' ).then( response =>
        {
            setData( prev => ( {
                ...prev,
                email: response.data?.email || '',
                fullname: response.data?.fullname || '',
                phone: response.data?.phone || '',
                businessDepartment: response.data?.business_department || '',
            } ) )
        } ).catch( error => { } )
    }, [] )

    const handleSubmit1 = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/business/update-account/submit1', {
            fullname: data?.fullname,
            phone: data?.phone,
            businessDepartment: data?.businessDepartment,
        } ).then( response =>
        {
            alert( 'Sửa thành công' )
        } ).catch( error =>
        {
            if ( error.response?.data?.message )
            {
                alert( error.response?.data?.message )
            }
        } )
    }

    const handleSubmit2 = ( e ) =>
    {
        e.preventDefault()
        if ( data?.password?.length < 10 || data?.password.length > 30 )
        {
            alert( 'Mật khẩu phải chứa từ 10 đến 30 ký tự' )
            return false
        }

        if ( data?.password != data?.confirmPassword )
        {
            alert( 'Mật khẩu nhập lại không đúng' )
            return false
        }

        axios.post( 'page/account/update-account/change-password', {
            password: data?.password,
        } ).then( response =>
        {
            alert( 'Sửa thành công' )
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
                <title>AIM E-learning | Tài khoản</title>
            </Head>
            <div className={ `${ styles.notify_page } ${ styles.account_page }` }>
                <div className={ styles.title_page }>
                    <h1>Cập nhật thông tin tài khoản</h1>
                    <div>
                        <p>
                            Vui lòng cập nhật thông tin người phụ trách phân công bài học,
                            quản lý thành viên và tiến độ học tập.
                        </p>
                    </div>
                </div>
                <div className={ styles.update_infor }>
                    <form
                        onSubmit={ handleSubmit1 }
                        className={ styles.form_update_infor }
                    >
                        <div className={ styles.form_group }>
                            <input
                                type="text"
                                placeholder="Họ tên"
                                required
                                value={ data?.fullname }
                                onChange={ e => setData( prev => ( { ...prev, fullname: e.target.value } ) ) }
                            />
                        </div>
                        <div className={ styles.form_group }>
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                required
                                value={ data?.phone }
                                onChange={ e => setData( prev => ( { ...prev, phone: e.target.value } ) ) }
                            />
                        </div>
                        <div className={ styles.form_group }>
                            <input
                                type="text"
                                placeholder="Bộ phận"
                                className={ styles.input_part }
                                required
                                value={ data?.businessDepartment }
                                onChange={ e => setData( prev => ( { ...prev, businessDepartment: e.target.value } ) ) }
                            />
                        </div>

                        <p className={ styles.pivancy_p }>
                            Khi điền và lưu thông tin, bạn đã đọc và chấp thuận{ " " }
                            <a rel="noreferrer" target="_blank" href={ LINK_PRIVACY_POLICY }>Chính sách bảo mật.</a>
                        </p>
                        <button type="submit" className={ styles.btn_save }>
                            Lưu
                        </button>
                    </form>
                </div>


                <div className={ `${ styles.title_page } ${ styles.title_page_sub }` }>
                    <h1>Cập nhật mật khẩu</h1>

                </div>
                <div className={ `${ styles.update_infor } ${ styles.update_pass }` }>
                    <form
                        onSubmit={ handleSubmit2 }
                        className={ styles.form_update_infor }
                    >
                        <div className={ styles.group_infor }>
                            <span className={ styles.infor_mail }>Email của bạn là <b>{ data?.email }</b></span>
                        </div>
                        <div className={ styles.form_group }>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu mới"
                                required
                                value={ data?.password }
                                onChange={ e => setData( prev => ( { ...prev, password: e.target.value } ) ) }
                            />
                        </div>
                        <div className={ styles.form_group }>
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu mới"
                                className={ styles.input_part }
                                required
                                value={ data?.confirmPassword }
                                onChange={ e => setData( prev => ( { ...prev, confirmPassword: e.target.value } ) ) }
                            />
                        </div>

                        <p className={ styles.pivancy_p }>
                            Khi điền và lưu thông tin, bạn đã đọc và chấp thuận{ " " }
                            <a rel="noreferrer" target="_blank" href={ LINK_PRIVACY_POLICY }>Chính sách bảo mật.</a>
                        </p>
                        <button type="submit" className={ styles.btn_save }>
                            Lưu
                        </button>
                    </form>
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

