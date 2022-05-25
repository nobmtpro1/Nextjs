import Link from 'next/link'
import React from 'react'
import { BUSINESS_HOME } from '../../../constants/route'

const Area4 = ( { styles, staticContent } ) =>
{
    return (
        <div className={ `${ styles.area4_1 }` }>
            <div className={ `${ styles.image_2 }` }>
                <img alt='' src='/images/main/home-6.jpg' />
            </div>
            <div className={ `${ styles.text_2 }` }>
                <h2 className={ `${ styles.title_3 }` }>
                    { staticContent?.area4?.title }
                </h2>
                <p className={ `${ styles.content_3 }` }>
                    { staticContent?.area4?.content }
                </p>
                <div className={ `${ styles.button_3 }` }>
                    <Link href={ BUSINESS_HOME } passHref>
                        <a href='#'>Xem thêm</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Area4