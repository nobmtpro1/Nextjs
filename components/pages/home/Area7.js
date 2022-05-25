import axios from '../../../sevices/axios'
import React, { useEffect, useState } from 'react'
import { LINK_PRIVACY_POLICY, THANK_YOU } from '../../../constants/route'
import router from 'next/router'

const Area7 = ( { styles } ) =>
{

    const [ registerNewsletterData, setRegisterNewsletterData ] = useState( {
        name: '',
        email: '',
        is_in_marketing: ''
    } )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        axios.post( `page/home/newsletter`, registerNewsletterData ).then( response =>
        {
            router.push( {
                pathname: THANK_YOU,
                query: {
                    name: registerNewsletterData?.name,
                    email: registerNewsletterData?.email,
                }
            } )
        } ).catch( error =>
        {
            var msg = error.message
            var obj = null
            if ( obj = error?.response?.data?.message )
            {
                msg = obj[ Object.keys( obj )[ 0 ] ][ 0 ]
            }
            alert( msg )
        } )
    }

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
        <div className={ `${ styles.area7_1 }` }>
            <div className={ `${ styles.left_2 }` }>
                <h2 className={ `${ styles.title_3 }` }>
                    Đăng ký nhận bản tin
                </h2>
                <form className={ `${ styles.form_3 }` } onSubmit={ handleSubmit }>
                    <div className={ `${ styles.input }` }>
                        <div className={ `${ styles.placeholder }` }>Họ tên<span>*</span></div>
                        <input
                            required
                            value={ registerNewsletterData?.name }
                            onChange={ e => setRegisterNewsletterData( prev => ( { ...prev, name: e.target.value } ) ) }
                        />
                    </div>
                    <div className={ `${ styles.input }` }>
                        <div className={ `${ styles.placeholder }` }>Email<span>*</span></div>
                        <input
                            type="email"
                            required
                            value={ registerNewsletterData?.email }
                            onChange={ e => setRegisterNewsletterData( prev => ( { ...prev, email: e.target.value } ) ) }
                        />
                    </div>
                    <div className={ `${ styles.input }` }>
                        <div className={ `${ styles.placeholder }` }>Bạn có đang làm trong ngành Marketing & Communication không?<span>*</span></div>
                        <select
                            defaultValue=''
                            required
                            onChange={ e => setRegisterNewsletterData( prev => ( { ...prev, is_in_marketing: e.target.value } ) ) }
                        >
                            <option value='' disabled></option>
                            <option value={ 1 }>Có</option>
                            <option value={ 0 }>Không</option>
                        </select>
                    </div>
                    <div className={ `${ styles.policy }` }>
                        Khi điền và gửi thông tin, bạn đã đọc và chập thuận <a href={ LINK_PRIVACY_POLICY } target="_blank" rel="noreferrer">Chính sách bảo mật.</a>
                    </div>
                    <div className={ `${ styles.button }` }>
                        <button>Gửi đăng ký</button>
                    </div>
                </form>
            </div>
            <div className={ `${ styles.right_2 }` }>
                <img alt='' src='/images/main/home-17.jpg' />
            </div>
        </div>
    )
}

export default Area7