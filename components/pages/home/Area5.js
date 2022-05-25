import React from 'react'
import Slider from "react-slick";

const settings3 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    arrows: true,
};

const Area5 = ( { styles, staticContent } ) =>
{
    return (
        <div className={ `${ styles.area5_1 }` } id='main-page-products'>
            <Slider { ...settings3 }>
                {
                    staticContent?.area5?.map( ( e, i ) => (
                        <div className={ `${ styles.slide_item }` } key={ i }>
                            <div className={ `${ styles.slide_container }` }>
                                <div className={ `${ styles.image }` }>
                                    <img alt='' src={ process.env.IMG_URL + e?.image } />
                                </div>
                                <div className={ `${ styles.text }` }>
                                    <p className={ `${ styles.content }` }>
                                        { e?.content }
                                    </p>
                                    <h3 className={ `${ styles.name }` }>
                                        { e?.name }
                                    </h3>
                                    <div className={ `${ styles.description }` }>
                                        { e?.description }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) )
                }
            </Slider>
        </div>
    )
}

export default Area5