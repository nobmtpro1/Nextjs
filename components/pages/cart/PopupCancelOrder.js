import React from 'react'

const PopupCancelOrder = ( { styles } ) =>
{
    return (
        <div className={ `${styles.popup_cancel_order}` }>
            <div className={ styles.box }>
                <div className={ styles.title }>
                    Bạn muốn hủy đơn hàng
                </div>
                <div className={ styles.name }>
                    Khóa học Membership 01
                </div>
                <div className={ styles.buttons }>
                    <button className={ styles.button }>
                        Có
                    </button>
                    <button className={ styles.button }>
                        Không
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopupCancelOrder
