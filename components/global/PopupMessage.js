import React from "react";

const PopupMessage = ( {  title, content,open,setOpen } ) =>
{
    return (
        <div className={ `popup-message out ${ open ? 'active' : '' }` }>
            <div className={ `box` }>
                <div className={ 'title' }>
                    { title }
                </div>
                <div className={ 'text' }>
                    { content }
                </div>
                <div className={ 'button' }>
                    <div className={ 'right' }>
                        <button onClick={ () => setOpen( false ) }>Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupMessage

