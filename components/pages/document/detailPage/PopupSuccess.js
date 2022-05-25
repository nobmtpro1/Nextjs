import styles from '../../../../styles/document/popup.module.scss'

import React, { useState } from "react";
import router from 'next/router';
import { GAMIFICATION } from '../../../../constants/route';


const PopupSuccess = ( { open, setOpen, aimCoin } ) =>
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
                    Chúc mừng bạn đã hoàn thành nhiệm vụ tải tài liệu.
                </div>
                <div className="circle">
                    <div className={ 'text' }>
                        +{ aimCoin } { ' ' }
                        AIM coin
                    </div>
                </div>
                <div className={ 'text' }>
                    Tiếp tục khám phá kho tài liệu để nhận thêm coin nhé!
                </div>
                <div className={ 'button' }>
                    <div className={ 'left' }>
                        <button onClick={() => router.push(GAMIFICATION)}>Tìm hiểu</button>
                    </div>
                    <div className={ 'right' }>
                        <button onClick={ () => setOpen( false ) }>Trở lại</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupSuccess

