import React from 'react'

const Area1 = ({styles,staticContent}) =>
{
    return (
        <div className={ `${ styles.area1_1 }` }>
            <h2 className={ `${ styles.head_2 }` }>
                { staticContent?.area1?.title }
            </h2>
            <div className={ `${ styles.body_2 }` }>
                <div className={ `${ styles.box_3 }` }>
                    <div className={ `${ styles.image_4 }` }>
                        <img alt='' src='/images/main/home-1.svg' />
                    </div>
                    <h3 className={ `${ styles.title_4 }` }>
                        { staticContent?.area1?.box[ 0 ]?.title }
                    </h3>
                    <p className={ `${ styles.content_4 }` }>
                        { staticContent?.area1?.box[ 0 ]?.content }
                    </p>
                </div>
                <div className={ `${ styles.box_3 }` }>
                    <div className={ `${ styles.image_4 }` }>
                        <img alt='' src='/images/main/home-2.svg' />
                    </div>
                    <h3 className={ `${ styles.title_4 }` }>
                        { staticContent?.area1?.box[ 1 ]?.title }
                    </h3>
                    <p className={ `${ styles.content_4 }` }>
                        { staticContent?.area1?.box[ 1 ]?.content }
                    </p>
                </div>
                <div className={ `${ styles.box_3 }` }>
                    <div className={ `${ styles.image_4 }` }>
                        <img alt='' src='/images/main/home-3.svg' />
                    </div>
                    <h3 className={ `${ styles.title_4 }` }>
                        { staticContent?.area1?.box[ 2 ]?.title }
                    </h3>
                    <p className={ `${ styles.content_4 }` }>
                        { staticContent?.area1?.box[ 2 ]?.content }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Area1