import React from 'react'

const Selection = ({styles,staticContent}) =>
{
    return (
        <div className={ styles.defination }>
            <h2 className={ styles.title }>
                Bạn có thể lựa chọn
            </h2>
            <div className={ styles.boxes }>
                {
                    staticContent?.area1?.map( ( e, i ) => (
                        <div className={ styles.box } key={ i }>
                            <h3 className={ styles.title }>
                                { e?.name }
                            </h3>
                            <div className={ styles.content }>
                                <div className={ styles.left }>
                                    <img alt='' src={ process.env.IMG_URL + e?.image } />
                                </div>
                                <p className={ styles.right }>
                                    { e?.content }
                                </p>
                            </div>
                        </div>
                    ) )
                }
            </div>
        </div>
    )
}

export default Selection