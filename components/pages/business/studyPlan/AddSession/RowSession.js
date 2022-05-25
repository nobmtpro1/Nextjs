import axios from '../../../../../sevices/axios';
import React from 'react';

const RowSession = ( { styles, data, setData, id } ) =>
{
    const review = data?.avg_review_star && data?.avg_review_star[ 0 ]
    const star = ( ( parseFloat( review?.design_star ) + parseFloat( review?.content_star ) + parseFloat( review?.appli_star ) ) / 3 || 0 ).toFixed( 1 )

    const handleDelete = () =>
    {
        axios.post( 'page/business/study-plan/delete-session/' + id, { session_id: data?.id } ).then( response =>
        {
            setData( response.data?.plan )
        } ).catch( error =>
        { } )
    }

    return (
        <div className={ styles.content_lesson }>
            <div className={ styles.text_2 }>
                <div className={ styles.box_item_lesson }>
                    <div className={ styles.img_item }>
                        <img alt='' src={ process.env.IMG_URL + data?.image } style={ { height: 'auto' } } />
                    </div>
                    <div className={ styles.content }>
                        <h3>{ data?.name }</h3>
                        <div className={ styles.tags }>
                            <span >{ data?.course[ 0 ]?.name }</span>
                        </div>
                        <div className={ styles.tags }>
                            <span >{ data?.course[ 0 ]?.course_category?.name }</span>
                        </div>
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
            <div className={ styles.text_2 } style={ { flex: 0.3 } } >
                <button style={ { background: 'transparent' } } onClick={ handleDelete }>
                    <img src="/images/business/bin.svg" alt="" />
                </button>
            </div>
        </div>
    );
};

export default RowSession;
