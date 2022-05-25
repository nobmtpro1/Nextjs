import styles from '../../styles/main/payment_membership.module.scss'
import React, { useEffect, useState } from 'react'
import AuthUser from '../../components/auths/AuthUser';
import Layout from '../../components/layouts/Layout';
import HeadTag from '../../components/global/HeadTag'
import { CART_MEMBERSHIP } from '../../constants/route';
import { useRouter } from 'next/router';
import axios from '../../sevices/axios';
import { formatPrice } from '../../utils/helper';
import Breadcrumb from '../../components/pages/cart/Breadcrumb'

const Index = () =>
{
    formatPrice()
    const router = useRouter()
    const isUseCoin = router.query.isUseCoin == "true" ? true : null
    const voucher = router.query.voucher || null
    const quantity = router.query.quantity || null
    const quantityMonth = router.query.quantityMonth || null
    const action = router.query.action || null

    const [ data, setData ] = useState( null )
    const [ payment, setPayment ] = useState( 0 )
    const [ paymentMethod, setPaymentMethod ] = useState( 1 )

    useEffect( () =>
    {
        axios.post( `page/cart/membership`, {
            quantity, quantityMonth, voucher, isUseCoin, action
        } ).then( response =>
        {
            setData( response.data )
        } ).catch( error => { } )
    }, [ router, isUseCoin, voucher ] )

    const handleOrder = () =>
    {
        if ( !data?.user?.cart_phone?.length && !data?.user?.phone?.length )
        {
            alert( 'Bạn chưa nhập số điện thoại' )
            router.push( {
                pathname: CART_MEMBERSHIP
            } )
            return false
        }

        axios.post( 'page/cart/membership/order', { quantity, quantityMonth, voucher, isUseCoin, paymentMethod, action } ).then( response =>
        {
            window.location.href = response.data?.data
        } ).catch( error =>
        {
            alert( 'Xảy ra lỗi' )
        } )
    }


    return (
        <div className={ styles.container }>

            <HeadTag title="AIM E-learning | Giỏ hàng" />

            <AuthUser>
                <div className={ styles.cart_page }>

                    <Breadcrumb styles={ styles } />

                    <div className={ styles.boxes_1 }>
                        <div className={ styles.left_2 }>
                            <div className={ styles.head_3 }>

                                <div className={ styles.text_4 }>
                                    Tất cả sản phẩm
                                </div>
                                <div className={ styles.text_4 }>
                                    Đơn giá
                                </div>
                                <div className={ styles.text_4 }>
                                    Số lượng <br />
                                    tài khoản
                                </div>
                                <div className={ styles.text_4 }>
                                    Thành tiền
                                </div>
                                <div className={ styles.text_4 }>
                                    Thời hạn
                                </div>
                            </div>
                            <div className={ styles.body_3 }>
                                <div className={ styles.col_4 }>
                                    <div className={ styles.image_5 }>
                                        <img alt='' src='/images/main/cart-1.png' />
                                    </div>
                                    <div className={ styles.text_5 }>
                                        {
                                            !data?.membership ? 'Membership' :
                                                ( data?.membership && action == 0 ) ? 'Gia hạn' : ( data?.membership && action == 1 ) ? 'Mua thêm tài khoản' : ''
                                        }
                                    </div>
                                </div>
                                <div className={ styles.col_4 }>
                                    { data?.unitPrice?.format( 0, 3, "," ) } đ
                                </div>
                                <div className={ styles.col_4 }>
                                    { data?.quantity }
                                </div>
                                <div className={ styles.col_4 }>
                                    <span> { data?.discountValue > 0 && data?.subtotal?.format( 0, 3, "," ) + " đ" } </span>{ data?.total?.format( 0, 3, "," ) } đ
                                </div>
                                <div className={ styles.col_4 }>
                                    { data?.quantityMonth } tháng
                                </div>
                            </div>
                            <div className={ styles.payment_3 }>
                                <div className={ styles.row1_4 }>
                                    <div className={ `${ styles.text_5 } ${ payment == 0 && styles.active }` } onClick={ () => setPayment( 0 ) }>
                                        Trả thẳng 100%
                                    </div>
                                    {/* <div className={ `${ styles.text_5 } ${ payment == 1 && styles.active }` } onClick={ () => setPayment( 1 ) }>
                                        Trả góp
                                    </div> */}
                                </div>
                                <div className={ styles.row2_4 }>
                                    <div className={ `${ styles.row1_5 } ${ payment == 0 && styles.active }` }>
                                        <div className={ styles.row1_6 }>
                                            {/* <div className={ styles.col1_7 }>
                                            <input type="checkbox" />
                                        </div> */}
                                            <div className={ styles.col2_7 }>
                                                <div className={ styles.row1_8 }>
                                                    Thanh toán quét mã VNPAY
                                                </div>
                                                <div className={ styles.row2_8 }>
                                                    Bạn có thể thanh toán nhanh bằng quét mã QR qua VNPAY
                                                </div>
                                                <div className={ styles.row3_8 }>
                                                    <img alt='' src='/images/main/payment-1.png' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={ styles.row1_6 }>
                                            {/* <div className={ styles.col1_7 }>
                                            <input type="checkbox" />
                                        </div> */}
                                            <div className={ styles.col2_7 }>
                                                <div className={ styles.row1_8 }>
                                                    Thẻ ATM qua cổng OnePay
                                                </div>
                                                <div className={ styles.row2_8 }>
                                                    Bạn phải có thông tin thẻ và tài khoản Internet Banking.
                                                </div>
                                                <div className={ styles.row3_8 }>
                                                    <img alt='' src='/images/main/payment-2.png' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={ `${ styles.row1_5 } ${ payment == 1 && styles.active }` }>
                                        <div className={ styles.fundiin_6 }>
                                            <div className={ styles.title_7 }>
                                                Trả góp qua Fundiin
                                            </div>
                                            <div className={ styles.description_7 }>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus egestas consectetur fermentum rhoncus lectus. Tincidunt egestas semper venenatis magnis faucibus lectus. Id fames nibh venenatis a purus fames mauris lorem in. Pellentesque sit viverra sed sed ac arcu. Senectus nulla neque, sed aliquam egestas sagittis accumsan placerat.
                                            </div>
                                            <div className={ styles.image_7 }>
                                                <img alt='' src='/images/main/payment-3.png' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={ styles.policy_3 }>
                                By completing your purchase you agree to these <a href='#'>Terms of Service.</a>
                            </div>
                            <div className={ styles.button_3 }>
                                <button onClick={ handleOrder }>Xác thực thanh toán</button>
                            </div>
                        </div>
                        <div className={ styles.right_2 }>
                            <div className={ styles.info_3 }>
                                <div className={ styles.head_4 }>
                                    <div className={ styles.title_5 }>
                                        Thông tin mua hàng
                                    </div>
                                </div>
                                <form className={ `${ styles.form_4 }` }>
                                    <div className={ `${ styles.input }` }>
                                        <div className={ `${ styles.placeholder }` }>{ data?.user?.cart_fullname || data?.user?.fullname }</div>
                                        <input disabled />
                                    </div>
                                    <div className={ `${ styles.input }` }>
                                        <div className={ `${ styles.placeholder }` }>{ data?.user?.cart_phone || data?.user?.phone }</div>
                                        <input disabled />
                                    </div>
                                    <div className={ `${ styles.input }` }>
                                        <div className={ `${ styles.placeholder }` }>{ data?.user?.cart_email || data?.user?.email }</div>
                                        <input disabled />
                                    </div>
                                </form>
                            </div>
                            <div className={ styles.order_mb_3 }>
                                <div className={ styles.row1_4 }>
                                    <div className={ styles.col1_5 }>
                                        <img alt='' src='/images/main/cart-mb-1.png' />
                                    </div>
                                    <div className={ styles.col2_5 }>
                                        <div className={ styles.row1_6 }>
                                            Membership
                                        </div>
                                        <div className={ styles.row2_6 }>
                                            <span>Thời hạn: { data?.quantityMonth } tháng</span>
                                        </div>
                                        <div className={ styles.row3_6 }>
                                            Đơn giá: { data?.unitPrice?.format( 0, 3, "," ) } VNĐ
                                        </div>
                                        <div className={ styles.row4_6 }>
                                            <div className={ styles.col1_7 }>
                                                Số lượng tài khoản: { data?.quantity }
                                            </div>
                                            <div className={ styles.col2_7 }>
                                                <div className={ styles.row1_8 }>
                                                    { data?.discountValue > 0 && data?.subtotal?.format( 0, 3, "," ) + " VNĐ" }
                                                </div>
                                                <div className={ styles.row2_8 }>
                                                    { data?.total?.format( 0, 3, "," ) } VNĐ
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={ styles.total_3 }>
                                <div className={ styles.head_4 }>
                                    Tổng cộng
                                </div>
                                <div className={ styles.body_4 }>
                                    <div className={ styles.row_5 }>
                                        <div className={ styles.col_6 }>
                                            Tổng đơn hàng (1 sản phẩm)
                                        </div>
                                        <div className={ styles.col_6 }>
                                            { data?.subtotal?.format( 0, 3, '.' ) } VNĐ
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
                                            { data?.discountValue }%
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
                                            { ( data?.discountVoucher || 0 ).format( 0, 3, '.' ) } VNĐ
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
                                            <div className={ `${ styles.switch_7 } ${ isUseCoin && styles.active }` }>
                                                <input type="checkbox" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={ styles.row_5 }>
                                        <div className={ styles.col_6 }>
                                            Tổng cộng
                                        </div>
                                        <div className={ styles.col_6 }>
                                            { data?.total?.format( 0, 3, '.' ) } VNĐ
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={ styles.payment_mb_3 }>
                                <div className={ styles.row1_4 }>
                                    <select onChange={ e => setPayment( e.target.value ) }>
                                        <option value={ 0 }>Trả thẳng</option>
                                        {/* <option value={ 1 }>Trả góp</option> */}
                                    </select>
                                </div>
                                <div className={ styles.row2_4 }>
                                    <div className={ `${ styles.row1_5 } ${ payment == 0 && styles.active }` }>
                                        <div className={ styles.row1_6 }>
                                            {/* <div className={ styles.col1_7 }>
                                            <input type="checkbox" />
                                        </div> */}
                                            <div className={ styles.col2_7 }>
                                                <div className={ styles.row1_8 }>
                                                    Thanh toán quét mã VNPAY
                                                </div>
                                                <div className={ styles.row2_8 }>
                                                    Bạn có thể thanh toán nhanh bằng quét mã QR qua VNPAY
                                                </div>
                                                <div className={ styles.row3_8 }>
                                                    <img alt='' src='/images/main/payment-1.png' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={ styles.row1_6 }>
                                            {/* <div className={ styles.col1_7 }>
                                            <input type="checkbox" />
                                        </div> */}
                                            <div className={ styles.col2_7 }>
                                                <div className={ styles.row1_8 }>
                                                    Thẻ ATM qua cổng OnePay
                                                </div>
                                                <div className={ styles.row2_8 }>
                                                    Bạn phải có thông tin thẻ và tài khoản Internet Banking.
                                                </div>
                                                <div className={ styles.row3_8 }>
                                                    <img alt='' src='/images/main/payment-2.png' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={ `${ styles.row1_5 } ${ payment == 1 && styles.active }` }>
                                        <div className={ styles.fundiin_6 }>
                                            <div className={ styles.title_7 }>
                                                Trả góp qua Fundiin
                                            </div>
                                            <div className={ styles.description_7 }>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus egestas consectetur fermentum rhoncus lectus. Tincidunt egestas semper venenatis magnis faucibus lectus. Id fames nibh venenatis a purus fames mauris lorem in. Pellentesque sit viverra sed sed ac arcu. Senectus nulla neque, sed aliquam egestas sagittis accumsan placerat.
                                            </div>
                                            <div className={ styles.image_7 }>
                                                <img alt='' src='/images/main/payment-3.png' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={ styles.policy_mb_3 }>
                                By completing your purchase you agree to these <a href='#'>Terms of Service.</a>
                            </div>
                            <div className={ styles.button_mb_3 }>
                                <button onClick={ handleOrder }>Xác thực thanh toán</button>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthUser>
        </div>
    )
}



export default Index

Index.getLayout = function getLayout ( page )
{
    return (
        <Layout header={ page.props.header } footer={ page.props.footer }>
            { page }
        </Layout>
    )
}

export async function getStaticProps ()
{
    return {
        props: {},
    }
}
