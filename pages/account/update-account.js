import styles from '../../styles/account/update.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layouts/LayoutAccount'
import Head from 'next/head'
import axios from '../../sevices/axios'
import { LINK_PRIVACY_POLICY } from '../../constants/route'

const Index = ( props ) =>
{

    const [ user, setUser ] = useState( null )
    const [ selection, setSelection ] = useState( null )
    const [ selectionDemand, setSelectionDemand ] = useState( null )
    const [ flag, setFlag ] = useState( false )
    const [ form, setForm ] = useState( {
        fullname: "",
        address: "",
        phone: "",
        birthday: "",
        gender: "",
        job_id: '',
        demand_id: '',
        avatar: null,
    } )

    const [ formPassword, setFormPassword ] = useState( {
        password: "",
        confirmPassword: ""
    } )

    useEffect( () =>
    {

        axios.get( 'register/form-register-user-selection' ).then( response =>
        {
            setSelection( response.data )
            axios.get( 'page/account/update-account' ).then( response =>
            {
                var user = response.data.user
                setForm( {
                    fullname: user?.fullname || "",
                    address: user?.address || "",
                    phone: user?.phone || "",
                    birthday: user?.birthday || "",
                    gender: user?.gender != null ? user?.gender?.toString() : "",
                    job_id: user?.job_id || "",
                    demand_id: user?.demand_id || "",
                    avatar: null,
                } )
                setUser( user )
            } ).catch( error =>
            {
            } )
        } ).catch( error =>
        {
        } )

    }, [] )

    useEffect( () =>
    {
        if ( form?.job_id )
        {
            var selectionFilter = selection?.filter( e => e?.parent_id == form?.job_id )
            setSelectionDemand( selectionFilter )
            if ( flag )
            {
                setForm( prev => ( {
                    ...prev,
                    demand_id: ''
                } ) )
            }
            setFlag( true )
        }
    }, [ form?.job_id, selection ] )


    const handleSubmit = () =>
    {

        if ( form?.fullname.length > 30 )
        {
            alert( 'H??? v?? t??n ch??? ch???a nhi???u nh???t 30 k?? t???' )
            return false
        }

        if ( form?.phone.length < 10 || form?.phone.length > 15 )
        {
            alert( 'S??? ??i???n tho???i ph???i ch???a t??? 10 ?????n 15 k?? t???' )
            return false
        }

        var formData = new FormData
        formData.append( 'fullname', form?.fullname )
        formData.append( 'address', form?.address )
        formData.append( 'phone', form?.phone )
        formData.append( 'birthday', form?.birthday )
        formData.append( 'gender', form?.gender )
        formData.append( 'job_id', form?.job_id )
        formData.append( 'demand_id', form?.demand_id )
        formData.append( 'avatar', form?.avatar || '' )

        axios.post( 'page/account/update-account/submit', formData ).then( response =>
        {
            alert( 'L??u th??nh c??ng' )
            window.location.href = window.location.href
        } ).catch( error =>
        {
            alert( 'L??u th???t b???i' )
        } )
    }

    const handleChangePassword = () =>
    {
        if ( formPassword?.password?.length < 10 || formPassword?.password.length > 30 )
        {
            alert( 'M???t kh???u ph???i ch???a t??? 10 ?????n 30 k?? t???' )
            return false
        }

        if ( formPassword?.password != formPassword?.confirmPassword )
        {
            alert( 'M???t kh???u nh???p l???i kh??ng ????ng' )
            return false
        }

        axios.post( 'page/account/update-account/change-password', { password: formPassword?.password } ).then( response =>
        {
            alert( 'L??u th??nh c??ng' )
        } ).catch( error =>
        {
            alert( 'L??u th???t b???i' )
        } )
    }

    const handleChangeFile = ( e ) =>
    {
        setForm( prev => ( { ...prev, avatar: Array.from( e.target.files )[ 0 ] } ) )
    }

    return (
        <>
            <Head>
                <title>AIM E-learning | T??i kho???n</title>
            </Head>
            <div className={ styles.update_page } >
                <div className={ styles.left }>
                    <div className={ styles.box }>
                        <div className={ styles.title }>
                            C???p nh???t t??i kho???n
                        </div>
                        <div className={ styles.input_group }>
                            <input placeholder='H??? v?? t??n' className={ styles.input } value={ form?.fullname } onChange={ e => setForm( prev => ( { ...prev, fullname: e.target.value } ) ) } />
                        </div>
                        <div className={ styles.input_group }>
                            <input placeholder='?????a ch???' className={ styles.input } value={ form?.address } onChange={ e => setForm( prev => ( { ...prev, address: e.target.value } ) ) } />
                        </div>
                        <div className={ styles.input_group }>
                            <input placeholder='S??? ??i???n tho???i' className={ styles.input } value={ form?.phone } onChange={ e => setForm( prev => ( { ...prev, phone: e.target.value } ) ) } />
                        </div>
                        <div className={ styles.input_group }>
                            <input placeholder='Ng??y sinh' className={ styles.input } type="date" value={ form?.birthday } onChange={ e => setForm( prev => ( { ...prev, birthday: e.target.value } ) ) } />
                        </div>
                        <div className={ styles.input_group }>
                            <select className={ styles.input_select } value={ form?.gender } onChange={ e => setForm( prev => ( { ...prev, gender: e.target.value } ) ) } >
                                <option value="" disabled>Gi???i t??nh</option>
                                <option value={ 0 }>Nam</option>
                                <option value={ 1 }>N???</option>
                            </select>
                        </div>
                        <div className={ styles.input_group }>
                            <select
                                className={ styles.input_select }
                                required
                                value={ form?.job_id }
                                onChange={ e => setForm( prev => ( { ...prev, job_id: e.target.value } ) ) }
                            >
                                <option value='' disabled  >Ngh??? nghi???p</option>
                                {
                                    selection?.filter( x => x?.type == 'job' )?.map( ( e, i ) => (
                                        <option key={ i } value={ e?.id }>{ e?.selection }</option>
                                    ) )
                                }
                            </select>
                        </div>
                        <div className={ styles.input_group }>
                            <select
                                className={ styles.input_select }
                                required
                                value={ form?.demand_id }
                                onChange={ e => setForm( prev => ( { ...prev, demand_id: e.target.value } ) ) }
                            >
                                <option value='' disabled >Nhu c???u</option>
                                {
                                    selectionDemand?.map( ( e, i ) => (
                                        <option key={ i } value={ e?.id }>{ e?.selection }</option>
                                    ) )
                                }
                            </select>
                        </div>
                        <div className={ styles.input_group }>
                            <span className={ styles.placeholder }>Avatar { form?.avatar?.name && `(${ form?.avatar?.name })` }</span>
                            <div className={ styles.input }></div>
                            <input placeholder='Avatar' className={ `${ styles.input } ${ styles.file }` } type="file" onChange={ e => handleChangeFile( e ) } />
                        </div>

                        <div className={ styles.policy }>
                            Khi ??i???n v?? l??u th??ng tin, b???n ???? ?????c v?? ch???p thu???n <a href={ LINK_PRIVACY_POLICY } target="_blank" rel="noreferrer" className={ styles.link }>Ch??nh s??ch b???o m???t.</a>
                        </div>
                        <div className={ styles.button }>
                            <button onClick={ handleSubmit }> L??u</button>
                        </div>
                    </div>
                </div>
                <div className={ styles.right }>
                    <div className={ styles.box }>
                        <div className={ styles.title }>
                            C???p nh???t m???t kh???u
                        </div>
                        <div className={ styles.input_group }>
                            <input className={ styles.input } value={ user?.email } />
                        </div>
                        <div className={ styles.input_group }>
                            <input placeholder='Password' className={ styles.input } type="password" value={ formPassword?.password } onChange={ e => setFormPassword( prev => ( { ...prev, password: e.target.value } ) ) } />
                        </div>
                        <div className={ styles.input_group }>
                            <input placeholder='Nh???p l???i password' className={ styles.input } type="password" value={ formPassword?.confirmPassword } onChange={ e => setFormPassword( prev => ( { ...prev, confirmPassword: e.target.value } ) ) } />
                        </div>
                        <div className={ styles.policy }>
                            Khi ??i???n v?? l??u th??ng tin, b???n ???? ?????c v?? ch???p thu???n <a target="_blank" rel="noreferrer" href={ LINK_PRIVACY_POLICY } className={ styles.link }>Ch??nh s??ch b???o m???t.</a>
                        </div>
                        <div className={ styles.button }>
                            <button onClick={ handleChangePassword }> L??u</button>
                        </div>
                    </div>
                </div>
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