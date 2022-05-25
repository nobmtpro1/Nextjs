import React from 'react';

const RowMember = ( { styles, data, numberOfSession } ) =>
{
    return (
        <div className={ styles.content_lesson }>
            <div className={ styles.text_2 } style={ { flex: 2} }>
                <span>{ data?.fullname }</span>
            </div>
            <div className={ styles.text_2 } style={ { flex: 2 } }>
                <span>{ data?.email }</span>
            </div>
            <div className={ styles.text_2 } style={ { textAlign: 'center', flex: 1 } }>
                <span>{ numberOfSession }</span>
            </div>
            <div className={ styles.text_2 } style={ { flex: 1 } }>
                <span>Active</span>
            </div>

            <div className={ styles.text_2 } style={ { flex: 2 } }>
                <div style={{marginLeft:'4.8em'}} className={ `${ styles.tags } ${ data?.status == 'Chưa học'
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
        </div>
    );
};

export default RowMember;
