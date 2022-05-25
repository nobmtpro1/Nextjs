import React from 'react'

const Tab1 = ( { styles, tab, data } ) =>
{
    return (
        <div className={ styles.longtext } hidden={ tab == 0 ? false : true }>
            <h2 className={ styles.title }>
                Lợi ích Bài học
            </h2>
            <div className={ styles.content } dangerouslySetInnerHTML={ { __html: data?.benefit } }>

            </div>
        </div>
    )
}

export default Tab1