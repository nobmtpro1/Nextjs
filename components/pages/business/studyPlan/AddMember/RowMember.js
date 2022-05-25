import axios from '../../../../../sevices/axios';
import React from 'react';

const RowMember = ( { data, styles, id, setData } ) =>
{
    const handleDelete = () =>
    {
        axios.post( 'page/business/study-plan/delete-member/' + id, { member_id: data?.id } ).then( response =>
        {
            setData( response.data?.plan )
           
        } ).catch( error =>
        { } )
    }

    return (
        <div className={ styles.content_lesson }>
            <div className={ styles.text_2 }>
                <span>{ data?.fullname }</span>
            </div>
            <div className={ styles.text_2 }>
                <span>{ data?.email }</span>
            </div>
            <div className={ styles.text_2 } >
                <button onClick={ handleDelete }>
                    <img src="/images/bin.svg" alt="" />
                </button>
            </div>
        </div>
    );
};

export default RowMember;
