import React from 'react'

const Tab2 = ( { styles, data, tab } ) =>
{
    return (
        <>
            <div className={ styles.longtext } hidden={ tab == 1 ? false : true }>
                <h2 className={ styles.title }>
                    Đối tượng khóa học
                </h2>
                <div className={ styles.content } dangerouslySetInnerHTML={ { __html: data?.subject } }>

                </div>
            </div>

            <div className={ styles.skill } hidden={ tab == 1 ? false : true }>
                <h2 className={ styles.title }>
                    Kỹ năng
                </h2>
                <div className={ styles.content }>
                    {
                        JSON.parse( data?.skill )?.map( ( e, i ) => (
                            <div className={ styles.box } key={ i }>
                                { e }
                            </div>
                        ) )
                    }
                </div>
            </div>
        </>
    )
}

export default Tab2