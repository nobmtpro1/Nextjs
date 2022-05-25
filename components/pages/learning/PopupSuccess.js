import styles from '../../styles/document/popup.module.scss'

import React, { useState } from "react";



const PopupSuccess = ( { open, setOpen } ) =>
{

    const handleClickOut = ( e ) =>
    {
        if ( e.target.className.includes( 'out' ) )
        {
            setOpen( false )
        }
    }

    return (
        <div className={ `document-popup-success out ${ open ? 'active' : '' }` } onClick={ handleClickOut }>
            <div className={ `box` }>
                <div className={ 'title' }>
                Chúc mừng bạn đã hoàn thành bài.
                </div>
                <div className="circle">
                    <div className={ 'text' }>
                        +100
                        AIM coin
                    </div>
                </div>
                <div className={ 'text' }>
                Bắt tay vào những bài tiếp theo để nhận thêm nhiều AIM coin nhé.
                </div>
                <div className={ 'button' }>
                    <div className={ 'left' }>
                        <button>My Elearning</button>
                    </div>
                    <div className={ 'right' }>
                        <button>Tìm hiểu thêm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupSuccess

