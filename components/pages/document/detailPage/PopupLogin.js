import styles from '../../../../styles/document/popup.module.scss'

import React, { useState } from "react";
import { useRouter } from 'next/router';
import { LOGIN } from '../../../../constants/route';



const PopupLogin = ( { open, setOpen, url } ) =>
{
    const router = useRouter()

    const handleClickOut = ( e ) =>
    {
        if ( e.target.className.includes( 'out' ) )
        {
            setOpen( false )
        }
    }

    const handleClick = () =>
    {
        router.push( {
            pathname: LOGIN,
            query: {
                url: url
            }
        } )
    }

    return (
        <div className={ `document-popup-login out ${ open ? 'active' : '' }` } onClick={ handleClickOut }>
            <div className={ `box` }>
                <div className={ 'title' }>
                    Đăng nhập để tải tài liệu
                </div>
                <div className={ 'button' }>
                    <button onClick={ handleClick }>Đăng nhập ngay</button>
                </div>
            </div>
        </div>
    )
}

export default PopupLogin

