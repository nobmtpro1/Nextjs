import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ACCOUNT_ELEARNING, LEARNING } from '../../../constants/route'
import router from 'next/router'

const SessionElearning = ( { styles, data, category, course, user, userHasCourse, sessionCanLearn, otherUserCourse, otherUserSession, isHasMembership } ) =>
{
    const [ userHasSession, setUserHasSession ] = useState( false )

    useEffect( () =>
    {
        var check = sessionCanLearn?.find( s => s == data?.id )
        if ( check )
        {
            setUserHasSession( true )
        }
    }, [ sessionCanLearn ] )

    const handleRedirectSession = ( id, courseId ) =>
    {
        var checkExist = sessionCanLearn?.find( x => x == id )
        if ( checkExist )
        {
            router.push( ACCOUNT_ELEARNING + 'session?id=' + id + '&course=' + courseId )
        } else
        {
            alert( 'Bạn chưa mua bài học này' )
        }
    }

    return (
        <div className={ `${ styles.slide_item }` }>
            <div className={ `${ styles.slide_container }` }>
                <div style={ { cursor: 'pointer' } } className={ `${ styles.image }` } onClick={ () => handleRedirectSession( data?.id, course?.id ) }>
                    <img alt='' src={ process.env.IMG_URL + data?.image } />
                </div>
                <div style={ { cursor: 'pointer' } } className={ `${ styles.name }` } onClick={ () => handleRedirectSession( data?.id, course?.id ) }>
                    { data?.name }
                </div>

                <div className={ `${ styles.progress }` }>
                    <div className={ `${ styles.total }` }>
                        <div className={ `${ styles.reach }` } style={ { width: `${ data?.learningProgress?.find( p => p.session_id == data?.id )?.progress_percent || 0 }%` } }>

                        </div>
                    </div>

                    <div className={ `${ styles.image }` }>
                        <img alt='' src="/images/account-elearning-2.svg" />
                    </div>
                </div>
                <div className={ `${ styles.category }` }>
                    <div className={ `${ styles.text }` }>
                        Thuộc khóa { course?.name }
                    </div>
                    <div className={ `${ styles.text }` }>
                        { category?.name }
                    </div>
                </div>
                <div className={ `${ styles.user }` }>
                    {/* {
                        ( userHasCourse || userHasSession ) && (
                            <div className={ `${ styles.avatar }` }>
                                <img alt='' src={ user?.avatar?.includes( 'https:/' ) ? user?.avatar : user?.avatar ? process.env.IMG_URL + user?.avatar : '/images/avatar-default.png' } />
                            </div>
                        )
                    } */}

                    {
                        userHasCourse ? (
                            <>
                                {
                                    otherUserCourse?.find( c => c.course_id == course?.id )?.slot?.map( ( a, q ) =>
                                    {
                                        if ( q < 3 )
                                        {
                                            return (
                                                <div className={ `${ styles.avatar }` } key={ q }>

                                                    <img alt='' src={ a?.user?.avatar?.includes( 'https:/' ) ? a?.user?.avatar : a?.user?.avatar ? process.env.IMG_URL + a?.user?.avatar : '/images/avatar-default.png' } />
                                                </div>
                                            )
                                        }
                                    } )
                                }
                                {
                                    otherUserCourse?.find( s => s.course_session_id == data?.id )?.slot?.length > 3 && <div className={ `${ styles.more }` }>
                                        +{ otherUserCourse?.find( s => s.course_session_id == data?.id )?.slot?.length - 3 }
                                    </div>
                                }
                            </>
                        ) : userHasSession ? (
                            <>
                                {
                                    otherUserSession?.find( s => s.course_session_id == data?.id )?.slot?.map( ( a, q ) =>
                                    {
                                        if ( q < 3 )
                                        {
                                            return (
                                                <div className={ `${ styles.avatar }` } key={ q }>
                                                    <img alt='' src={ a?.user?.avatar?.includes( 'https:/' ) ? a?.user?.avatar : a?.user?.avatar ? process.env.IMG_URL + a?.user?.avatar : '/images/avatar-default.png' } />
                                                </div>
                                            )
                                        }
                                    } )
                                }
                                {
                                    otherUserSession?.find( s => s.course_session_id == data?.id )?.slot?.length > 3 && <div className={ `${ styles.more }` }>
                                        +{ otherUserSession?.find( s => s.course_session_id == data?.id )?.slot?.length - 3 }
                                    </div>
                                }
                            </>
                        ) : ''
                    }
                </div>
                {
                    userHasCourse ? (
                        <div className={ `${ styles.button }` }>

                            <Link href={ LEARNING + '?id=' + data?.id + '&course=' + course?.id } passHref>
                                <a style={ { cursor: 'pointer' } }>Học ngay (+{ data?.aim_coin } AIM Coin)</a>
                            </Link>

                        </div>
                    ) : ( userHasSession || isHasMembership ) ? (
                        <div className={ `${ styles.button }` }>
                            <Link href={ LEARNING + '?id=' + data?.id } passHref>
                                <a style={ { cursor: 'pointer' } }>Học ngay (+{ data?.aim_coin } AIM Coin)</a>
                            </Link>
                        </div>
                    )
                        : (
                            <div className={ `${ styles.button } ${ styles.disable } ` }>
                                <a style={ { cursor: 'pointer' } }>Học ngay (+{ data?.aim_coin } AIM Coin)</a>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default SessionElearning