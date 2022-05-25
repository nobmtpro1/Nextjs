import Link from 'next/link'
import React from 'react'
import { PRODUCT_SESSION } from '../../../constants/route'
import HeadTag from '../../global/HeadTag'

const EmptyCart = ( { styles } ) =>
{
    return (
        <div className={ styles.container }>

            <HeadTag title="AIM E-learning | Giỏ hàng" />

            <div className={ styles.cart_page }>
                <div className={ styles.breadcrumb_1 }>
                    <a href='#' className={ styles.link_2 }>
                        Trang chủ
                    </a>
                    <a href='#' className={ `${ styles.link_2 } ${ styles.active }` }>
                        Giỏ hàng
                    </a>
                </div>
                <div className={ styles.title_1 }>
                    Giỏ hàng
                </div>
                <div className={ styles.empty_1 }>
                    <div className={ styles.box }>
                        <div className={ styles.title_2 }>
                            Giỏ hàng của bạn còn trống
                        </div>
                        <div className={ styles.description_2 }>
                            Ghé xem các kho elearning của AIM Academy để tìm ra bài học bạn muốn mua nhé.
                        </div>
                        <div className={ styles.button_2 }>
                            <Link href={ PRODUCT_SESSION } passHref>
                                <a href='#'>Khám phá</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EmptyCart