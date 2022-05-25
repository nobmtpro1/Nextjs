import axios from '../../../sevices/axios'
import React, { useEffect, useState } from 'react'

const Information = ( { styles, data, setData } ) =>
{
    const [ editForm, setEditForm ] = useState( false )
    const [ formEdit, setFormEdit ] = useState( {
        fullname: "",
        phone: "",
        email: ""
    } )

    useEffect( () =>
    {
        setFormEdit( {
            fullname: data?.user?.cart_fullname || data?.user?.fullname,
            phone: data?.user?.cart_phone || data?.user?.phone,
            email: data?.user?.cart_email || data?.user?.email,
        } )
    }, [ data?.user ] )

    const handleUpdateInfo = () =>
    {
        axios.post( 'page/cart/lifetime/update-info', formEdit ).then( response =>
        {
            setData( prev => ( {
                ...prev,
                user: response.data
            } ) )
            setEditForm( false )
        } ).catch( error => { } )
    }

    return (
        <div className={ styles.info_3 }>
            <div className={ styles.head_4 }>
                <div className={ styles.title_5 }>
                    Thông tin mua hàng
                </div>
                <a onClick={ () => setEditForm( prev => !prev ) } style={ { cursor: 'pointer' } } className={ styles.edit_5 }>
                    <img alt='' src='/images/main/cart-edit.svg' />
                </a>
            </div>
            <div hidden={ editForm } className={ `${ styles.form_4 }` }>
                <div className={ `${ styles.input }` }>

                    <input disabled placeholder='Họ và tên' value={ data?.user?.cart_fullname || data?.user?.fullname } />
                </div>
                <div className={ `${ styles.input }` }>

                    <input disabled placeholder='Số điện thoại' value={ data?.user?.cart_phone || data?.user?.phone } />
                </div>
                <div className={ `${ styles.input }` }>

                    <input disabled placeholder='Email' value={ data?.user?.cart_email || data?.user?.email } />
                </div>
            </div>
            <div hidden={ !editForm } className={ `${ styles.form_4 }` }>
                <div className={ `${ styles.input }` }>

                    <input placeholder='Họ và tên' value={ formEdit?.fullname } onChange={ e => setFormEdit( prev => ( { ...prev, fullname: e.target.value } ) ) } />
                </div>
                <div className={ `${ styles.input }` }>

                    <input placeholder='Số điện thoại' value={ formEdit?.phone } onChange={ e => setFormEdit( prev => ( { ...prev, phone: e.target.value } ) ) } />
                </div>
                <div className={ `${ styles.input }` }>

                    <input placeholder='Email' value={ formEdit?.email } onChange={ e => setFormEdit( prev => ( { ...prev, email: e.target.value } ) ) } />
                </div>
                <div className={ styles.buttons }>
                    <button className={ styles.update } onClick={ handleUpdateInfo }>Cập nhật</button>
                    <button className={ styles.cancel } onClick={ () => setEditForm( prev => !prev ) } style={ { cursor: 'pointer' } } >Huỷ bỏ</button>
                </div>
            </div>
        </div>
    )
}

export default Information