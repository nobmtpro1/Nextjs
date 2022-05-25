import axios from '../../../sevices/axios';
import React from 'react';
import { useState } from 'react';
import { formatTimePast } from '../../../utils/helper';

const DiscussionReply = ( { styles, data } ) =>
{
    const [ like, setLike ] = useState( data?.like_count || 0 )
    const [ dislike, setDislike ] = useState( data?.dislike_count || 0 )

    const handleLike = () =>
    {
        axios.post( 'page/learning/like-reply/' + data?.id ).then( response =>
        {
            setLike( prev => prev + response.data?.like )
            setDislike( prev => prev + response.data?.dislike )
        } ).catch( error => { } )
    }

    const handleDislike = () =>
    {
        axios.post( 'page/learning/dislike-reply/' + data?.id ).then( response =>
        {
            setLike( prev => prev + response.data?.like )
            setDislike( prev => prev + response.data?.dislike )
        } ).catch( error => { } )
    }


    return <div className={ styles.reply }>
        <div className={ styles.head }>
            <div className={ styles.left }>
                <img alt='' src={ data?.user?.avatar?.includes( 'https:/' ) ? data?.user?.avatar : data?.user?.avatar ? process.env.IMG_URL + data?.user.avatar : '/images/avatar-default.png' } />
            </div>
            <div className={ styles.right }>
                { data?.user?.fullname }
            </div>
        </div>
        <div className={ styles.text }>
            { data?.content }
        </div>
        <div className={ styles.action }>
            <div className={ styles.button } onClick={ handleLike }>
                <div className={ styles.image }>
                    <img alt='' src='/images/main/learning-7.svg' />
                </div>
                <div className={ styles.text }>
                    { like }
                </div>
            </div>
            <div className={ styles.button } onClick={ handleDislike }>
                <div className={ styles.image }>
                    <img alt='' src='/images/main/learning-8.svg' />
                </div>
                <div className={ styles.text }>
                    { dislike }
                </div>
            </div>
            <div className={ styles.button }>

                <div className={ styles.image }>
                    {/* <img alt='' src='/images/main/learning-10.svg' /> */ }
                    <img alt='' src='/images/main/learning-13.svg' />
                </div>
                <div className={ styles.text } style={ { color: 'rgba(52, 56, 70, 0.6)' } }>
                    { formatTimePast( data?.created_at ) } trước
                </div>
            </div>
        </div>
    </div>;
};

export default DiscussionReply;
