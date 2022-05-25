import React, { useEffect, useState } from 'react';

const RowSession = ( { styles, data } ) =>
{

    const [ courseCategory, setCourseCategory ] = useState( [] )

    const review = data?.avg_review_star && data?.avg_review_star[ 0 ]
    const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

    useEffect( () =>
    {
        var arr = []
        data?.course?.forEach( e =>
        {
            if ( !arr.includes( e.course_category.name ) )
            {
                arr.push( e.course_category.name )
            }
        } )
        setCourseCategory( arr )
    }, [ data ] )

    return (
        <div className={ styles.content_lesson }>
            <div className={ styles.text_2 }>
                <div className={ styles.box_item_lesson }>
                    <div className={ styles.img_item }>
                        <img alt='' src={ process.env.IMG_URL + data?.image } style={ { height: 'auto' } } />
                    </div>
                    <div className={ styles.content }>
                        <h3>{ data?.name }</h3>

                        {
                            data?.course?.map( ( e, i ) => (
                                <div className={ styles.tags } key={ i }>
                                    <span>Thuộc khóa { e?.name }</span>
                                </div>
                            ) )
                        }
                        {
                            courseCategory?.map( ( e, i ) => (
                                <div className={ styles.tags } key={ i }>
                                    <span>{ e }</span>
                                </div>
                            ) )
                        }
                    </div>
                </div>
            </div>
            <div className={ styles.text_2 }>
                <span>{ data?.intend_time } phút</span>
            </div>
            <div className={ styles.text_2 }>
                <span>{ data?.status }</span>
            </div>
            <div className={ styles.text_2 }>
                <span>{ star }/5</span>
            </div>
        </div>
    );
};

export default RowSession;
