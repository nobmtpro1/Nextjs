import axios from '../../../../sevices/axios';
import React, { useState } from 'react';
import styles from '../../../../styles/concern_dashboard/components/popup_add_plan.module.scss'

const PopupAddPlan = ( { showPopupAddPlan, setShowPopupAddPlan, setData } ) =>
{
    const [ form, setForm ] = useState( {
        name: '',
        from: '',
        to: '',
    } )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/business/study-plan/add-plan', form ).then( response =>
        {
            alert( 'Thêm thành công' )
            setForm( {
                name: '',
                from: '',
                to: '',
            } )
            setShowPopupAddPlan( false )

            setData( prev => ( {
                ...prev,
                plan: [ response.data, ...prev?.plan ],
            } ) )
        } ).catch( error =>
        {
            if ( error.response?.data?.message )
            {
                alert(error.response?.data?.message  )
            }

        } )
    }

    return (
        <div className={ `${ styles.container } ${ showPopupAddPlan && styles.active }` }>
            <form className={ styles.form } onSubmit={ handleSubmit }>
                <div className={ styles.input }>
                    <div className={ styles.button } onClick={ () => setShowPopupAddPlan( false ) }>
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
                    <button>Thêm</button>
                </div>
            </form>
        </div>
    )
};

export default PopupAddPlan;
