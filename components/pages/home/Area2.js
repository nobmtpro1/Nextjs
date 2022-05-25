import Link from 'next/link'
import React from 'react'
import { PRODUCT_COURSE } from '../../../constants/route'

const Area2 = ( { styles, staticContent } ) =>
{
    return (
        <div className={ `${ styles.area2_1 }` }>
            <div className={ `${ styles.image_2 }` }>
                <img alt='' src='/images/main/home-4.jpg' />
            </div>
            <div className={ `${ styles.text_2 }` }>
                <h2 className={ `${ styles.title_3 }` }>
                    { staticContent?.area2?.title }
                </h2>
                <p className={ `${ styles.content_3 }` }>
                    { staticContent?.area2?.content }
                </p>
                <div className={ `${ styles.button_3 }` }>
                    <Link href={ PRODUCT_COURSE } passHref>
                        <a href='#'>Tất cả khóa học</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Area2