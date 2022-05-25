import Link from 'next/link'
import React from 'react'
import { BUSINESS_HOME, LOGIN } from '../../../constants/route'

const Banner = ( { styles, staticContent } ) =>
{
    return (
        <div className={ styles.banner_1 } >
            <div className={ styles.background_2 } >
                <img alt='' src={ process.env.IMG_URL + staticContent?.banner?.image } />
            </div>
            <h1 className={ styles.h1 }>
                <span className={ styles.title_2 } >
                    { staticContent?.banner?.text_normal }
                </span>
                <span className={ styles.description_2 } >
                    { staticContent?.banner?.text_color }
                </span>
            </h1>
            <div className={ styles.buttons_2 } >
                <Link href={ LOGIN } passHref>
                    <a href='#' className={ styles.login_3 } >
                        Đăng nhập
                    </a>
                </Link>

                <Link href={ BUSINESS_HOME } passHref>
                    <a href='#' className={ styles.business_3 } >
                        Doanh nghiệp
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Banner