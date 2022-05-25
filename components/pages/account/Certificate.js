import styles from '../../../styles/account/certificate.module.scss'
import React from 'react'
import Slider from "react-slick";
import { useState } from 'react';

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    draggable: true,
    arrows: false,
};

const Certificate = ({courseCategory, sessionPassed}) =>
{
    const [ tab, setTab ] = useState( 1 )

    return (
        <div className={ styles.div4 }>
            <div className={ styles.row1 }>
                Chứng nhận hiện có
            </div>
            <div className={ styles.row2 }>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus praesent quam nunc, sed quis dui nisl tortor tortornc. Rhoncus praesent quam nunc, sed quis dui nisl tortor tortornc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus praesent quam nunc, sed quis dui nisl tortor tortornc.
            </div>
            <div className={ styles.row3 }>
                <span>{ sessionPassed?.length || 0 }</span> Chứng nhận
            </div>
            <div className={ styles.category_mb }>
                <select value={ tab } onChange={ ( e ) => setTab( e.target.value ) }>
                    {
                        courseCategory?.map( ( e, i ) => (
                            <option key={ i } value={ i + 1 }>
                                { e?.name }
                            </option>
                        ) )
                    }
                </select>
            </div>

            <div className={ styles.row4 }>
                {
                    courseCategory?.map( ( e, i ) => (
                        <div className={ `${ styles.text } ${ tab == ( i + 1 ) && styles.active }` } onClick={ () => setTab( i + 1 ) } key={ i }>
                            { e?.name }
                        </div>
                    ) )
                }
            </div>
            {
                courseCategory?.map( ( category, i ) => (
                    <div hidden={ tab != ( i + 1 ) } className={ styles.row5 } key={ i }>
                        {
                            category?.course?.map( ( course, k ) => (
                                <div className={ styles.items } key={ k }>
                                    <div className={ styles.number }>
                                        <span>{ k + 1 }</span>
                                    </div>
                                    <div className={ styles.top }>
                                        <div className={ styles.title }>
                                            { course?.name }
                                            <div className={ styles.title_image }>
                                                <img alt='' src="/images/account-elearning-detail-membership-8.svg" />
                                            </div>
                                        </div>
                                        <div className={ styles.description }>
                                            { course?.description }
                                        </div>
                                    </div>
                                    <div className={ styles.template }>
                                        {
                                            course?.session?.map( ( session ) => (
                                                <div className={ styles.item } key={ session.id }>
                                                    <div className={ styles.image }>
                                                        <img src={ process.env.IMG_URL + session?.certificate_image } alt='' />
                                                    </div>
                                                    <div className={ styles.name }>
                                                        { session?.name }
                                                    </div>
                                                    <div className={ `${ styles.button } ` }>
                                                        <a className={ `${ !sessionPassed?.includes( session?.id ) && styles.disable }` }>
                                                            <span className={ styles.button_image }>
                                                                <img alt='' src="/images/account-elearning-detail-membership-7.svg" />
                                                            </span>
                                                            <span>
                                                                Tải về
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            ) )
                                        }
                                    </div>
                                    <div className={ `${ styles.template_mb } slick-account-page` }>
                                        <Slider { ...settings }>
                                            {
                                                course?.session?.map( ( session ) => (
                                                    <div className={ `${ styles.slide }` } key={ session?.id }>
                                                        <div className={ `${ styles.slide_container }` }>
                                                            <div className={ styles.image }>
                                                                <img src={ process.env.IMG_URL + session?.certificate_image } alt='' />
                                                            </div>
                                                            <div className={ styles.name }>
                                                                { session?.name }
                                                            </div>
                                                            <div className={ styles.button }>
                                                                <a className={ `${ !sessionPassed?.includes( session?.id ) && styles.disable }` }>
                                                                    <span className={ styles.button_image }>
                                                                        <img alt='' src="/images/account-elearning-detail-membership-7.svg" />
                                                                    </span>
                                                                    <span>
                                                                        Tải về
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) )
                                            }
                                        </Slider>
                                    </div>
                                </div>
                            ) )
                        }
                        <div className={ styles.final }>
                            <div className={ styles.number }>
                                <span><img alt='' src="/images/account-elearning-detail-membership-9.svg" /></span>
                            </div>
                            <div className={ styles.title }>
                                Statement of Accomplishment
                            </div>
                            <div className={ styles.description }>
                                sit amet, consectetur adipiscing elit. Rhoncus praesent quam nunc, sed quis dui nisl tortor tortornc. Rhoncus praesent quam nunc, sed quis dui nisl tortor tortornc.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>
                            <div className={ styles.button }>
                                <a href='#'><span>Nhận ngay</span> </a>
                            </div>
                        </div>
                    </div>
                ) )
            }
        </div>
    )
}

export default Certificate