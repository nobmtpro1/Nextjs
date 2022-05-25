import React from 'react'
import { useSelector } from 'react-redux'
import { PRODUCT_SESSION } from '../../../constants/route'
import Link from 'next/link'

const Banner = ( { styles } ) =>
{
    const { data } = useSelector( state => state.account.user )

    return (
        <div className={ styles.banner } >
            <div className={ styles.title }>Xin chào, <span className={ styles.name }>{ data?.business?.company }</span></div>
            <div className={ styles.description }>Chào mừng bạn đến với trình quản lý elearning dành cho cá nhân. Bạn có thể cập nhật tài khoản, hồ sơ, cũng như quản lý các bài học, khóa học và đơn hàng đã mua. Đừng quên khám phá thêm nhiều bài học hấp dẫn khác. khám phá thêm nhiều bài học hấp dẫn kháckhám phá thêm nhiều bài học hấp dẫn kháckhám phá thêm nhiều bài học hấp dẫn kháckhám phá thêm nhiều bài học hấp dẫn kháckhám phá thêm nhiều bài học hấp dẫn kháckhám phá thêm nhiều bài học hấp dẫn kháckhám phá thêm nhiều bài học hấp dẫn khác</div>
            <Link href={ PRODUCT_SESSION } passHref>
                <a className={ styles.link } href='#'><span>Khám phá</span></a>
            </Link>
        </div>
    )
}

export default Banner