import Link from 'next/link'
import React from 'react'
import { PRODUCT_COURSE, PRODUCT_SESSION } from '../../../../constants/route'

const Menu = ( { styles, active } ) =>
{
    return (
        <div className={ styles.menu }>
            <Link href={ PRODUCT_SESSION } passHref>
                <div className={ `${ styles.text } ${ active == 1 ? styles.active : '' }` }>
                    Bài học
                </div>
            </Link>
            <Link href={ PRODUCT_COURSE } passHref>
                <div className={ `${ styles.text } ${ active == 2 ? styles.active : '' }` }>
                    Khóa học
                </div>
            </Link>
        </div>
    )
}

export default Menu