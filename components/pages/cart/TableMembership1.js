import React from 'react'
import ProgressMembership from './ProgressMembership'

const TableMembership1 = ( { styles, data, minusQuantity, plusQuantity, quantity, handleChangeQuantity, minusMonth, plusMonth, quantityMonth, mobile } ) =>
{

    if ( mobile )
    {
        return (
            <div className={ styles.order_mb_3 }>
                <div className={ styles.row1_4 }>
                    <div className={ styles.col1_5 }>
                        <img alt='' src='/images/main/cart-mb-1.png' />
                    </div>
                    <div className={ styles.col2_5 }>
                        <div className={ styles.row1_6 }>
                            Membership
                        </div>
                        <div className={ styles.row3_6 }>
                            <div className={ styles.div }>
                                <div className={ styles.div2 }>Thời hạn:</div>
                                <div className={ styles.quantity_month }>
                                    <button onClick={ minusMonth }>-</button>
                                    <input type="number" value={ quantityMonth } />
                                    <button onClick={ plusMonth }>+</button>
                                </div>
                                <div className={ styles.div2 }>tháng</div>
                            </div>
                        </div>
                        <div className={ styles.row3_6 }>
                            Đơn giá:  { data?.unitPrice?.format( 0, 3, "," ) } đ
                        </div>
                        <div className={ styles.row4_6 }>
                            <div className={ styles.col1_7 }>
                                Số lượng tài khoản: &nbsp;
                                {
                                    data?.membership ? data?.membership?.number_of_slots :
                                        <div className={ styles.quantity_8 }>
                                            <button onClick={ minusQuantity }>-</button>
                                            <input type="number" value={ quantity } />
                                            <button onClick={ plusQuantity }>+</button>
                                        </div>
                                }
                            </div>
                            <div className={ styles.col2_7 }>
                                {/* <div className={ styles.row1_8 }>
                                    { data?.discountValue > 0 && data?.subtotal?.format( 0, 3, "," ) + " VNĐ" }
                                </div> */}
                                <div className={ styles.row2_8 }>
                                    { data?.subtotal?.format( 0, 3, "," ) } VNĐ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProgressMembership styles={ styles } mobile={ true } data={ data } />

            </div>
        )
    }

    return (
        <div className={ styles.body_3 }>
            <div className={ styles.col_4 }>
                <div className={ styles.image_5 }>
                    <img alt='' src='/images/main/cart-1.png' />
                </div>
                <div className={ styles.text_5 }>
                    Membership
                </div>
            </div>
            <div className={ styles.col_4 }>
                { data?.unitPrice?.format( 0, 3, "," ) } đ
            </div>
            <div className={ styles.col_4 }>
                <div className={ styles.quantity_5 }>
                    <button onClick={ minusQuantity }>-</button>
                    <input type="number" value={ quantity } onChange={ e => handleChangeQuantity( e.target.value ) } />
                    <button onClick={ plusQuantity }>+</button>
                </div>
            </div>
            <div className={ styles.col_4 }>
                {/* <span> { data?.discountValue > 0 && data?.subtotal?.format( 0, 3, "," ) + " đ" } </span> */ }
                { data?.subtotal?.format( 0, 3, "," ) } đ
            </div>
            <div className={ styles.col_4 }>
                <div className={ styles.quantity }>
                    <button onClick={ minusMonth }>-</button>
                    <input type="number" value={ quantityMonth } />
                    <button onClick={ plusMonth }>+</button>
                </div>
                <div className={ styles.month }>tháng</div>
            </div>

            <ProgressMembership styles={ styles } data={ data } />
        </div>
    )
}

export default TableMembership1