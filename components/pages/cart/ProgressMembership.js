import React, { useEffect, useState } from 'react'

const ProgressMembership = ( { styles, data, mobile } ) =>
{
    const [ progress, setProgress ] = useState( 1 )

    useEffect( () =>
    {
        var active = 1;
        data?.range?.map( ( e, i ) =>
        {
            if ( data?.quantity >= e?.from )
            {
                active = i
            }
        } )
        setProgress( active )
    }, [ data ] )

    if ( mobile )
    {
        return (
            <div className={ styles.row2_4 }>
                <div className={ styles.total_5 }>
                    <div className={ styles.reach_6 } style={ { width: ( ( progress + 1 ) / ( data?.range?.length ) * 100 ) + '%' } }>

                    </div>
                    <div className={ `${ styles.circle_6 } ${ styles.active }` } style={ { left: '0%' } }>
                        <span className={ `${ styles.top_7 } ${ styles.active }` } >Mua</span>
                    </div>
                    {
                        data?.range?.map( ( e, i ) =>
                        {
                            var discount = data?.discountMembership?.find( x => x?.discount_membership_month_id == data?.discountMonthId && x?.discount_membership_range_id == e?.id )?.value
                            return (
                                <div key={ i } className={ `${ styles.circle_6 }  ${ ( data?.quantity >= e?.from ) && styles.active }` } style={ { left: ( ( i + 1 ) / ( data?.range?.length ) * 100 ) + '%' } }>
                                    <span className={ styles.top_7 } >{ e?.from } - { e?.to } tài khoản</span>
                                    <span className={ `${ styles.bot_7 }` } >{ discount }%</span>
                                </div>
                            )
                        } )
                    }
                </div>
            </div>
        )
    }

    return (
        <div className={ styles.progress_4 }>
            <div className={ styles.total_5 }>
                <div className={ styles.reach_6 } style={ { width: ( ( progress + 1 ) / ( data?.range?.length ) * 100 ) + '%' } }>

                </div>
                <div className={ `${ styles.circle_6 } ${ styles.active }` } style={ { left: '0%' } }>
                    <span className={ `${ styles.top_7 } ${ styles.active }` } >Mua</span>
                </div>
                {
                    data?.range?.map( ( e, i ) =>
                    {
                        var discount = data?.discountMembership?.find( x => x?.discount_membership_month_id == data?.discountMonthId && x?.discount_membership_range_id == e?.id )?.value
                        return (
                            <div key={ i } className={ `${ styles.circle_6 }  ${ ( data?.quantity >= e?.from ) && styles.active }` } style={ { left: ( ( i + 1 ) / ( data?.range?.length ) * 100 ) + '%' } }>
                                <span className={ styles.top_7 } >{ e?.from } - { e?.to } tài khoản</span>
                                <span className={ `${ styles.bot_7 }` } >{ discount }%</span>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    )
}

export default ProgressMembership