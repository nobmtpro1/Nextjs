import React from 'react';
import axios from '../../../../sevices/axios';

const RowAdmin = ( { styles, data,setData } ) =>
{

    const handleDelete = () =>
    {
        axios.post( 'page/business/profile/admin/delete', { user_id: data?.id } ).then( response =>
        {
            setData( response.data )
        } ).catch( error => { } )
    }

    return (
        <div className={ styles.content_admin }>
            <div className={ styles.text_2 }>
                <span>{ data?.email }</span>
            </div>
            {/* <div className={ styles.text_2 }>
                <span>30/08/2021</span>
            </div> */}

            <div className={ styles.text_2 }>
                <button style={ { background: 'none' } } onClick={ handleDelete }>
                    <img src="/images/bin.svg" alt="" />
                </button>
            </div>
        </div>
    );
};

export default RowAdmin;
