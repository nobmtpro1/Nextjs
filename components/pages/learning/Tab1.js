import React from 'react'

const Tab1 = ( { styles, data, tab } ) =>
{
    return (
        <div className={ `${ styles.content1 } ${ tab == 0 && styles.active }` }>
            <div className={ styles.longtext }>
                <div className={ styles.title }>
                    Lợi ích bài học
                </div>
                <div className={ styles.content } dangerouslySetInnerHTML={ { __html: data?.session?.benefit } }>

                </div>
            </div>
            <div className={ styles.longtext }>
                <div className={ styles.title }>
                    Nội dung
                </div>
                <div className={ styles.content } dangerouslySetInnerHTML={ { __html: data?.session?.content } }>

                </div>
            </div>
        </div>
    )
}

export default Tab1