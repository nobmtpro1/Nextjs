import axios from '../../../../../sevices/axios';
import React, { useEffect, useState } from 'react';
import styles from '../../../../../styles/concern_dashboard/components/popup_add_plan.module.scss'

const PopupEditPlan = ( { showPopupEditPlan, setShowPopupEditPlan, setData, data } ) =>
{
    const [ form, setForm ] = useState( {
        name: data?.name || '',
        from: data?.from|| '',
        to: data?.to|| '',
    } )

    useEffect( () =>
    {
        setForm( {
            name: data?.name || '',
            from: data?.from || '',
            to: data?.to || '',
        } )
    }, [ data ] );

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/business/study-plan/edit-plan/' + data?.id, form ).then( response =>
        {
            alert( 'Sửa thành công' )
            setShowPopupEditPlan( false )
            setData(response.data  )
        } ).catch( error =>
        {
            if ( error.response?.data?.message )
            {
                alert( error.response?.data?.message )
            }

        } )
    }

    return (
        <div className={ `${ styles.container } ${ showPopupEditPlan && styles.active }` }>
            <form className={ styles.form } onSubmit={ handleSubmit }>
                <div className={ styles.input }>
                    <div className={ styles.button } onClick={ () => setShowPopupEditPlan( false ) }>
                        <img alt='' src='/images/main/learning-12.svg' />
                    </div>
                </div>
                <div className={ styles.input }>
                    <input required placeholder='Tên' value={ form?.name } onChange={ e => setForm( prev => ( { ...prev, name: e.target.value } ) ) } />
                </div>
                <div className={ styles.input }>
                    <input required type="text" onBlur={ e => { e.target.type = 'text' } } onFocus={ e => { e.target.type = 'date' } } placeholder='Bắt đầu' value={ form?.from } onChange={ e => setForm( prev => ( { ...prev, from: e.target.value } ) ) } />
                </div>
                <div className={ styles.input }>
                    <input required type="text" onBlur={ e => { e.target.type = 'text' } } onFocus={ e => { e.target.type = 'date' } } placeholder='Kết thúc' value={ form?.to } onChange={ e => setForm( prev => ( { ...prev, to: e.target.value } ) ) } />
                </div>
                <div className={ styles.input }>
                    <button>Sửa</button>
                </div>
            </form>
        </div>
    )
};

export default PopupEditPlan;
