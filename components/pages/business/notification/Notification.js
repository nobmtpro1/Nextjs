import React from 'react';
import { formatTimePast } from '../../../../utils/helper';

const Notification = ( { styles, data, fetchData } ) =>
{
    return (
        <div className={ styles.box_notify }>
            <div className={ styles.title }>
                <h5>{ data?.title }</h5>
                <div className={ styles.time }>
                    <img src="/images/watch.png" alt="watch" />
                    <span>  { formatTimePast( data?.created_at ) }</span>
                </div>
            </div>
            <div className={ styles.content }>
                <div className={ styles.img_content }>
                    <img src={ process.env.IMG_URL + data?.image } alt="" />
                </div>
                <p dangerouslySetInnerHTML={ { __html: data?.content } }>

                </p>
                <div className={ styles.unseen } >
                    {
                        ( data?.is_personal > 0 ? !fetchData?.readNotificationPersonal?.includes( data?.id ) : !fetchData?.readNotification?.includes( data?.id ) )
                            ?
                            <img src="/images/unseen.png" alt="" />
                            :
                            <img src="/images/business/notification-seen.svg" alt="" />
                    }
                </div>
            </div>
        </div>
    )
};

export default Notification;
