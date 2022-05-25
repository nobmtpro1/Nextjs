import axios from '../../../sevices/axios'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import Discussion from './Discussion'

const Tab2 = ( { styles, tab, data, setData } ) =>
{
    const [ hideMoreDiscussionButton, setHideMoreDiscussionButton ] = useState( false )
    const [ newDiscussion1, setNewDiscussion1 ] = useState( [] )
    const [ addDiscussion, setAddDiscussion ] = useState( "" )
    const [ pageDiscussion, setPageDiscussion ] = useState( 2 )
    const discussion = data?.discussion

    useEffect( () =>
    {
        if ( discussion?.length < 3 )
        {
            setHideMoreDiscussionButton( true )
        }
    }, [ discussion ] )

    const handleAddDiscussion = () =>
    {
        if ( !addDiscussion )
        {
            alert( 'Bạn chưa nhập nội dung' )
            return false
        }
        axios.post( 'page/learning/add-discussion/' + router.query.id, { content: addDiscussion } ).then( response =>
        {
            setNewDiscussion1( prev => ( [
                response.data,
                ...prev,
            ] ) )
            setAddDiscussion( "" )
        } ).catch( error => { } )
    }

    const handleMoreDiscussion = () =>
    {
        axios.get( 'page/learning/more-discussion/' + router.query.id + '?page=' + pageDiscussion ).then( response =>
        {
            if ( response.data.data.length < 2 )
            {
                setHideMoreDiscussionButton( true )
            }
            setData( prev => ( {
                ...prev,
                discussion: [ ...prev.discussion, ...response.data.data ]
            } ) )
            setPageDiscussion( prev => prev + 1 )

        } ).catch( error => { } )
    }

    return (
        <div className={ `${ styles.content2 } ${ tab == 1 && styles.active }` }>
            <div className={ styles.title }>
                Thảo luận bài học
            </div>
            <div className={ styles.comments }>
                <div className={ styles.comment }>
                    <div className={ styles.left }>
                        <img alt='' src={ data?.user?.avatar?.includes( 'https:/' ) ? data?.user?.avatar : data?.user?.avatar ? process.env.IMG_URL + data?.user.avatar : '/images/avatar-default.png' } />
                    </div>
                    <div className={ styles.right }>
                        <div className={ styles.name }>
                            { data?.user?.fullname }
                        </div>
                        <div className={ styles.input }>
                            <textarea placeholder='Nhập thảo luận tại đây...' value={ addDiscussion } onChange={ e => setAddDiscussion( e.target.value ) }></textarea>
                        </div>
                        <div className={ styles.button } onClick={ handleAddDiscussion }>
                            Thêm thảo luận
                        </div>
                    </div>
                </div>
                <>
                    {
                        newDiscussion1?.map( ( e, i ) => (
                            <Discussion styles={ styles } initData={ e } key={ e.id } />
                        ) )
                    }
                </>
                <>
                    {
                        discussion?.map( ( e, i ) => (
                            <Discussion styles={ styles } initData={ e } key={ i } />
                        ) )
                    }
                </>

                <div hidden={ hideMoreDiscussionButton } className={ styles.button } onClick={ handleMoreDiscussion }>
                    Xem thêm
                </div>
            </div>
        </div>
    )
}

export default Tab2