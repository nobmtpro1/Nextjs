import React from 'react'

const PopupDiscussion = ( { styles, active, setActive } ) =>
{
    return (
        <div className={ `${ styles.popup_discussion } ${ active && styles.active }` }>
            <div className={ styles.box }>
                <div className={ styles.close }>
                    <div className={ styles.button } onClick={ () => setActive( false ) }>
                        <img alt='' src='/images/main/learning-12.svg' />
                    </div>
                </div>
                <div className={ styles.input }>
                    <textarea placeholder='Nhập thảo luận tại đây...' ></textarea>
                </div>
                <div className={ styles.button }>
                    Thêm thảo luận
                </div>
            </div>
        </div>
    )
}

export default PopupDiscussion
