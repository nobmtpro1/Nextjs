import styles from '../../../../styles/account/elearning_detail_membership.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../../components/layouts/LayoutAccount';
import Head from 'next/head'
import axios from '../../../../sevices/axios'
import moment from 'moment';
import Certificate from '../../../../components/pages/account/Certificate';

const Index = () =>
{
    const [ data, setData ] = useState( null )
    const [ email, setEmail ] = useState( "" )
    const [ page, setPage ] = useState( 1 )

    useEffect( () =>
    {
        axios.get( 'page/account/elearning/membership' ).then( response =>
        {
            setData( response.data )
        } ).catch( error =>
        {
        } )
    }, [] )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/account/elearning/membership/add-user', { email } ).then( response =>
        {
            setData( response.data )
        } ).catch( error =>
        {
            if ( error.response.data?.message )
            {
                alert( error.response.data?.message )
            }
        } )
    }

    const handleDeleteUser = ( id ) =>
    {
        axios.post( 'page/account/elearning/membership/delete-user', { id } ).then( response =>
        {
            setData( response.data )
        } ).catch( error =>
        {
            if ( error.response.data?.message )
            {
                alert( error.response.data?.message )
            }
        } )
    }

    return (
        <>
            <Head>
                <title>AIM E-learning | Membership</title>
            </Head>
            <div className={ styles.elearning_detail_membership_page } >
                <div className={ styles.div1 } >
                    Gói Membership <span hidden={ data?.membership?.from } style={ { fontSize: '0.7em' } }>(Bạn chưa mua gói Membership)</span>
                </div>
                <div className={ styles.div2 } >

                    {
                        data?.membership?.from && (
                            <div className={ styles.left } >
                                <div className={ styles.row1 } >
                                    <div className={ styles.col1 } >
                                        <div className={ styles.heading } >
                                            Thời gian sử dụng
                                        </div>
                                        <div className={ styles.time } >
                                            <div className={ styles.text } >
                                                { moment( data?.membership?.from ).format( 'DD.MM.YYYY' ) }
                                            </div>
                                            <div className={ styles.text } >
                                                { moment( data?.membership?.to ).format( 'DD.MM.YYYY' ) }
                                            </div>
                                        </div>
                                        <div className={ styles.progress } >
                                            <div style={ { width: ( ( moment().unix() - moment( data?.membership?.from ).unix() ) / ( moment( data?.membership?.to ).unix() - moment( data?.membership?.from ).unix() ) * 100 ) + '%' } }>
                                            </div>
                                        </div>
                                        <div className={ styles.number_slot } >
                                            Số tài khoản học chung
                                        </div>
                                        <div className={ `${ styles.user }` }>
                                            {
                                                data?.membership?.slot?.slice( 0, 3 )?.map( ( e, i ) => (
                                                    <div className={ `${ styles.avatar }` } key={ i }>
                                                        <img alt='' src={ e?.user?.avatar?.includes( 'https:/' ) ? e?.user?.avatar : e?.user?.avatar ? process.env.IMG_URL + e?.user.avatar : '/images/avatar-default.png' } />
                                                    </div>
                                                ) )
                                            }
                                            {
                                                data?.membership?.slot?.length > 3 && <div className={ `${ styles.more }` }>
                                                    +{ data?.membership?.slot?.length - 3 }
                                                </div>
                                            }
                                        </div>

                                    </div>
                                    <div className={ styles.col2 } >
                                        <div className={ styles.number } >
                                            { data?.membership?.slot?.length }/{ data?.membership?.number_of_slots }
                                        </div>
                                        <div className={ styles.list } >
                                            <div className={ styles.text } >
                                                Thời gian đã học
                                            </div>
                                            <div className={ styles.text } >
                                                Tổng thời gian
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {
                        data?.isOwner && (
                            <div className={ styles.right } >
                                <div className={ styles.box }>
                                    <div className={ styles.heading } >
                                        Thêm người học chung:
                                    </div>
                                    <form className={ styles.form } onSubmit={ handleSubmit }>
                                        <div className={ styles.input } >
                                            <input required type="email" placeholder='Email' value={ email } onChange={ e => setEmail( e.target.value ) } />
                                        </div>
                                        <div className={ `${ styles.button }` }>
                                            <button>Lưu</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    data?.membership?.from && (
                        <>
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
                                            data?.membership?.slot?.slice( ( page - 1 ) * 10, page * 10 )?.map( ( e, i ) => (
                                                <tr key={ i }>
                                                    <td>{ e?.user?.fullname }</td>
                                                    <td>{ e?.user?.email }</td>
                                                    <td><a onClick={ () => handleDeleteUser( e?.id ) } className={ styles.delete } style={ { cursor: 'pointer' } }><img alt='' src="/images/account-elearning-detail-membership-1.svg" /></a></td>
                                                </tr>
                                            ) )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className={ styles.pagination }>
                                <div className={ styles.left }>
                                    { ( page - 1 ) * 10 + 1 }-{ page * 10 } trên tổng số { data?.membership?.slot?.length }
                                </div>
                                <div className={ styles.right }>
                                    <div className={ styles.text }>
                                        Bạn đang ở trang
                                    </div>
                                    <div className={ styles.select }>
                                        <select value={ page } onChange={ e => setPage( parseInt( e.target.value ) ) }>
                                            {
                                                [ ...Array( Math.ceil( data?.membership?.slot?.length / 10 ) || 0 ).keys() ].map( e => (
                                                    <option key={ e } value={ e + 1 }>{ e + 1 }</option>
                                                ) )
                                            }
                                        </select>
                                    </div>
                                    <a style={ { cursor: 'pointer' } } className={ styles.arrow_left } onClick={ () => setPage( prev =>
                                    {
                                        if ( prev > 1 )
                                        {
                                            return prev - 1
                                        }
                                        return prev
                                    } ) }>
                                        <img alt='' src="/images/account-elearning-detail-membership-4.svg" />
                                    </a>
                                    <a style={ { cursor: 'pointer' } } className={ styles.arrow_right } onClick={ () => setPage( prev =>
                                    {
                                        if ( prev < Math.ceil( data?.membership?.slot?.length / 10 ) )
                                        {
                                            return prev + 1
                                        }
                                        return prev
                                    } ) }>
                                        <img alt='' src="/images/account-elearning-detail-membership-5.svg" />
                                    </a>
                                </div>
                            </div>
                        </>
                    )
                }
                <Certificate courseCategory={ data?.courseCategory } sessionPassed={ data?.sessionPassed } />
            </div>
        </>
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
