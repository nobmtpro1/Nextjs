import styles from '../../../../styles/document/popup.module.scss'

import React, { useState } from "react";



const PopupSaved = ( { open, setOpen } ) =>
{

    const handleClickOut = ( e ) =>
    {
        if ( e.target.className.includes( 'out' ) )
        {
            setOpen( false )
        }
    }

    return (
        <div className={ `document-popup-saved out ${ open ? 'active' : '' }` } onClick={ handleClickOut }>
            <div className={ `box` }>
                <div className={ 'image' }>
                    <img alt='' src="/images/document-popup-saved.png" />
                </div>
                <div className={ 'text' }>
                    Bạn đã lưu thành công
                </div>
            </div>
        </div>
    )
}

export default PopupSaved

