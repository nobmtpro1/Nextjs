import moment from 'moment'
import React from 'react'

const Info = ( { styles, data } ) =>
{
    return (
        <div className={ styles.right }>
            <div className={ styles.top }>
                <div className={ styles.row }>
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/learning-1.svg' />
                    </div>
                    <div className={ styles.text }>
                        Cấp độ: {
                            data?.session?.level == 0
                                ?
                                'Cơ bản'
                                :
                                data?.session?.level == 1
                                    ?
                                    'Trung bình'
                                    :
                                    data?.session?.level == 2
                                        ?
                                        'Nâng cao'
                                        :
                                        ''
                        }
                    </div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/learning-2.svg' />
                    </div>
                    <div className={ styles.text }>
                        { data?.countUserLearned } người đã học
                    </div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/learning-3.svg' />
                    </div>
                    <div className={ styles.text }>
                        { moment( data?.session?.open_date ).format( 'DD/MM/YYYY' ) }
                    </div>
                </div>
                <div className={ styles.row }>
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/learning-4.svg' />
                    </div>
                    <div className={ styles.text }>
                        Tích luỹ <span>{ data?.session?.aim_coin } AIM coin</span>
                    </div>
                </div>
            </div>
            <div className={ styles.bot }>
                <div className={ styles.head }>
                    <div className={ styles.top }>
                        <div className={ styles.image }>
                            <img alt='' src={ data?.userCreated?.avatar?.includes( 'https:/' ) ? data?.userCreated?.avatar : data?.userCreated?.avatar ? process.env.IMG_URL + data?.userCreated?.avatar : '/images/avatar-default.png' } />
                        </div>
                        <div className={ styles.text }>
                            Được tạo bởi { data?.userCreated?.fullname }
                        </div>
                    </div>
                    <div className={ styles.bot }>
                    </div>
                </div>

                <div className={ styles.body }>
                    {
                        data?.otherUser?.slice( 0, 10 )?.map( ( e, i ) =>
                        {
                            var percent = e?.learning_progress?.find( x => x?.session_id == data?.session?.id )?.progress_percent || 0
                            return (
                                <div className={ styles.row } key={ i }>
                                    <div className={ styles.left }>
                                        <img alt='' src={ e?.avatar?.includes( 'https:/' ) ? e?.avatar : e?.avatar ? process.env.IMG_URL + e?.avatar : '/images/avatar-default.png' } />
                                    </div>
                                    <div className={ styles.right }>
                                        <div className={ styles.top }>
                                            { e?.fullname }
                                        </div>
                                        <div className={ styles.bot }>
                                            <div className={ styles.progress }>
                                                <div className={ styles.reach } style={ { width: percent + '%' } }>

                                                </div>
                                            </div>
                                            <div className={ styles.text }>
                                                { percent }%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } )
                    }
                    {
                        data?.otherUser?.length > 10 && '...'
                    }
                </div>
            </div>
        </div>
    )
}

export default Info