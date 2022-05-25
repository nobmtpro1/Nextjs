import React, { useState } from 'react'
import styles from '../../styles/main/components/discount_list.module.scss'
import { formatPrice } from '../../utils/helper'


const DiscountList = ( { active, setActive, data } ) =>
{
    formatPrice()
    const [ tab, setTab ] = useState( 0 )

    const handleClose = () =>
    {
        setActive( false )
    }

    return (
        <div className={ `${ styles.discount_list } ${ active && styles.active }` }>
            <div className={ styles.box }>
                <div className={ styles.head }>
                    <div className={ styles.title }>
                        <div className={ styles.left }>
                            Bảng giá chiết khấu
                        </div>
                        <div className={ styles.right } onClick={ handleClose }>
                            <img alt='' src='/images/main/discount-list-1.svg' />
                        </div>
                    </div>
                    <div className={ styles.description }>
                        Bạn càng mua nhiều bài học, nhiều tài khoản, mức giá sẽ càng hấp dẫn.
                    </div>
                    <div className={ styles.list }>
                        <div className={ styles.row }>
                            <p> <b> Mua nhiều bài học là như thế nào?</b></p>
                            <p>  <b>Những nguyên tắc cơ bản về website</b> được tính là một bài học, bạn có thể tham khảo và mua thêm các bài học khác để nâng cao kiến thức cũng như nhận nhiều ưu đãi.</p>
                        </div>
                        <div className={ styles.row }>
                            <p> <b> Mua nhiều tài khoản là như thế nào?</b></p>
                            <p>Mỗi tài khoản tương ứng với 1 người học. Với chương trình học elearning của AIM Academy, bạn có thể mua cùng lúc nhiều tài khoản để học theo nhóm cùng bạn bè.</p>
                        </div>
                    </div>
                </div>

                <div className={ styles.body }>
                    <div className={ styles.menu }>
                        <div className={ `${ styles.text } ${ tab == 0 && styles.active }` } onClick={ () => setTab( 0 ) } >
                            Lifetime
                        </div>
                        <div className={ `${ styles.text } ${ tab == 1 && styles.active }` } onClick={ () => setTab( 1 ) } >
                            Membership
                        </div>
                    </div>

                    <div className={ styles.content }>
                        <div className={ `${ styles.content1 } ${ tab == 0 && styles.active }` }>
                            <p><b>Nguyên tắc chiết khẩu</b></p>

                            <p>Trong 1 lần giao dịch, việc giảm giá được áp dụng theo trình tự như sau:</p>

                            <p><b>(1) Giảm giá trên số tài khoản:</b> Giảm giá được áp dụng trên đơn vị bài học. Mức giảm sẽ tương ứng theo từng khung bậc số lượng tài khoản mà không phụ thuộc vào số lượng bài học, cũng như không cộng dồn số lượng tài khoản thuộc các bài học khác nhau.</p>

                            <div className={ styles.table }>
                                <div className={ styles.head }>
                                    <div className={ styles.tr }>
                                        <div className={ styles.td }>
                                            Số lượng tài khoản
                                        </div>
                                        <div className={ styles.td }>
                                            Mức giảm giá
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles.body }>
                                    {
                                        data?.discountBySlot?.map( ( e, i ) => (
                                            <div className={ styles.tr } key={ i }>
                                                <div className={ styles.td }>
                                                    { e?.from }-{ e?.to }
                                                </div>
                                                <div className={ styles.td }>
                                                    { e?.value }%/bài học
                                                </div>
                                            </div>
                                        ) )
                                    }
                                </div>
                            </div>

                            <p><b>(2) Giảm giá theo số bài học:</b> Giảm giá được áp dụng sau cùng và 1 lần trên tổng giá trị đơn hàng. Mức giảm sẽ tương ứng theo từng khung bậc số lượng bài học sau khi cộng dồn số lượng các bài học khác nhau.</p>

                            <p>Không cộng dồn các mức giảm giá cho những đơn hàng khác nhau.</p>

                            <div className={ styles.table }>
                                <div className={ styles.head }>
                                    <div className={ styles.tr }>
                                        <div className={ styles.td }>
                                            Số lượng bài học
                                        </div>
                                        <div className={ styles.td }>
                                            Mức giảm giá
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles.body }>
                                    {
                                        data?.discountBySession?.map( ( e, i ) => (
                                            <div className={ styles.tr } key={ i }>
                                                <div className={ styles.td }>
                                                    { e?.from }-{ e?.to }
                                                </div>
                                                <div className={ styles.td }>
                                                    { e?.value }%/tổng đơn hàng
                                                </div>
                                            </div>
                                        ) )
                                    }
                                </div>
                            </div>

                        </div>
                        <div className={ `${ styles.content2 } ${ tab == 1 && styles.active }` }>
                            <p>Với hình thức membership, bạn được truy cập vào tất cả các bài học trên hệ thống AIM Elearning. Càng đăng ký nhiều tài khoản, giá mua sẽ càng “mềm”.</p>
                            <div className={ styles.table }>
                                <div className={ styles.head }>
                                    <div className={ styles.tr }>
                                        <div className={ styles.td }>
                                            &nbsp;
                                        </div>
                                        {
                                            data?.discountMembershipRange?.map( ( e, i ) => (
                                                <div className={ styles.td } key={ i }>
                                                    {
                                                        e?.from == e?.to ? e?.from : e?.from + " - " + e?.to
                                                    }   tài khoản
                                                </div>
                                            ) )
                                        }
                                    </div>
                                </div>
                                <div className={ styles.body }>
                                    {
                                        data?.discountMembershipMonth?.map( ( e, i ) => (
                                            <div className={ styles.tr } key={ i }>
                                                <div className={ styles.td }>
                                                    { e?.month } tháng
                                                </div>
                                                {
                                                    data?.discountMembershipRange?.map( ( x, i ) =>
                                                    {
                                                        var discount = data?.discountMembership?.find( y => y.discount_membership_month_id == e.id && y.discount_membership_range_id == x.id )
                                                        return (
                                                            <div className={ styles.td } key={ i } >
                                                                {
                                                                    discount?.value != 0
                                                                        ?
                                                                        `Giảm ${ discount?.value }%/tổng đơn hàng`
                                                                        :
                                                                        `${ e?.price.format( 0, 3, "," ) } VNĐ/tài khoản/tháng`
                                                                }
                                                            </div>
                                                        )
                                                    } )
                                                }
                                            </div>
                                        ) )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscountList
