import React from 'react'

const Voucher = ( { styles, voucher, setVoucher } ) =>
{
    return (
        <div className={ styles.voucher_3 }>
            <div className={ `${ styles.image_4 }` }>
                <img alt='' src='/images/main/cart-voucher.svg' /> <span>Aim voucher</span>
            </div>
            <form className={ `${ styles.form_4 }` }>
                <div className={ `${ styles.input }` }>
                    <input placeholder='AIM Voucher' value={ voucher || "" } onChange={ e => setVoucher( e.target.value ) } />
                </div>
            </form>
        </div>
    )
}

export default Voucher