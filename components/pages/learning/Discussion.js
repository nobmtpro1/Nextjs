import axios from '../../../sevices/axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { formatTimePast } from '../../../utils/helper';
import DiscussionReply from './DiscussionReply';

const Discussion = ( { initData, styles } ) =>
{
    const [ showReply, setShowReply ] = useState( false )
    const [ like, setLike ] = useState( initData?.like_count || 0 )
    const [ dislike, setDislike ] = useState( initData?.dislike_count || 0 )
    const [ addReply, setAddReply ] = useState( "" )
    const [ data, setData ] = useState( initData )

    const handleLike = () =>
    {
        axios.post( 'page/learning/like/' + data?.id ).then( response =>
        {
            setLike( prev => prev + response.data?.like )
            setDislike( prev => prev + response.data?.dislike )
        } ).catch( error => { } )
    }

    const handleDislike = () =>
    {
        axios.post( 'page/learning/dislike/' + data?.id ).then( response =>
        {
            setLike( prev => prev + response.data?.like )
            setDislike( prev => prev + response.data?.dislike )
        } ).catch( error => { } )
    }

    const handleAddReply = () =>
    {
        if ( !addReply )
        {
            alert( 'Bạn chưa nhập nội dung' )
            return false
        }
        axios.post( 'page/learning/add-reply/' + data?.id, { reply: addReply } ).then( response =>
        {
            setData( prev => ( {
                ...prev,
                reply: [  ...prev.reply,response.data ]
            } ) )
            setAddReply( "" )
        } ).catch( error => { } )
    }

    return <div className={ styles.comment }>
        <div className={ styles.left }>
            <img alt='' src={ data?.user?.avatar?.includes( 'https:/' ) ? data?.user?.avatar : data?.user?.avatar ? process.env.IMG_URL + data?.user.avatar : '/images/avatar-default.png' } />
        </div>
        <div className={ styles.right }>
            <div className={ styles.name }>
                { data?.user?.fullname }
            </div>
            <div className={ styles.input_disable }>
                <div className={ styles.text }>
                    { data?.content }
                </div>
                {
                    data?.content?.length > 200 && <div className={ styles.more }>
                        xem thêm
                    </div>
                }
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
                        <div className={ styles.image } onClick={ () => setShowReply( prev => !prev ) }>
                            <img alt='' src='/images/main/learning-9.svg' />
                        </div>
                        <div className={ styles.text }>
                            { data?.reply?.length }
                        </div>
                    </div>
                    <div className={ styles.button }>
                        <div className={ styles.image }>
                            {/* <img alt='' src='/images/main/learning-10.svg' /> */ }
                            <img alt='' src='/images/main/learning-13.svg' />
                        </div>
                        <div className={ styles.text }>
                            { formatTimePast( data?.created_at ) } trước
                        </div>
                    </div>
                </div>

            </div>
            <div className={ styles.replys } hidden={ !showReply }>
                {
                    data?.reply?.map( ( e, i ) => (
                        <DiscussionReply styles={ styles } data={ e } key={ i } />
                    ) )
                }
                <div className={ styles.add_reply }>
                    <div className={ styles.text }>
                        <textarea value={ addReply } onChange={ e => setAddReply( e.target.value ) } placeholder='Nhập thảo luận tại đây...'></textarea>
                    </div>
                    <div className={ styles.button }>
                        <button onClick={ handleAddReply }>Thêm thảo luận</button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default Discussion;
