import React from 'react'

const PopupTooltip = ( { styles } ) =>
{
    return (
        <div className={ `${ styles.popup_cancel_order } ` }>
            <div className={ styles.box }>
                <div className={ styles.title }>
                    Số lượng AIM coin bạn có thể sử dụng
                    tối đa trong đơn hàng này
                </div>
                <div className={ styles.buttons }>
                    <button className={ styles.button }>
                    Tìm hiểu
                    </button>
                    <button className={ styles.button }>
                    Đồng ý
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopupTooltip
