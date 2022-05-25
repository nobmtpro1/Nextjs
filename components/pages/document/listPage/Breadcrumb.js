import Link from 'next/link'
import React from 'react'

const Breadcrumb = ( { styles, data } ) =>
{
    return (
        <div className={ `${ styles.breadcrumb }` }>
            {
                data?.map( ( e, i ) => (
                    <Link key={i} passHref href={ e?.href }><div className={ `${styles.text} ${ i == 0 ? styles.first : styles.next }` }>{ e?.name }</div></Link>
                ) )
            }
        </div>
    )
}

export default Breadcrumb