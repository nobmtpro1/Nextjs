import styles from '../styles/main/register.module.scss'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import axios from '../sevices/axios'
import Spinner from "react-bootstrap/Spinner";
import Layout from '../components/layouts/Layout';
import { HOME, LINK_PRIVACY_POLICY, LOGIN, REGISTER } from '../constants/route';
import Head from 'next/head'
import PopupMessage from '../components/global/PopupMessage';

const Index = ( props ) =>
{
    const [ formData, setFormData ] = useState( {
        job_id: '',
        demand_id: '',
    } )
    const [ loading, setLoading ] = useState( false )
    const [ selection, setSelection ] = useState( null )
    const [ selectionDemand, setSelectionDemand ] = useState( null )
    const [ openPopup, setOpenPopup ] = useState( false )


    useEffect( () =>
    {
        axios.get( 'register/form-register-user-selection' ).then( response =>
        {
            setSelection( response.data )
        } ).catch( error =>
        {
        } )
    }, [] )

    useEffect( () =>
    {
        if ( formData?.job_id )
        {
            var selectionFilter = selection?.filter( e => e?.parent_id == formData?.job_id  )
            setSelectionDemand( selectionFilter )
            setFormData( prev => ( {
                ...prev,
                demand_id: ''
            } ) )
        }
    }, [ formData?.job_id, selection ] )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        var data = localStorage.getItem( 'register' ) ? JSON.parse( localStorage.getItem( 'register' ) ) : {}
        data.job_id = formData.job_id
        data.demand_id = formData.demand_id
        setLoading( true )
        axios.post( 'register', data ).then( response =>
        {
            setLoading( false )
            localStorage.removeItem( 'register' )
            setOpenPopup( true )

        } ).catch( error =>
        {
            setLoading( false )
            var msg = error.message
            var obj = null
            if ( obj = error?.response?.data?.message )
            {
                msg = obj[ Object.keys( obj )[ 0 ] ][ 0 ]
            }
            alert( msg )
        } )
    }

    // UI
    useEffect( () =>
    {
        const input = document.getElementsByClassName( styles.input )
        Array.from( input ).forEach( e =>
        {
            var ipt = e.querySelector( 'input' )
            var select = e.querySelector( 'select' )

            ipt?.addEventListener( 'focus', function ()
            {
                e.getElementsByClassName( styles.placeholder )[ 0 ].classList.add( styles.hide )
            } )

            ipt?.addEventListener( 'blur', function ()
            {
                if ( ipt.value == '' )
                {
                    e.getElementsByClassName( styles.placeholder )[ 0 ].classList.remove( styles.hide )
                }
            } )

            select?.addEventListener( 'change', function ()
            {
                if ( this.value == '' )
                {
                    e.getElementsByClassName( styles.placeholder )[ 0 ].classList.remove( styles.hide )
                } else
                {
                    e.getElementsByClassName( styles.placeholder )[ 0 ].classList.add( styles.hide )
                }
            } )
        } )
    } )

    return (
        <div className={ styles.container }>
            <PopupMessage title="X??c th???c email" content="Ch??ng t??i s??? g???i m?? x??c minh ?????n ?????a ch??? email b???n ???? s??? d???ng ????? t???o t??i kho???n. N???u kh??ng x??c minh ?????a ch??? c???a m??nh, b???n s??? kh??ng th??? t???o T??i kho???n" open={ openPopup } setOpen={ setOpenPopup } />
            <Head>
                <title>AIM E-learning | ????ng k??</title>
            </Head>

            <div className={ styles.register_page }>
                <div className={ styles.breadcrumb_1 }>
                    <Link href={ HOME } passHref>
                        <a href='#' className={ styles.link_2 }>
                            Trang ch???
                        </a>
                    </Link>
                    <Link href={ REGISTER } passHref>
                        <a href='#' className={ styles.link_2 }>
                            ????ng k??
                        </a>
                    </Link>
                </div>
                <div className={ styles.box_container }>
                    <div className={ styles.box_1 }>
                        <div className={ styles.left_2 }>
                            <img src='/images/main/register-2.jpg' alt='' />
                        </div>
                        <div className={ styles.right_2 }>
                            <div className={ styles.menu_3 }>
                                <Link href={ REGISTER } passHref>
                                    <div className={ `${ styles.text_4 } ${ styles.active }` }>
                                        ????ng k??
                                    </div>
                                </Link>
                            </div>
                            <form className={ `${ styles.form_3 }` } onSubmit={ handleSubmit }>

                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>Ngh??? nghi???p<span>*</span></div>
                                    <select
                                        required
                                        defaultValue=""
                                        onChange={ e => setFormData( prev => ( { ...prev, job_id: e.target.value } ) ) }
                                    >
                                        <option value='' disabled  ></option>
                                        {
                                            selection?.filter( x => x?.type == 'job' )?.map( ( e, i ) => (
                                                <option key={ i } value={ e?.id }>{ e?.selection }</option>
                                            ) )
                                        }
                                    </select>
                                </div>

                                <div className={ `${ styles.input }` }>
                                    <div className={ `${ styles.placeholder }` }>Nhu c???u<span>*</span></div>
                                    <select
                                        required
                                        value={ formData?.demand_id }
                                        onChange={ e => setFormData( prev => ( { ...prev, demand_id: e.target.value } ) ) }
                                    >
                                        <option value='' disabled ></option>
                                        {
                                            selectionDemand?.map( ( e, i ) => (
                                                <option key={ i } value={ e?.id }>{ e?.selection }</option>
                                            ) )
                                        }
                                    </select>
                                </div>
                                <div className={ `${ styles.policy }` }>
                                    Khi ??i???n v?? g???i th??ng tin, b???n ???? ?????c v?? ch???p thu???n <a target="_blank" rel="noreferrer" href={ LINK_PRIVACY_POLICY }>Ch??nh s??ch b???o m???t.</a>
                                </div>
                                <div className={ `${ styles.button }` }>
                                    <button disabled={ loading }>
                                        {
                                            loading ? <><Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                disabled={ !loading }
                                            /> <span>&nbsp;&nbsp;&nbsp;</span></> : ''
                                        }
                                        ????ng k??
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Index

Index.getLayout = function getLayout ( page )
{
    return (
        <Layout header={ page.props.header } footer={ page.props.footer }>
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