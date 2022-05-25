import Link from 'next/link'
import React from 'react'
import { HOME } from '../../../constants/route'

const Breadcrumb = ( { styles } ) =>
{
    return (
        <>
            <div className={ styles.breadcrumb_1 }>
                <Link href={ HOME } passHref>
                    <a href='#' className={ styles.link_2 }>
                        Trang chủ
                    </a>
                </Link>
                <a href='#' className={ `${ styles.link_2 } ${ styles.active }` }>
                    Giỏ hàng
                </a>
            </div>
            <div className={ styles.title_1 }>
                Giỏ hàng
            </div>
        </>
    )
}

export default Breadcrumb