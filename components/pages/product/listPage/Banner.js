import Link from 'next/link'
import React from 'react'
import { BUSINESS_HOME, LOGIN } from '../../../../constants/route'

const Banner = ( { styles, staticContent } ) =>
{
    return (
        <>
            <div className={ styles.banner } >
                <div className={ styles.background } >
                    <img alt='' src={ process.env.IMG_URL + staticContent?.banner?.image } />
                </div>
                <h1>
                    <div style={ { whiteSpace: 'pre-line' } } className={ styles.title } dangerouslySetInnerHTML={ { __html: staticContent?.banner?.text_normal } }>
                    </div>
                    <div style={ { whiteSpace: 'pre-line' } } className={ styles.description } >
                        {
                            staticContent?.banner?.text_color
                        }
                    </div>
                </h1>
                <div className={ styles.buttons } >
                    <Link href={ LOGIN } passHref>
                        <a href='#' className={ styles.login } >
                            Đăng nhập
                        </a>
                    </Link>
                    <Link href={ BUSINESS_HOME } passHref>
                        <a href='#' className={ styles.business } >
                            Doanh nghiệp
                        </a>
                    </Link>
                </div>
            </div>
            <div className={ styles.box_container }>
                <div className={ styles.box }>
                    <div className={ styles.col }>
                        <div className={ styles.image }>
                            <img alt='' src='/images/main/products-1.png' />
                        </div>
                        <div className={ styles.text }>
                            {
                                staticContent?.box[ 0 ]
                            }
                        </div>
                    </div>
                    <div className={ styles.col }>
                        <div className={ styles.image }>
                            <img alt='' src='/images/main/products-2.png' />
                        </div>
                        <div className={ styles.text }>
                            {
                                staticContent?.box[ 1 ]
                            }
                        </div>
                    </div>
                    <div className={ styles.col }>
                        <div className={ styles.image }>
                            <img alt='' src='/images/main/products-3.png' />
                        </div>
                        <div className={ styles.text }>
                            {
                                staticContent?.box[ 2 ]
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner