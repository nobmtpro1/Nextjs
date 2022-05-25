import Link from 'next/link'
import React from 'react'
import { GAMIFICATION } from '../../../constants/route'

const Area3 = ( { styles, staticContent } ) =>
{
    return (
        <div className={ `${ styles.area3_1 }` }>
            <div className={ `${ styles.text_2 }` }>
                <h2 className={ `${ styles.title_3 }` }>
                    { staticContent?.area3?.title }
                </h2>
                <p className={ `${ styles.content_3 }` }>
                    { staticContent?.area3?.content }
                </p>
                <div className={ `${ styles.button_3 }` }>
                    <Link href={ GAMIFICATION } passHref>
                        <a href='#'>Xem thêm</a>
                    </Link>
                </div>
            </div>
            <div className={ `${ styles.image_2 }` }>
                <img alt='' src='/images/main/home-5.jpg' />
            </div>
        </div>
    )
}

export default Area3