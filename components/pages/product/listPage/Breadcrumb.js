import Link from 'next/link'
import React from 'react'

const Breadcrumb = ( {styles, data } ) =>
{
    return (
        <div className={ styles.breadcrumb } style={ { zIndex: 1 } }>
            {
                data?.map( ( e, i ) => (
                    <Link key={i} href={ e?.href } passHref>
                        <a href='#' className={ styles.link }>
                            { e?.name }
                        </a>
                    </Link>
                ) )
            }
        </div>
    )
}

export default Breadcrumb