import React, { useEffect, useState } from 'react'
import { ACCOUNT_ELEARNING } from '../../../constants/route'
import Slider from "react-slick";
import SessionElearning from './SessionElearning';
import router from 'next/router';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
};

const CourseElearning = ( { styles, k, data, category, user, courseCanLearn, sessionCanLearn, otherUserCourse, otherUserSession ,isHasMembership} ) =>
{

    const [ userHasCourse, setUserHasCourse ] = useState( false )

    useEffect( () =>
    {
        var check = courseCanLearn?.find( c => c == data?.id )
        if ( check )
        {
            setUserHasCourse( true )
        }
    }, [ courseCanLearn ] )

    const handleRedirect = ( id ) =>
    {
        var checkExist = courseCanLearn?.find( x => x == id )
        if ( checkExist )
        {
            router.push( ACCOUNT_ELEARNING + 'course?id=' + id )
        } else
        {
            alert( 'Bạn chưa mua khoá học này' )
        }
    }

    return (
        <div className={ styles.box } >
            <div className={ styles.number }>
                <span>{ k + 1 < 10 ? "0" + ( k + 1 ) : k + 1 }</span>
            </div>
            <div className={ styles.top }>
                <div className={ styles.title } style={ { cursor: 'pointer' } } onClick={ () => handleRedirect( data?.id ) }>
                    { data?.name }
                </div>
                <div className={ styles.description }>
                    Bạn đã &quot;sưu tầm&quot; và học được bao nhiêu bài trong khoá học này rồi? Chinh phục hết để nhận được vương miện nhé!
                </div>
            </div>
            <div className={ `${ styles.bot } slick-account-page` } id='account-elearning'>
                <Slider { ...settings }>
                    {
                        data?.session?.map( ( y, m ) => (
                            <SessionElearning styles={ styles } data={ y } key={ m } category={ category } course={ data } user={ user } userHasCourse={ userHasCourse } sessionCanLearn={ sessionCanLearn } otherUserCourse={otherUserCourse } otherUserSession={ otherUserSession } isHasMembership={ isHasMembership }/>
                        )
                        )
                    }
                </Slider>
            </div>
        </div>
    )
}

export default CourseElearning