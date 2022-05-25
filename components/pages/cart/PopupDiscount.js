import React from 'react'

const PopupDiscount = ( { styles } ) =>
{
    return (
        <div className={ `${ styles.popup_cancel_order }` }>
            <div className={ styles.box }>
                <div className={ styles.image }>
                    <div>
                        <img alt='' src='/images/main/cart-discount.svg' />
                    </div>
                </div>
                <div className={ styles.discount_text }>
                    Chúc mừng, bạn đã giảm được 5%
                </div>
            </div>
        </div>
    )
}

export default PopupDiscount
