import React, { useEffect, useState } from 'react'

const ProgressLifetime = ( { styles, data } ) =>
{
    const [ currentProgress, setCurrentProgress ] = useState( 0 )

    useEffect( () =>
    {
        data?.discountBySession?.forEach( ( e, i ) =>
        {
            if ( data?.cart?.numberOfSessions >= e?.from )
            {
                setCurrentProgress( i + 1 )
            }
        } )
    }, [ data ] )

    return (
        <div className={ styles.progress_1 }>
            <div className={ styles.total_5 }>
                <div className={ styles.reach_6 } style={ { width: ( ( 1 / data?.discountBySession?.length ) * 100 * ( currentProgress ) ) + '%' } }>

                </div>
                <div className={ `${ styles.circle_6 } ${ styles.active }` } style={ { left: '0%' } }>
                    <span className={ `${ styles.top_7 } ${ styles.active }` } >Mua</span>
                </div>
                {
                    data?.discountBySession?.map( ( e, i ) => (
                        <div className={ `${ styles.circle_6 } ${ styles.active }` } style={ { left: ( ( 1 / data?.discountBySession?.length ) * 100 * ( i + 1 ) ) + '%' } } key={ i }>
                            <span className={ `${ styles.top_7 } ${ styles.active }` } >{ e?.from } - { e?.to } bài học</span>
                            <span className={ `${ styles.bot_7 } ${ styles.active }` } >{ e?.value }%</span>
                        </div>
                    ) )
                }
            </div>
            <div className={ styles.tooltip_2 }>
                <span><img alt='' src='/images/main/payment-lifetime-1.svg' /></span>
                <div className={ styles.content_3 }>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
        </div>
    )
}

export default ProgressLifetime