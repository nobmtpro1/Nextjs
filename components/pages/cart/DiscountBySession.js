import React, { useEffect, useState } from 'react'

const DiscountBySession = ( { styles, data } ) =>
{

    const [ nextDiscount, setNextDiscount ] = useState( 0 )

    useEffect( () =>
    {
        var isSet = false
        data?.discountBySession?.forEach( ( e, i ) =>
        {

            if ( e?.from <= data?.cart?.numberOfSessions )
            {
                if ( !isSet )
                {
                    setNextDiscount( i + 1 )
                }
                isSet = true
            }
        } )
    }, [ data ] )

    return (
        <div className={ styles.discount_1 }>
            {
                data?.discountBySession?.map( ( e, i ) =>
                {
                    if ( e?.from > data?.cart?.numberOfSessions )
                    {
                        return (
                            <div className={ styles.col1_2 } key={ i } hidden={ i != nextDiscount }>
                                Giảm ngay { e?.value }%
                            </div>
                        )
                    }
                } )
            }
            <div className={ styles.col2_2 }>
                <select defaultValue={ nextDiscount } onChange={ e => setNextDiscount( e.target.value ) }>
                    {
                        data?.discountBySession?.map( ( e, i ) =>
                        {
                            if ( e?.from > data?.cart?.numberOfSessions )
                            {
                                return (
                                    <option value={ i } key={ i }>Mua thêm { e?.from - data?.cart?.numberOfSessions } bài học</option>
                                )
                            }
                        } )
                    }
                </select>
            </div>
        </div>
    )
}

export default DiscountBySession