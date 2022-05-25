import React, { useState } from 'react';
import { formatTimePast } from '../../../utils/helper';

const Review = ( { e, styles } ) =>
{
    const [ expand, setExpand ] = useState( false )
    var star = ( ( parseFloat( e?.design_star ) + parseFloat( e?.content_star ) + parseFloat( e?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

    return (
        <div className={ styles.comment }>
            <div className={ styles.head }>
                <div className={ styles.avatar }>
                    <img alt='' src={ e?.user?.avatar?.includes( 'https:/' ) ? e?.user?.avatar : e?.user?.avatar ? process.env.IMG_URL + e?.user?.avatar : '/images/avatar-default.png' } />
                </div>
                <div className={ styles.info }>
                    <div className={ styles.name }>
                        { e?.user?.fullname }
                    </div>
                    <div className={ styles.bot }>
                        <div className={ styles.star }>
                            {
                                [ ...Array( Math.round( star ) ).keys() ].map( e => (
                                    <img alt='' src='/images/main/product-review-star.svg' key={ e } />
                                ) )
                            }

                            {
                                [ ...Array( 5 - Math.round( star ) ).keys() ].map( e => (
                                    <img alt='' src='/images/main/product-review-star-o.svg' key={ e } />
                                ) )
                            }
                        </div>
                        <div className={ styles.time }>
                            <div className={ styles.image }>
                                <img alt='' src='/images/main/product-27.svg' />
                            </div>
                            <div className={ styles.text }>
                                { formatTimePast( e?.created_at ) }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ styles.dot }>
                    {/* <a href='#' className={ styles.button }>
                    <img alt='' src='/images/main/product-28.svg' />
                </a> */}
                </div>
            </div>
            <div className={ styles.body }>
                <div className={ `${ styles.content } ${ expand && styles.active }` }>
                    { e?.comment }
                </div>
                {
                    (e?.comment?.length > 240 && expand == false) && <div className={ styles.more } onClick={ () => setExpand( true ) }>
                        xem thêm
                    </div>
                }

            </div>
            <div className={ styles.foot }>
                <a href='#' className={ styles.button }>
                    {/* <img alt='' src='/images/main/product-29.svg' /> */}
                </a>
                <a href='#' className={ styles.button }>
                    {/* <img alt='' src='/images/main/product-30.svg' /> */}
                </a>
            </div>
        </div>
    )
};

export default Review;
