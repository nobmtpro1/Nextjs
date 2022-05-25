import styles from '../../../../styles/concern_dashboard/components/popup_add_admin.module.scss'
import React, { useState } from 'react';
import axios from '../../../../sevices/axios';

const PopupAddAdmin = ( { active, setActive, setData } ) =>
{
    const [ email, setEmail ] = useState( '' )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/business/profile/admin/add', { email } ).then( response =>
        {
            alert( 'Thêm thành công' )
            setData( response.data )
        } ).catch( error =>
        {
            alert( 'Người dùng không tồn tại hoặc đã sở hữu gói Membership' )
        } )
    }

    return (
        <div className={ `${ styles.container } ${ active && styles.active }` }>
            <form className={ styles.box } onSubmit={ handleSubmit }>
                <div className={ styles.head }>
                    <div className={ styles.title }>
                        Thêm admin
                    </div>
                    <div className={ styles.close } onClick={ () => setActive( false ) }>
                        <img src='/images/business/close.svg' alt='' />
                    </div>
                </div>
                <div className={ styles.input }>
                    <input required type="email" placeholder='Địa chỉ email' value={ email } onChange={ e => setEmail( e.target.value ) } />
                </div>
                <div className={ styles.button }>
                    <button>Thêm</button>
                </div>
            </form>
        </div>
    );
};

export default PopupAddAdmin;
