import moment from 'moment';
import React from 'react';

const RowPlan = ( { data, styles } ) =>
{
    return <div className={ styles.content_lesson }>
        <div className={ styles.text_2 } style={ { flex: 2 } }>
            <span>{ data?.name }</span>
        </div>
        <div className={ styles.text_2 } style={ { flex: 2 } }>
            <span>{ moment( data?.from ).format( 'DD/MM/YYYY' ) } - { moment( data?.to ).format( 'DD/MM/YYYY' ) }</span>
        </div>
        <div className={ styles.text_2 }>
            <span>{ data?.session?.length || 0 }</span>
        </div>
        <div className={ styles.text_2 }>
            <span>{ data?.member?.length || 0 }/{ data?.membership?.number_of_slots }</span>
        </div>
        <div className={ styles.text_2 }>
            <span>{ data?.progress || 0 }/{ data?.member?.length || 0 }</span>
        </div>
        <div className={ styles.text_2 }>
            <div className={ `${ styles.tags } ${ data?.status == 'Chưa học'
                ?
                styles.not_study
                :
                data?.status == 'Đang học'
                    ?
                    styles.studying
                    :
                    data?.status == 'Hoàn thành'
                        ?
                        styles.finish
                        :
                        data?.status == 'Chưa đạt'
                        &&
                        styles.not_reach
                }` }>
                <span>{ data?.status }</span>
            </div>
        </div>
    </div>;
};

export default RowPlan;
