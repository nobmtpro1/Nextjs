import React from 'react'

const Total = ( { data, styles, isUseCoin, voucher, handleUseCoin, quantity, subtotal, discount, discountVoucher, total } ) =>
{
   
    return (
        <>
            <div className={ styles.total_3 }>
                <div className={ styles.head_4 }>
                    Tổng cộng
                </div>
                <div className={ styles.body_4 }>
                    <div className={ styles.row_5 }>
                        <div className={ styles.col_6 }>
                            Tổng đơn hàng ({ quantity || 0 } sản phẩm)
                        </div>
                        <div className={ styles.col_6 }>
                            { subtotal || 0 } VNĐ
                        </div>
                    </div>
                    <div className={ styles.row_5 }>
                        <div className={ styles.col_6 }>
                            <span>Discount (trên tổng đơn)</span>
                            <div className={ styles.question_7 }>
                                <img alt='' src='/images/main/cart-question.svg' />
                                <div className={ styles.tooltip_8 }>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </div>
                        </div>
                        <div className={ styles.col_6 }>
                            { discount || 0 }%
                        </div>
                    </div>
                    <div className={ styles.row_5 }>
                        <div className={ styles.col_6 }>
                            <span className={ `${ styles.image_7 }` }>
                                <img alt='' src='/images/main/cart-voucher.svg' />
                            </span>  <span>Voucher</span>
                            <div className={ styles.question_7 }>
                                <img alt='' src='/images/main/cart-question.svg' />
                                <div className={ styles.tooltip_8 }>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </div>
                        </div>
                        <div className={ styles.col_6 }>
                            { discountVoucher } VNĐ
                        </div>
                    </div>
                    <div className={ styles.row_5 }>
                        <div className={ styles.col_6 }>
                            Dùng 10000 AIM coin
                            <div className={ styles.question_7 }>
                                <img alt='' src='/images/main/cart-question.svg' />
                                <div className={ styles.tooltip_8 }>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </div>
                        </div>
                        <div className={ styles.col_6 }>
                            <span className={ styles.value_7 }>(-{ ( 10000 * data?.discountByAimCoin ).format( 0, 3, '.' ) }đ)</span>
                            <div className={ `${ styles.switch_7 } ${ isUseCoin && styles.active }` } onClick={ handleUseCoin }>
                                <input type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div className={ styles.row_5 }>
                        <div className={ styles.col_6 }>
                            Tổng cộng
                        </div>
                        <div className={ styles.col_6 }>
                            { total || 0 } VNĐ
                        </div>
                    </div>
                </div>
            </div>
          
        </>
    )
}

export default Total